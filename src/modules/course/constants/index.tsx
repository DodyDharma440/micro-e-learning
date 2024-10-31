import type { IChapterForm } from "../interfaces";

export const COURSES = "courses";
export const COURSE = "course";
export const COURSE_SLUG = "course-slug";
export const USER_COURSES = "user-courses";

export const defaultChapter: IChapterForm = {
  lessons: [],
  name: "",
  order: 0,
  courseId: "",
};
