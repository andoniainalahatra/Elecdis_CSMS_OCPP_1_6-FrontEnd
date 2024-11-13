import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
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
import { Badge } from "@/components/ui/badge";

import Filters from "@/components/Privates/forms/tables/Filters.jsx";
import { MdOutlineFirstPage } from "react-icons/md";
import { MdOutlineLastPage } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { useDispatch } from "react-redux";
import ButtonStopTransaction from "@/modules/dashboard/component/ButtonStopTransaction";
import ButtonFilterTable from "@/modules/dashboard/component/ButtonFilterTable";
import { IoMdClose } from "react-icons/io";
import { transformValue } from "@/lib/utils";
import ButtonReprendreTransaction from "@/modules/dashboard/component/ButtonReprendreTransaction";
import CalendarFilterMonth from "@/modules/dashboard/component/CalendarFilterMonth";
import CalendarFilterYear from "@/modules/dashboard/component/CalendarFilterYear";
/**
 * Génère un tableau paginé avec des actions.
 *
 * @param {string[]} columns - Liste des titres de colonnes.
 * @param {Object} datas - Objet contenant les données et les informations de pagination.
 * @param {Object[]} datas.data - Liste des objets de données.
 * @param {Object} datas.pagination - Informations sur la pagination.
 * @param {Object[]} actions - Liste des objets d'actions, chaque objet doit contenir au moins une clé `name`.
 * @param {Function} ButtonAction - Fonction pour gérer les actions des boutons.
 * @param {Function} nextPage - Action Redux pour aller à la page suivante.
 * @param {Function} previousPage - Action Redux pour revenir à la page précédente.
 * @param {Function} totalPage - Action Redux pour obtenir le nombre total de pages.
 * @param {Function} resetPage - Action Redux pour réinitialiser la pagination.
 * @param {Array} listFilter - List des value de filtre
 * @param {String} filter - nom du filtre
 * @param {Boolean} onFilter - afficher ou cacher le filtre
 * @param {Function} selectPage - Action Redux pour sélectionner une page spécifique.
 * @returns {JSX.Element} Le tableau paginé avec actions.
 */

function DataTable({
  columns,
  datas,
  actions,
  ButtonAction,
  nextPage,
  previousPage,
  totalPage,
  resetPage,
  selectPage,
  filter,
  listFilter,
  calendarFilter,
  onFilter = false,
  onClickRow = false,
  ComponentModal,
}) {
  const [isDetail, setIsDetail] = useState(false);
  const [idDetail, setIdDetail] = useState(null);
  const [dataObj,setDataObj]=useState(null)
  const handleClick = (obj) => {
    if (onClickRow) {
      setIsDetail(true);
      setIdDetail(obj.id);
      setDataObj(obj)
    }
  };
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  useEffect(() => {
    setData(datas.data);
    setPagination(datas.pagination);
  }, [datas]);
  const [globalFilter, setGlobalFilter] = useState("");
  const red = "bg-red-100 text-red-800 hover:bg-red-100 cursor-pointer";
  const green = "bg-green-100 text-green-800 hover:bg-green-100 cursor-pointer";
  const yellow =
    "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 cursor-pointer";
  const orange =
    "bg-amber-100 text-amber-800 hover:bg-amber-100 cursor-pointer";
  const defaultColor =
    "bg-gray-100 text-gray-800 hover:bg-gray-100 cursor-pointer";
  const blue = "bg-blue-100 text-blue-800 hover:bg-blue-100 cursor-pointer";

  const dispatch = useDispatch();
  const customFilterFn = (row, columnId, filterValue) => {
    const cellValue = row.getValue(columnId);
    if (typeof cellValue == "string") {
      return cellValue.toLowerCase().includes(filterValue.toLowerCase());
    }
    return false;
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    state: {
      globalFilter: globalFilter,
    },
    globalFilterFn: customFilterFn,
    onGlobalFilterChange: setGlobalFilter,
    filterFns: {
      customFilter: customFilterFn,
    },
  });
  const pageIndex = selectPage;
  const nxPage = pageIndex + 1;

  const prevPage = pageIndex - 1;
  const pageSize = pagination?.limit;
  const totalPages = pagination?.total_pages;
  const rowCount = pagination?.total_items;

  return (
    <div className="w-full py-6 shadow-combined rounded-lg overflow-x-auto bg-[#fffe]">
      <div className="flex items-center w-full gap-4 mb-4">
        <Filters value={globalFilter} onChange={setGlobalFilter} />
        {onFilter && (
          <ButtonFilterTable filter={filter} listFilter={listFilter} />
        )}
        {calendarFilter && (
          <div className="flex items-center justify-center gap-2 bg-red-200 p-1 rounded-md ">
              <div className="bg-primaryChart p-0.5 rounded-md" onClick={(e)=>e.stopPropagation()}>
                <CalendarFilterMonth filter={calendarFilter} />
              </div>
              <div className="bg-primaryChart p-0.5 rounded-md" onClick={(e)=>e.stopPropagation()}>
                <CalendarFilterYear filter={calendarFilter} />
              </div>
         </div>
        )}
      </div>
      <div className="w-full">
        <Table className="w-full text-center bg-[#fffe] overflow-x-auto">
          <TableHeader className="bg-[#F4F6F8] text-center">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="w-full">
            {table.getRowModel().rows.map((row) => (
              <TableRow
                className={`${onClickRow ? "cursor-pointer" : "cursor-default"}`}
                key={row.id}
                onClick={() => handleClick(row.original)}
              >
                {row.getVisibleCells().map((cell) => {
                  const cellValue = cell.getValue();
                  const id = row.original.id;
                  const detailData = row.original
                  let cellClass = "";
                  const rowData = row.original;
                  //|| cell.column.id ==="energie_consomme"
                  if (cell.column.id === "phone") {
                    const rawPhone = cell.getValue();
                  
                    if (rawPhone) {
                      let formattedPhone;
                  
                      if (rawPhone.startsWith("+261")) {
                        // Format +261 34 49 006 42
                        formattedPhone = rawPhone.replace(/(\+261)(\d{2})(\d{2})(\d{3})(\d{2})/, "$1 $2 $3 $4 $5");
                      } else if (rawPhone.startsWith("034")) {
                        // Format 034 49 006 42
                        formattedPhone = rawPhone.replace(/(034)(\d{2})(\d{3})(\d{2})/, "$1 $2 $3 $4");
                      } else {
                        formattedPhone = rawPhone; // Cas où le format est déjà correct ou autre
                      }
                  
                      return (
                        <TableCell key={cell.id} className="text-center">
                          {formattedPhone}
                        </TableCell>
                      );
                    }
                  }
                  
                  if (cell.column.id === "time") {
                    const rawTime = cell.getValue();
                  
                    if (rawTime) {
                      // Convertit l'horodatage ou la chaîne de date en objet Date
                      const date = new Date(rawTime);
                  
                      // Formate l'heure (exemple: jour/mois/année heure:minute)
                      const formattedTime = date.toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      });
                  
                      return (
                        <TableCell key={cell.id} className="text-center">
                          {formattedTime}
                        </TableCell>
                      );
                    }
                  }
                  

                  if(cell.column.id==="energie_consomme"){
                    const rawValue=cell.getValue()
                    const formattedValue = rawValue.toLocaleString("fr-FR");
                    if(rawValue){
                      return (
                        <TableCell key={cell.id} className="text-center">
                           {formattedValue}
                        </TableCell>
                      );
                    }
                  }
                  if (cell.column.id === "consumed_energy" ) {
                    const rawValue = cell.getValue();

                    const transformedValue = transformValue(rawValue);
                    if (rawValue) {
                      return (
                        <TableCell key={cell.id} className="text-center">
                          {transformedValue}
                        </TableCell>
                      );
                    }
                  }
                  if (cell.column.id === "total_cost") {
                    const rawValue = cell.getValue();

                    const transformedValue = transformValue(rawValue);
                    if (rawValue) {
                      return (
                        <TableCell key={cell.id} className="text-center">
                          {transformedValue}
                        </TableCell>
                      );
                    }
                  }
                  if (cell.column.id === "Urgence") {
                    if (rowData.statuts === "en cours" || rowData.state === "en cours") {
                      return (
                        <TableCell key={cell.id} className="text-center">
                          <div className="flex items-center justify-center gap-3">
                          <ButtonReprendreTransaction disabled={true} />
                          <ButtonStopTransaction
                            chargePointId={rowData.chargepoint_id}
                            sessionId={rowData.id}
                            disabled={false}
                          />
                          </div>
                        </TableCell>
                      );
                    }
                    else if (rowData.statuts || rowData.state === "terminé") {
                      return (
                        <TableCell key={cell.id} className="text-center">
                          <div className="flex items-center justify-center gap-3">
                          <ButtonReprendreTransaction idSession={rowData.id} idTag={rowData.rfid} idChargePoint={rowData.chargepoint_id} idConnecteur={rowData.connector_id} disabled={false} />
                          <ButtonStopTransaction
                            disabled={true}
                          />
                          </div>
                        </TableCell>
                      );
                    }
                  }
                  if (
                    cell.column.id === "start_time" ||
                    cell.column.id === "end_time"
                  ) {
                    const rawValue = cell.getValue();
                    if (rawValue === null || rawValue === undefined) {
                      return (
                        <TableCell key={cell.id} className="text-center">
                          Non disponible
                        </TableCell>
                      );
                    }

                    const date = new Date(rawValue);
                    if (!isNaN(date.getTime())) {
                      const cellValue = date.toLocaleString("fr-FR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      });

                      return (
                        <TableCell key={cell.id} className="text-center">
                          {cellValue}
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell key={cell.id} className="text-center">
                          Date invalide
                        </TableCell>
                      );
                    }
                  }

                  if (cell.column.columnDef.header === "Actions") {
                    return (
                      <TableCell
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        key={cell.id}
                        className="text-center"
                      >
                        <ButtonAction buttonProperty={actions} Id={id} dataObj={detailData} />
                      </TableCell>
                    );
                  }


                  if (
                    cell.column.id === "status" ||
                    cell.column.id === "statuts" ||
                    cell.column.id === "connector1" ||
                    cell.column.id === "connector2" ||
                    cell.column.id === "heartBeat" ||
                    cell.column.id === "statut" ||
                    cell.column.id === "state" ||
                    cell.column.id === "historique_erreur"
                  ) {
                    switch (cellValue) {
                      case "En attente":
                      case "En cours":
                      case "en cours":
                      case "NotEmplemented":
                        cellClass = orange;
                        break;
                      case "Disponible":
                      case "Available":
                      case "available":
                      case "Terminée":
                      case "terminé":
                      case "Complétée":
                      case "Accepté":
                      case "active":
                        cellClass = green;
                        break;
                      case "Échouée":
                      case "inactive":
                      case "Bloqué":
                      case "Hors service":
                      case "Unavailable":
                      case "InternalError":
                      case "FormationViolation":
                      case "NotSupported":
                        cellClass = red;
                        break;
                      case "maintenance":
                      case "Occupe":
                        cellClass = yellow;
                        break;
                      case "Preparing":
                      case "preparing":
                      case "Charging":
                      case "charging":
                        cellClass = blue;
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between w-full gap-4 p-2 m-3 max-md:flex-col max-md:justify-center">
        <span className="text-sm text-[#64748b] ">
          Page {pageIndex} sur {totalPages}, affichage de {pageSize} resultats
          sur un total de {rowCount}
        </span>

        <div className="flex items-center gap-2 ">
          <Button
            type="button"
            disabled={pageIndex === 1}
            onClick={() => dispatch(resetPage())}
            className="bg-transparent text-[#64748b] hover:bg-transparent"
          >
            <MdOutlineFirstPage size={20} />
          </Button>
          <Button
            type="button"
            disabled={!pagination?.has_previous}
            onClick={() => {
              dispatch(previousPage(prevPage));
            }}
            className="bg-transparent text-[#64748b] hover:bg-transparent"
          >
            <GrFormPrevious size={20} />
          </Button>
          <Button
            type="button"
            disabled={!pagination?.has_next}
            onClick={() => {
              dispatch(nextPage(nxPage));
            }}
            className="bg-transparent text-[#64748b] hover:bg-transparent"
          >
            <MdNavigateNext size={20} />
          </Button>
          <Button
            type="button"
            disabled={pageIndex === totalPages}
            onClick={() => {
              dispatch(totalPage(totalPages));
            }}
            className="bg-transparent text-[#64748b] hover:bg-transparent"
          >
            <MdOutlineLastPage size={20} />
          </Button>
        </div>
      </div>
      {isDetail && (
        <div
          className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-screen overflow-auto backdrop-blur-md"
          style={{ backgroundColor: "rgba(9,16,26,0.3)" }}
        >
          <ComponentModal Id={idDetail} dataObj={dataObj}  />
          <span
            className="absolute z-50 cursor-pointer top-5 right-5"
            disabled="true"
            onClick={() => setIsDetail(false)}
          >
            <IoMdClose className="text-red-300 hover:text-red-500" size={50} />
          </span>
        </div>
      )}
    </div>
  );
}

export default DataTable;
