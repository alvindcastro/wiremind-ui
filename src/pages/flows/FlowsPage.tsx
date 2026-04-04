import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/DataTable';
import { ThreatBadge } from '@/components/ui/ThreatBadge';
import { useFlows } from '@/hooks/useFlows';
import { components } from '@/api/schema';
import { AlertCircle } from 'lucide-react';

type EnrichedFlow = components['schemas']['EnrichedFlow'];

const columns: ColumnDef<EnrichedFlow>[] = [
  {
    accessorKey: 'flow.start_time',
    header: 'Timestamp',
    cell: ({ row }) => {
      const date = row.original.flow?.start_time;
      if (!date) return '-';
      return new Date(date).toLocaleString();
    },
  },
  {
    header: 'Source',
    cell: ({ row }) => {
      const flow = row.original.flow;
      if (!flow) return '-';
      return `${flow.src_ip}:${flow.src_port}`;
    },
  },
  {
    id: 'arrow',
    header: '',
    cell: () => <span className="text-zinc-500">→</span>,
  },
  {
    header: 'Destination',
    cell: ({ row }) => {
      const flow = row.original.flow;
      if (!flow) return '-';
      return `${flow.dst_ip}:${flow.dst_port}`;
    },
  },
  {
    accessorKey: 'flow.protocol',
    header: 'Protocol',
  },
  {
    header: 'Threat Score',
    cell: ({ row }) => {
      const srcScore = row.original.src_threat?.threat_score || 0;
      const dstScore = row.original.dst_threat?.threat_score || 0;
      const maxScore = Math.max(srcScore, dstScore);
      return <ThreatBadge score={maxScore} />;
    },
  },
  {
    accessorKey: 'flow.packet_count',
    header: 'Packets',
  },
  {
    accessorKey: 'flow.byte_count',
    header: 'Bytes',
    cell: ({ getValue }) => {
      const bytes = getValue<number>();
      if (!bytes) return '0 B';
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    },
  },
];

export default function FlowsPage() {
  const { data, isLoading, isError, error } = useFlows();

  if (isError) {
    return (
      <div className="flex items-center gap-2 p-4 text-red-500 bg-red-500/10 rounded-md border border-red-500/20">
        <AlertCircle className="h-5 w-5" />
        <p>Error loading flows: {(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Network Flows</h2>
        <p className="text-zinc-400">
          Real-time view of all analyzed network traffic and threat findings.
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
