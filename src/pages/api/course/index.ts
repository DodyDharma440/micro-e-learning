import {
  createResponse,
  paginationResponse,
  parseParams,
} from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import { randStr } from "@/common/utils/helper";
import type { ICoursePayload } from "@/modules/course/interfaces";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const searchFields = ["name"];
    const searchParam = parseParams(req, "search", {
      search: { fields: searchFields },
    });

    const count = await prisma.course.count({
      ...searchParam,
      where: { deleted: false },
    });

    const results = await prisma.course.findMany({
      ...parseParams(req, "pagination"),
      ...searchParam,
      include: {
        category: true,
        trainer: true,
        _count: {
          select: { chapters: { where: { deleted: false } } },
        },
      },
      where: { deleted: false },
    });

    createResponse(res, paginationResponse(results, count));
  },
  POST: async (req, res) => {
    const payload = req.body as ICoursePayload;
    let slug = payload.name.toLowerCase().split(" ").join("-");
    const existedCourse = await prisma.course.findUnique({ where: { slug } });

    if (existedCourse) {
      slug = `${slug}-${randStr(5)}`;
    }

    const createdCourse = await prisma.course.create({
      data: { ...payload, slug },
    });

    return createResponse(res, createdCourse, 201);
  },
}));
