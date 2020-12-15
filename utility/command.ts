import ora from "ora";
import chalk from "chalk";

export const message = (function () {
  function info(text: string) {
    console.log(chalk.blue(text));
  }

  function warn(text: string) {
    console.log(chalk.yellow(text));
  }

  function error(text: string) {
    console.log(chalk.red(text));
  }
  return { info, warn, error };
})();

export const spinner = (function () {
  let spinner: ora.Ora | undefined;

  function done() {
    if (spinner) {
      spinner.succeed();
    }
  }

  function next(text: string) {
    done();
    spinner = ora({ text, color: "blue" }).start();
  }

  function error(text: string) {
    if (spinner) {
      spinner.fail();
    }
    message.error(text);
  }

  return { next, done, error };
})();
