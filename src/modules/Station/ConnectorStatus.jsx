import React from 'react';

const ConnectorStatus = ({ status, icon: Icon, color,bg, label, energy, connectorId }) => {
   const colorClasses = {
        red: 'from-red-200 to-red-300 ',
        blue: 'from-blue-200 to-blue-300 ',
        green: 'from-green-200 to-green-300 ',
        // Ajoutez d'autres couleurs si nécessaire
    };


    const gradientClass = colorClasses[bg];
    
    return (
        (status.toLowerCase() === label.toLowerCase()) && (
            <div className="flex space-x-5">
                <div className='flex flex-col items-end justify-end'>
                    <Icon color={color} size={80} />
                    <p className={`font-bold mt-2 text-[${color}]`}>{status}</p>
                </div>
                <div className="text-center">
                    <h1 className="mb-2 font-medium text-center">Connecteur {connectorId}</h1>
                    <div
                        className={`flex flex-col items-center text-gray-500 justify-center gap-4 p-6 font-medium rounded-md bg-gradient-to-r ${gradientClass}`}>
                        <p>Energie</p>
                        <p>{energy} Wh</p>
                    </div>
                </div>
            </div>
        )
    );
};

export default ConnectorStatus;
