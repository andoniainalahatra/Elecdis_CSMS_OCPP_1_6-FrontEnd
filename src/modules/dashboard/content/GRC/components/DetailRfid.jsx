import {
  FaUserAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaHistory,
} from "react-icons/fa"; // Des icônes futuristes
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsArrowReturnRight } from "react-icons/bs";

const DetailRfid = ({ fermer, supprimer }) => {
  const rfidData = {
    id: "12345",
    numero: "A7B8C9D",
    proprietaire: "John Doe",
    status: "active",
    lastUsed: "2024-10-01 15:30",
    enregistrement: "2023-06-15",
    historique: [
      { date: "2024-10-01 15:30", action: "Accès autorisé" },
      { date: "2024-09-20 10:22", action: "Accès refusé" },
    ],
  };
  return (
    <div className="fixed z-10 top-0 left-0 w-full h-screen flex justify-center items-center">
      <div className="w-full bg-black bg-opacity-40 h-screen flex items-center justify-center">
        <div className="relative bg-white shadow-xl backdrop-blur max-sm:shadow-none w-[400px] 2xl:w-[500px] h-auto p-6 flex items-center flex-col gap-[4vh] rounded-lg">
          {/* Section 1: Informations de base */}
          <div className="w-full bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">
              RFID Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col w-full items-start">
                <h3 className="text-gray-300">ID RFID</h3>
                <p className="text-lg text-white font-bold">{rfidData.id}</p>
              </div>
              <div className="flex flex-col w-full items-start">
                <h3 className="text-gray-300">Numéro RFID</h3>
                <p className="text-lgs text-white font-bold">{rfidData.numero}</p>
              </div>
              <div className="flex flex-col w-full items-start">
                <h3 className="text-gray-300">Propriétaire</h3>
                <p className="text-lgs text-white font-bold flex items-center">
                  <FaUserAlt className="mr-2" /> {rfidData.proprietaire}
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Statut et Date */}
          <div className="w-full bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">
              Statut & Dates
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col w-full items-start">
                <h3 className="text-gray-300">Statut</h3>
                <p className="flexs text-white flex items-center justify-center">
                  {rfidData.status === "active" ? (
                    <FaCheckCircle className="text-green-500 mr-2" />
                  ) : (
                    <FaTimesCircle className="text-red-500 mr-2" />
                  )}
                  {rfidData.status === "active" ? "Active" : "Inactive"}
                </p>
              </div>
              <div className="flex flex-col w-full items-start">
                <h3 className="text-gray-300">Dernière utilisation</h3>
                <p className="flexs text-white flex items-center justify-center">
                  <FaCalendarAlt className="mr-2" /> {rfidData.lastUsed}
                </p>
              </div>
              <div className="flex flex-col w-full items-start">
                <h3 className="text-gray-300">Date d'enregistrement</h3>
                <p className="flexs text-white flex items-center justify-center">
                  <FaCalendarAlt className="mr-2" /> {rfidData.enregistrement}
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Historique des Utilisations */}
          <div className="w-full bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">
              Historique des Utilisations
            </h2>
            <div className="space-y-2">
              {rfidData.historique.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-700 p-3 text-white rounded-md flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <FaHistory className="text-gray-400 mr-2" />
                    <span>{item.date}</span>
                  </div>
                  <span className="py-1 px-2 bg-slate-400 rounded-md">{item.action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Actions */}
          <div className="w-full flex justify-end space-x-4">
            <button
              onClick={() => supprimer()}
              className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-md text-white"
            >
              <RiDeleteBin6Line />
            </button>
            <button
              onClick={() => fermer()}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md text-white"
            >
              <BsArrowReturnRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exemples de données RFID
export default DetailRfid;
