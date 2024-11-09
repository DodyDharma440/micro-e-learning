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
  "/user/edit-profile",
];
