import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Filters from "@/components/Privates/forms/tables/Filters.jsx";

function DataTable({ columns, datas }) {
  const [data, setData] = useState(datas);
  const [globalFilter, setGlobalFilter] = useState("");

  // Fonction de filtrage personnalisée
  const customFilterFn = (row, columnId, filterValue) => {
    const cellValue = row.getValue(columnId);
    if (typeof cellValue == 'string') {
      return cellValue.toLowerCase().includes(filterValue.toLowerCase());
    }
    return false;
  };
//   const customFilterFn = (row, columnId, filterValue) => {
//     const cellValue = row.getValue(columnId);
    
//     if (typeof cellValue === 'string') {
//         // Divisez la chaîne de caractères en un tableau de mots
//         const words = cellValue.toLowerCase().split(" ");
        
//         // Utilisez filter pour trouver les mots correspondant au filtre
//         return words.filter(word => word === filterValue.toLowerCase()).length > 0;
//     }

//     return false;
// };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter: globalFilter,
    },
    globalFilterFn: customFilterFn,
    onGlobalFilterChange: setGlobalFilter,
    filterFns: {
      customFilter: customFilterFn,
    },
  });

  return (
    <div className="rounded-md border ">
      <Filters value={globalFilter} onChange={setGlobalFilter} />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="m-3 p-2 flex gap-2">
        <Button
          type="button"
          onClick={() => table.setPageIndex(0)}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Première page
        </Button>
        <Button
          type="button"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Page précédente
        </Button>
        <Button
          type="button"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Page suivante
        </Button>
        <Button
          type="button"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Dernière page
        </Button>
      </div>
    </div>
  );
}

export default DataTable;
