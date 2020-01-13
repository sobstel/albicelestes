import Link from "next/link";

interface Props {
  href: string;
  as: string;
  important?: boolean;
  children?: any;
  title?: any;
}

export default (props: Props) => {
  const classNames = ["text-blue-600", "hover:text-blue-400"];

  if (props.important) {
    classNames.push("font-bold");
  }

  let anchorProps: any = {};
  if (props.title) {
    anchorProps.title = props.title;
  }

  return (
    <Link href={props.href} as={props.as}>
      <a className={classNames.join(" ")} {...anchorProps}>
        {props.children}
      </a>
    </Link>
  );
};
