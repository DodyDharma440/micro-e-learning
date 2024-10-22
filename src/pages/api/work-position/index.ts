import { createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const workPositions = await prisma.workPosition.findMany();
    return createResponse(res, workPositions);
  },
}));
