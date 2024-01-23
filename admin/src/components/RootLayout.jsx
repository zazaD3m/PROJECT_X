import { Outlet } from "react-router-dom";

import Header from "./header/Header";
import { Toaster } from "./ui/toaster";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="space-y-6 px-8 py-6 2xl:px-52">
        <Outlet />
      </main>
      <Toaster />
    </>
  );
};
export default RootLayout;
