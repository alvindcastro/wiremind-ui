import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/DataTable";
import { useICMP } from "@/hooks/useICMP";

export default function ICMPPage() {
  const { data, isLoading } = useICMP();

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "event.timestamp",
        header: "Timestamp",
        cell: (info) => new Date(info.getValue() as string).toLocaleString(),
      },
      {
        accessorKey: "event.src_ip",
        header: "Source IP",
      },
      {
        accessorKey: "event.dst_ip",
        header: "Destination IP",
      },
      {
        accessorKey: "event.type_name",
        header: "Type",
        cell: (info) => (
          <span className="font-mono text-xs uppercase text-slate-400">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "event.code",
        header: "Code",
      },
      {
        accessorKey: "event.size",
        header: "Size (B)",
      },
    ],
    []
  );

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">ICMP Events</h1>
        <p className="text-muted-foreground">
          Real-time view of ICMP control messages and errors.
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
