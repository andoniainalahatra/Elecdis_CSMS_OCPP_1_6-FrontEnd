import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectIsAuthenticated,
  selectUserRole,
} from "./features/auth/authSelector";
const requiredRole = ["admin", "technicien", "operateur"];

const ProtectedRoute = ({ children }) => {
  // const isAuthenticated = useSelector(selectIsAuthenticated);
  // const role = useSelector(selectUserRole);
  const isAuthenticated = true;
  const role = "admin"
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  if (!requiredRole.includes(role)) {
    return <Navigate to="/403" />;
  }

  return children;
};

export default ProtectedRoute;
