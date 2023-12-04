import { sum } from "lib/arr-util.ts";

type Grab = { blue?: number; red?: number; green?: number };
type Game = {
  id: number;
  grabs: Grab[];
};

export function solvePart1(input: string) {
  const MAX_GRAB = {
    red: 12,
    green: 13,
    blue: 14,
  };
  const games = input.split("\n").map(parseGame);
  const validGames = games.filter((game) => {
    return game.grabs.every(({ blue = 0, red = 0, green = 0 }) =>
      blue <= MAX_GRAB.blue && red <= MAX_GRAB.red && green <= MAX_GRAB.green
    );
  });

  return sum(validGames.map((game) => game.id));
}

export function solvePart2(input: string) {
  const games = input.split("\n").map(parseGame);
  const powers = games.map((game) => {
    const minGrab = {
      blue: -Infinity,
      red: -Infinity,
      green: -Infinity,
    };

    for (const { blue, red, green } of game.grabs) {
      if (blue) minGrab.blue = Math.max(minGrab.blue, blue);
      if (red) minGrab.red = Math.max(minGrab.red, red);
      if (green) minGrab.green = Math.max(minGrab.green, green);
    }

    return minGrab.blue * minGrab.red * minGrab.green;
  });

  return sum(powers);
}

function parseGame(input: string): Game {
  const [idPart, grabsPart] = input.split(": ");
  if (!idPart || !grabsPart) {
    throw new Error("Invalid input");
  }
  const id = Number(idPart.slice("Game ".length));
  const grabs = grabsPart.split("; ").map((grabString) => {
    const grab: Grab = {};
    for (const s of grabString.split(", ")) {
      const [n, c] = s.split(" ");
      if (c !== "blue" && c !== "red" && c !== "green") {
        throw new Error(`Invalid colour ${c} in ${s}`);
      }

      grab[c] = Number(n);
    }
    return grab;
  });

  return {
    id,
    grabs,
  };
}
