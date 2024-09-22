import React from "react";

import LoginForm from "../LoginForm";

const AuthContainer = () => {
  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div className="col-span-5 flex items-center justify-center">
        <LoginForm />
      </div>
      <div className="col-span-7 bg-gray-200 dark:bg-black"></div>
    </div>
  );
};

export default AuthContainer;
