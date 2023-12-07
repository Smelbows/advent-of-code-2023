import { readFileSync } from 'fs';

const calibrationDoc: string[] = readFileSync(
  './src/day-1/input.txt',
  'utf-8'
).split(/\r?\n/);

console.log(calibrationDoc[0]);
