import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

import Image from "next/image";
import Link from "next/link";

import type { ChipProps } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import type { CourseStatus } from "@prisma/client";

import type { TableActionArgs } from "@/common/interfaces/layout";
import { createTableColumns } from "@/common/utils/react-table";

import type { ICourse, ICourseUserProgress } from "../interfaces";
import { type IChapterForm } from "../interfaces";
import { calcProgress } from "../utils";

export const COURSES = "courses";
export const COURSE = "course";
export const COURSE_PROGRESS = "course-progress";

export const COURSE_SLUG = "course-slug";
export const COURSE_FORUM = "course-forum";
export const COURSE_FORUM_DETAIL = "course-forum-detail";

export const USER_COURSES = "user-courses";

export const defaultChapter: IChapterForm = {
  lessons: [],
  name: "",
  order: 0,
  courseId: "",
};

const statusActionLabel: Record<CourseStatus, string> = {
  draft: "Publish",
  published: "Archive",
  archive: "Unarchive",
};

export const statusActionColor: Record<CourseStatus, ChipProps["color"]> = {
  draft: "default",
  published: "success",
  archive: "danger",
};

export const courseColumns = ({
  onEdit,
  onDelete,
  onStatus,
  isTrainer,
}: TableActionArgs<ICourse> & {
  onStatus: (d: ICourse) => void;
  isTrainer: boolean;
}) =>
  createTableColumns<ICourse>(({ accessor }) => [
    accessor("name", { header: "Name" }),
    accessor((row) => row.thumbnail?.url, {
      header: "Thumbnail",
      justifyHeader: "center",
      id: "thumbnail",
      cell: ({ row: { original } }) => {
        return (
          <div className="w-[100px] h-[70px] rounded-md bg-white/10 mx-auto relative overflow-hidden">
            {original.thumbnail?.url ? (
              <Image
                src={original.thumbnail?.url}
                alt="thumb"
                fill
                className="object-cover"
              />
            ) : null}
          </div>
        );
      },
    }),
    accessor("status", { header: "Status" }),
    accessor((r) => r.category?.name ?? "General", {
      header: "Category",
      id: "category",
    }),
    accessor("enableForum", {
      header: "Forums",
      justifyHeader: "center",
      cell: function Cell({ row: { original } }) {
        return (
          <div className="mx-auto">
            {original.enableForum ? (
              <Button
                as={Link}
                href={`/${isTrainer ? "trainer" : "admin"}/courses/${
                  original.id
                }/forum`}
                color="secondary"
                size="sm"
              >
                View
              </Button>
            ) : (
              "Disabled"
            )}
          </div>
        );
      },
    }),
    accessor(() => "", {
      header: "Lessons",
      id: "lesson",
      justifyHeader: "center",
      cell: function Cell({ row: { original } }) {
        return (
          <div className="mx-auto">
            <Button
              as={Link}
              href={`/${isTrainer ? "trainer" : "admin"}/courses/${
                original.id
              }/lessons`}
              size="sm"
              color="primary"
            >
              View
            </Button>
          </div>
        );
      },
    }),
    accessor(() => "", {
      header: "Progress",
      id: "progress",
      justifyHeader: "center",
      cell: function Cell({ row: { original } }) {
        return (
          <div className="mx-auto">
            <Button
              as={Link}
              href={`/${isTrainer ? "trainer" : "admin"}/courses/${
                original.id
              }/progress`}
              size="sm"
            >
              View
            </Button>
          </div>
        );
      },
    }),
    {
      header: "Action",
      justifyHeader: "center",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2 justify-center w-full">
            <Button isIconOnly onClick={() => onEdit(row.original)}>
              <HiOutlinePencil />
            </Button>
            <Button
              color="danger"
              isIconOnly
              onClick={() => onDelete(row.original.id)}
            >
              <HiOutlineTrash />
            </Button>
            <Button
              color={row.original.status === "draft" ? "success" : "primary"}
              onClick={() => onStatus(row.original)}
            >
              {statusActionLabel[row.original.status]}
            </Button>
          </div>
        );
      },
    },
  ]);

export const userProgressColumns = ({ course }: { course?: ICourse }) =>
  createTableColumns<ICourseUserProgress>(({ accessor }) => [
    accessor("name", {
      header: "Name",
    }),
    accessor((row) => `${calcProgress(course, row._count.CourseProgress)}%`, {
      header: "Progress",
      id: "progress",
    }),
  ]);
