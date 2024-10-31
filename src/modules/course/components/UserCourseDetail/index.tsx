import React from "react";

import type { ICourse } from "../../interfaces";

type UserCourseDetailProps = {
  course?: ICourse;
};

const UserCourseDetail: React.FC<UserCourseDetailProps> = ({}) => {
  return <div>UserCourseDetail</div>;
};

export default UserCourseDetail;
