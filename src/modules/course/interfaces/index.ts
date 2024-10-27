import type { CourseLessonType, CourseStatus } from "@prisma/client";

import type { BasicData } from "@/common/interfaces/api";
import type { IUser } from "@/modules/auth/interfaces";
import type { IWorkPosition } from "@/modules/user/interfaces";

export interface ICourseLesson extends BasicData {
  name: string;
  order: number;
  lessonType: CourseLessonType;
  contentUrl: string;
  chapterId: string;
}

export interface ICourseChapter extends BasicData {
  name: string;
  order: number;
  courseId: string;
  lessons: ICourseLesson[];
}

export interface ICourse extends BasicData {
  name: string;
  slug: string;
  description: string | null;
  thumbnailUrl: string;
  trailerUrl: string | null;
  hideTrailer: boolean;
  trainerId: string;
  trainer: IUser;
  categoryId: string;
  category: IWorkPosition;
  keypoints: string[];
  enableForum: boolean;
  chapters: ICourseChapter[];
  status: CourseStatus;
  _count: { chapters: number };
}

export interface ICoursePayload
  extends Omit<
    ICourse,
    keyof BasicData | "trainer" | "category" | "chapters" | "slug" | "_count"
  > {}
export interface ICourseForm extends ICoursePayload {
  keypointsUi: Array<{ description: string }>;
  enableForumUi: "yes" | "no";
  isTrailer: boolean;
  thumbnailFile: File;
}

export interface ICourseChapterPayload
  extends Omit<ICourseChapter, keyof BasicData | "lessons"> {}

export interface ICourseLessonPayload
  extends Omit<ICourseLesson, keyof BasicData> {}

export interface IChapterForm extends ICourseChapterPayload {
  lessons: ICourseLessonPayload[];
}

export interface IChapterLessonsForm {
  chapters: IChapterForm[];
}

export interface ICourseLessonForm extends ICourseLessonPayload {
  documentFile?: File | null;
  youtubeUrl?: string;
}
