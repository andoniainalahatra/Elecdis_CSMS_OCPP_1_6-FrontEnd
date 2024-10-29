import React from "react";

function IconWithText({Icon, Value}) {
  return (
    <div className="flex justify-start items-center mb-3 gap-4">
      <Icon color="#637381" />
      <p className="text-[#637381] text-lg">{Value}</p>
    </div>
  );
}

export default IconWithText;
