
export default function Boutton({label, className}) {
  return (
    <>
      <button type='submit' className={`${className} w-full h-[6vh] bg-[#F2505D] rounded-md text-white text-base font-medium hover:bg-[#df3846]`}>{label}</button>
    </>
  )
}
