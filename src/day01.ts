import { sum } from "lib/arr-util.ts";

export function solvePart1(input: string) {
  const lines = input.trim().split("\n");

  const calibrationValues = lines.map((line) => {
    const numbers = [...line].filter((char) => !isNaN(Number(char)));
    return Number(numbers.at(0) + numbers.at(-1)!);
  });

  return sum(calibrationValues);
}
