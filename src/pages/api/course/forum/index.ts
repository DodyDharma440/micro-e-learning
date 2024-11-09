import { createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";
import type { ICourseForumPayload } from "@/modules/course/interfaces";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const courseId = req.query.courseId as string | undefined;
    const slug = req.query.slug as string | undefined;

    const forums = await prisma.courseForum.findMany({
      where: {
        ...(courseId ? { courseId } : {}),
        ...(slug ? { course: { slug } } : {}),
      },
      include: {
        user: true,
        _count: {
          select: {
            CourseForumReply: true,
          },
        },
      },
    });

    return createResponse(res, forums);
  },
  POST: async (req, res) => {
    const userData = decodeToken(req);
    const body = req.body as ICourseForumPayload;

    const createdQuestion = await prisma.courseForum.create({
      data: {
        userId: userData?.id ?? "",
        courseId: body.courseId,
        content: body.content,
      },
    });

    return createResponse(res, createdQuestion, 201);
  },
}));
