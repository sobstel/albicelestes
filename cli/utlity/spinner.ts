import ora from "ora";
import message from "./message";

export const spinner = (function () {
  let spinner: ora.Ora;

  function done() {
    if (spinner?.isSpinning) {
      spinner.succeed();
    }
  }

  function next(text: string) {
    done();
    spinner = ora({ text, color: "blue" }).start();
  }

  function error(text: string) {
    if (spinner?.isSpinning) {
      spinner.fail();
    }
    message.error(text);
  }

  return { next, done, error };
})();

export default spinner;
