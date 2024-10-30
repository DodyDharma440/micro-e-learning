import { apiELearning } from "@/common/configs/api";
import { get, post } from "@/common/utils/react-query";

import { USER_LOGIN } from "../constants";
import type { ILoginInput, IUser, UserRole } from "../interfaces";

export const useLogin = post<{ token: string; role: UserRole }, ILoginInput>(
  ({ formValues }) => apiELearning.post("/auth/login", formValues),
  [],
  { successMessage: "Berhasil login" }
);

export const useGetProfile = get<IUser>(
  () => apiELearning.get("/user/me"),
  [USER_LOGIN]
);
