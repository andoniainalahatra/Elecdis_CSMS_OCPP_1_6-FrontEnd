import DataTable from '@/components/Privates/forms/tables/DataTable'
import Columns from '@/components/Privates/forms/tables/Columns';
import { dataTransactionPayement } from '@/_mock/TransactionPayement';
import ButtonAction from '@/components/Privates/forms/tables/ButtonAction';

const Transactions = () => {
    const datas = ["id", "Client",  "Montant", "Date", "Heure", "Type", "Methode", "statut", "Actions"];
    const columns = Columns(datas);
    const actions = [{name : "detail"}]
    return (
        <div className="w-full h-auto p-6">
        <h2 className="text-[#212B36] text-xl mb-6">Transaction de payement</h2>
        <div>
          <DataTable
          actions={actions}
          ButtonAction={ButtonAction}
          datas={dataTransactionPayement}
          columns={columns}
          />
        </div>
      </div>
    )
}

export default Transactions