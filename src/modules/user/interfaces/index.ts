import type { BasicData, IFileData } from "@/common/interfaces/api";

export interface IWorkPosition extends BasicData {
  name: string;
}

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
