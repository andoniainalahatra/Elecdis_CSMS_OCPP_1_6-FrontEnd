import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

const ColorPickerComponent = ({ value, onChange, label }) => {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    const handleChangeComplete = (newColor) => {
        onChange(newColor.hex); // Récupère le code hexadécimal
    };

    const boxStyle = {
        backgroundColor: value || '#d8d8dd', // valeur par défaut si non définie
      };
    return (
        <div>
            {/* Bouton pour afficher le sélecteur de couleur */}
            <div className="w-full flex justify-between items-center ">
                <p>{label} : </p>
                <button className='w-[4vw] p-4 rounded-lg' style={boxStyle} type="button" onClick={() => setDisplayColorPicker(true)}>
            </button>
            </div>
            

            {/* Modal du sélecteur de couleur */}
            {displayColorPicker && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="relative bg-white p-4 rounded-lg shadow-lg">
                        
                        <SketchPicker color={value} onChangeComplete={handleChangeComplete} />
                        <button className='w-full p-2 mt-2 bg-slate-400' onClick={() => setDisplayColorPicker(false)}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ColorPickerComponent;
