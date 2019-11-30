type INFLECTED_NAME = { name: string; inflected: boolean };

interface INFLECTIONS {
  [key: string]: string;
}

export function inflect(name: string): INFLECTED_NAME {
  if (inflections[name]) {
    return { name: inflections[name], inflected: true };
  }
  return { name, inflected: false };
}

const inflections: INFLECTIONS = {
  "Kily González": "Kily González",
  "Lautaro Martínez": "Lautaro Martínez"
};
