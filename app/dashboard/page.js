"use client";

import React from "react";
import { useProtectedRoute } from "@utils/protectedRoutes.js";

const page = () => {
  const { session, renderLoader } = useProtectedRoute();

  if (!session) {
    return renderLoader();
  }

  return <div>
    <h1 className="text-4xl h-cover navbar-pad">Dashboardddd</h1>
    </div>;
};

export default page;
