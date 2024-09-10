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
// import ButtonAction from "@/components/Privates/forms/tables/ButtonAction.jsx";
import { MdOutlineFirstPage } from "react-icons/md";
import { MdOutlineLastPage } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

function DataTable({ columns, datas, actions, ButtonAction }) {

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
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalPages = table.getPageCount();
  const rowCount = table.getFilteredRowModel().rows.length;


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
            <TableRow key={row.id} >
              {/* {row.getVisibleCells().map((cell) => (
                
              //  cell.column.columnDef.cell.getContext()?
                <TableCell key={cell.id} >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))} */}

              {row.getVisibleCells().map((cell) => {
                const cellValue = cell.getValue();
                const userId = row.original.id;
                let cellClass = "";

                if (cell.column.columnDef.header === "Actions") {
                  return (
                    <TableCell key={cell.id} className="text-center">
                      <ButtonAction buttonProperty={actions} userId={userId} />
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
      <div className="flex items-center justify-between gap-4 p-2 m-3 max-md:flex-col max-md:justify-center">
        <span className="text-sm text-[#64748b] ">
          Page {pageIndex + 1} sur {totalPages}, affichage de {pageSize} resultats sur un total de {rowCount}
        </span>
        <div className="flex items-center gap-2 ">
          <Button
            type="button"
            onClick={() => table.setPageIndex(0)}
            className="bg-transparent text-[#64748b] hover:bg-transparent"
          >
            <MdOutlineFirstPage size={20} />
          </Button>
          <Button
            type="button"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            className="bg-transparent text-[#64748b] hover:bg-transparent"
          >
            <GrFormPrevious size={20} />
          </Button>
          <Button
            type="button"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            className="bg-transparent text-[#64748b] hover:bg-transparent"
          >
            <MdNavigateNext size={20} />
          </Button>
          <Button
            type="button"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            className="bg-transparent text-[#64748b] hover:bg-transparent"
          >
            <MdOutlineLastPage size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
