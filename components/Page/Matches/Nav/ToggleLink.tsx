import React from "react";
import Item from "./Item";

export default function ToggleLink({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <Item>
      <a
        className="text-blue-600 hover:text-blue-400 cursor-pointer"
        onClick={onClick}
      >
        {label}
      </a>
    </Item>
  );
}
