import {
  createErrResponse,
  createResponse,
  paginationResponse,
  parseParams,
} from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import type { UserRole } from "@/modules/auth/interfaces";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const courseId = req.query.id as string;
    const course = await prisma.course.findUnique({ where: { id: courseId } });

    const searchFields = ["name", "username"];
    const searchParam = parseParams(req, "search", {
      search: { fields: searchFields },
    });

    if (!course) {
      return createErrResponse(res, "Course not found", 404);
    }

    const findArgs = {
      where: {
        role: "user" as UserRole,
        ...(course.categoryId ? { workPositionId: course.categoryId } : {}),
      },
    };

    const count = await prisma.user.count({
      ...searchParam,
      ...findArgs,
    });
    const users = await prisma.user.findMany({
      ...parseParams(req, "pagination"),
      ...searchParam,
      select: {
        id: true,
        name: true,
        avatar: true,
        role: true,
        workPosition: true,
        workPositionId: true,
        _count: {
          select: {
            CourseProgress: {
              where: {
                isCompleted: true,
                courseId,
                lesson: { deleted: false },
              },
            },
          },
        },
      },
      ...findArgs,
    });

    return createResponse(res, paginationResponse(users, count));
  },
}));
