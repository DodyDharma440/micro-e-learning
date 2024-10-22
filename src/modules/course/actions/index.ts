import { apiELearning } from "@/common/configs/api";
import { post } from "@/common/utils/react-query";

import type { ICoursePayload } from "../interfaces";

export const useCreateCourse = post<any, ICoursePayload>(
  ({ formValues }) => apiELearning.post("/course", formValues),
  [],
  { successMessage: "Course created successfully" }
);
