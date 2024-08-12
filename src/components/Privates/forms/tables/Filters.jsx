import {Input} from "@/components/ui/input.jsx";
const Filters = ({value,onChange})=>{
    return(
        <div className="m-4 w-1/4 ">
            <Input type= "text" className="focus-visible:ring-0 focus-visible:ring-white" 
            value={value} onChange={(e)=>onChange(e.target.value)} placeholder="Search..."/>
        </div>
    )
}

export default Filters