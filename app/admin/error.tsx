"use client";

import UserErrorHandler from "@/errors/ErrorHandler";

const error = () => {
  return <UserErrorHandler path="/admin"/>;
};

export default error;
