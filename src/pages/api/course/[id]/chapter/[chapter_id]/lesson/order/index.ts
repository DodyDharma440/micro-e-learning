import { createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";

export default makeHandler((prisma) => ({
  PATCH: async (req, res) => {
    const body = req.body.ids as string[];
    const chapterId = req.query.chapter_id as string;

    const updated = await prisma.$transaction(
      body.map((id, index) =>
        prisma.courseLesson.update({
          where: { id, chapterId },
          data: { order: index + 1 },
        })
      )
    );

    return createResponse(res, updated);
  },
}));
