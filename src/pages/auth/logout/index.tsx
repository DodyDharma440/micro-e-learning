import type { GetServerSideProps } from "next";

import { apiELearning } from "@/common/configs/api";

const LogoutPage = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async () => {
  await apiELearning.get("/auth/logout");

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

export default LogoutPage;
