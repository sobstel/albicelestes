import { loadData, saveData, spinner } from "../../../utlity";

export default async (): Promise<void> => {
  spinner.next("Format matches.json");
  const matches = loadData("matches");
  saveData("matches", matches);
  spinner.done();
};
