import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";
import { randStr } from "@/common/utils/helper";
import type { ICoursePayload } from "@/modules/course/interfaces";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const userData = decodeToken(req);
    const user = await prisma.user.findUnique({
      where: { id: userData?.id },
    });

    const id = req.query.id as string;

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        chapters: {
          where: { deleted: false },
          orderBy: { order: "asc" },
          include: {
            lessons: {
              where: { deleted: false },
              orderBy: { order: "asc" },
            },
          },
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
  PATCH: async (req, res) => {
    const courseId = req.query.id as string;

    const existedCourse = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!existedCourse) {
      createErrResponse(res, "Course not found", 404);
      return;
    }

    const payload = req.body as ICoursePayload;
    const isNameChanged = payload.name && existedCourse?.name !== payload.name;

    let slug = existedCourse?.slug;
    if (isNameChanged) {
      const existedCourseBySlug = await prisma.course.findUnique({
        where: { slug },
      });
      if (existedCourseBySlug) {
        slug = `${slug}-${randStr(5)}`;
      }
    }

    const updatedCourse = await prisma.course.update({
      data: { ...payload, slug: slug ?? "" },
      where: { id: courseId },
    });

    return createResponse(res, updatedCourse);
  },
  DELETE: async (req, res) => {
    const courseId = req.query.id as string;
    const existedCourse = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!existedCourse) {
      createErrResponse(res, "Course not found", 404);
      return;
    }

    await prisma.course.delete({ where: { id: courseId } });

    return createResponse(res, true);
  },
}));
