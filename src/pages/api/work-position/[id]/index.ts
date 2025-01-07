import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import type { IWorkPositionPayload } from "@/modules/work-position/interfaces";

export default makeHandler((prisma) => ({
  PATCH: async (req, res) => {
    const body = req.body as IWorkPositionPayload;
    const id = req.query["id"] as string;

    const existedWorkPos = await prisma.workPosition.findUnique({
      where: { id },
    });

    if (!existedWorkPos) {
      createErrResponse(res, { message: "Work position not found" }, 404);
      return;
    }

    const { name } = body;
    const nameExist = await prisma.workPosition.findUnique({
      where: { name },
    });

    if (nameExist && nameExist.id !== id) {
      if (nameExist.deleted === false) {
        createErrResponse(res, "Work position name already exists", 400);
        return;
      }

      if (nameExist.deleted === true) {
        const updated = await prisma.workPosition.update({
          data: { deleted: false },
          where: { id: nameExist.id },
        });
        createResponse(res, updated);
        return;
      }
    }

    const workPos = await prisma.workPosition.update({
      data: body,
      where: { id },
    });

    return createResponse(res, workPos);
  },
  DELETE: async (req, res) => {
    const id = req.query["id"] as string;

    const existedWorkPos = await prisma.workPosition.findUnique({
      where: { id },
    });

    if (!existedWorkPos) {
      createErrResponse(res, { message: "Work position not found" }, 404);
      return;
    }

    await prisma.workPosition.delete({ where: { id } });

    return createResponse(res, true);
  },
}));
