import { apiELearning } from "@/common/configs/api";
import type { PaginationResponse } from "@/common/interfaces/api";
import { get, patch, post, remove } from "@/common/utils/react-query";

import { WORK_POSITIONS } from "../constants";
import type { IWorkPosition, IWorkPositionPayload } from "../interfaces";

export const useGetWorkPositions = get<PaginationResponse<IWorkPosition>>(
  (args) =>
    apiELearning.get(`/work-position/paginated${args?.urlParams ?? ""}`),
  [WORK_POSITIONS]
);

export const useCreateWorkPos = post<any, IWorkPositionPayload>(
  ({ formValues }) => apiELearning.post("/work-position", formValues),
  [WORK_POSITIONS],
  { successMessage: "Work position created successfully" }
);

export const useUpdateWorkPos = patch<any, IWorkPositionPayload>(
  ({ formValues, id }) =>
    apiELearning.patch(`/work-position/${id}`, formValues),
  [WORK_POSITIONS],
  { successMessage: "User updated successfully" }
);

export const useDeleteWorkPos = remove<any>(
  ({ id }) => apiELearning.delete(`/work-position/${id}`),
  [WORK_POSITIONS],
  { successMessage: "User deleted successfully" }
);
