import React from "react";

type Props = {
  text: string;
  top?: boolean;
};

export default function Header({ text, top }: Props) {
  // const router = useRouter();
  const Hx = top ? "h1" : "h2";

  return (
    <Hx className="font-sans font-semibold text-sm md:text-base uppercase my-4">
      {text}
    </Hx>
  );
}
