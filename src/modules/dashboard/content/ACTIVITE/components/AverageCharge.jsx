import React from 'react'

export default function AverageCharge({ minSession , maxSession , averageSession }) {
    const sliderPosition = ((averageSession - minSession) / (maxSession - minSession)) * 100;

    return (
      <div className="col-span-1 max-sm:w-full place-items-center h-full p-6 shadow-combined rounded-xl w-full bg-white">
        <h4 className="text-center text-lg font-medium mb-5">Durées moyenne de recharge</h4>
  
        {/* Container for slider and text */}
        <div className="relative w-full mt-20">
          {/* Slider bar with dynamic width and text */}
          <div className="relative h-1 bg-gray-300 rounded-full mt-5">
            {/* Blue bar position dynamically based on averageSession */}
            <div
              className="absolute -top-1 h-3 bg-blue-500 rounded-full"
              style={{ width: '60px', left: `calc(${sliderPosition}% - 30px)` }} // Adjust dynamically
            />
          </div>
  
          {/* Average duration text (dynamically positioned on top of the blue bar) */}
          <div
            className="absolute -top-8"
            style={{
              left: `calc(${sliderPosition}% - 20px)`, // Adjust dynamically for the text
              marginTop: '0px', // Adjust margin for proper centering
            }}
          >
            <span className="text-xl font-bold text-gray-900">{(averageSession / 60).toFixed(1)} H</span>
          </div>
        </div>
  
        {/* Labels showing min and max sessions */}
        <div className="flex justify-between w-full mt-2 text-sm">
          <span>{minSession} min</span>
          <span>{(maxSession / 60).toFixed(0)} hrs</span>
        </div>
      </div>
    );
}
