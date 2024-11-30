import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const userData = decodeToken(req);

    const courseId = req.query.id as string;
    const userId = req.query.user_id as string;

    const course = await prisma.course.findUnique({
      where: { id: courseId, status: "published" },
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
                CourseProgress: {
                  select: { isCompleted: true },
                  where: { userId: userId },
                },
              },
            },
          },
        },
        CourseUserLastLesson: {
          where: { userId: userId, course: { id: courseId } },
        },
        _count: {
          select: {
            CourseProgress: {
              where: {
                isCompleted: true,
                userId: userId,
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

    if (userData?.role === "user") {
      return createErrResponse(
        res,
        "You are not allowed to access this user progress",
        400
      );
    }

    if (userData?.role === "trainer") {
      if (userData.id !== course.trainerId) {
        return createErrResponse(
          res,
          "You are not allowed to access this user progress",
          400
        );
      }
    }

    return createResponse(res, course);
  },
}));
