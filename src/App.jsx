import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Inscription from './modules/Inscription/Inscription'
import Login from './modules/Login/Login'
import Logo from "@/assets/logo1.png"
import DataTable from './modules/Station/DataTable'
import Dashboard from './modules/dashboard/Dashboard'

import Page from './modules/Station/Page'


function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/login" element={<Login Title="Se connecter"><img src={Logo} alt="" /></Login>} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/station" element={<Page />} />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
