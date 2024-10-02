import { selectUser } from '@/features/Admin/userSelector';
// import userData from '@/modules/dashboard/content/ACTIVITE/components/data/userData';
import React from 'react';
import { FaCircleUser } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { selectClient } from '../config/client/clientSelector';

const DetailsClient = ({ Id }) => {

    const { data } = useSelector(selectClient)
    // Fonction pour trouver l'utilisateur par Id
    const findUser = () => {
        return data.find((user) => user.id === Id);


    };

    const user = findUser();
    console.log(data)

    return (
        <div className='p-4 text-2xl bg-white rounded-lg shadow-md'>
            {user ? (
                <>
                    <div className=''>
                        <div className='grid grid-cols-1'>
                            <div className='grid grid-cols-2 text-sm md:text-xl'>
                                <div>
                                    <FaCircleUser size={100} />
                                </div>
                                <div className='text-left'>
                                    <span className='font-semibold'>{user.first_name + ' ' + user.last_name}</span>
                                    <div className='flex flex-col mt-6 space-y-2'>
                                        <div className='border-b border-primaryChart'>{user.email}</div>
                                        <div className='border-b border-primaryChart'>{user.role}</div>
                                        <div className='border-b border-primaryChart'>{user.phone}</div>
                                        <div className='border-b border-primaryChart'>{user.subscription}</div>
                                        <div className='border-b border-primaryChart'>{user.partner}</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </>
            ) : (
                <p>Utilisateur introuvable.</p>
            )}
        </div>
    );
};

export default DetailsClient;


// verifierrrr oooo+