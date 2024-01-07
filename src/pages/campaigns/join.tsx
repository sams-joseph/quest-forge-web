import React, { type ReactElement } from "react";
import MainLayout from "@/components/MainLayout";

const Join = () => {
  return <div>join</div>;
};

Join.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Join;
