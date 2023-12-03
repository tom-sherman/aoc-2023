import { sum } from "lib/arr-util.ts";

type Grab = { blue: number; red: number; green: number };
type Game = {
  id: number;
  grabs: Grab[];
};

const MAX_GRAB: Grab = {
  red: 12,
  green: 13,
  blue: 14,
};

export function solvePart1(input: string) {
  const games = input.split("\n").map(parseGame);
  const validGames = games.filter((game) => {
    return game.grabs.every((grab) =>
      grab.blue <= MAX_GRAB.blue && grab.red <= MAX_GRAB.red &&
      grab.green <= MAX_GRAB.green
    );
  });

  return sum(validGames.map((game) => game.id));
}

function parseGame(input: string): Game {
  const [idPart, grabsPart] = input.split(": ");
  if (!idPart || !grabsPart) {
    throw new Error("Invalid input");
  }
  const id = Number(idPart.slice("Game ".length));
  const grabs = grabsPart.split("; ").map((grabString) => {
    const grab: Grab = { blue: 0, red: 0, green: 0 };
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
