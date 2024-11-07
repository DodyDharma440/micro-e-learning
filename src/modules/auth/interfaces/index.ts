import type { BasicData } from "@/common/interfaces/api";

export type UserRole = "superadmin" | "trainer" | "user";

export interface IUser extends BasicData {
  name: string;
  username: string;
  password: string;
  role: UserRole;
  avatarUrl: string | null;
}

export interface ILoginInput extends Pick<IUser, "username" | "password"> {
  isRemember?: boolean;
}
