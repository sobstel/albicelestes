import React from "react";
import { MAX_YEAR } from "config";
import Page, { Props } from "components/Page/Matches";

export default function PageContainer(props: Props) {
  return <Page {...props} year={MAX_YEAR.toString()} />;
}
