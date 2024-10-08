import { HiLogout } from "react-icons/hi";
import { HiRectangleGroup, HiTv, HiUser, HiUserGroup } from "react-icons/hi2";

import type { ISidebarItem } from "../interfaces/layout";

export const adminPaths = [
  "/admin/dashboard",
  "/admin/courses",
  "/admin/user-management",
  "/admin/edit-profile",
];
export const adminMenu: ISidebarItem[] = [
  { label: "Dashboard", path: "/admin/dashboard", icon: HiRectangleGroup },
  { label: "Courses", path: "/admin/courses", icon: HiTv },
  {
    label: "User Management",
    path: "/admin/user-management",
    icon: HiUserGroup,
  },
  { label: "Edit Profile", path: "/admin/edit-profile", icon: HiUser },
  { label: "Logout", path: "/auth/logout", icon: HiLogout },
];

export const userPaths = ["/my-courses", "/edit-profile"];
