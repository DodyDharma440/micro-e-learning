import { createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const courses = await prisma.course.findMany({
      where: { deleted: false, status: "published" },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
      take: 11,
    });

    return createResponse(res, courses);
  },
}));
