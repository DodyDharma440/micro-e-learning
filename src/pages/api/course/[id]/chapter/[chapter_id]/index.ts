import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import type { ICourseChapterPayload } from "@/modules/course/interfaces";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const chapterId = req.query.chapter_id as string;
    const chapter = await prisma.courseChapter.findUnique({
      where: { id: chapterId },
    });
    if (!chapter) {
      return createErrResponse(res, "Chapter not found", 404);
    }

    return createResponse(res, chapter);
  },
  PATCH: async (req, res) => {
    const chapterId = req.query.chapter_id as string;
    const chapter = await prisma.courseChapter.findUnique({
      where: { id: chapterId },
    });
    if (!chapter) {
      return createErrResponse(res, "Chapter not found", 404);
    }

    const payload = req.body as Partial<ICourseChapterPayload>;

    const updatedChapter = await prisma.courseChapter.update({
      data: payload,
      where: { id: chapterId },
    });
    return createResponse(res, updatedChapter);
  },
  DELETE: async (req, res) => {
    const chapterId = req.query.chapter_id as string;
    const chapter = await prisma.courseChapter.findUnique({
      where: { id: chapterId },
    });
    if (!chapter) {
      return createErrResponse(res, "Chapter not found", 404);
    }

    await prisma.courseChapter.delete({ where: { id: chapterId } });
    return createResponse(res, true);
  },
}));
