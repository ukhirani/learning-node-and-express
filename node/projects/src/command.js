import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .command("curl <url>", "fetches the contents of the URL", () => {})
  .demandCommand(1)
  .parse();
