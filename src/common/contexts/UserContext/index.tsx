import React, { createContext, useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Loader } from "@/common/components";
import { useGetProfile } from "@/modules/auth/actions";
import type { IUser } from "@/modules/auth/interfaces";

type UserCtx = {
  isLoggedIn: boolean;
  userData?: IUser;
};

export const UserContext = createContext<UserCtx>({ isLoggedIn: false });

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { pathname } = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { data, isLoading, isRefetching, error } = useGetProfile(
    {},
    { enabled: isLoggedIn && pathname !== "/logout" }
  );

  useEffect(() => {
    const isLogin = localStorage.getItem("isLoggedIn") || "false";
    setIsLoggedIn(isLogin === "true");
    setIsLoaded(true);
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userData: data?.data.data,
      }}
    >
      <Loader
        isLoading={isLoading}
        isRefetching={isRefetching}
        error={error}
        placeholderHeight="100vh"
      >
        {isLoaded ? <>{children}</> : null}
      </Loader>
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
