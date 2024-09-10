import React from 'react'
import DataTable from '@/components/Privates/forms/tables/DataTable';
import stationData from "./userData";
import Columns from '@/components/Privates/forms/tables/Columns';
import ButtonAutorisation from '../content/ACTIVITE/components/ButtonAutorisation';


const AutorisationTable = () => {
    const datas = ["id", "nom", "prenom", "email", "telephone", "role", "status", "Actions"];
    const columns = Columns(datas);
    const actions = [{ name: "detail" }, { name: "edit" }, { name: "delete" }]

    return (
        <>
            <DataTable columns={columns}
                datas={stationData}
                actions={actions}
                ButtonAction={ButtonAutorisation}
            />
        </>


    );

}

export default AutorisationTable