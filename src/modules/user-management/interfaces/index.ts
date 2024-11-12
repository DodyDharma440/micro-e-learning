import type { IUser } from "@/modules/auth/interfaces";

export interface IUserPayload
  extends Pick<
    IUser,
    "name" | "password" | "role" | "username" | "workPositionId"
  > {}
