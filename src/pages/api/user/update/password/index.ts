import bcrypt from "bcrypt";

import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";
import type { IUpdatePasswordPayload } from "@/modules/user/interfaces";

export default makeHandler((prisma) => ({
  POST: async (req, res) => {
    const userData = decodeToken(req);
    const body = req.body as IUpdatePasswordPayload;

    const user = await prisma.user.findUnique({
      where: { id: userData?.id ?? "" },
    });

    if (!user) {
      return createErrResponse(res, "User not found", 404);
    }

    const isMatch = bcrypt.compareSync(body.oldPassword, user?.password || "");
    if (!isMatch) {
      return createErrResponse(res, "Old password doesn't match", 400);
    }

    const hashedPassword = await bcrypt.hash(body.newPassword, 10);
    const updatedUser = await prisma.user.update({
      data: { password: hashedPassword },
      where: { id: userData?.id ?? "" },
    });

    return createResponse(res, updatedUser);
  },
}));
