import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

import Image from "next/image";
import Link from "next/link";

import type { ChipProps } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import type { CourseStatus } from "@prisma/client";

import type { TableActionArgs } from "@/common/interfaces/layout";
import { createTableColumns } from "@/common/utils/react-table";

import type { ICourse } from "../interfaces";
import { type IChapterForm } from "../interfaces";

export const COURSES = "courses";
export const COURSE = "course";
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
}: TableActionArgs<ICourse> & { onStatus: (d: ICourse) => void }) =>
  createTableColumns<ICourse>(({ accessor }) => [
    accessor("name", { header: "Name" }),
    accessor("thumbnailUrl", {
      header: "Thumbnail",
      justifyHeader: "center",
      cell: ({ row: { original } }) => {
        return (
          <div className="w-[100px] h-[70px] rounded-md bg-white/10 mx-auto relative overflow-hidden">
            <Image
              src={original.thumbnailUrl}
              alt="thumb"
              fill
              className="object-cover"
            />
          </div>
        );
      },
    }),
    accessor("status", { header: "Status" }),
    accessor("category.name", {
      header: "Category",
    }),
    accessor("enableForum", {
      header: "Forums",
      justifyHeader: "center",
      cell: function Cell({ row: { original } }) {
        return (
          <div className="mx-auto">
            {original.enableForum ? (
              <Link href={`/admin/courses/${original.id}/forum`}>
                <Button color="secondary" size="sm">
                  View
                </Button>
              </Link>
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
            <Link href={`/admin/courses/${original.id}/lessons`}>
              <Button size="sm" color="primary">
                View
              </Button>
            </Link>
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
            <Button color="primary" onClick={() => onStatus(row.original)}>
              {statusActionLabel[row.original.status]}
            </Button>
          </div>
        );
      },
    },
  ]);
