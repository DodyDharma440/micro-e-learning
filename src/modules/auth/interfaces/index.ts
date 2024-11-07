import type { BasicData, IFileData } from "@/common/interfaces/api";

export type UserRole = "superadmin" | "trainer" | "user";

export interface IUser extends BasicData {
  name: string;
  username: string;
  password: string;
  role: UserRole;
  avatar: IFileData | null;
}

export interface ILoginInput extends Pick<IUser, "username" | "password"> {
  isRemember?: boolean;
}
