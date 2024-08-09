import { useState } from "react";
import  stationData  from "./data";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
const columns=[
  {
    accessorKey:"name",
    header:"Name",
    cell:(props)=><p>{props.getValue()}</p>
  },
  {
    accessorKey:"location",
    header:"Location",
    cell:(props)=><p>{props.getValue()}</p>
  },
  {
    accessorKey:"power",
    header:"Power",
    cell:(props)=><p>{props.getValue()}</p>
  },
  {
    accessorKey:"connectors",
    header:"Connectors",
    cell:(props)=><p>{props.getValue()}</p>
  },
  {
    accessorKey:"status",
    header:"Status",
    cell:(props)=><p>{props.getValue()}</p>

  },
  {
    accessorKey:"lastCommunication",
    header:"LastCommunication",
    cell:(props)=><p>{props.getValue()}</p>

  }
];


const DataTable=()=>{
  const [data,setData]=useState(stationData);
  const table=useReactTable({
    data,
    columns,
    getCoreRowModel:getCoreRowModel()
  });
  console.log(table.getHeaderGroups());
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup)=>(
            <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header)=>(
                  <TableHead key={header.id}>{header.column.columnDef.header}</TableHead>
                ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row)=>(
            <TableRow key={row.id}>
             {row.getVisibleCells().map((cell)=>(
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell,cell.getContext())}
              </TableCell>
             ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
  
}

export default DataTable;