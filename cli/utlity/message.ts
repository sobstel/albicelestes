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

export default message;
