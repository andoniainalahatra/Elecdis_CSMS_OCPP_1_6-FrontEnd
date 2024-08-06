import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './modules/Login/Login'
import Inscription from './modules/Inscription/Inscription'



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
