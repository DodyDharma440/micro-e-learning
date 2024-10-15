import { createErrResponse, createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { randStr } from "@/common/utils/helper";
import type { ICoursePayload } from "@/modules/course/interfaces";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const id = req.query.id as string;
    const course = await prisma.course.findUnique({ where: { id } });
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
    const isNameChanged = existedCourse?.name !== payload.name;

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
