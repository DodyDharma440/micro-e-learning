import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import type { ICourseLessonPayload } from "@/modules/course/interfaces";

export default makeHandler((prisma) => ({
  PATCH: async (req, res) => {
    const lessonId = req.query.lesson_id as string;
    const lesson = await prisma.courseLesson.findUnique({
      where: { id: lessonId },
    });
    if (!lesson) {
      return createErrResponse(res, "Lesson not found", 404);
    }

    const payload = req.body as ICourseLessonPayload;

    const updatedlesson = await prisma.courseLesson.create({
      data: payload,
    });
    return createResponse(res, updatedlesson);
  },
  DELETE: async (req, res) => {
    const lessonId = req.query.lesson_id as string;
    const lesson = await prisma.courseLesson.findUnique({
      where: { id: lessonId },
    });
    if (!lesson) {
      return createErrResponse(res, "Lesson not found", 404);
    }

    await prisma.courseLesson.delete({ where: { id: lessonId } });
    return createResponse(res, true);
  },
}));
