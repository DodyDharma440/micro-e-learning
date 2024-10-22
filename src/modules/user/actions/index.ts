import { apiELearning } from "@/common/configs/api";
import { get } from "@/common/utils/react-query";
import type { IUser } from "@/modules/auth/interfaces";

import { USER_WORK_POSITIONS, USERS_TRAINER } from "../constants";
import type { IWorkPosition } from "../interfaces";

export const useGetTrainers = get<IUser[]>(
  () => apiELearning.get("/user?role=trainer"),
  [USERS_TRAINER]
);

export const useGetWorkPositions = get<IWorkPosition[]>(
  () => apiELearning.get("/work-position"),
  [USER_WORK_POSITIONS]
);
