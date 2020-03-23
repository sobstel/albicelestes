type PlayerItem = {
  id: string;
  name: string;
  mp: number;
  si: number;
  so: number;
  g: number;
};

type PlayerStat = {
  mp: number;
  si: number;
  so: number;
  g: number;
  yc: number;
  rc: number;
};

type PlayerInfo = {
  nicknames?: string[];
  links?: { url: srting; text: string; desc?: string }[];
};

type PlayerName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

