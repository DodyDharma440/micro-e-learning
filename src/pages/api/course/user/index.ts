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
        _count: {
          select: {
            chapters: {
              where: { deleted: false },
            },
          },
        },
      },
      where: {
        deleted: false,
        categoryId: user?.workPositionId,
      },
    });
    return createResponse(res, courses);
  },
}));
