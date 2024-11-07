import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";
import type { IEditProfilePayload } from "@/modules/user/interfaces";

export default makeHandler((prisma) => ({
  POST: async (req, res) => {
    const userData = decodeToken(req);
    const body = req.body as IEditProfilePayload;

    const usernameExist = await prisma.user.findUnique({
      where: {
        username: body.username,
        NOT: {
          id: userData?.id,
        },
      },
    });

    if (usernameExist) {
      return createErrResponse(res, "Username already exists", 400);
    }

    const user = await prisma.user.update({
      data: body,
      where: { id: userData?.id ?? "" },
    });

    return createResponse(res, user);
  },
}));
