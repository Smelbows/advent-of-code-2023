import { parseText } from '../shared-functions';

enum Colours {
  GREEN = 'green',
  RED = 'red',
  BLUE = 'blue',
}
interface MaxCubes {
  green: number;
  red: number;
  blue: number;
}

interface CubeOptions {
  highestSeen: number;
}

interface GameInformation {
  green: CubeOptions;
  red: CubeOptions;
  blue: CubeOptions;
}

interface Game {
  id: number;
  gameInformation: GameInformation;
}

const maxCubes: MaxCubes = {
  green: 13,
  red: 12,
  blue: 14,
};

const calibrationDoc: string[] = parseText('./src/day-2/input.txt');

// Part One

const parsedGames: Game[] = calibrationDoc.map((game) => parseGame(game));

const possibleGameIds: number[] = parsedGames
  .filter((game) => gameIsPossible(game))
  .map((game) => game.id);

const answer = sum(possibleGameIds);
console.log(answer, 'part 1 answer');

// Part 2

const partTwoAnswer = sum(parsedGames.map((game) => multiplyGameCubes(game)));

console.log(partTwoAnswer, 'part 2 answer');

// Functions
function parseGame(game: string): Game {
  const [gameId, results] = game.split(':');
  const id: number = getId(gameId);

  const splitResults = results.split(';');
  const gameInfo: GameInformation = {
    green: { highestSeen: 0 },
    red: { highestSeen: 0 },
    blue: { highestSeen: 0 },
  };
  splitResults.forEach((result) => {
    const cubeHandful = result.split(',');
    cubeHandful.forEach((colouredCubes) => {
      updateGameInfo(colouredCubes, Colours.GREEN);
      updateGameInfo(colouredCubes, Colours.RED);
      updateGameInfo(colouredCubes, Colours.BLUE);
    });

    function updateGameInfo(colouredCubes: string, colourMatch: Colours): void {
      if (colouredCubes.includes(colourMatch)) {
        const num = colouredCubes.match(/\d+/);
        if (num && parseInt(num[0]) > gameInfo[colourMatch].highestSeen) {
          gameInfo[colourMatch].highestSeen = parseInt(num[0]);
        }
      }
    }
  });
  return { id: id, gameInformation: gameInfo };
}

function getId(gameId: string): number {
  const idString = gameId.match(/\d+/);
  let id: number | undefined = undefined;
  if (idString) {
    id = parseInt(idString[0]);
  }
  if (id === undefined) {
    throw new Error('Could not extract the game id');
  }
  return id;
}

function gameIsPossible(game: Game): boolean {
  return (
    game.gameInformation.blue.highestSeen <= maxCubes.blue &&
    game.gameInformation.green.highestSeen <= maxCubes.green &&
    game.gameInformation.red.highestSeen <= maxCubes.red
  );
}

function sum(gameIds: number[]): number {
  return gameIds.reduce((acc, cumm) => acc + cumm);
}

function multiplyGameCubes(game: Game): number {
  return (
    game.gameInformation.blue.highestSeen *
    game.gameInformation.red.highestSeen *
    game.gameInformation.green.highestSeen
  );
}
