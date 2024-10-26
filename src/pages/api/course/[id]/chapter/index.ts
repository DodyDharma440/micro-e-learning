import { createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import type { ICourseChapterPayload } from "@/modules/course/interfaces";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const courseId = req.query.id as string;
    const chapters = await prisma.courseChapter.findMany({
      where: { courseId },
    });
    return createResponse(res, chapters);
  },
  POST: async (req, res) => {
    const payload = req.body as ICourseChapterPayload;

    const createdChapter = await prisma.courseChapter.create({
      data: {
        ...payload,
        courseId: req.query.id as string,
      },
    });
    return createResponse(res, createdChapter, 201);
  },
}));
