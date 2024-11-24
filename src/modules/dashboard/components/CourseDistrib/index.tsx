import React, { useMemo } from "react";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

import { Card } from "@nextui-org/react";
import type { ApexOptions } from "apexcharts";

import { Loader } from "@/common/components";

import { useGetCourseDistrib } from "../../actions";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const CourseDistrib = () => {
  const { data, isLoading, error } = useGetCourseDistrib();
  const disribution = data?.data.data;
  const { theme } = useTheme();

  const chartData = useMemo(() => {
    const options: ApexOptions = {
      chart: {
        type: "pie",
        foreColor: theme === "dark" ? "white" : "black",
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -20,
          },
        },
      },
      labels: Object.values(disribution ?? {}).map((d) => d.name),
      tooltip: {
        theme,
      },
      legend: {
        position: "bottom",
      },
      stroke: {
        width: 0,
      },
    };

    return {
      options,
      series: Object.values(disribution ?? {}).map((d) => d.count),
    };
  }, [disribution, theme]);

  return (
    <Card isBlurred className="p-4 w-full">
      <Loader isLoading={isLoading} error={error}>
        <h4 className="font-bold text-lg">Course Distribution</h4>
        <hr className="my-2 dark:border-neutral-700" />

        <ApexChart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          height="250"
        />
      </Loader>
    </Card>
  );
};

export default CourseDistrib;
