import bcrypt from "bcrypt";

import {
  createErrResponse,
  createResponse,
  paginationResponse,
  parseParams,
} from "@/common/utils/api-response";
import { makeHandler } from "@/common/utils/api-route";
import type { IUserPayload } from "@/modules/user-management/interfaces";

const SALT = 10;

const handler = makeHandler((prisma) => ({
  GET: async (req, res) => {
    const searchFields = ["name", "username"];
    const searchParam = parseParams(req, "search", {
      search: { fields: searchFields },
    });

    const count = await prisma.user.count(searchParam);

    const results = await prisma.user.findMany({
      ...parseParams(req, "pagination"),
      ...searchParam,
      select: {
        id: true,
        name: true,
        avatar: true,
        role: true,
        username: true,
        workPositionId: true,
        workPosition: true,
      },
    });

    createResponse(res, paginationResponse(results, count));
  },
  POST: async (req, res) => {
    const body = req.body as IUserPayload;

    const { username, password } = body;
    const usernameExist = await prisma.user.findUnique({
      where: { username },
    });

    if (usernameExist) {
      createErrResponse(res, "Username already exists", 400);
      return;
    }

    const hashedPassword = await bcrypt.hash(password || "", SALT);
    const petugas = await prisma.user.create({
      data: {
        ...body,
        password: hashedPassword,
      },
    });

    createResponse(res, petugas, 201);
  },
}));

export default handler;
