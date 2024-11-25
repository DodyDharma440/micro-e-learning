import { createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";
import type { ICourseLastLessonPayload } from "@/modules/course/interfaces";

export default makeHandler((prisma) => ({
  PATCH: async (req, res) => {
    const userData = decodeToken(req);
    const payload = req.body as ICourseLastLessonPayload;

    const currentProgress = await prisma.courseUserLastLesson.findFirst({
      where: {
        userId: userData?.id,
        courseId: payload.courseId,
        id: payload.id,
      },
    });

    if (currentProgress) {
      const progress = await prisma.courseUserLastLesson.update({
        where: {
          userId: userData?.id,
          courseId: payload.courseId,
          id: payload.id,
        },
        data: {
          courseId: payload.courseId,
          courseLessonId: payload.lessonId,
          userId: userData?.id ?? "",
        },
      });
      return createResponse(res, progress);
    }

    const progress = await prisma.courseUserLastLesson.create({
      data: {
        courseId: payload.courseId,
        courseLessonId: payload.lessonId,
        userId: userData?.id ?? "",
      },
    });

    return createResponse(res, progress);
  },
}));
