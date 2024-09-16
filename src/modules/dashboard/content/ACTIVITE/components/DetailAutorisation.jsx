import userData from '@/modules/dashboard/content/ACTIVITE/components/data/userData';
import React from 'react';
import { FaCircleUser } from "react-icons/fa6";

const DetailAutorisation = ({ userId }) => {
    // Fonction pour trouver l'utilisateur par userId
    const findUser = () => {
        return userData.find((user) => user.id === userId);
    };

    const user = findUser();

    return (
        <div className='p-4 text-2xl bg-white rounded-lg shadow-md'>
            {user ? (
                <>
                    {/* <span>Informations  Utilisateur</span>
                    <div className='flex items-center space-x-5 '>
                        <FaCircleUser size={100} />
                        <span>{user.nom + ' ' + user.prenom}</span>
                    </div>
                    <div className='grid grid-rows-4 mt-5 md:grid-cols-4'>
                        <div>{user.email}</div>
                        <div>{user.telephone}</div>
                        <div>{user.role}</div>
                        <div>{user.status}</div>
                    </div> */}

                    <div className=''>
                        <div className='grid grid-cols-1'>
                            <div className='grid grid-cols-2 text-sm md:text-xl'>
                                <div>
                                    <FaCircleUser size={100} />
                                </div>
                                <div className='text-left'>
                                    <span className='font-semibold'>{user.nom + ' ' + user.prenom}</span>
                                    <div className='flex flex-col mt-6 space-y-2'>
                                        <div className='border-b border-primaryChart'>{user.email}</div>
                                        <div className='border-b border-primaryChart'>{user.telephone}</div>
                                        <div className='border-b border-primaryChart'>{user.role}</div>
                                        <div className='border-b border-primaryChart'>{user.status}</div>
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

export default DetailAutorisation;
