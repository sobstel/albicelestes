import React from "react";
import ErrorPage from "./_error";

export default function NotFoundPage() {
  return <ErrorPage statusCode={404} />;
}
