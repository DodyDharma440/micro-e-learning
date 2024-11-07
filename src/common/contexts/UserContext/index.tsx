import React, { createContext, useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Loader } from "@/common/components";
import { useGetProfile } from "@/modules/auth/actions";
import type { IUser } from "@/modules/auth/interfaces";

type UserCtx = {
  isLoggedIn: boolean;
  userData?: IUser;
  userQuery: ReturnType<typeof useGetProfile>;
};

export const UserContext = createContext<UserCtx>({ isLoggedIn: false } as any);

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { pathname } = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const userQuery = useGetProfile(
    {},
    { enabled: isLoggedIn && pathname !== "/logout" }
  );
  const { data, isLoading, error } = userQuery;

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
        userQuery,
      }}
    >
      <Loader isLoading={isLoading} error={error} placeholderHeight="100vh">
        {isLoaded ? <>{children}</> : null}
      </Loader>
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
