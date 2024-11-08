import React from 'react';

function BoxTarifs({ category, title, description, price, majoration,textColor, backgroundColor }) {
  const boxStyle = {
    backgroundColor: backgroundColor || '#d8d8dd', // valeur par défaut si non définie
    color: textColor || '#535252', // valeur par défaut si non définie
  };

  return (
    <div className="col-span-1 p-4 h-auto rounded-xl" style={boxStyle}>
      <div className="w-full flex flex-col items-start justify-center gap-4">
        <p className="uppercase text-sm font-medium">{category}</p>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p>{description}</p>
        <div className="bg-gray-400 p-[0.1px] w-full"></div>
        <p className="text-2xl font-semibold">
          {price}
          <span className="text-2xl font-semibold">/kWh</span>
        </p>
        <p>ou</p>
        <p className="text-2xl font-semibold">Majoration : {majoration}</p>
      </div>
    </div>
  );
}

export default BoxTarifs;
