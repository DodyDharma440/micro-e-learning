import React from "react";

import Sidebar from "../Sidebar";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="w-screen h-[1200px] rounded-full blur-[1200px] bg-gray-100 dark:bg-gray-500 opacity-30 absolute -top-1/2" />
      <div className="w-screen h-[500px] rounded-full blur-[500px] bg-primary-500 opacity-30 absolute -bottom-1/3 -right-1/2" />
      <div className="w-screen h-[500px] rounded-full blur-[500px] bg-secondary-500 opacity-10 absolute bottom-0 -left-1/2" />
      <div className="container mx-auto min-h-screen">
        <Sidebar />
        <div className="ml-[280px] py-8 px-5">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
