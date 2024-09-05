import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Inscription from "./modules/Inscription/Inscription";
import Login from "./modules/Login/Login";
import Logo from "@/assets/logo1.png";
import Dashboard from "./modules/dashboard/Dashboard";
import { ContextProvider } from "./common/config/configs/Context";
import ForgotPassword from "./modules/ForgotPassword/ForgotPassword";
import EmailSend from "./modules/ForgotPassword/EmailSend";
import ResetPassword from "./modules/ForgotPassword/ResetPassword";
import ProtectedRoute from "./ProtectedRoute";
import Page403 from "./components/Page403";
import { Provider } from "react-redux";
import store from "./App/store";

function App() {

  return (
    <>
      <Provider store={store}>
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
                <ContextProvider>
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                </ContextProvider>
              }
            />
            
            <Route path="/403" element={<Page403 />} />
            {/* Autres routes... */}
          </Routes>
        </Router>
        </Provider>
    </>
  );
}

export default App;
