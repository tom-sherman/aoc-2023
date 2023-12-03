import { assertEquals } from "std/testing/asserts.ts";

import { solvePart1, solvePart2 } from "./day01.ts";

const sampleInput1 = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const sampleInput2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

Deno.test("part 1", () => {
  assertEquals(solvePart1(sampleInput1), 142);
});

Deno.test("part 2", () => {
  assertEquals(solvePart2(sampleInput2), 281);
});
