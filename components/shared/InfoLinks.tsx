import React from "react";
import { InfoLink } from "types";
import Section from "components/Layout/Section";

type Props = { links?: InfoLink[] };

export default function InfoLinks({ links }: Props) {
  if (!links || links.length === 0) return null;

  return (
    <Section title="links">
      {links.map((link) => (
        <p key={link.url}>
          <a
            href={link.url}
            className="text-blue-600 hover:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.text} ➔
          </a>
          {link.desc && ` - ${link.desc}`}
        </p>
      ))}
    </Section>
  );
}
