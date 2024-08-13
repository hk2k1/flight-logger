"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IFlightLog } from "@/lib/models/FlightLogs";
import { DataTableColumnHeader } from "@/components/tables/flight-tables/data-table-column-header";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UpdateFlightLogDrawer } from "@/components/forms/UpdateFlightLogDrawer";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { deleteFlightLog } from "@/lib/actions/flightlog.action";
import { Checkbox } from "@/components/ui/checkbox";

function CellAction({ flightLog }: { flightLog: IFlightLog }) {
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteFlightLog(flightLog.fid);
      toast({
        title: "Success",
        description: "Flight log deleted successfully",
      });
      router.refresh();
    } catch (error) {
      console.error("Error deleting flight log:", error);
      toast({
        title: "Error",
        description: "Failed to delete flight log",
        variant: "destructive",
      });
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <UpdateFlightLogDrawer flightLog={flightLog}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
        </UpdateFlightLogDrawer>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            handleDelete();
          }}
        >
          <Trash className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const columns: ColumnDef<IFlightLog>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "flightID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Flight ID" />
    ),
  },
  {
    accessorKey: "tailNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tail Number" />
    ),
  },
  {
    accessorKey: "takeoff",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Takeoff Location" />
    ),
  },
  {
    accessorKey: "landing",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Landing Location" />
    ),
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "fid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fid" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction flightLog={row.original} />,
  },
];
