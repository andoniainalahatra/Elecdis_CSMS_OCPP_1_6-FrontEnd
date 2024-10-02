import UserIcon from "@/assets/userIcone.png";
import { FiPhone } from "react-icons/fi";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdOutlineSubscriptions } from "react-icons/md";
import { LiaHandshakeSolid } from "react-icons/lia";
import { FiMail } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import EtiquettesRfidTable from "@/modules/dashboard/content/GRC/components/EtiquettesRfidTable";
function UserProfil() {
  return (
    <div className="w-full p-6 relative">
      <h2 className="text-[#212B36] text-xl mb-10">Information utilisateur</h2>
      <div className="w-full flex justify-between items-center">
        <div className="w-[17%] flex justify-between items-center">
          <div className="w-[50%]">
            <img
              src={UserIcon}
              className="w-[100%] h-auto rounded-full border-[#637381] border-4"
              alt=""
            />
          </div>
          <h3 className="text-[#637381] font-bold text-[18px] mt-4">
            Jhon Doe
          </h3>
        </div>
        <button className="w-[10%] bg-[#F9FAFB] p-1 flex items-center justify-center gap-2 text-[#637381] border-[#637381] border-2 rounded-sm">
          Modifier
          <FiEdit size={14} color="#212B36" />
        </button>
      </div>
      <div className="w-full grid grid-cols-3 text-[#637381] gap-4 items-center bg-[#F9FAFB]">
        <button className="border-r-4 p-2">RFID</button>
        <button className="border-r-4 p-2">Historique de transaction</button>
        <button className="p-2">Historique de sessions</button>
      </div>
      <div className="mt-4 w-full grid grid-cols-3 gap-4">
        <div className="col-span-1 bg-[#F9FAFB] p-6">
          <div className="w-full mb-5 flex justify-start gap-2 items-center text-[#637381]">
            <IoInformationCircleOutline size={24} />
            <p className="text-[18px]">A propos</p>
          </div>
          <div className="w-full ml-2 mb-2 flex justify-start gap-2 items-center text-[#637381]">
            <FiPhone size={20} />
            <p className="text-[16px]">032 48 268 45</p>
          </div>
          <div className="w-full ml-2 mb-2 flex justify-start gap-2 items-center text-[#637381]">
            <FiMail size={20} />
            <p className="text-[16px]">kevinrakoto77@gmail.com</p>
          </div>
          <div className="w-full ml-2 mb-2 flex justify-start gap-2 items-center text-[#637381]">
            <MdOutlineSubscriptions size={20} />
            <p className="text-[16px]">I don't know</p>
          </div>
          <div className="w-full ml-2 mb-2 flex justify-start gap-2 items-center text-[#637381]">
            <LiaHandshakeSolid size={20} />
            <p className="text-[16px]">Telma</p>
          </div>
        </div>
        <div className="col-span-2 bg-[#F9FAFB] p-6">
            <EtiquettesRfidTable />
        </div>
      </div>
    </div>
  );
}

export default UserProfil;
