import { apiELearning } from "@/common/configs/api";
import { get } from "@/common/utils/react-query";
import type { IUser } from "@/modules/auth/interfaces";
import type { ICourse } from "@/modules/course/interfaces";

import {
  COURSE_DISTRIBUTION,
  DASHBOARD_STATS,
  LATEST_COURSES,
  RECENT_USERS,
} from "../constants";
import type { IDashboardStats } from "../interfaces";

export const useGetStats = get<IDashboardStats>(
  () => apiELearning.get("/dashboard/stats"),
  [DASHBOARD_STATS]
);

export const useGetLatestCourses = get<ICourse[]>(
  () => apiELearning.get("/dashboard/latest-courses"),
  [LATEST_COURSES]
);

export const useGetRecentUsers = get<IUser[]>(
  () => apiELearning.get("/dashboard/recent-users"),
  [RECENT_USERS]
);

export const useGetCourseDistrib = get<any>(
  () => apiELearning.get("/dashboard/course-distribution"),
  [COURSE_DISTRIBUTION]
);
