import type { IUser } from "@/modules/auth/interfaces";

export interface IUserPayload
  extends Pick<IUser, "name" | "role" | "username" | "workPositionId"> {
  password?: string;
  confirmPassword?: string;
}
