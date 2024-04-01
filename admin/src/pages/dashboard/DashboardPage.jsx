import Wishlists from "./Wishlists";
import Prods from "./Prods";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/user/userSlice";

const DashboardPage = () => {
  const userInfo = useSelector(selectCurrentUser);
  return (
    <div className="flex h-[2000px] justify-center gap-x-24">
      {userInfo.firstName}
      <div className="flex w-[300px] flex-col gap-y-8 border p-8">
        <Wishlists />
      </div>
      <Prods />
    </div>
  );
};
export default DashboardPage;
