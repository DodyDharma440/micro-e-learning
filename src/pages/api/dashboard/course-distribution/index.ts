import { createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const grouped = await prisma.course.groupBy({
      by: ["categoryId"],
      _count: {
        _all: true,
      },
    });

    return createResponse(res, grouped);
  },
}));
