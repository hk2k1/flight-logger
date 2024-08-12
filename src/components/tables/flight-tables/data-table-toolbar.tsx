"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/tables/flight-tables/data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div className="flex items-center space-x-2 w-full sm:w-auto">
        <Input
          placeholder="Filter flights..."
          value={
            (table.getColumn("flightID")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("flightID")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <div className="sm:hidden">
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className="hidden sm:block">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
