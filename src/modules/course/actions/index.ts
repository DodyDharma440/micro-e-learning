import { apiELearning } from "@/common/configs/api";
import { get, post } from "@/common/utils/react-query";

import { COURSES } from "../constants";
import type { ICourse, ICoursePayload } from "../interfaces";

export const useGetCourses = get<ICourse[]>(
  () => apiELearning.get("/course"),
  [COURSES]
);

export const useCreateCourse = post<any, ICoursePayload>(
  ({ formValues }) => apiELearning.post("/course", formValues),
  [],
  { successMessage: "Course created successfully" }
);
