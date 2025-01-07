import type { BasicData } from "@/common/interfaces/api";

export interface IWorkPosition extends BasicData {
  name: string;
}

export interface IWorkPositionPayload extends Pick<IWorkPosition, "name"> {}
