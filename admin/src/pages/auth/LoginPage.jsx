/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { Card, CardHeader, CardTitle } from "../../components/ui/card";
import LoginForm from "./LoginForm";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../features/user/userSlice";
import { useEffect } from "react";
import Loader from "../../components/Loader";

const LoginPage = () => {
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);
  const userInfo = useSelector(selectCurrentUser);

  useEffect(() => {
    if (token && userInfo) {
      navigate("/");
    }
  }, [token, userInfo]);

  return (
    <div className="grid h-screen place-items-center">
      {token && userInfo ? (
        <Loader />
      ) : (
        <Card className="flex h-[400px] w-[500px] flex-col justify-around">
          <CardHeader>
            <CardTitle className="text-center">Login to your account</CardTitle>
          </CardHeader>
          <LoginForm />
        </Card>
      )}
    </div>
  );
};
export default LoginPage;
