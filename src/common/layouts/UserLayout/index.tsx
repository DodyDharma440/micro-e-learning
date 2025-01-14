import React from "react";
import { HiMoon, HiSun } from "react-icons/hi2";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  Switch,
} from "@nextui-org/react";

import { useUserContext } from "@/common/contexts";

type UserLayoutProps = {
  children: React.ReactNode;
  isTrainer?: boolean;
};

const UserLayout: React.FC<UserLayoutProps> = ({ children, isTrainer }) => {
  const { push } = useRouter();
  const { theme, setTheme } = useTheme();
  const { userData } = useUserContext();

  return (
    <div className="relative overflow-hidden min-h-screen">
      <div className="w-screen h-[700px] rounded-full blur-[500px] bg-primary-500 opacity-30 absolute -bottom-1/2 -right-1/2 z-10" />
      <div className="w-screen h-[600px] rounded-full blur-[500px] bg-secondary-500 opacity-40 absolute -top-1/3 -left-1/2 z-10" />

      <div className="container max-w-[1200px] mx-auto relative z-20">
        <div className="px-4 sticky top-4">
          <Navbar
            classNames={{
              base: "border my-4 border-gray-300 dark:border-gray-600 rounded-xl",
              wrapper: "max-w-full",
            }}
          >
            <NavbarBrand>
              <Link href={isTrainer ? "/trainer/course" : "/user/courses"}>
                <div className="h-6 w-[68px] relative overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
            </NavbarBrand>

            <NavbarContent as="div" justify="end">
              <Switch
                isSelected={
                  typeof window !== "undefined" ? theme === "dark" : false
                }
                defaultSelected
                size="sm"
                onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
                color="default"
                startContent={<HiSun />}
                endContent={<HiMoon />}
              >
                Dark mode
              </Switch>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="primary"
                    name={userData?.name}
                    src={userData?.avatar?.url}
                    size="sm"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{userData?.name}</p>
                  </DropdownItem>
                  <DropdownItem
                    key="settings"
                    onClick={() =>
                      push(
                        userData?.role === "trainer"
                          ? "/trainer/edit-profile"
                          : "/user/edit-profile"
                      )
                    }
                  >
                    Edit Profile
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onClick={() => push("/logout")}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
          </Navbar>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default UserLayout;
