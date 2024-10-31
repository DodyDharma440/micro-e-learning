import { createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";
import type { ICourseProgressPayload } from "@/modules/course/interfaces";

export default makeHandler((prisma) => ({
  POST: async (req, res) => {
    const userData = decodeToken(req);
    const payload = req.body as ICourseProgressPayload;
    const { id, ...values } = payload;

    const progress = await prisma.courseProgress.upsert({
      where: { id: id, courseLessonId: values.courseLessonId },
      update: {},
      create: {
        ...values,
        userId: userData?.id ?? "",
      },
    });

    return createResponse(res, progress);
  },
}));
