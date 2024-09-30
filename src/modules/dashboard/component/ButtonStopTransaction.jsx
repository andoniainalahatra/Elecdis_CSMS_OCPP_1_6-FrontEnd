import axiosInstance from '@/lib/axiosInstance';
import { useMutation } from '@tanstack/react-query';

function ButtonStopTransaction({transactionId, chargPointId}) {
  const stopTransaction = async () => {
    const response = await axiosInstance.post(`/cp/send_remoteStopTransaction/${chargPointId}/${transactionId}`);
    return response.data;
  };
  const {mutate} = useMutation({mutationFn : stopTransaction,
    onSuccess: (data) => {
      console.log('Transaction annulée avec succès:', data);
    },
    onError: (error) => {
      console.error('Erreur lors de l\'annulation de la transaction:', error);
    },
  });
  const action = () => {
    mutate(); }
  return (
    <button onClick={()=>action()} className='px-4 py-2 rounded-xl bg-red-400 text-white' >
      Stopper
    </button>
  )
}

export default ButtonStopTransaction
