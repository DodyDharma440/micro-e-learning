import { useQueryData } from "@/common/hooks";
import { USER_LOGIN } from "@/modules/auth/constants";
import type { IUser } from "@/modules/auth/interfaces";

export const useUserProfile = <T = IUser>() => {
  const { queryData: userProfileData } = useQueryData<T>([USER_LOGIN]);

  return { userData: userProfileData?.data.data };
};
