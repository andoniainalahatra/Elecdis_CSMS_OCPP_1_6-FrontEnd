
export default function CheckBox({label, id, value, onChange}) {
  return (
    <div className="flex gap-4 w-full items-center">
      <input 
      type="checkbox" 
      name="" 
      className="w-6 h-6 form-checkbox rounded text-[#F2505D] checked:outline-none" 
      id={id}
      value={value}
      onChange={onChange}
      />
      <label className='text-simpleText text-xl' htmlFor={id}>
        {label}
      </label>
    </div>
  )
}
