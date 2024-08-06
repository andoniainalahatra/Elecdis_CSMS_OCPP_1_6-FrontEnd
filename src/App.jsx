// ========Importation=====
import { Routes, Route, BrowserRouter } from "react-router-dom";
// ========CSS=============
import './App.css'

import Login from './modules/Login/Login'
import Inscription from "./modules/Inscription/Inscription";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inscription" element={<Inscription />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
