import app, { init } from "@/app";
import chalk from "chalk";
import { loadEnv } from "./config";

loadEnv();

const port = +process.env.PORT || 4000;

init().then(() => {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(chalk.bgGreen(`Server is listening on port ${port}.`));
  });
});
