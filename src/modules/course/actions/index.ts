import { apiELearning } from "@/common/configs/api";
import { get, getById, patch, post, remove } from "@/common/utils/react-query";

import { COURSES, USER_COURSES } from "../constants";
import type {
  ICourse,
  ICourseChapter,
  ICourseChapterPayload,
  ICourseLesson,
  ICourseLessonPayload,
  ICoursePayload,
} from "../interfaces";

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

export const useUpdateCourse = patch<any, Partial<ICoursePayload>>(
  ({ formValues, id }) => apiELearning.patch(`/course/${id}`, formValues),
  [],
  { successMessage: "Course updated successfully" }
);

export const useDeleteCourse = remove<any>(
  ({ id }) => apiELearning.delete(`/course/${id}`),
  [COURSES],
  { successMessage: "Course deleted successfully" }
);

export const useCreateChapter = patch<ICourseChapter, ICourseChapterPayload>(
  ({ formValues, id }) =>
    apiELearning.post(`/course/${id}/chapter`, formValues),
  []
);

export const useUpdateChapter = patch<
  ICourseChapter,
  ICourseChapterPayload,
  string,
  { courseId: string }
>(
  ({ formValues, id, courseId }) =>
    apiELearning.patch(`/course/${courseId}/chapter/${id}`, formValues),
  []
);

export const useDeleteChapter = remove<any>(
  ({ id }) => apiELearning.delete(`/course/-/chapter/${id}`),
  []
);

export const useCreateLesson = patch<ICourseLesson, ICourseLessonPayload>(
  ({ formValues, id }) =>
    apiELearning.post(`/course/-/chapter/${id}/lesson`, formValues),
  []
);

export const useUpdateLesson = patch<
  ICourseLesson,
  ICourseLessonPayload,
  string,
  { chapterId: string }
>(
  ({ formValues, id, chapterId }) =>
    apiELearning.patch(
      `/course/-/chapter/${chapterId}/lesson/${id}`,
      formValues
    ),
  []
);

export const useDeleteLesson = remove<any>(
  ({ id }) => apiELearning.delete(`/course/-/chapter/-/lesson/${id}`),
  []
);

export const useGetUserCourses = get<ICourse[]>(
  () => apiELearning.get("/course/user"),
  [USER_COURSES]
);
