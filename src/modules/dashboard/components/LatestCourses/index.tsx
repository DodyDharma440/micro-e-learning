import React from "react";
import { HiDotsVertical } from "react-icons/hi";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import { EmptyPlaceholder, Loader } from "@/common/components";

import { useGetLatestCourses } from "../../actions";

const LatestCourses = () => {
  const { push } = useRouter();

  const { data, isLoading, error } = useGetLatestCourses();
  const courses = data?.data.data || [];

  return (
    <Card isBlurred className="p-4 w-full">
      <Loader isLoading={isLoading} error={error}>
        <h4 className="font-bold text-lg">Latest Courses</h4>
        <hr className="my-2 dark:border-neutral-700" />
        {courses.length ? (
          <>
            {courses.map((course) => {
              return (
                <div
                  className="flex items-center gap-4 py-3 border-b border-b-gray-200 dark:border-b-neutral-800"
                  key={course.id}
                >
                  <div className="w-[80px] h-[50px] bg-black/5 rounded-lg relative overflow-hidden">
                    <Image
                      src={course.thumbnailUrl}
                      alt="thumb"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="mb-1 font-semibold line-clamp-1">
                      {course.name}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-400 line-clamp-1">
                      Created for {course.category?.name ?? "all"}
                    </p>
                  </div>
                  <div>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly variant="light">
                          <HiDotsVertical />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Course actions">
                        <DropdownItem
                          key="edit"
                          onClick={() =>
                            push(`/admin/courses/${course.id}/edit`)
                          }
                        >
                          Edit
                        </DropdownItem>
                        <DropdownItem
                          key="lesson"
                          onClick={() =>
                            push(`/admin/courses/${course.id}/lessons`)
                          }
                        >
                          Lessons
                        </DropdownItem>
                        {course.enableForum ? (
                          <DropdownItem
                            key="forum"
                            onClick={() =>
                              push(`/admin/courses/${course.id}/forum`)
                            }
                          >
                            Forum
                          </DropdownItem>
                        ) : (
                          <></>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              );
            })}
            {courses.length > 10 ? (
              <Button
                as={Link}
                href="/admin/courses"
                variant="light"
                className="mt-4"
                color="primary"
              >
                See all
              </Button>
            ) : null}
          </>
        ) : (
          <EmptyPlaceholder message="No courses yet" />
        )}
      </Loader>
    </Card>
  );
};

export default LatestCourses;
