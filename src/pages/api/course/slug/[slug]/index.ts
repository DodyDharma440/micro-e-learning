import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const userData = decodeToken(req);
    const user = await prisma.user.findUnique({
      where: { id: userData?.id },
    });

    const slug = req.query.slug as string;

    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        chapters: {
          where: { deleted: false },
          include: { lessons: { where: { deleted: false } } },
        },
        CourseProgress: user?.role === "user",
      },
    });

    if (user?.role === "user" && course?.categoryId !== user.workPositionId) {
      return createErrResponse(
        res,
        "You are not allowed to access this course",
        400
      );
    }

    if (user?.role === "trainer" && course?.trainerId !== user.id) {
      return createErrResponse(
        res,
        "You are not allowed to access this course",
        400
      );
    }

    return createResponse(res, course);
  },
}));
