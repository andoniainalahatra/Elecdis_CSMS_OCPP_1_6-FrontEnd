import userData from '@/modules/dashboard/component/userData';
import React from 'react';
import { FaCircleUser } from "react-icons/fa6";

const DetailAutorisation = ({ userId }) => {
    // Fonction pour trouver l'utilisateur par userId
    const findUser = () => {
        return userData.find((user) => user.id === userId);
    };

    const user = findUser();

    return (
        <div className='w-screen h-screen p-4 text-2xl text-white border'>
            {user ? (
                <>
                    <span>Informations  Utilisateur</span>
                    <div className='flex items-center space-x-5 '>
                        <FaCircleUser size={100} />
                        <span>{user.nom + ' ' + user.prenom}</span>
                    </div>
                    <div className='grid grid-rows-4 mt-5 md:grid-cols-4'>
                        <div>{user.email}</div>
                        <div>{user.telephone}</div>
                        <div>{user.role}</div>
                        <div>{user.status}</div>

                    </div>

                </>
            ) : (
                <p>Utilisateur introuvable.</p>
            )}
        </div>
    );
};

export default DetailAutorisation;
