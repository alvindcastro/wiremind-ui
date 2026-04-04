import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/DataTable';
import { useDNS, type EnrichedDNSEvent } from '@/hooks/useDNS';

const columns: ColumnDef<EnrichedDNSEvent>[] = [
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
    accessorFn: (row) => row.event?.query,
    id: 'query',
    header: 'Query Name',
    cell: ({ getValue }) => (
      <span className="font-mono text-xs">{getValue<string>()}</span>
    ),
  },
  {
    accessorFn: (row) => row.event?.qtype,
    id: 'qtype',
    header: 'QType',
    cell: ({ getValue }) => (
      <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-medium">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorFn: (row) => row.event?.responses?.join(', '),
    id: 'responses',
    header: 'Responses',
    cell: ({ getValue }) => (
      <span className="text-zinc-400 text-xs truncate max-w-[300px] block">
        {getValue<string>() || '-'}
      </span>
    ),
  },
];

export default function DNSPage() {
  const { data, isLoading, error } = useDNS();

  if (error) {
    return (
      <div className="p-4 bg-red-950/20 border border-red-900 text-red-400 rounded">
        Error loading DNS events: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">DNS Events</h2>
        <p className="text-zinc-400">
          Historical DNS queries and responses with threat enrichment.
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
