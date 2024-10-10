import BoutonAdd from '../../component/BoutonAdd';
import AutorisationTable from '../../component/AutorisationTable';


const Autorisation = () => {

    const handleClick = () => {
        alert("hello");
    };
    return (
        <div className=' p-6'>
            <div className='flex justify-between mb-6'>
                <span className=' text-[24px] text-[#212B36]'>Personnels</span>
                <BoutonAdd action={handleClick} />
            </div>
            <AutorisationTable />
        </div>
    )
}
export default Autorisation