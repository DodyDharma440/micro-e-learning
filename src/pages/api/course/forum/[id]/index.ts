import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import type { ICourseForumPayload } from "@/modules/course/interfaces";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const id = req.query.id as string;
    const question = await prisma.courseForum.findUnique({
      where: { id },
      include: {
        user: true,
        CourseForumReply: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!question) {
      return createErrResponse(res, "Question not found", 404);
    }

    return createResponse(res, question);
  },
  PATCH: async (req, res) => {
    const id = req.query.id as string;
    const question = await prisma.courseForum.findUnique({
      where: { id },
    });

    if (!question) {
      return createErrResponse(res, "Question not found", 404);
    }

    const body = req.body as ICourseForumPayload;
    const updated = await prisma.courseForum.update({
      where: { id },
      data: {
        ...body,
      },
    });

    return createResponse(res, updated);
  },
  DELETE: async (req, res) => {
    const id = req.query.id as string;
    const question = await prisma.courseForum.findUnique({
      where: { id },
    });

    if (!question) {
      return createErrResponse(res, "Question not found", 404);
    }

    await prisma.courseForum.delete({ where: { id } });

    return createResponse(res, "Question deleted");
  },
}));
