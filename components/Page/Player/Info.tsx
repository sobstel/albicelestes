import Section from "../../Layout/Section";

export default function Info({ info }: { info: PlayerInfo }) {
  return (
    <>
      {info.nicknames && (
        <Section title="Nickname(s)">{info.nicknames.join(", ")}</Section>
      )}
      {info.links && (
        <Section title="links">
          {info.links.map((link) => (
            <p key={link.url}>
              <a
                href={link.url}
                className="text-blue-600 hover:text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.text}
              </a>{" "}
              {link.desc && ` - ${link.desc}`}
            </p>
          ))}
        </Section>
      )}
    </>
  );
}
