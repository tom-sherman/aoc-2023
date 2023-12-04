import { AocApi } from "lib/api.ts";
import { bold, italic } from "std/fmt/colors.ts";
import { config } from "dotenv/mod.ts";
import { Command, EnumType } from "cliffy/command/mod.ts";
import { Confirm } from "cliffy/prompt/mod.ts";

const { AOC_TOKEN } = config();

if (!AOC_TOKEN) {
  console.error("AOC_TOKEN is not set");
  Deno.exit(1);
}

await new Command()
  .name("aoc")
  .description("Run Advent of Code solutions")
  .type("PART", new EnumType(["1", "2"]))
  .arguments("<day:number> [part:PART]")
  .option("-y, --year <year:number>", "Year to run", { default: 2023 })
  .option("-s, --submit", "Submit solution")
  .action(async ({ year, submit }, day, part = "1") => {
    const api = new AocApi(
      `https://adventofcode.com/${year}/`,
      AOC_TOKEN,
    );
    const moduleName = `day${String(day).padStart(2, "0")}.ts`;
    const [input, module] = await Promise.all([
      api.getInput(day),
      import(`./src/${moduleName}`),
    ]);

    console.log(
      `Running ${bold(moduleName)} with part ${bold(String(part))}...`,
    );

    let output;
    switch (part) {
      case "1":
        output = await module.solvePart1(input);
        break;
      case "2":
        output = await module.solvePart2(input);
        break;
    }

    console.log(bold("Got output:"));
    console.log(output);
    const shouldCheck = submit ??
      await Confirm.prompt(bold(italic("Do you want to check the solution?")));

    if (shouldCheck) {
      const solutionResponse = await api.sendSolution(
        day,
        part,
        output,
      );

      console.log(bold("Got solution response:"));
      console.log(`status=${solutionResponse.status}`);
      console.log(solutionResponse.infoText);
    }
  }).parse(Deno.args);
