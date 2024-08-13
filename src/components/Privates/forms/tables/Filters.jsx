import {Input} from "@/components/ui/input.jsx";
import { IoSearchOutline } from "react-icons/io5";
const Filters = ({value,onChange})=>{
    return(
        <div className="mb-3 w-1/4 p-[6px]  flex space-x-2 items-center border rounded-sm ">
            <div className="text-[#919EAB]"><IoSearchOutline/></div>
            <Input type= "text" className="focus-visible:ring-0 focus-visible:ring-white border-none h-[30px]" 
            value={value} onChange={(e)=>onChange(e.target.value)} placeholder="Search..."/>
        </div>
    )
}

export default Filters