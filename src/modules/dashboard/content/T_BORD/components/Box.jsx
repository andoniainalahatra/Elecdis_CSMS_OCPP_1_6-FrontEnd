import React from 'react'
import ButtonFilter from './ButtonFilter'
import { IoIosArrowRoundUp } from 'react-icons/io'
const listFilter = ["journalier", "mensuel", "trimestriel", "semestriel", "annuel"]

export default function Box({Title, Value, FirstIcone, SecondIcone, color, filter}) {
  return (
<div className="relative rounded-2xl px-[10pxw] py-[2vw] shadow-combined bg-[#ffffff] flex justify-center items-start gap-[2vw] ">
  <div className="w-[20%] flex justify-center mt-[1vw] items-center relative">
    <div className="w-full flex justify-center items-center relative">
      <FirstIcone color={color} className={`w-[3vw] h-[2.5vw] max-sm:invisible`} />
      <SecondIcone color={color} className={`max-sm:w-[32px] max-sm:h-[32px] w-[3vw] h-[2.5vw] absolute right-0 bottom-0 transform max-sm:relative translate-x-[20%] translate-y-[20%] opacity-100`} />
      <div className="max-sm:invisible w-[3vw] h-[1vw] bg-gradient-to-t from-[#ffffff] rounded-[50%] to-transparent absolute z-10 right-0 bottom-0 transform translate-x-[20%] translate-y-[70%]"></div>
    </div>
  </div>
  
  <div className="w-[60%] flex flex-col gap-2">
    <div className="w-full flex justify-between items-center">
      <p className='font-bold text-[4vw] sm:text-[2vw] md:text-[1.5vw] lg:text-[1vw] xl:text-[20px] text-[#212B36]'>{Value}</p>
      {filter && (
        <ButtonFilter filter={filter} listFilter={listFilter} />
      )}
    </div>
    <p className='text-[3vw] sm:text-[2vw] md:text-[1.5vw] lg:text-[1vw] xl:text-[14px] font-bold text-[#919EAB]'>{Title}</p>
    {filter && (
      <div className="w-full flex justify-start items-start">
        <IoIosArrowRoundUp className='text-[4vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1.5vw] text-[#36E73D]' />
        <p className='text-[#9D9D9D] text-[3vw] sm:text-[2vw] md:text-[1.5vw] lg:text-[1vw] xl:text-[14px]'>
          <span className='text-[#36E73D]'>15%</span> que l&apos;année dernière
        </p>
      </div>
    )}
  </div>
</div>

  )
}
