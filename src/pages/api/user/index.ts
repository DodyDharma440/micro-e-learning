import { createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import type { UserRole } from "@/modules/auth/interfaces";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const role = req.query.role as UserRole;

    const users = await prisma.user.findMany({
      where: {
        ...(role ? { role } : {}),
      },
    });

    return createResponse(res, users);
  },
}));
