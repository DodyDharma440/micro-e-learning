import type { BasicData } from "@/common/interfaces/api";

export interface IWorkPosition extends BasicData {
  name: string;
}

export interface IEditProfilePayload
  extends Partial<{
    avatarUrl: string;
    name: string;
    username: string;
  }> {}
