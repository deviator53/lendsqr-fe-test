import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <>
      <div className="h-screen w-screen overflow-hidden">
        <Header />
        <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <div className="flex-1 p-4 min-h-0 overflow-auto">{<Outlet />}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
