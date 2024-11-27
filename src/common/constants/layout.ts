import { HiLogout } from "react-icons/hi";
import { HiRectangleGroup, HiTv, HiUser, HiUserGroup } from "react-icons/hi2";

import type { ISidebarItem } from "../interfaces/layout";

export const adminPaths = [
  "/admin/dashboard",
  "/admin/courses",
  "/admin/courses/create",
  "/admin/courses/[id]/detail",
  "/admin/courses/[id]/lessons",
  "/admin/courses/[id]/edit",
  "/admin/courses/[id]/forum",
  "/admin/courses/[id]/progress",
  "/admin/courses/[id]/forum/[question_id]",
  "/admin/user-management",
  "/admin/edit-profile",
];
export const adminMenu: ISidebarItem[] = [
  { label: "Dashboard", path: "/admin/dashboard", icon: HiRectangleGroup },
  {
    label: "Courses",
    path: "/admin/courses",
    icon: HiTv,
    pathnames: [
      "/admin/courses/create",
      "/admin/courses/[id]/detail",
      "/admin/courses/[id]/lessons",
      "/admin/courses/[id]/edit",
      "/admin/courses/[id]/forum",
      "/admin/courses/[id]/progress",
      "/admin/courses/[id]/forum/[question_id]",
    ],
  },
  {
    label: "User Management",
    path: "/admin/user-management",
    icon: HiUserGroup,
  },
  { label: "Edit Profile", path: "/admin/edit-profile", icon: HiUser },
  { label: "Logout", path: "/logout", icon: HiLogout },
];

export const userPaths = [
  "/user/courses",
  "/user/courses/[slug]",
  "/user/courses/[slug]/forums",
  "/user/courses/[slug]/forums/[id]",
  "/user/edit-profile",
];

export const trainerPaths = [
  "/trainer/courses",
  "/trainer/courses/create",
  "/trainer/courses/[id]/detail",
  "/trainer/courses/[id]/lessons",
  "/trainer/courses/[id]/edit",
  "/trainer/courses/[id]/forum",
  "/trainer/courses/[id]/progress",
  "/trainer/courses/[id]/forum/[question_id]",
  "/trainer/edit-profile",
];
