import { createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";
import type { ICourseLastLessonPayload } from "@/modules/course/interfaces";

export default makeHandler((prisma) => ({
  PATCH: async (req, res) => {
    const userData = decodeToken(req);
    const payload = req.body as ICourseLastLessonPayload;

    const progress = await prisma.courseUserLastLesson.upsert({
      where: {
        userId: userData?.id,
        courseId: payload.courseId,
      },
      update: {
        courseId: payload.courseId,
        courseLessonId: payload.lessonId,
        userId: userData?.id ?? "",
      },
      create: {
        courseId: payload.courseId,
        courseLessonId: payload.lessonId,
        userId: userData?.id ?? "",
      },
    });

    return createResponse(res, progress);
  },
}));
