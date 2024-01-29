import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { clearCredentials } from "../features/auth/authSlice";
import { clearUser } from "../features/user/userSlice";

const SyncUserInfo = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "persist:root" && e.newValue !== e.oldValue) {
        const storageData = JSON.parse(e.newValue);
        const updatedUserInfo = JSON.parse(storageData.user).userInfo;
        const updatedToken = JSON.parse(storageData.auth).token;
        if (updatedToken && updatedUserInfo) {
          dispatch({
            type: "persist/REHYDRATE",
            key: "root",
            payload: {
              auth: {
                token: updatedToken,
              },
              user: {
                userInfo: updatedUserInfo,
              },
              _persist: {
                version: 1,
                rehydrated: true,
              },
            },
          });
        } else {
          dispatch(clearCredentials());
          dispatch(clearUser());
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return <Outlet />;
};
export default SyncUserInfo;
