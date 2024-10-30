import type { UserRole } from "@/modules/auth/interfaces";

export const USERS_TRAINER = "users-trainer";
export const USER_WORK_POSITIONS = "user-work-positions";

export const redirectDest: Record<UserRole, string> = {
  superadmin: "/admin/dashboard",
  trainer: "/trainer/courses",
  user: "/user/courses",
};
