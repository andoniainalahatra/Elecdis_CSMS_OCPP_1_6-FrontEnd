import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, role, requiredRole, children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }
  
    if (role !== requiredRole) {
      return <Navigate to="/403" />;
    }
  
    return children;
  };

export default ProtectedRoute;
