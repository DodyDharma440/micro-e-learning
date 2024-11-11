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
  CourseProgress?: [{ isCompleted: boolean }];
}

export interface ICourseChapter extends BasicData {
  name: string;
  order: number;
  courseId: string;
  lessons: ICourseLesson[];
  _count?: {
    lessons: number;
  };
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
  CourseUserLastLesson?: [ICourseLastLesson];
  _count: { chapters?: number; CourseProgress?: number };
}

export interface ICoursePayload
  extends Omit<
    ICourse,
    | keyof BasicData
    | "trainer"
    | "category"
    | "chapters"
    | "slug"
    | "_count"
    | "CourseUserLastLesson"
  > {}
export interface ICourseForm extends ICoursePayload {
  keypointsUi: Array<{ description: string }>;
  enableForumUi: "yes" | "no";
  isTrailer: boolean;
  thumbnailFile: File;
}

export interface ICourseChapterPayload
  extends Omit<ICourseChapter, keyof BasicData | "lessons" | "_count"> {}

export interface ICourseLessonPayload
  extends Omit<ICourseLesson, keyof BasicData | "CourseProgress"> {}

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

export interface ICourseProgress extends BasicData {
  userId: string;
  courseId: string;
  courseLessonId: string;
  isCompleted: boolean;
}

export interface ICourseProgressPayload
  extends Omit<ICourseProgress, keyof BasicData | "userId"> {}

export interface ICourseLastLesson extends BasicData {
  courseLessonId: string;
  courseId: string;
}

export interface ICourseLastLessonPayload {
  lessonId: string;
  courseId: string;
}

export interface ICourseForumReply extends ICourseForum {
  parentId: string;
}

export interface ICourseForum extends BasicData {
  courseId: string;
  userId: string;
  user: IUser;
  content: string;
  _count?: {
    CourseForumReply?: number;
  };
  CourseForumReply?: ICourseForumReply[];
}

export interface ICourseForumPayload {
  courseId: string;
  content: string;
}

export interface ICourseForumReplyPayload extends ICourseForumPayload {
  parentId: string;
}
