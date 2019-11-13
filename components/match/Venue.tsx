import Section from "components/layout/Section";

interface Props {
  match: {
    venue?: {
      name: string;
    };
  };
}

export default ({ match }: Props) => {
  if (!match.venue) {
    return null;
  }

  const { name } = match.venue;

  return <Section title="Venue">{name}</Section>;
};
