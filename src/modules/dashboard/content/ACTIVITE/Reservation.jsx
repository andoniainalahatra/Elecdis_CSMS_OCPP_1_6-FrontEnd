import DataTableReservation from "@/modules/Reservation/DataTableReservation"

const Reservation = () => {

    return (
        <div>
            <div className='flex justify-between m-1'>
                <span className=' text-[24px] text-[#212B36]'>Réservations</span>
            </div>

            <DataTableReservation/>
        </div>
    )
}
export default Reservation 