import React from "react";

function IconWithText({Icon, Value}) {
  return (
    <div className="flex bg-gray-200 rounded-lg p-2 justify-start items-center mb-3 gap-4">
      <Icon className="text-[1.2vw]" color="#637381" />
      <p className="text-[#637381] text-lg">{Value}</p>
    </div>
  );
}

export default IconWithText;
