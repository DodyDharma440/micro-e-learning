import React from "react";
import {
  HiAcademicCap,
  HiArchiveBox,
  HiChatBubbleLeft,
  HiUserGroup,
} from "react-icons/hi2";

import Link from "next/link";

import { Loader } from "@/common/components";
import { compactNumber } from "@/common/utils/number-format";

import { useGetStats } from "../../actions";
import StatCard from "../StatCard";

const Stats = () => {
  const { data, isLoading, error } = useGetStats();
  const statsData = data?.data.data;

  return (
    <Loader isLoading={isLoading} error={error} placeholderHeight="100px">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-3">
          <StatCard
            color="blue"
            label="Active Course"
            icon={HiAcademicCap}
            value={compactNumber(statsData?.activeCourse)}
            action={
              <Link href="/admin/courses/create" className="w-fit ml-auto">
                <p className="text-sm text-gray-200 font-bold">+ Add course</p>
              </Link>
            }
          />
        </div>
        <div className="col-span-3">
          <StatCard
            color="green"
            label="Total Users"
            icon={HiUserGroup}
            value={compactNumber(statsData?.totalUsers)}
            action={
              <Link href="/admin/user-management" className="w-fit ml-auto">
                <p className="text-sm text-gray-200 font-bold">+ Add user</p>
              </Link>
            }
          />
        </div>
        <div className="col-span-3">
          <StatCard
            color="yellow"
            label="Draft Course"
            icon={HiArchiveBox}
            value={compactNumber(statsData?.draftCourse)}
          />
        </div>
        <div className="col-span-3">
          <StatCard
            color="purple"
            label="Active Forums"
            icon={HiChatBubbleLeft}
            value={compactNumber(statsData?.activeForums)}
          />
        </div>
      </div>
    </Loader>
  );
};

export default Stats;
