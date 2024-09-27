import React from "react";
import { HiMoon, HiSun } from "react-icons/hi2";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

import LoginForm from "../LoginForm";

const Switch = dynamic(
  () => import("@nextui-org/react").then((m) => m.Switch),
  { ssr: false }
);

const AuthContainer = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div className="col-span-5 flex items-center justify-center flex-col">
        <div className="w-full flex justify-end p-5">
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
        <div className="flex-1 flex items-center justify-center w-full">
          <LoginForm />
        </div>
      </div>
      <div className="col-span-7 bg-gray-200 dark:bg-black"></div>
    </div>
  );
};

export default AuthContainer;
