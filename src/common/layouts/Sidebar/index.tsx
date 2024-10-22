import React from "react";
import { HiMoon, HiSun } from "react-icons/hi2";

import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

import { Avatar, Card, cn, Divider, Switch } from "@nextui-org/react";

import { adminMenu } from "@/common/constants/layout";
import { useUserProfile } from "@/modules/auth/hooks";

const Sidebar = () => {
  const { pathname } = useRouter();
  const { theme, setTheme } = useTheme();

  const { userData } = useUserProfile();

  return (
    <div className="fixed top-0 bottom-0 py-8">
      <Card className="w-[280px] h-full p-8 bg-opacity-20 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-md bg-white bg-opacity-30"></div>
          <h1 className="font-semibold text-xl">E-Learning</h1>
        </div>

        <Divider className="my-5" />

        <div className="flex flex-col h-full">
          <div className="-mx-2 flex flex-col gap-4 flex-1">
            {adminMenu.map(({ icon: Icon, label, path, pathnames }, index) => {
              const isActive =
                path === pathname || pathnames?.includes(pathname);

              return (
                <Link href={path} key={index}>
                  <div
                    className={cn(
                      "flex items-center p-2 rounded-md gap-3 hover:bg-black hover:bg-opacity-5 hover:dark:bg-opacity-40",
                      {
                        ["bg-black bg-opacity-10 dark:bg-opacity-20 hover:bg-opacity-25"]:
                          isActive,
                      }
                    )}
                  >
                    <div className="w-9 h-9 rounded-md bg-primary-400 dark:bg-primary-400 flex items-center justify-center text-white">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="font-medium">{label}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mb-4 flex justify-center">
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
          </div>

          <Card className="p-4" isBlurred>
            <div className="flex items-center gap-3">
              <Avatar name="John" />
              <div>
                <p className="mb-[2px] font-bold text-sm">{userData?.name}</p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 capitalize">
                  {userData?.role}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default Sidebar;
