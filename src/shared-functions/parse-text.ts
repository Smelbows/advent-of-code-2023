import { readFileSync } from 'fs';

export function parseText(inputPath: string): string[] {
  return readFileSync(inputPath, 'utf-8').split(/\r?\n/);
}
