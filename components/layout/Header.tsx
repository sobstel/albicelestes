type Props = { text: string };

export default ({ text }: Props) => {
  return <h2 className="mb-4 font-semibold uppercase">{text}</h2>;
};
