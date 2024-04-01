import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../features/user/userSlice";

const RequireAuth = ({ children }) => {
  const token = useSelector(selectCurrentToken);
  const userInfo = useSelector(selectCurrentUser);

  if (token && userInfo?.role === "admin") {
    return children;
  }

  return <Navigate to="/login" replace />;
};
export default RequireAuth;
