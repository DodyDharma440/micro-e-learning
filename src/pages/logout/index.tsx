import { useEffect } from "react";

import { useRouter } from "next/router";

import { Loader } from "@/common/components";
import { apiELearning } from "@/common/configs/api";

const LogoutPage = () => {
  const { replace } = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      await apiELearning.get("/auth/logout");
      localStorage.removeItem("isLoggedIn");
      replace("/");
    };
    handleLogout();
  }, [replace]);

  return (
    <Loader isLoading placeholderHeight="100vh">
      <></>
    </Loader>
  );
};

export default LogoutPage;
