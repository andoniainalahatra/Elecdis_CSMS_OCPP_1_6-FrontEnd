import BoutonAdd from "../../component/BoutonAdd";
const Reçus = () => {
  // const handleClick = () => alert("hello");
  return (
    <div className="w-full h-auto p-6">
      <div className="flex items-center justify-between w-full mb-6">
        <h2 className="text-[#212B36] text-xl">Réçus</h2>
        <BoutonAdd action={handleClick} />
      </div>
      <div>

      </div>
    </div>
  );
};

export default Reçus;
