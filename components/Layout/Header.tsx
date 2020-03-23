type Props = { text: string };

export default function Header({ text }: Props) {
  return <h2 className="mb-4 font-semibold uppercase">{text}</h2>;
}
