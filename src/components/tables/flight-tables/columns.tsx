"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IFlightLog } from "@/lib/models/FlightLogs";
import { DataTableColumnHeader } from "@/components/tables/flight-tables/data-table-column-header";

export const columns: ColumnDef<IFlightLog>[] = [
  {
    accessorKey: "tailNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tail Number" />
    ),
  },
  {
    accessorKey: "flightID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Flight ID" />
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
];
