import React from "react";

import { useRouter } from "next/router";

import { adminPaths, trainerPaths, userPaths } from "@/common/constants/layout";

import AdminLayout from "../AdminLayout";
import UserLayout from "../UserLayout";

type PageLayoutProps = {
  children: React.ReactNode;
};

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <>
      {adminPaths.includes(pathname) ? (
        <AdminLayout>{children}</AdminLayout>
      ) : userPaths.includes(pathname) ? (
        <UserLayout>{children}</UserLayout>
      ) : trainerPaths.includes(pathname) ? (
        <UserLayout>{children}</UserLayout>
      ) : (
        children
      )}
    </>
  );
};

export default PageLayout;
