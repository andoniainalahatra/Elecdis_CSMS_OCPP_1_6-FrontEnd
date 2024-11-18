import Slider from "rc-slider";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "rc-slider/assets/index.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { IoFilter } from "react-icons/io5";


const SessionFilter = ({setStatus, setObjetFilter, statuFilter}) => {
  
const dateNow = new Date();


const [costFilter, setCostFilter] = useState([])
const handleCost = (value) => {
    setCostFilter(value)
}

const [energyFilter, setEnergyFilter] = useState([])
const handleEnergy = (value) => {
    setEnergyFilter(value)
}

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [close, setclose] = useState(true);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const formatDate = (date) => {
    const dateFormate = date.toLocaleDateString("fr-FR");
    const [day, month, year] = dateFormate.split("/");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="relative flex items-center space-x-4">
      {/* ID and Status Filters */}
      <div className="flex space-x-4">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border border-gray-200 rounded-sm outline-none "
        >
          <option>Filter</option>
          <option value="all">
            Tous
          </option>
          <option value="en cours">En cous</option>
          <option value="terminé">Terminé</option>
        </select>
      </div>

      <div
      className="px-4 py-3 bg-gray-200 cursor-pointer rounded-sm flex"
        onClick={() => {
          setclose((n) => !n);
        }}
      ><p><IoFilter /></p></div>

      {close ? (
        ""
      ) : (
        <div className="relative flex justify-center bg-white rounded">
          <div className="absolute z-20 p-2 bg-white border shadow-md ">
            <DateRange
              editableDateInputs={true}
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              
            />

            <div className="w-full p-2 text-gray-700">
              <p className="mb-2 font-bold">Filtrer par prix total</p>
              <div className="w-full flex items-center justify-center gap-2">
                <p>0 Ar</p>
                <Slider
                  range
                  min={0}
                  max={200000}
                  step={100}
                  defaultValue={[0, 200000]}
                  onChange={(value) => handleCost(value)}
                />
                <p>200K Ar</p>
              </div>
            </div>
            <div className="w-full p-2 text-gray-700 mt-6">
              <p className="mb-2 font-bold">Filtrer par energie consommée</p>
              <div className="w-full flex items-center justify-center gap-2">
                <p>0 kWh</p>
                <Slider
                  range
                  min={0}
                  max={20}
                  step={1}
                  defaultValue={[0, 20]}
                  onChange={(value) => handleEnergy(value)}
                />
                <p>20 kWh</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => {
                  setclose((n) => !n);
                  setObjetFilter({
                    debut_energy : 0,
                    fin_energy : 200,
                    start_cost : 0,
                    end_cost : 200000,
                    start_time: "2022-01-01",
                    end_time: formatDate(dateNow),
                  });
                }}
                className="p-2 text-[#0f000f]"
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  setclose((n) => !n);
                  setObjetFilter({
                    debut_energy : energyFilter[0] || 0,
                    fin_energy : energyFilter[1] || 200,
                    start_cost : costFilter[0] || 0,
                    end_cost : costFilter[1] || 200000,
                    start_time: formatDate(dateRange[0].startDate),
                    end_time: formatDate(dateRange[0].endDate),
                  });
                }}
                className="py-1 px-2 text-white bg-blue-500 rounded"
              >
                Soumettre
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionFilter;
