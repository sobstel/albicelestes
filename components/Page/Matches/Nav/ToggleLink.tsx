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
  const bgColor = active ? "bg-gray-100" : "";
  return (
    <Item className={bgColor}>
      <a
        className="text-blue-600 hover:text-blue-400 cursor-pointer"
        onClick={onClick}
      >
        {active ? "<>" : label}
      </a>
    </Item>
  );
}
