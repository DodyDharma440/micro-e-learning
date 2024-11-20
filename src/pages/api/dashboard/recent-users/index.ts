import { createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    });

    return createResponse(res, users);
  },
}));
