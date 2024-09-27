import { apiELearning } from "@/common/configs/api";
import { post } from "@/common/utils/react-query";

import type { ILoginInput } from "../interfaces";

export const useLogin = post<{ token: string }, ILoginInput>(
  ({ formValues }) => apiELearning.post("/auth/login", formValues),
  [],
  { successMessage: "Berhasil login" }
);
