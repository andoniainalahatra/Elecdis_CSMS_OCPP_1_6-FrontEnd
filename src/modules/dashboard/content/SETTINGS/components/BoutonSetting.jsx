const BoutonSetting = ({ IconButton, label, setSection, namePage }) => {

    return (
        <button className='border rounded-md hover:ring-2 hover:ring-black h-[50px] transition duration-75 w-[300px] bg-white hover:bg-gray-400 '
            onClick={() => {
                setSection(namePage);
                setActive(namePage);
            }}>
            {IconButton && <IconButton className="w-[1.5rem] h-[1.5rem] cursor-pointer" />}
            <span>{label}</span>
        </button>
    );
}
export default BoutonSetting;

