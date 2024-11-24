import { apiELearning } from "@/common/configs/api";
import { get } from "@/common/utils/react-query";

import { DASHBOARD_STATS } from "../constants";
import type { IDashboardStats } from "../interfaces";

export const useGetStats = get<IDashboardStats>(
  () => apiELearning.get("/dashboard/stats"),
  [DASHBOARD_STATS]
);
