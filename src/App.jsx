import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Inscription from "./modules/Inscription/Inscription";
import Login from "./modules/Login/Login";
import Logo from "@/assets/logo1.png";
import Dashboard from "./modules/dashboard/Dashboard";

import Page from "./modules/Station/Page";
import { ContextProvider } from "./common/config/configs/Context";
import ForgotPassword from "./modules/ForgotPassword/ForgotPassword";
import EmailSend from "./modules/ForgotPassword/EmailSend";
import ResetPassword from "./modules/ForgotPassword/ResetPassword";
import ProtectedRoute from "./routes";
import Page403 from "./components/Page403";
const isAuthenticated = false; // Ceci devrait être déterminé par ton contexte ou état global
const userRole = "admin";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Login Title="Se connecter">
                <img src={Logo} alt="" />
              </Login>
            }
          />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/emailSend" element={<EmailSend />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                role={userRole}
                requiredRole="admin"
              >
                <ContextProvider>
                  <Dashboard />
                </ContextProvider>
              </ProtectedRoute>
            }
          />
          <Route path="/403" element={<Page403 />} />
          {/* Autres routes... */}
        </Routes>
      </Router>
      {/* <BrowserRouter>
        
          <Routes>
            
            <Route path="/station" element={<Page />} />
          </Routes>
        </ContextProvider>
      </BrowserRouter> */}
    </>
  );
}

export default App;
