import type { IChapterForm } from "../interfaces";

export const COURSES = "courses";

export const defaultChapter: IChapterForm = {
  lessons: [],
  name: "",
  order: 0,
  courseId: "",
};
