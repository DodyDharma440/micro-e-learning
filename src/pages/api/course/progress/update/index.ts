import { createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";
import type { ICourseProgressPayload } from "@/modules/course/interfaces";

export default makeHandler((prisma) => ({
  PATCH: async (req, res) => {
    const userData = decodeToken(req);
    const payload = req.body as ICourseProgressPayload;
    const { ...values } = payload;

    const progress = await prisma.courseProgress.upsert({
      where: { courseLessonId: values.courseLessonId },
      update: {
        ...values,
        userId: userData?.id ?? "",
      },
      create: {
        ...values,
        userId: userData?.id ?? "",
      },
    });

    return createResponse(res, progress);
  },
}));
