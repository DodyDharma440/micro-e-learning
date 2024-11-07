import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";
import type { IEditProfilePayload } from "@/modules/user/interfaces";

export default makeHandler((prisma) => ({
  POST: async (req, res) => {
    const userData = decodeToken(req);
    const body = req.body as IEditProfilePayload;
    // const user = await prisma.user.findUnique({
    //   where: { id: userData?.id ?? "" },
    // });

    if (body.username) {
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
    }

    const updatedUser = await prisma.user.update({
      data: body as any,
      where: { id: userData?.id ?? "" },
    });

    // const avatarData = user?.avatar as unknown as IFileData;
    // if (
    //   avatarData.fileId &&
    //   body.avatar?.fileId &&
    //   avatarData.fileId !== body.avatar.fileId
    // ) {
    //   await axios.delete(
    //     `https://api.imagekit.io/v1/files/${avatarData.fileId}`,
    //     {
    //       headers: {
    //         Authorization: `Basic ${Buffer.from(
    //           process.env.IMAGEKIT_PRIVATE_KEY!
    //         ).toString("base64")}`,
    //       },
    //     }
    //   );
    // }

    return createResponse(res, updatedUser);
  },
}));
