import { useSelector } from "react-redux";
import { Card, CardHeader, CardTitle } from "../../components/ui/card";
import LoginForm from "./LoginForm";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const token = useSelector(selectCurrentToken);

  if (token) return <Navigate to="/dashboard" replace />;

  return (
    <div className="grid h-screen place-items-center">
      <Card className="flex h-[400px] w-[500px] flex-col justify-around">
        <CardHeader>
          <CardTitle className="text-center">Login to your account</CardTitle>
        </CardHeader>
        <LoginForm />
      </Card>
    </div>
  );
};
export default LoginPage;
