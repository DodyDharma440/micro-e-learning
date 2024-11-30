import { apiELearning } from "@/common/configs/api";
import type { PaginationResponse } from "@/common/interfaces/api";
import { get, getById, patch, post, remove } from "@/common/utils/react-query";

import {
  COURSE,
  COURSE_FORUM,
  COURSE_FORUM_DETAIL,
  COURSE_PROGRESS,
  COURSE_SLUG,
  COURSES,
  USER_COURSES,
} from "../constants";
import type {
  ICourse,
  ICourseChapter,
  ICourseChapterPayload,
  ICourseForum,
  ICourseForumPayload,
  ICourseForumReplyPayload,
  ICourseLastLessonPayload,
  ICourseLesson,
  ICourseLessonPayload,
  ICoursePayload,
  ICourseProgressPayload,
  ICourseUserProgress,
} from "../interfaces";

export const useGetCourses = get<PaginationResponse<ICourse>>(
  (args, ctx) =>
    apiELearning.get(`/course${args?.urlParams ?? ""}`, {
      signal: ctx?.signal,
    }),
  [COURSES]
);

export const useGetCourse = getById<ICourse>(
  ({ id }) => apiELearning.get(`/course/${id}`),
  ({ id }) => [COURSE, id]
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

export const useGetUsersProgress = getById<
  PaginationResponse<ICourseUserProgress>,
  { urlParams?: string }
>(
  ({ id, urlParams }) =>
    apiELearning.get(`/course/${id}/user-progress${urlParams ?? ""}`),
  ({ id }) => [COURSE_PROGRESS, id]
);

export const useGetUserProgress = getById<ICourse, { userId: string }>(
  ({ id, userId }) => apiELearning.get(`/course/${id}/user-progress/${userId}`),
  ({ id, userId }) => [`${COURSE_PROGRESS}-detail`, id, userId]
);

export const useGetUserCourses = get<ICourse[]>(
  () => apiELearning.get("/course/user"),
  [USER_COURSES]
);

export const useGetCourseBySlug = getById<ICourse>(
  ({ id }) => apiELearning.get(`/course/slug/${id}`),
  ({ id }) => [COURSE_SLUG, id]
);

export const useUpdateCourseProgress = post<any, ICourseProgressPayload>(
  ({ formValues }) => apiELearning.patch("/course/progress/update", formValues),
  []
);

export const useUpdateLastLesson = post<any, ICourseLastLessonPayload>(
  ({ formValues }) =>
    apiELearning.patch("/course/progress/last-lesson", formValues),
  []
);

export const useGetCourseForum = getById<ICourseForum[]>(
  ({ id }) => apiELearning.get(`/course/forum?slug=${id}`),
  ({ id }) => [COURSE_FORUM, id]
);

export const useSendQuestion = post<any, ICourseForumPayload>(
  ({ formValues }) => apiELearning.post(`/course/forum`, formValues),
  [],
  { successMessage: "Your question has been sent" }
);

export const useGetForumDetail = getById<ICourseForum>(
  ({ id }) => apiELearning.get(`/course/forum/${id}`),
  ({ id }) => [COURSE_FORUM_DETAIL, id]
);

export const useSendQuestionReply = post<any, ICourseForumReplyPayload>(
  ({ formValues }) => apiELearning.post(`/course/forum/reply`, formValues),
  [],
  { successMessage: "Your reply has been sent" }
);

export const useUpdateChapterOrder = patch<any, { ids: string[] }>(
  ({ formValues, id }) =>
    apiELearning.patch(`/course/${id}/chapter/order`, formValues),
  []
);

export const useUpdateLessonOrder = patch<any, { ids: string[] }>(
  ({ formValues, id }) =>
    apiELearning.patch(`/course/[id]/chapter/${id}/lesson/order`, formValues),
  []
);
