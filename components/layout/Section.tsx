import { FunctionComponent } from "react";

interface Props {
  title?: string;
}

const Section: FunctionComponent<Props> = ({ title, children }) => {
  return (
    <div className="mb-4">
      {title && <h2 className="mb-4 font-semibold uppercase">{title}</h2>}
      <div>{children}</div>
    </div>
  );
};

export default Section;
