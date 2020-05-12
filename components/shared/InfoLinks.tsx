import React from "react";
import { InfoLink } from "types";
import Section from "components/Layout/Section";
import ExternalLink from "components/Layout/ExternalLink";

type Props = { links?: InfoLink[] };

export default function InfoLinks({ links }: Props) {
  if (!links || links.length === 0) return null;

  return (
    <Section title="links">
      {links.map((link) => (
        <p key={link.url}>
          <ExternalLink href={link.url}>{link.text}</ExternalLink>
          {link.desc && ` - ${link.desc}`}
        </p>
      ))}
    </Section>
  );
}
