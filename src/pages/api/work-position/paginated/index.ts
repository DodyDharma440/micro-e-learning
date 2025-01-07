import {
  createResponse,
  paginationResponse,
  parseParams,
} from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const searchFields = ["name"];
    const searchParam = parseParams(req, "search", {
      search: { fields: searchFields },
    });

    const count = await prisma.workPosition.count(searchParam);

    const results = await prisma.workPosition.findMany({
      ...parseParams(req, "pagination"),
      ...searchParam,
      where: {
        ...(searchParam as any).where,
        deleted: false,
      },
    });

    createResponse(res, paginationResponse(results, count));
  },
}));
