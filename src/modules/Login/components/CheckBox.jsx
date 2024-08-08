
export default function CheckBox({label, id, value, onChange}) {
  return (
    <div className="flex gap-4 w-full items-center">
      <input 
      type="checkbox" 
      name="" 
      className="w-6 h-6 border-[#CDCBCB] rounded-lg  focus:outline-none" 
      id={id}
      value={value}
      onChange={onChange}
      />
      <label className='text-textSimple text-xl' htmlFor={id}>
        {label}
      </label>
    </div>
  )
}
