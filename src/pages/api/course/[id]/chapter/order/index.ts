import { createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";

export default makeHandler((prisma) => ({
  PATCH: async (req, res) => {
    const body = req.body as string[];
    const courseId = req.query.id as string;

    const updated = await prisma.$transaction(
      body.map((id, index) =>
        prisma.courseChapter.update({
          where: { id, courseId },
          data: { order: index + 1 },
        })
      )
    );

    return createResponse(res, updated);
  },
}));
