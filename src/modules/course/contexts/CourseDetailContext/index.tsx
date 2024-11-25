import { createContext, useContext, useEffect, useState } from "react";

import { useDidUpdate } from "@mantine/hooks";

import { useUpdateLastLesson } from "../../actions";
import type { ICourse } from "../../interfaces";

export type CourseDetailCtx = {
  course?: ICourse;
  setCourse: React.Dispatch<React.SetStateAction<ICourse | undefined>>;
  activeLesson: string | null;
  setActiveLesson: React.Dispatch<React.SetStateAction<string | null>>;
};

export const CourseDetailContext = createContext<CourseDetailCtx>({
  activeLesson: null,
  setActiveLesson: () => {},
  setCourse: () => {},
});

type CourseDetailProviderProps = {
  course?: ICourse;
  children: React.ReactNode;
};

export const CourseDetailProvider: React.FC<CourseDetailProviderProps> = ({
  course: initialCourse,
  children,
}) => {
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [progressId, setProgressId] = useState<string>();
  const [course, setCourse] = useState(initialCourse);

  const { mutate: updateLastLesson } = useUpdateLastLesson();

  useEffect(() => {
    setCourse(initialCourse);
  }, [initialCourse]);

  useEffect(() => {
    if (initialCourse) {
      const lastLessonId =
        initialCourse.CourseUserLastLesson?.[0]?.courseLessonId;
      setActiveLesson(lastLessonId ?? null);
      setProgressId(initialCourse.CourseUserLastLesson?.[0]?.id);
    }
  }, [initialCourse]);

  useDidUpdate(() => {
    if (course && activeLesson)
      updateLastLesson({
        formValues: {
          courseId: course?.id,
          lessonId: activeLesson,
          id: progressId,
        },
      });
  }, [activeLesson, progressId, course]);

  return (
    <CourseDetailContext.Provider
      value={{
        course,
        setCourse,
        activeLesson,
        setActiveLesson,
      }}
    >
      {children}
    </CourseDetailContext.Provider>
  );
};

export const useCourseDetail = () => useContext(CourseDetailContext);
