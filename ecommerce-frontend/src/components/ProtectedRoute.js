import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (!allowedRoles.includes(payload.role)) {
      return <Navigate to="/" />;
    }

    return children;
  } catch {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;

