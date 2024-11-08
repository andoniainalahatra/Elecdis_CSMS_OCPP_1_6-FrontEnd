import axiosInstance from '@/lib/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { PulseLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import { FaRegStopCircle } from "react-icons/fa";

function ButtonStopTransaction({ sessionId, chargePointId, disabled }) {
  const stopTransaction = async () => {
    const response = await axiosInstance.post(`/cp/send_remoteStopTransaction/${chargePointId}/${sessionId}`);
    return response.data;
  };
  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: stopTransaction,
  });
  const confirmeStop = (e) => {
    console.log("sessionId :", sessionId, "chargePointId :", chargePointId );
    e.stopPropagation()
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Arrete !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        mutate()
        if (isSuccess) {
          Swal.fire(
            'Arret !',
            'La session a été arreter.',
            'success'
          );
        }
        if (isError) {
          Swal.fire(
            'Oops !',
            'Une erreur s\'est produite',
            'error'
          );
        }
        if (isPending) {
          <div className="w-full flex justify-center items-center h-[70vh]">
            <PulseLoader color="#F2505D" />
          </div>
        }
      }
    });
  };
  return (
    <button disabled={disabled} onClick={(e) => confirmeStop(e)} className={`p-2 text-white ${disabled ? "bg-red-200" : "bg-red-500"} rounded-xl`} >
      <FaRegStopCircle color='#ffffff' />
    </button>
  )
}

export default ButtonStopTransaction
