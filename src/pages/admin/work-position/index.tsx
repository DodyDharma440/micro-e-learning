import React from "react";

import Head from "next/head";

import { withAuth } from "@/common/hocs";
import { WorkPositionContainer } from "@/modules/work-position/components";

const WorkPositionPage = () => {
  return (
    <>
      <Head>
        <title>Work Position - E-Learning</title>
      </Head>

      <WorkPositionContainer />
    </>
  );
};

export default withAuth(WorkPositionPage, "superadmin");
