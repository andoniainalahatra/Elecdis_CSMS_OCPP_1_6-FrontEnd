import { selectUser } from "@/features/Admin/userSelector";
import { FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoMailSharp } from "react-icons/io5";
import { MdSubscriptions } from "react-icons/md";
import { useSelector } from "react-redux";

const DetailAutorisation = ({ Id }) => {

    const { data } = useSelector(selectUser);

    // Fonction pour trouver l'utilisateur correspondant à l'ID
    const findUser = () => {
        return data.find((user) => user.id === Id);
    };

    const user = findUser();
    console.log(user);

    // Vérifie si l'utilisateur est trouvé
    if (!user) {
        return <p>User not found</p>;
    }


    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-r">
            <div className="w-1/3 p-8 bg-white rounded-lg shadow-xl max-md:w-1/2">
                <h2 className="mb-6 text-3xl font-semibold text-gray-800">PROFILE</h2>

                <div className="flex justify-around w-full max-md:block">
                    <div className="flex flex-col flex-wrap items-center mb-6 ">
                        <FaUserCircle size={50} className="mb-2 text-gray-400" />
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6">
                        <div className="flex space-x-3">
                            <label className="flex items-center space-x-2 text-gray-600">
                                <FaUser />  <span> Username:</span>
                            </label>
                            <span>{user.first_name + " " + user.last_name}</span>
                        </div>
                        <div className="flex space-x-3">
                            <label className="flex items-center space-x-2 text-gray-600">
                                <IoMailSharp />
                                <span> E-mail:</span>
                            </label>
                            <span>{user.email}</span>
                        </div>
                        <div className="flex space-x-3">
                            <label className="flex items-center space-x-2 text-gray-600">
                                <FaPhoneAlt />
                                <span>Telephone:</span>
                            </label>
                            <span>{user.phone}</span>
                        </div>
                        <div className="flex space-x-3">
                            <label className="flex items-center space-x-2 text-gray-600">
                                <MdSubscriptions />
                                <span>Subscription:</span>
                            </label>
                            <span>{user.subscription}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailAutorisation;
