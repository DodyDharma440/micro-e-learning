import { createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import type { ICourseDistribution } from "@/modules/dashboard/interfaces";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const grouped = await prisma.course.groupBy({
      by: ["categoryId"],
      where: { deleted: false },
      _count: {
        _all: true,
      },
    });

    const categories = await prisma.workPosition.findMany();
    const data = grouped.reduce((prev: ICourseDistribution, curr) => {
      const category = categories.find((c) => c.id === curr.categoryId);
      prev[curr.categoryId ?? "all"] = {
        name: category?.name ?? "General",
        count: curr._count._all,
      };
      return prev;
    }, {});

    return createResponse(res, data);
  },
}));
