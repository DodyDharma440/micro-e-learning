import React from "react";

import Head from "next/head";

import { Content } from "@/common/components";
import { withAuth } from "@/common/hocs";
import { DashboardContainer } from "@/modules/dashboard/components";

const AdminDashboardPage = () => {
  return (
    <>
      <Head>
        <title>AdminDashboard - E-Learning</title>
      </Head>

      <Content title="Dashboard">
        <DashboardContainer />
      </Content>
    </>
  );
};

export default withAuth(AdminDashboardPage, "superadmin");
