import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import { Toaster } from "../ui/toaster";
import SideBar from "./components/SideBar";

const RootLayout = () => {
  return (
    <>
      <Header />
      <div className="flex h-screen border-collapse overflow-hidden">
        <SideBar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden pb-1 pt-14">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </>
  );
};
export default RootLayout;
