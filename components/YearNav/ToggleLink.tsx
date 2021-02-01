import React from "react";
import Item from "./Item";

export default function ToggleLink({
  onClick,
  label,
  active,
}: {
  onClick: () => void;
  label: string;
  active: boolean;
}) {
  return (
    <Item>
      <a
        className="text-link hover:text-link-hover cursor-pointer"
        onClick={onClick}
      >
        {active ? "<>" : label}
      </a>
    </Item>
  );
}
