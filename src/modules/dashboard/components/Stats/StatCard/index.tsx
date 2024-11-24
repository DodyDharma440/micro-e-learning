import React from "react";
import type { IconType } from "react-icons";

import { Card, cn } from "@nextui-org/react";

type StatColor = "blue" | "green" | "yellow" | "purple";
const colors: Record<StatColor, string> = {
  blue: "bg-blue-500 dark:bg-blue-700",
  green: "bg-green-500 dark:bg-green-700",
  yellow: "bg-yellow-400 dark:bg-yellow-600",
  purple: "bg-purple-500 dark:bg-purple-700",
};

type StatCardProps = {
  icon: IconType;
  label: React.ReactNode;
  value: string | number;
  color: StatColor;
  action?: React.ReactNode;
};

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  color,
  action,
}) => {
  return (
    <Card
      className={cn(
        "w-full p-5 text-white relative overflow-hidden",
        colors[color]
      )}
    >
      <div className="bg-white/20 rounded-full w-[150px] h-[150px] absolute -bottom-1/2 -left-10"></div>
      <div className="bg-white/20 rounded-full w-[130px] h-[130px] absolute -bottom-2/4 left-10"></div>

      <div className="flex flex-col justify-between relative z-20 min-h-[120px] ">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-black/20">
            <Icon className="text-white" size={18} />
          </div>
          <div>
            <p className="text-lg font-bold">{label}</p>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
        </div>
        {action}
      </div>
    </Card>
  );
};

export default StatCard;
