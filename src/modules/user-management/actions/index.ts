import { apiELearning } from "@/common/configs/api";
import type { PaginationResponse } from "@/common/interfaces/api";
import { get, patch, post, remove } from "@/common/utils/react-query";
import type { IUser } from "@/modules/auth/interfaces";

import { USERS } from "../constants";
import type { IUserPayload } from "../interfaces";

export const useGetUsers = get<PaginationResponse<IUser>>(
  (args) => apiELearning.get(`/user-management${args?.urlParams ?? ""}`),
  [USERS]
);

export const useCreateUser = post<IUser, IUserPayload>(
  ({ formValues }) => apiELearning.post("/user-management", formValues),
  [USERS],
  { successMessage: "User created successfully" }
);

export const useUpdateUser = patch<IUser, IUserPayload>(
  ({ formValues, id }) =>
    apiELearning.patch(`/user-management/${id}`, formValues),
  [USERS],
  { successMessage: "User updated successfully" }
);

export const useDeleteUser = remove<IUser>(
  ({ id }) => apiELearning.delete(`/user-management/${id}`),
  [USERS],
  { successMessage: "User deleted successfully" }
);
