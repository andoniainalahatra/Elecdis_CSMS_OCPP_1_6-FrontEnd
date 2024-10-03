import React from 'react'

export default function AverageCharge({ minSession , maxSession , averageSession }) {
    const sliderPosition = ((averageSession - minSession) / (maxSession - minSession)) * 100;

    return (
      <div className="max-sm:w-full p-6 shadow-combined rounded-xl w-full bg-white">
        <h4 className="text-center text-lg font-medium mb-5">Durées moyenne de recharge</h4>
        <div className="relative w-full mt-20">
          <div className="relative h-1 bg-gray-300 rounded-full mt-5">
            <div
              className="absolute -top-1 h-3 bg-blue-500 rounded-full"
              style={{ width: '60px', left: `calc(${sliderPosition}% - 30px)` }}
            />
          </div>
          <div
            className="absolute -top-8"
            style={{
              left: `calc(${sliderPosition}% - 20px)`,
              marginTop: '0px',
            }}
          >
            <span className="text-xl font-bold text-gray-900">{(averageSession / 60).toFixed(1)} H</span>
          </div>
        </div>
        <div className="flex justify-between w-full mt-2 text-sm">
          <span>{minSession} min</span>
          <span>{(maxSession / 60).toFixed(0)} hrs</span>
        </div>
      </div>
    );
}
