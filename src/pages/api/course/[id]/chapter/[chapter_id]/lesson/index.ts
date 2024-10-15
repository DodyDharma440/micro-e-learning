import { createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import type { ICourseLessonPayload } from "@/modules/course/interfaces";

export default makeHandler((prisma) => ({
  POST: async (req, res) => {
    const payload = req.body as ICourseLessonPayload;

    const createdChapter = await prisma.courseLesson.create({
      data: payload,
    });
    return createResponse(res, createdChapter, 201);
  },
}));
