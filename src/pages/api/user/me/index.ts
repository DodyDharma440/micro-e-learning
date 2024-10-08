import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";

const handler = makeHandler((prisma) => ({
  GET: async (req, res) => {
    const userData = decodeToken(req);

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userData?.id,
        },
      });

      if (!user) {
        createErrResponse(res, "User not found", 404);
        return;
      }

      createResponse(res, user);
    } catch (error) {
      createErrResponse(res, error);
    }
  },
}));

export default handler;
