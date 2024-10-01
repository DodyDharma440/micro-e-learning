import React from "react";

type UserLayoutProps = {
  children: React.ReactNode;
};

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default UserLayout;
