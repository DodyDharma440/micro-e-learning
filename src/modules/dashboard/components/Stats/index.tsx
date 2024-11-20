import React from "react";

import StatCard from "./StatCard";

const Stats = () => {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-3">
        <StatCard />
      </div>
      <div className="col-span-3">
        <StatCard />
      </div>
      <div className="col-span-3">
        <StatCard />
      </div>
      <div className="col-span-3">
        <StatCard />
      </div>
    </div>
  );
};

export default Stats;
