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
        className="text-blue-600 hover:text-blue-400 cursor-pointer"
        onClick={onClick}
      >
        {active ? "<>" : label}
      </a>
    </Item>
  );
}
