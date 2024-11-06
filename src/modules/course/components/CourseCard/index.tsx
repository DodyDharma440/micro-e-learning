import React, { useEffect, useMemo, useState } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useDisclosure } from "@mantine/hooks";
import type { ChipProps } from "@nextui-org/react";
import { Button, Card, Chip, Divider, Progress } from "@nextui-org/react";
import type { CourseStatus } from "@prisma/client";

import { AlertDialog } from "@/common/components";

import { useUpdateCourse } from "../../actions";
import type { ICourse } from "../../interfaces";

type CourseCardProps = {
  course: ICourse;
  onDelete?: (val: string) => void;
  isReadOnly?: boolean;
  withProgress?: boolean;
};

const statusActionLabel: Record<CourseStatus, string> = {
  draft: "Publish",
  published: "Archive",
  archive: "Unarchive",
};

const statusActionColor: Record<CourseStatus, ChipProps["color"]> = {
  draft: "default",
  published: "success",
  archive: "danger",
};

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onDelete,
  isReadOnly,
  withProgress,
}) => {
  const { push } = useRouter();

  const [status, setStatus] = useState(course.status);
  const [alertMessage, setAlertMessage] = useState("");

  const [isOpen, { open, close }] = useDisclosure();

  const { mutate: updateCourse, isPending: isLoadingUpdate } =
    useUpdateCourse();

  const handleChangeStatus = () => {
    const handleUpdate = (nextStatus: CourseStatus) => {
      updateCourse(
        { formValues: { status: nextStatus }, id: course.id },
        {
          onSuccess: () => {
            setStatus(nextStatus);
            close();
          },
        }
      );
    };

    switch (status) {
      case "draft":
        handleUpdate("published");
        break;
      case "published":
        handleUpdate("archive");
        break;
      case "archive":
        handleUpdate("published");
        break;
    }
  };

  const handleSetMessage = () => {
    open();
    switch (status) {
      case "draft":
        setAlertMessage("Are you sure you want to publish this course?");
        break;
      case "published":
        setAlertMessage("Are you sure you want to archive this course?");
        break;
      case "archive":
        setAlertMessage("Are you sure you want to unarchive this course?");
        break;
    }
  };

  const totalProgress = useMemo(() => {
    const totalLesson = course.chapters.reduce((prev, curr) => {
      prev += curr._count?.lessons ?? 0;
      return prev;
    }, 0);
    const result = (100 * (course?._count.CourseProgress ?? 0)) / totalLesson;
    return result.toFixed(0);
  }, [course?._count.CourseProgress, course.chapters]);

  useEffect(() => {
    setStatus(course.status);
  }, [course.status]);

  return (
    <Card isBlurred>
      <div className="h-[200px] relative overflow-hidden bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-5">
        <Image
          src={course.thumbnailUrl}
          alt="thumb"
          fill
          className="object-cover"
        />
        {!isReadOnly ? (
          <>
            <div className="flex items-center gap-2 absolute top-2 right-2">
              {course.enableForum ? (
                <Link href={`/course/${course.slug}/forum`}>
                  <Button isIconOnly>
                    <HiOutlineChatBubbleLeft />
                  </Button>
                </Link>
              ) : null}
              <Button
                isIconOnly
                color="primary"
                onClick={() => push(`/admin/courses/${course.id}/edit`)}
              >
                <HiOutlinePencil />
              </Button>
              <Button
                isIconOnly
                color="danger"
                onClick={() => onDelete?.(course.id)}
              >
                <HiOutlineTrash />
              </Button>
            </div>
            <div className="absolute bottom-2 right-2">
              <Chip
                className="capitalize px-3"
                color={statusActionColor[status]}
              >
                {status}
              </Chip>
            </div>
          </>
        ) : null}
      </div>
      <div className="p-4">
        <p className="text-xl font-bold line-clamp-2 mb-2">{course.name}</p>
        <p className="text-xs text-opacity-80">
          {course._count.chapters} Chapters
        </p>
        {!isReadOnly ? (
          <div className="mt-3">
            <div className="flex gap-2 [&>button]:w-full">
              <Button
                onClick={() => push(`/admin/courses/${course.id}/lessons`)}
              >
                Lessons
              </Button>
              <Button color="primary" onClick={handleSetMessage}>
                {statusActionLabel[status]}
              </Button>
            </div>
          </div>
        ) : null}

        {withProgress ? (
          <>
            <Divider className="my-4" />
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Progress</p>
                <p className="font-bold">{totalProgress}%</p>
              </div>
              <Progress
                aria-label="course progress"
                size="md"
                value={Number(totalProgress)}
                color="success"
              />
            </div>
          </>
        ) : null}
      </div>

      {!isReadOnly ? (
        <AlertDialog
          isOpen={isOpen}
          onClose={isLoadingUpdate ? () => {} : close}
          title="Change Status"
          message={alertMessage}
          cancelButtonText="Cancel"
          confirmButtonText="Confirm"
          onCancel={isLoadingUpdate ? () => {} : close}
          onConfirm={handleChangeStatus}
          color="primary"
          confirmButtonProps={{ isLoading: isLoadingUpdate }}
        />
      ) : null}
    </Card>
  );
};

export default CourseCard;
