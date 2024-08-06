import { Button } from '@/components/ui/button'
import React from 'react'
import logo from '/public/images/logo1.png'

const UserLogin = () => {
    return (
        <div className=' w-[50%] max-md:w-full '>
            <div className=' w-full'>
                <img className=' mx-auto' src={logo} />
            </div>

            <div className='flex justify-center items-center mt-[20px] w-full mx-auto'>
                <span className='text-[25px] font-semibold'>Se connecter</span>
            </div>
            <div className=' mt-[50px]'>

                <div className='mt-[20px]'>
                    <input placeholder='Adresse mail*' className=' h-[55px] w-full border rounded-md outline-none hover:ring-2 text-[20px] p-2' type="text" />
                </div>
                <div className='mt-[60px]'>
                    <input placeholder='Mots de passe' className=' h-[55px] w-full border rounded-md outline-none hover:ring-2 text-[20px] p-2' type="text" />
                </div>

            </div>

            <div className=' flex space-x-3 text-[#666666] text-[18px] font-semibold mt-3'>
                <input type="checkbox" name="" id="" />
                <span>Souvenez-vous de moi</span>
            </div>

            <div className=' mt-5'>
                <Button className=' bg-[#F2505D] w-full h-[50px]'>SE CONNECTER</Button>
            </div>

            <div className=' mt-[20px] w-full text-center flex flex-col'>
                <span>Mot de passe oublié ?</span>
                <span>N'avez-vous pas de compte ? Inscrivez-vous</span>
                <span className=' text-[#9D9D9D] mt-[50px]'>Copyright © Dev Elecdis 2024.</span>
            </div>

        </div>
    )
}

export default UserLogin
