import type { IFileData } from "@/common/interfaces/api";

export interface IEditProfilePayload
  extends Partial<{
    avatar: IFileData;
    name: string;
    username: string;
  }> {}

export interface IUpdatePasswordPayload {
  oldPassword: string;
  newPassword: string;
}
