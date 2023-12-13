import { parseText } from '../shared-functions';

const calibrationDoc: string[] = parseText('./src/day-1/input.txt');

// Part One

const numbersFromDoc: number[] = calibrationDoc.map((text) => {
  const first = findNumber(text);
  const second = findNumber(reverseString(text));
  return parseInt(first + second);
});

const sumOfValues: number = numbersFromDoc.reduce((acc, curr) => acc + curr);

console.log(sumOfValues, 'part one');

// Part Two

const numberMap = new Map<string, string>([
  ['1', 'one'],
  ['2', 'two'],
  ['3', 'three'],
  ['4', 'four'],
  ['5', 'five'],
  ['6', 'six'],
  ['7', 'seven'],
  ['8', 'eight'],
  ['9', 'nine'],
]);

const numbersIncludingText: number[] = calibrationDoc.map((text) => {
  const first = findFirstNumberOrText(text);
  const second = findSecondNumberOrText(text);
  return parseInt(first + second);
});

const sumForPartTwo: number = numbersIncludingText.reduce(
  (acc, curr) => acc + curr
);

console.log(sumForPartTwo, 'part two');

// Shared functions

function findNumber(text: string): string {
  const result = text.match(/[0-9]/);
  if (result) {
    return result[0];
  }

  throw new Error('could not find a matching number');
}

function findFirstNumberOrText(text: string): string {
  let firstMatch = text.match(/[0-9]/);

  numberMap.forEach((num) => {
    const result = text.match(num);
    if (!firstMatch && result) {
      firstMatch = result;
    }

    if (result?.index !== undefined && firstMatch?.index) {
      if (result.index < firstMatch.index) {
        firstMatch = result;
      }
    }
  });

  if (firstMatch && !numberMap.has(firstMatch[0])) {
    return getNumberFromText(firstMatch[0]);
  }

  if (firstMatch) {
    return firstMatch[0];
  }

  throw new Error('could not find a matching number');
}

function findSecondNumberOrText(text: string): string {
  const matches = text.matchAll(/[0-9]/g);
  let allMatches: RegExpMatchArray[] = [];
  for (const numberMatch of matches) {
    allMatches.push(numberMatch);
  }
  numberMap.forEach((num) => {
    const textMatches = text.matchAll(new RegExp(num, 'g'));
    for (const textMatch of textMatches) {
      allMatches.push(textMatch);
    }
  });

  const lastMatch = allMatches
    .map((regMatch) => {
      return { item: regMatch[0], index: regMatch.index || 0 };
    })
    .sort((a, b) => b.index - a.index)
    .shift();

  if (lastMatch) {
    if (!numberMap.has(lastMatch.item)) {
      return getNumberFromText(lastMatch.item);
    }
    return lastMatch.item;
  }

  throw new Error('could not find a matching number');
}

function reverseString(text: string): string {
  return text.split('').reverse().join('');
}

function getNumberFromText(numberText: string): string {
  const result = [...numberMap].find(([key, value]) => numberText === value);
  if (result === undefined) {
    throw new Error();
  }
  return result[0];
}
