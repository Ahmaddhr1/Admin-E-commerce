"use client";

import React from "react";
import { useProtectedRoute } from "@utils/protectedRoutes.js";

const page = () => {
  const { session, renderLoader } = useProtectedRoute();

  if (!session) {
    return renderLoader();
  }

  return <div>{session ? <div>
    
  </div> : null}</div>;
};

export default page;
