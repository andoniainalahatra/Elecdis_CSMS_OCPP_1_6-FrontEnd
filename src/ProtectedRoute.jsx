import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectIsAuthenticated,
  selectUserRole,
} from "./features/auth/authSelector";
const requiredRole = ["Admin", "Technicien", "Operateur"];

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectUserRole);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  if (!requiredRole.includes(role)) {
    return <Navigate to="/403" />;
  }

  return children;
};

export default ProtectedRoute;
