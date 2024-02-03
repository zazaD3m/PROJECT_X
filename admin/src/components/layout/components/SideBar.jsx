import { ArrowLeft, User } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectSiteInfo,
  toggleSidebar,
} from "../../../features/user/userSlice";
import SideNav from "./SideNav";
import { useState } from "react";

const SideBar = () => {
  const dispatch = useDispatch();
  const { sidebarIsOpen: isOpen } = useSelector(selectSiteInfo);
  const { firstName } = useSelector(selectCurrentUser);
  const [catalogOpen, setCatalogOpen] = useState(true);

  const handleToggle = (e) => {
    e.preventDefault();
    dispatch(toggleSidebar());
    setCatalogOpen(false);
  };

  return (
    <aside
      className={cn(
        `h-screen border-r bg-background pt-14`,
        isOpen ? "w-72" : "w-[65px]",
      )}
    >
      <div className="relative flex h-28 items-center justify-start px-5">
        <User />
        {isOpen && <h2 className="ml-2 text-xl">hello, {firstName}</h2>}
        <Button
          variant="ghost"
          className={cn(
            "absolute -right-4 top-10 h-8 w-8 cursor-pointer rounded-full border bg-background p-0",
            !isOpen && "rotate-180",
          )}
          onClick={handleToggle}
        >
          <ArrowLeft size={20} absoluteStrokeWidth />
        </Button>
      </div>
      <SideNav
        isOpen={isOpen}
        catalogOpen={catalogOpen}
        setCatalogOpen={setCatalogOpen}
      />
    </aside>
  );
};
export default SideBar;
