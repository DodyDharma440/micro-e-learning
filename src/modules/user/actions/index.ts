import { apiELearning } from "@/common/configs/api";
import { get, post } from "@/common/utils/react-query";
import type { IUser } from "@/modules/auth/interfaces";

import { USER_WORK_POSITIONS, USERS_TRAINER } from "../constants";
import type {
  IEditProfilePayload,
  IUpdatePasswordPayload,
  IWorkPosition,
} from "../interfaces";

export const useGetTrainers = get<IUser[]>(
  () => apiELearning.get("/user?role=trainer"),
  [USERS_TRAINER]
);

export const useGetWorkPositions = get<IWorkPosition[]>(
  () => apiELearning.get("/work-position"),
  [USER_WORK_POSITIONS]
);

export const useUpdatePassword = post<any, IUpdatePasswordPayload>(
  ({ formValues }) => apiELearning.post("/user/update/password", formValues),
  [],
  { successMessage: "Password updated successfully" }
);

export const useUpdateProfile = post<any, IEditProfilePayload>(
  ({ formValues }) => apiELearning.post("/user/update", formValues),
  [],
  { successMessage: "Profile updated successfully" }
);
