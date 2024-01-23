import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);

  return token ? <Outlet /> : <Navigate to="/" />;
};
export default RequireAuth;
