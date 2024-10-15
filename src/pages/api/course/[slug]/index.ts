import { createResponse } from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";

export default makeHandler((prisma) => ({
  GET: async (req, res) => {
    const slug = req.query.slug as string;
    const course = await prisma.course.findUnique({ where: { slug } });
    return createResponse(res, course);
  },
}));
