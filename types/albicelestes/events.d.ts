type Appearance = {
  id?: string;
  name: string;
  in?: string;
  out?: string;
};

type Goal = {
  id?: string;
  name: string;
  min?: string;
  type: "G" | "P" | "OG";
};

type Card = {
  id?: string;
  name: string;
  min?: string;
  type: "Y" | "R";
};
