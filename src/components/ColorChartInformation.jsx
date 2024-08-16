import React from 'react'

export default function ColorChartInformation({config, position, padding, className = ""}) {
  return (
    <div className={`w-full h-1px  p-${padding} flex items-center justify-${position} flex-wrap gap-4 ${className}`}>
    {Object.entries(config).map(([key, { label, color }]) => (
        <div key={key} className="flex items-center justify-start flex-wrap gap-1">
          <div className="p-1 rounded-sm" style={{ backgroundColor: color }}></div>
          <p className="text-simpleText text-[14px]"> {label}</p>
        </div>
    ))}
    </div>
  )
}
