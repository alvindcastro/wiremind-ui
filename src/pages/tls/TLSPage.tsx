import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/DataTable';
import { useTLS, type EnrichedTLSEvent } from '@/hooks/useTLS';

const columns: ColumnDef<EnrichedTLSEvent>[] = [
  {
    accessorFn: (row) => row.event?.timestamp,
    id: 'timestamp',
    header: 'Timestamp',
    cell: ({ getValue }) => {
      const val = getValue<string>();
      return val ? new Date(val).toLocaleString() : '-';
    },
  },
  {
    accessorFn: (row) => row.event?.sni,
    id: 'sni',
    header: 'SNI',
    cell: ({ getValue }) => (
      <span className="font-mono text-xs">{getValue<string>() || '-'}</span>
    ),
  },
  {
    accessorFn: (row) => row.event?.version,
    id: 'version',
    header: 'Version',
    cell: ({ getValue }) => (
      <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-medium">
        {getValue<string>() || '-'}
      </span>
    ),
  },
  {
    accessorFn: (row) => row.event?.cipher,
    id: 'cipher',
    header: 'Cipher',
    cell: ({ getValue }) => (
      <span className="text-zinc-400 text-xs">
        {getValue<string>() || '-'}
      </span>
    ),
  },
];

export default function TLSPage() {
  const { data, isLoading, error } = useTLS();

  if (error) {
    return (
      <div className="p-4 bg-red-950/20 border border-red-900 text-red-400 rounded">
        Error loading TLS events: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">TLS Events</h2>
        <p className="text-zinc-400">
          Historical TLS handshakes including SNI, version, and cipher suites.
        </p>
      </div>

      <DataTable 
        columns={columns} 
        data={data || []} 
        isLoading={isLoading} 
      />
    </div>
  );
}
