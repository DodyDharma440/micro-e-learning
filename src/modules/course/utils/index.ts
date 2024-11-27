import type { ICourse } from "../interfaces";

export const calcProgress = (course?: ICourse, count?: number) => {
  const totalLesson = course?.chapters?.reduce((prev, curr) => {
    prev += curr._count?.lessons ?? curr.lessons?.length ?? 0;
    return prev;
  }, 0);

  const result =
    (100 * (count ?? course?._count.CourseProgress ?? 0)) / (totalLesson || 1);
  return result.toFixed(0);
};
