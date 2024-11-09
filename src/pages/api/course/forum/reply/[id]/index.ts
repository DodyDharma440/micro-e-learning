import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import type { ICourseForumReplyPayload } from "@/modules/course/interfaces";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const id = req.query.id as string;
    const question = await prisma.courseForumReply.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!question) {
      return createErrResponse(res, "Reply not found", 404);
    }

    return createResponse(res, question);
  },
  PATCH: async (req, res) => {
    const id = req.query.id as string;
    const question = await prisma.courseForumReply.findUnique({
      where: { id },
    });

    if (!question) {
      return createErrResponse(res, "Reply not found", 404);
    }

    const body = req.body as ICourseForumReplyPayload;
    const updated = await prisma.courseForumReply.update({
      where: { id },
      data: {
        ...body,
      },
    });

    return createResponse(res, updated);
  },
  DELETE: async (req, res) => {
    const id = req.query.id as string;
    const question = await prisma.courseForumReply.findUnique({
      where: { id },
    });

    if (!question) {
      return createErrResponse(res, "Reply not found", 404);
    }

    await prisma.courseForumReply.delete({ where: { id } });

    return createResponse(res, "Reply deleted");
  },
}));
