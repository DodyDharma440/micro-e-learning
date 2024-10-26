import { apiELearning } from "@/common/configs/api";
import { get, getById, patch, post, remove } from "@/common/utils/react-query";

import { COURSES } from "../constants";
import type { ICourse, ICoursePayload } from "../interfaces";

export const useGetCourses = get<ICourse[]>(
  () => apiELearning.get("/course"),
  [COURSES]
);

export const useGetCourse = getById<ICourse>(
  ({ id }) => apiELearning.get(`/course/${id}`),
  ({ id }) => [COURSES, id]
);

export const useCreateCourse = post<any, ICoursePayload>(
  ({ formValues }) => apiELearning.post("/course", formValues),
  [],
  { successMessage: "Course created successfully" }
);

export const useUpdateCourse = patch<any, ICoursePayload>(
  ({ formValues, id }) => apiELearning.patch(`/course/${id}`, formValues),
  [],
  { successMessage: "Course updated successfully" }
);

export const useDeleteCourse = remove<any>(
  ({ id }) => apiELearning.delete(`/course/${id}`),
  [COURSES],
  { successMessage: "Course deleted successfully" }
);
