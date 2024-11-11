import React, { useState } from "react";
import BoxTarifs from "./BoxTarifs";
import {
  MdNavigateNext,
  MdOutlineFirstPage,
  MdOutlineLastPage,
} from "react-icons/md";
import { Button } from "@/components/ui/button";
import { GrFormPrevious } from "react-icons/gr";
import useGetDataWithPagination from "@/lib/hoocks/useGetDataWithPagination";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";

function ListeTarif() {
  const [page, setPage] = useState(1);
  const { data, isPending, error } = useGetDataWithPagination(
    "tarifs",
    "listTarif",
    page,
    8
  );

  const nextPage = () => {
    setPage(page + 1);
  };
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const resetPage = () => {
    setPage(1)
  }
  const lastPage = () => {
    setPage()
  }
  if (isPending) {
    return <PulseLoader size={18} color="#F2505D" />;
  }
  if (error) {
    return Swal.fire({
      title: "Opps !",
      icon: "error",
      text: "Erreur de serveur, veuiller reessayer plus tard",
    });
  }
  console.log(page);
  
  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-4 gap-4">
        {data?.data?.map((item, index) => (
            <BoxTarifs
              key={item.id}
              id={item.id}
              category="tarif simple"
              title="Heure de pointe 1"
              description={item.description}
              price={item.price}
              backgroundColor={item.backgroundColor}
              textColor={item.textColor}
              majoration={item.facteur_majoration}
            />
          ))}
      </div>
      <div className="flex items-center justify-between w-full gap-4 p-2 m-3 max-md:flex-col max-md:justify-center">
        <span className="text-sm text-[#64748b] ">
          Page {data.pagination?.page} sur {data.pagination?.total_pages}, affichage de {data.pagination?.limit} resultats sur un total de {data.pagination?.total_items}
        </span>

        <div className="flex items-center gap-2 ">
          <Button
            type="button"
            disabled={page === 1}
            onClick={() => resetPage()}
            className="bg-transparent text-[#64748b] hover:bg-transparent"
          >
            <MdOutlineFirstPage size={20} />
          </Button>
          <Button
            type="button"
            disabled={!data.pagination?.has_previous}
            onClick={() => prevPage()}
            className="bg-transparent text-[#64748b] hover:bg-transparent"
          >
            <GrFormPrevious size={20} />
          </Button>
          <Button
            type="button"
            disabled={!data.pagination?.has_next}
            onClick={() => nextPage()}
            className="bg-transparent text-[#64748b] hover:bg-transparent"
          >
            <MdNavigateNext size={20} />
          </Button>
          <Button
            type="button"
            disabled={page === data.pagination?.total_pages}
            onClick={() => {}}
            className="bg-transparent text-[#64748b] hover:bg-transparent"
          >
            <MdOutlineLastPage size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ListeTarif;
