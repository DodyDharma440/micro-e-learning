import dayjs from "dayjs";

import { createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const userData = decodeToken(req);

    const totalUsers = await prisma.user.count();
    const activeCourse = await prisma.course.count({
      where: { status: "published", deleted: false },
    });
    const draftCourse = await prisma.course.count({
      where: { status: "draft", deleted: false, createdBy: userData?.id },
    });
    const activeForums = await prisma.course.count({
      where: {
        status: "published",
        deleted: false,
        CourseForum: {
          some: {
            updatedAt: {
              gte: dayjs().add(-1, "month").toDate(),
            },
          },
        },
      },
    });

    return createResponse(res, {
      totalUsers,
      activeCourse,
      draftCourse,
      activeForums,
    });
  },
}));
