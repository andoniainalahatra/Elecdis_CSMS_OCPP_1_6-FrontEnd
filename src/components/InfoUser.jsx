
function InfoUser({Title, Value}) {
  return (
    <div className="">
      <h3 className="text-[#637381] font-bold text-[1wv]">{Value == null || Value == 0 || Value == "None kwh" ? "0" : Value }</h3>
      <p className="text-[#637381] text-[1vw]">{Title}</p>
    </div>
  );
}

export default InfoUser;
