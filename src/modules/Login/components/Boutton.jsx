import { ClipLoader } from "react-spinners";

export default function Boutton({label, className, isLoading}) {
  return (
    <>
      <button type='submit' className={`${className} w-full h-[6vh] bg-[#F2505D] rounded-md text-white text-base font-medium hover:bg-[#df3846]`}>
        {isLoading ? <ClipLoader
        color="#ffffff"
        loading={true}
        size={30}
        aria-label="MoonLoader"
        data-testid="loader"
      /> : label}
      </button>
    </>
  )
}
