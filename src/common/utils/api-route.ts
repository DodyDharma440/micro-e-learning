import type { NextApiRequest, NextApiResponse } from "next";

import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

import { createErrResponse } from "./api-response";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

prisma.$use(async (params, next) => {
  const modelsSoftDelete: Prisma.ModelName[] = ["Course"];

  if (params.model && modelsSoftDelete.includes(params.model)) {
    if (params.action == "delete") {
      params.action = "update";
      params.args["data"] = { deleted: true };
    }
    if (params.action == "deleteMany") {
      params.action = "updateMany";
      if (params.args.data != undefined) {
        params.args.data["deleted"] = true;
      } else {
        params.args["data"] = { deleted: true };
      }
    }
  }
  return next(params);
});

type NextApiHandler = Partial<
  Record<
    HttpMethod,
    (req: NextApiRequest, res: NextApiResponse) => Promise<void>
  >
>;

export const makeHandler = (
  methodsHandler: (prisma: PrismaClient) => NextApiHandler
) => {
  const handlers = methodsHandler(prisma);
  const availableMethods = Object.keys(handlers);

  const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method) {
      if (availableMethods.includes(req.method)) {
        try {
          await handlers[req.method as HttpMethod]?.(req, res);
        } catch (error: any) {
          // eslint-disable-next-line
          console.log("Error API routes handler", error);
          createErrResponse(
            res,
            { ...error, message: error?.message.split("\n") },
            500
          );
        }
      } else {
        return createErrResponse(res, "Method not allowed", 405);
      }
    } else {
      createErrResponse(res, "Internal server error", 500);
      return;
    }
  };

  return handler;
};

export const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  middleware: any
) => {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};
