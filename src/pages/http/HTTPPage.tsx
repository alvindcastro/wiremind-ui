import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/DataTable";
import { useHTTP } from "@/hooks/useHTTP";
import { components } from "@/api/schema";

type EnrichedHTTPEvent = components["schemas"]["EnrichedHTTPEvent"];

const columns: ColumnDef<EnrichedHTTPEvent>[] = [
  {
    accessorKey: "event.timestamp",
    header: "Timestamp",
    cell: ({ row }) => {
      const timestamp = row.original.event?.timestamp;
      return timestamp ? new Date(timestamp).toLocaleString() : "-";
    },
  },
  {
    accessorKey: "event.method",
    header: "Method",
    cell: ({ row }) => <span className="font-mono font-bold">{row.original.event?.method}</span>,
  },
  {
    accessorKey: "event.host",
    header: "Host",
  },
  {
    accessorKey: "event.path",
    header: "Path",
    cell: ({ row }) => <span className="max-w-[300px] truncate block" title={row.original.event?.path}>{row.original.event?.path}</span>,
  },
  {
    accessorKey: "event.user_agent",
    header: "User Agent",
    cell: ({ row }) => <span className="max-w-[200px] truncate block text-xs text-muted-foreground" title={row.original.event?.user_agent}>{row.original.event?.user_agent}</span>,
  },
];

export default function HTTPPage() {
  const { data, isLoading } = useHTTP();

  return (
    <div className="space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">HTTP Events</h2>
      </div>
      <DataTable 
        columns={columns} 
        data={data || []} 
        isLoading={isLoading}
      />
    </div>
  );
}
