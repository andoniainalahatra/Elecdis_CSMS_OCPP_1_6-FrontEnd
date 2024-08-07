// ========Importation=====
import { Routes, Route, BrowserRouter } from "react-router-dom";
// ========CSS=============
import './App.css'
import Logo from "@/assets/images/logo-elecdis-1.png"
import Login from './modules/Login/Login'
import Inscription from "./modules/Inscription/Inscription";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login Title="Se connecter" ><img className='w-full h-[100%]' src={Logo} alt="" /></Login>} />
          <Route path="/inscription" element={<Inscription />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
