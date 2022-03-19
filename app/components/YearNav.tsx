import * as R from "remeda";
import React, { Fragment } from "react";
import { Block, LinkAnchor } from "~/components/layout";

export default function YearNav({ activeYear }: { activeYear?: number }) {
  const items = R.map(R.range(0, 13), (n) => {
    const year = n * 10 + 1900;
    return {
      id: String(year),
      href: `/${year}`,
      text: String(year),
    };
  });

  return (
    <Block isNav hasBottomSeparator>
      <div className="w-full font-semibold">
        {R.map(items, ({ id, href, text }) => (
          <Fragment key={id}>
            <LinkAnchor
              href={href}
              disabled={id === String(activeYear)}
              className="mr-1"
            >
              {text}
            </LinkAnchor>{" "}
          </Fragment>
        ))}
      </div>
    </Block>
  );
}
