import { FunctionComponent } from "react";
import Header from "./Header";

interface Props {
  title?: string;
}

const Section: FunctionComponent<Props> = ({ title, children }) => {
  return (
    <div className="mb-4">
      {title && <Header text={title} />}
      <div>{children}</div>
    </div>
  );
};

export default Section;
