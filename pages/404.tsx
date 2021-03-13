import React from "react";
import ErrorPage from "pages/_error";

export default function NotFoundPage() {
  return <ErrorPage statusCode={404} />;
}
