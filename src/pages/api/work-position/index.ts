import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import type { IWorkPositionPayload } from "@/modules/work-position/interfaces";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const workPositions = await prisma.workPosition.findMany({
      where: { deleted: false },
    });
    return createResponse(res, workPositions);
  },
  POST: async (req, res) => {
    const body = req.body as IWorkPositionPayload;

    const { name } = body;
    const nameExist = await prisma.workPosition.findUnique({
      where: { name },
    });

    if (nameExist) {
      if (nameExist.deleted === false) {
        createErrResponse(res, "Work position name already exists", 400);
        return;
      }

      if (nameExist.deleted === true) {
        const updated = await prisma.workPosition.update({
          data: { deleted: false },
          where: { id: nameExist.id },
        });
        createResponse(res, updated, 201);
        return;
      }
    }

    const workPos = await prisma.workPosition.create({
      data: body,
    });

    return createResponse(res, workPos, 201);
  },
}));
