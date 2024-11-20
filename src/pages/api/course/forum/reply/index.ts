import { createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";
import type { ICourseForumReplyPayload } from "@/modules/course/interfaces";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const parentId = req.query.parentId as string | undefined;

    const forums = await prisma.courseForumReply.findMany({
      where: { parentId },
      include: { user: true },
    });

    return createResponse(res, forums);
  },
  POST: async (req, res) => {
    const userData = decodeToken(req);
    const body = req.body as ICourseForumReplyPayload;

    const [createdQuestion] = await prisma.$transaction([
      prisma.courseForumReply.create({
        data: {
          userId: userData?.id ?? "",
          ...body,
        },
      }),
      prisma.courseForumReply.update({
        where: { id: body.parentId },
        data: {
          updatedAt: new Date(),
        },
      }),
    ]);

    return createResponse(res, createdQuestion, 201);
  },
}));
