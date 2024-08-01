import { useState } from 'react';
import './App.css'
import { http } from './common/config/api'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from '@tanstack/react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const App = () => {

  const [setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await http.get('/dragon_treasures');
      setData(response.data['hydra:member'] || []);

      toast.success('Ok')
    } catch (error) {
      console.error('Error fetching data: ', error);
      toast.error('error')
    }
  };

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await http.get('/dragon_treasures')
      return await response.data['hydra:member']
    },
  })

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className='flex justify-center h-[100vh]'>
      <div className='w-[80%]'>
        {/* Header */}
        <div className='h-[80px]  text-black flex justify-between items-center font-bol'>
          <div className='text-[2rem] font-bold'>
            Te<span className='text-yellow-400'>St</span>
          </div>
          {/* Nav */}
          <div className='flex space-x-4 font-semibold'>
            <button className='nav_link'>HOME</button>
            <button className='nav_link'>LOGIN</button>
            <button className='nav_link'>LOGOUT</button>
          </div>
        </div>
        {/* content */}
        <div className=''>
          <button className=' bg-indigo-500 font-semibold h-[50px] w-[200px] rounded-sm text-white hover:bg-yellow-500 flex items-center justify-center'
            onClick={() => {
              fetchData()
            }}>fetchData {isPending ? (
              <div className='animate-spin  ml-3 flex items-center justify-center'>
                <FontAwesomeIcon size='xl' icon={faCircleNotch} style={{ color: "white", }} />
              </div>)
              : (
                <div className=' ml-3 flex items-center justify-center'>
                  <FontAwesomeIcon size='xl' icon={faCheck} style={{ color: "white", }} />
                </div>)} </button>
          <div>
            {data && data.map(item => (
              <div key={item.id}>
                <li> id :{item.id}</li>
                <li> name : {item.name}</li>
                <li> value: {item.value}</li>
                <li> description : {item.description}</li>
                <li> date: {item.createdAt}</li>
                <li> coolFactor : {item.coolFactor}</li>
              </div> // Adjust based on your data structure
            ))}
            <div>{isFetching ? 'Updating...' : ''}</div>
          </div>
        </div>

        {/* Footer */}
        <div></div>

      </div>
      <ToastContainer />
    </div>
  )
}

export default App
