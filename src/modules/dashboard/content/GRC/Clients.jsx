import BoutonAdd from '../../component/BoutonAdd'

const Clients = () => {
    const handleClick = () => alert("hello");
    return (
        <div>
            <div className='flex justify-between m-1'>
                <span className=' text-[24px] text-[#212B36]'>Liste des clients</span>
                <BoutonAdd action={handleClick} />
            </div>
        </div>
    )
}

export default Clients