import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Inscription from './modules/Inscription/Inscription'
import Login from './modules/Login/Login'
import Logo from "@/assets/logo1.png"
import Dashboard from './modules/dashboard/Dashboard'

import Page from './modules/Station/Page'
import { ContextProvider } from './common/config/configs/Context'
import ForgotPassword from './modules/ForgotPassword/ForgotPassword'
import EmailSend from './modules/ForgotPassword/EmailSend'
import ResetPassword from './modules/ForgotPassword/ResetPassword'

function App() {
  return (
    <>
      <BrowserRouter>
        <ContextProvider>
          <Routes>
            <Route path="/" element={<Login Title="Se connecter"><img src={Logo} alt="" /></Login>} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/emailSend" element={<EmailSend />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/station" element={<Page />} />
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
