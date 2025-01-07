import type { BasicData, IFileData } from "@/common/interfaces/api";
import type { IWorkPosition } from "@/modules/work-position/interfaces";

export type UserRole = "superadmin" | "trainer" | "user";

export interface IUser extends BasicData {
  name: string;
  username: string;
  password: string;
  role: UserRole;
  workPositionId: string;
  workPosition: IWorkPosition;
  avatar: IFileData | null;
}

export interface ILoginInput extends Pick<IUser, "username" | "password"> {
  isRemember?: boolean;
}
