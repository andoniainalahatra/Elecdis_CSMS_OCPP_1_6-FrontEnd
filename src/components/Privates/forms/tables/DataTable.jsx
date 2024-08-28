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
import { Badge } from "@/components/ui/badge"

import Filters from "@/components/Privates/forms/tables/Filters.jsx";
import ButtonAction from "@/components/Privates/forms/tables/ButtonAction.jsx";

function DataTable({ columns, datas, actions }) {
  const [data, setData] = useState(datas);
  const [globalFilter, setGlobalFilter] = useState("");
  const red = "bg-red-100 text-red-800 hover:bg-red-100 cursor-pointer";

  const green = "bg-green-100 text-green-800 hover:bg-green-100 cursor-pointer";
  const yellow = "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 cursor-pointer";
  const defaultColor = "bg-gray-100 text-gray-800 hover:bg-gray-100 cursor-pointer";

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
    <div className=" py-6  shadow-combined rounded-lg overflow-x-auto bg-[#fffe]">
      <Filters value={globalFilter} onChange={setGlobalFilter} />
      <Table className="text-center bg-[#fffe]">
        <TableHeader className="bg-[#F4F6F8] text-center">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-center">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {/* {row.getVisibleCells().map((cell) => (
                
              //  cell.column.columnDef.cell.getContext()?
                <TableCell key={cell.id} >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))} */}

              {row.getVisibleCells().map((cell) => {
                const cellValue = cell.getValue();
                let cellClass = "";

                    if (cell.column.columnDef.header === "Actions") {
                      return (
                          <TableCell key={cell.id} className="text-center">
                           <ButtonAction buttonProperty={actions}/>
                          </TableCell>
                      );
                    }

                if (cell.column.id === "status" ||
                  cell.column.id === "connector1" ||
                  cell.column.id === "connector2" ||
                  cell.column.id === "heartBeat") {
                  switch (cellValue) {
                    case "active":
                      cellClass = green;
                      break;
                    case "inactive":
                      cellClass = red;
                      break;
                    case "maintenance":
                      cellClass = yellow;
                      break;
                    case "ON":
                      cellClass = green;
                      break;
                    case "OFF":
                      cellClass = red;
                      break;
                    case "Disponible":
                      cellClass = green;
                      break;
                    case "Hors service":
                      cellClass = red;
                      break;
                    case "Occupe":
                      cellClass = yellow;
                      break;
                    default:
                      cellClass = defaultColor;
                  }
                  return (
                    <TableCell key={cell.id} className="text-center">
                      <Badge className={cellClass}>{cellValue}</Badge>
                    </TableCell>
                  );
                }

                return (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              }
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="m-3 p-2 flex gap-2 max-md:flex-col">
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
