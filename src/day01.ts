import { sum } from "lib/arr-util.ts";

export function solvePart1(input: string) {
  const lines = input.split("\n");

  const calibrationValues = lines.map((line) => {
    const numbers = [...line].filter((char) => !isNaN(Number(char)));
    return Number(numbers.at(0) + numbers.at(-1)!);
  });

  return sum(calibrationValues);
}

export function solvePart2(input: string) {
  const lines = input.split("\n");
  const calibrationValues = lines.map((line) => {
    const numbers = getNumbers(line);
    return Number(numbers.at(0)! + numbers.at(-1)!);
  });

  return sum(calibrationValues);
}

const DIGIT_LOOKUP = {
  "oneight": ["1", "8"],
  "twone": ["2", "1"],
  "threeight": ["3", "8"],
  "fiveight": ["5", "8"],
  "sevenine": ["7", "9"],
  "eightwo": ["8", "2"],
  "nineight": ["9", "8"],
  "one": ["1"],
  "two": ["2"],
  "three": ["3"],
  "four": ["4"],
  "five": ["5"],
  "six": ["6"],
  "seven": ["7"],
  "eight": ["8"],
  "nine": ["9"],
  "1": ["1"],
  "2": ["2"],
  "3": ["3"],
  "4": ["4"],
  "5": ["5"],
  "6": ["6"],
  "7": ["7"],
  "8": ["8"],
  "9": ["9"],
};

const DIGITS = Object.keys(DIGIT_LOOKUP) as (keyof typeof DIGIT_LOOKUP)[];

function getNumbers(line: string) {
  const numbers: string[] = [];
  while (line.length > 0) {
    const digitString = DIGITS.find((digit) => line.startsWith(digit));
    if (!digitString) {
      line = line.slice(1);
      continue;
    }

    const digit = DIGIT_LOOKUP[digitString];
    numbers.push(...digit);
    line = line.slice(digitString.length);
  }

  return numbers;
}
