import { createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const courses = await prisma.course.findMany({
      where: { deleted: false, status: "published" },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    });

    return createResponse(res, courses);
  },
}));
