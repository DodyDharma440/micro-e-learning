import { useEffect } from "react";

import { useRouter } from "next/router";

import { Loader } from "@/common/components";
import { useUserContext } from "@/common/contexts";
import { useUserProfile } from "@/modules/auth/hooks";
import type { UserRole } from "@/modules/auth/interfaces";

export const withAuth = <P extends object = {}>(
  WrappedComponent: React.ComponentType<P>,
  role?: UserRole | UserRole[]
) => {
  const Component = (props: P) => {
    const { replace } = useRouter();
    const { isLoggedIn } = useUserContext();
    const { userData } = useUserProfile();

    useEffect(() => {
      if (!isLoggedIn) {
        replace("/");
      }
    }, [isLoggedIn, replace]);

    if (!isLoggedIn) {
      return (
        <Loader screenLoader isLoading={true}>
          <></>
        </Loader>
      );
    }

    if (role) {
      if (typeof role === "string") {
        if (userData?.role !== role) {
          replace("/");

          return (
            <Loader screenLoader isLoading={true}>
              <></>
            </Loader>
          );
        }
      } else {
        if (userData?.role && !role.includes(userData?.role)) {
          replace("/");

          return (
            <Loader screenLoader isLoading={true}>
              <></>
            </Loader>
          );
        }
      }
    }

    return <WrappedComponent {...props} />;
  };

  return Component;
};
