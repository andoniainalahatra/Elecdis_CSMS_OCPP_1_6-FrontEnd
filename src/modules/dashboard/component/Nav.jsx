import { ChartBarIcon, UserCircleIcon } from '@heroicons/react/16/solid'
import React from 'react'

const Nav = () => {
    return (
        <div className='w-full flex flex-col text-[14px]'>
            <div className='mt-2'>
                <img src="/public/images/logo1.png" alt="" />
            </div>

            <div className=' flex items-center h-[72px] bg-[#919EAB] bg-opacity-10 p-2 rounded-md space-x-2 font-semibold mt-8'>
                <UserCircleIcon className="w-[1.5rem]  h-[1.5rem] cursor-pointer text-gray-500" />
                <span>John Doe</span>
            </div>

            <div className=' flex items-center h-[44px] bg-[#F2B3B3] bg-opacity-60 text-[#F2505D] p-2 rounded-md space-x-2 font-semibold mt-8'>
                <ChartBarIcon className="w-[1.5rem]  h-[1.5rem] cursor-pointer" />
                <span>John Doe</span>
            </div>

            <div className='mt-5 font-semibold text-[#637381]  '>
                <span className='text-[#919EAB] ml-4'>ACTIVITE</span>
                <button className=' flex items-center h-[50px]  bg-opacity-60  p-2 rounded-md space-x-2 hover:shadow-md w-full '>
                    <ChartBarIcon className="w-[1.5rem]  h-[1.5rem] cursor-pointer" />
                    <span>Autorisations</span>
                </button>
                <button className=' flex items-center h-[50px]  bg-opacity-60  p-2 rounded-md space-x-2 hover:shadow-md w-full '>
                    <ChartBarIcon className="w-[1.5rem]  h-[1.5rem] cursor-pointer" />
                    <span>Réservations</span>
                </button>
                <button className=' flex items-center h-[50px]  bg-opacity-60  p-2 rounded-md space-x-2 hover:shadow-md w-full '>
                    <ChartBarIcon className="w-[1.5rem]  h-[1.5rem] cursor-pointer" />
                    <span>Sessions  de recharge</span>
                </button>
                <button className=' flex items-center h-[50px]  bg-opacity-60  p-2 rounded-md space-x-2 hover:shadow-md w-full '>
                    <ChartBarIcon className="w-[1.5rem]  h-[1.5rem] cursor-pointer" />
                    <span>Transactions</span>
                </button>
            </div>

            <div className='mt-5 font-semibold text-[#637381] '>
                <span className='text-[#919EAB] ml-4 '>GRC</span>
                <button className=' flex items-center h-[50px]  bg-opacity-60  p-2 rounded-md space-x-2 hover:shadow-md w-full '>
                    <ChartBarIcon className="w-[1.5rem]  h-[1.5rem] cursor-pointer" />
                    <span>Users</span>
                </button>
                <button className=' flex items-center h-[50px]  bg-opacity-60  p-2 rounded-md space-x-2 hover:shadow-md w-full '>
                    <ChartBarIcon className="w-[1.5rem]  h-[1.5rem] cursor-pointer" />
                    <span>Etiquettes RFID</span>
                </button>
                <button className=' flex items-center h-[50px]  bg-opacity-60  p-2 rounded-md space-x-2 hover:shadow-md w-full '>
                    <ChartBarIcon className="w-[1.5rem]  h-[1.5rem] cursor-pointer" />
                    <span>Réçus</span>
                </button>
            </div>

            <div className='mt-5 font-semibold text-[#637381] '>
                <span className='text-[#919EAB] ml-4 '>ACTIFS</span>
                <button className=' flex items-center h-[50px]  bg-opacity-60  p-2 rounded-md space-x-2 hover:shadow-md w-full '>
                    <ChartBarIcon className="w-[1.5rem]  h-[1.5rem] cursor-pointer" />
                    <span>Points de charges</span>
                </button>
                <button className=' flex items-center h-[50px]  bg-opacity-60  p-2 rounded-md space-x-2 hover:shadow-md w-full '>
                    <ChartBarIcon className="w-[1.5rem]  h-[1.5rem] cursor-pointer" />
                    <span>Locations</span>
                </button>
                <button className=' flex items-center h-[50px]  bg-opacity-60  p-2 rounded-md space-x-2 hover:shadow-md w-full '>
                    <ChartBarIcon className="w-[1.5rem]  h-[1.5rem] cursor-pointer" />
                    <span>CP Notices</span>
                </button>
                <button className=' flex items-center h-[50px]  bg-opacity-60  p-2 rounded-md space-x-2 hover:shadow-md w-full '>
                    <ChartBarIcon className="w-[1.5rem]  h-[1.5rem] cursor-pointer" />
                    <span>CP Templates</span>
                </button>
            </div>

            <div className='mt-5 font-semibold text-[#637381] '>
                <span className='text-[#919EAB] ml-4 '>PARTENAIRES</span>
                <button className=' flex items-center h-[50px]  bg-opacity-60  p-2 rounded-md space-x-2 hover:shadow-md w-full '>
                    <ChartBarIcon className="w-[1.5rem]  h-[1.5rem] cursor-pointer" />
                    <span>Partenaires</span>
                </button>
                <button className=' flex items-center h-[50px]  bg-opacity-60  p-2 rounded-md space-x-2 hover:shadow-md w-full '>
                    <ChartBarIcon className="w-[1.5rem]  h-[1.5rem] cursor-pointer" />
                    <span>Contrats</span>
                </button>
            </div>

            <div className='mt-5 font-semibold text-[#637381] '>
                <span className='text-[#919EAB] ml-4 '>TARIFS & VOUCHERS</span>
                <button className=' flex items-center h-[50px]  bg-opacity-60  p-2 rounded-md space-x-2 hover:shadow-md w-full '>
                    <ChartBarIcon className="w-[1.5rem]  h-[1.5rem] cursor-pointer" />
                    <span>Groupes des tarifs</span>
                </button>
                <button className=' flex items-center h-[50px]  bg-opacity-60  p-2 rounded-md space-x-2 hover:shadow-md w-full '>
                    <ChartBarIcon className="w-[1.5rem]  h-[1.5rem] cursor-pointer" />
                    <span>Tarifs</span>
                </button>
            </div>
            <div className='mt-5 font-semibold text-[#637381] '>
                <span className='text-[#919EAB] ml-4 '>AUTHENTIFICATIONS</span>
                <button className=' flex items-center h-[50px]  bg-opacity-60  p-2 rounded-md space-x-2 hover:shadow-md w-full '>
                    <ChartBarIcon className="w-[1.5rem]  h-[1.5rem] cursor-pointer" />
                    <span>Connexion</span>
                </button>
                <button className=' flex items-center h-[50px]  bg-opacity-60  p-2 rounded-md space-x-2 hover:shadow-md w-full '>
                    <ChartBarIcon className="w-[1.5rem]  h-[1.5rem] cursor-pointer" />
                    <span>Inscription</span>
                </button>
                <button className=' flex items-center h-[50px]  bg-opacity-60  p-2 rounded-md space-x-2 hover:shadow-md w-full '>
                    <ChartBarIcon className="w-[1.5rem]  h-[1.5rem] cursor-pointer" />
                    <span>Réinitialiser mot de passe</span>
                </button>
            </div>
        </div>
    )
}

export default Nav