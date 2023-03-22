import app from "@/app";
import chalk from "chalk";

const port = +process.env.PORT || 4000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(chalk.bgGreen(`Server is listening on port ${port}.`));
});
