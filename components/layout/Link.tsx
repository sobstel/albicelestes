import Link from "next/link";

interface Props {
  href: string;
  as: string;
  important?: boolean;
  children?: any;
}

export default (props: Props) => {
  const classNames = ["text-blue-600", "hover:text-blue-400"];

  if (props.important) {
    classNames.push("font-bold");
  }

  return (
    <Link href={props.href} as={props.as}>
      <a className={classNames.join(" ")}>{props.children}</a>
    </Link>
  );
};
