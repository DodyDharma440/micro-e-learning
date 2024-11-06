import { createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const userData = decodeToken(req);
    const user = await prisma.user.findUnique({
      where: {
        id: userData?.id,
      },
    });

    const courses = await prisma.course.findMany({
      include: {
        category: true,
        trainer: true,
        chapters: {
          select: {
            _count: {
              select: {
                lessons: { where: { deleted: false } },
              },
            },
          },
        },
        _count: {
          select: {
            CourseProgress: {
              where: { isCompleted: true },
            },
          },
        },
      },
      where: {
        AND: [
          { deleted: false },
          { categoryId: user?.workPositionId, status: "published" },
        ],
      },
    });
    return createResponse(res, courses);
  },
}));
