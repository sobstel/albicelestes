type Props = {
  names?: string[];
};

export default function Competitions({ names }: Props) {
  if (!names || names.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className="mb-4 font-semibold uppercase">Competitions</h2>
      <p className="mb-4">{names.join(", ")}</p>
    </>
  );
}
