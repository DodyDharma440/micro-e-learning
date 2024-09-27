import React, { useCallback } from "react";

import Head from "next/head";

import { Button } from "@nextui-org/react";

import { apiELearning } from "@/common/configs/api";

const AdminDashboardPage = () => {
  const handleLogout = useCallback(async () => {
    await apiELearning.get("/auth/logout");
    window.location.replace("/");
  }, []);

  return (
    <>
      <Head>
        <title>AdminDashboard - E-Learning</title>
      </Head>

      <div>Admin Dashboard</div>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

export default AdminDashboardPage;
