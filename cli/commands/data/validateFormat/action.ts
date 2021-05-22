import { loadData, spinner } from "cli/utlity";
import { rtMatch } from 'types';

export default async (): Promise<void> => {
  spinner.next("Validate matches.json");
  const matches = loadData("matches");

  if (!Array.isArray(matches)) {
    throw new Error('matches.json: not an array');
  }

  matches.reverse().forEach(match => {
    spinner.next(match?.date);
    rtMatch.check(match);
  })

  spinner.done();
};

