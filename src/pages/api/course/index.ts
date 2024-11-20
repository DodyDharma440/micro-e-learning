import {
  createResponse,
  paginationResponse,
  parseParams,
} from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { decodeToken } from "@/common/utils/auth";
import { randStr } from "@/common/utils/helper";
import type { ICoursePayload } from "@/modules/course/interfaces";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const userData = decodeToken(req);

    const searchFields = ["name"];
    const searchParam = parseParams(req, "search", {
      search: { fields: searchFields },
    });

    const count = await prisma.course.count({
      where: {
        ...(searchParam as any).where,
        deleted: false,
        ...(userData?.role === "trainer" ? { trainerId: userData.id } : {}),
      },
    });

    const results = await prisma.course.findMany({
      ...parseParams(req, "pagination"),
      include: {
        category: true,
        trainer: true,
        _count: {
          select: { chapters: { where: { deleted: false } } },
        },
      },
      where: {
        ...(searchParam as any).where,
        deleted: false,
        ...(userData?.role === "trainer" ? { trainerId: userData.id } : {}),
      },
    });

    createResponse(res, paginationResponse(results, count));
  },
  POST: async (req, res) => {
    const userData = decodeToken(req);
    const payload = req.body as ICoursePayload;
    let slug = payload.name.toLowerCase().split(" ").join("-");
    const existedCourse = await prisma.course.findUnique({ where: { slug } });

    if (existedCourse) {
      slug = `${slug}-${randStr(5)}`;
    }

    const createdCourse = await prisma.course.create({
      data: {
        ...payload,
        createdBy: userData?.id,
        slug,
      },
    });

    return createResponse(res, createdCourse, 201);
  },
}));
