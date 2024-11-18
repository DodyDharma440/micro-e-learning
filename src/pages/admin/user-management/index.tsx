import React from "react";

import Head from "next/head";

import { withAuth } from "@/common/hocs";
import { UserContainer } from "@/modules/user-management/components";

const UserManagementPage = () => {
  return (
    <>
      <Head>
        <title>User Management - E-Learning</title>
      </Head>

      <UserContainer />
    </>
  );
};

export default withAuth(UserManagementPage, "superadmin");
