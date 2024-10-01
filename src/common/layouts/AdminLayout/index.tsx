import React from "react";

import Sidebar from "../Sidebar";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto min-h-screen">
      <Sidebar />
      <div className="ml-[280px] py-8 px-5">{children}</div>
    </div>
  );
};

export default AdminLayout;
