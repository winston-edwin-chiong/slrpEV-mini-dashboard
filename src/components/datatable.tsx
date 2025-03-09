"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import rawdata from "../../data/rawdata.json";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: EVData[] = rawdata.map((item) => ({
  ...item,
  sch_centsPerHr: parseFloat(item.sch_centsPerHr.toString()),
  reg_centsPerHr: parseFloat(item.reg_centsPerHr.toString()),
  vehicle_model: item.vehicle_model.toString(),
}));

export type EVData = {
  sch_centsPerHr: number;
  vehicle_model: string;
  Duration: string;
  startChargeTime: string;
  choice: string;
  cumEnergy_Wh: number;
  reg_centsPerHr: number;
  finishChargeTime: string;
  Overstay: string;
};

export const columns: ColumnDef<EVData>[] = [
  {
    accessorKey: "vehicle_model",
    header: "Vehicle Model",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("vehicle_model")}</div>
    ),
  },
  {
    accessorKey: "startChargeTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Charge Time
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("startChargeTime")}</div>
    ),
  },
  {
    accessorKey: "finishChargeTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Finish Charge Time
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("finishChargeTime")}</div>
    ),
  },
  {
    accessorKey: "Duration",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Duration
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("Duration")}</div>
    ),
  },
  {
    accessorKey: "reg_centsPerHr",
    header: () => <div className="text-right">Regular Price per Hour</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("reg_centsPerHr"));

      // Format the amount as dollars, null if it doesn't exist
      const formatted = amount ? `$${(amount / 100).toFixed(2)}` : null;

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "sch_centsPerHr",
    header: () => <div className="text-right">Scheduled Price per Hour</div>,
    cell: ({ row }) => {
      const amount = row.getValue("sch_centsPerHr") as number;

      // Format the amount as dollars, null if it doesn't exist
      const formatted = amount ? `$${(amount / 100).toFixed(2)}` : null;

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "choice",
    header: () => <div className="text-right">Choice</div>,
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("choice")}</div>
    ),
  },
  {
    accessorKey: "cumEnergy_Wh",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cumulative Energy (Wh)
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("cumEnergy_Wh")}</div>
    ),
  },
  {
    accessorKey: "Overstay",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Overstay
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("Overstay")}</div>
    ),
  },
];

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {/* <Input
          placeholder="Filter emails..."
          value={(table.getColumn("vehicle_model")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("vehicle_model")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
