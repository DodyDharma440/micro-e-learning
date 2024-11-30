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
      where: { slug, status: "published" },
      include: {
        trainer: true,
        category: true,
        chapters: {
          where: { deleted: false },
          orderBy: { order: "asc" },
          include: {
            lessons: {
              orderBy: { order: "asc" },
              where: {
                deleted: false,
              },
              include: {
                CourseProgress:
                  user?.role === "user"
                    ? {
                        select: { isCompleted: true },
                        where: { userId: userData?.id },
                      }
                    : false,
              },
            },
          },
        },
        CourseUserLastLesson:
          user?.role === "user"
            ? { where: { userId: userData?.id, course: { slug } } }
            : false,
        _count: {
          select: {
            CourseProgress: {
              where: {
                isCompleted: true,
                userId: userData?.id,
                lesson: { deleted: false },
              },
            },
          },
        },
      },
    });

    if (!course) {
      return createErrResponse(res, "Course not found", 404);
    }

    if (
      user?.role === "user" &&
      course.categoryId &&
      course?.categoryId !== user.workPositionId
    ) {
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
