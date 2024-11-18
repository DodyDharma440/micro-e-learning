import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";
import type { IUserPayload } from "@/modules/user-management/interfaces";

const handler = makeHandler((prisma) => ({
  PATCH: async (req, res) => {
    const body = req.body as Omit<IUserPayload, "password">;
    const id = req.query["id"] as string;

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      createErrResponse(res, { message: "User not found" }, 404);
      return;
    }

    const { username } = body;
    const usernameExist = await prisma.user.findUnique({
      where: { username },
    });

    if (usernameExist && usernameExist.id !== id) {
      createErrResponse(res, "Username already exists", 400);
      return;
    }

    const petugas = await prisma.user.update({
      data: {
        ...body,
        updatedAt: new Date().toISOString(),
      },
      where: { id },
    });

    createResponse(res, petugas);
  },
  DELETE: async (req, res) => {
    const userData = decodeToken(req);
    const id = req.query.id as string;

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      createErrResponse(res, "User not found", 404);
      return;
    }

    if (userData?.id === user.id) {
      createErrResponse(res, "Can't delete yourself.", 400);
      return;
    }

    const hasCourse = await prisma.course.count({ where: { trainerId: id } });

    if (hasCourse) {
      createErrResponse(
        res,
        "Can't delete. This user already as a trainer in some course",
        400
      );
      return;
    }

    await prisma.$transaction([
      prisma.courseForum.deleteMany({ where: { userId: id } }),
      prisma.courseForumReply.deleteMany({ where: { userId: id } }),
      prisma.user.delete({ where: { id: user.id } }),
    ]);

    createResponse(res, "Success");
  },
}));

export default handler;
