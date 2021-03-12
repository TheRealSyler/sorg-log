import { StringToRGB } from 's.color';
import { LogTableInput } from './interfaces';
// @ts-ignore deno comment
export let isBrowser = typeof window !== undefined && typeof window.document !== undefined;

export const defaultLogTableOptions = { padding: 0, spacing: 1 };

/**
 * Can be used to change the assumed environment
 */
export function SetLoggerEnvironment(env: 'node' | 'browser') {
  isBrowser = env === 'browser';
}
export function stringColorToAnsiColor(type: 'background' | 'color', color?: string) {
  if (!color) {
    return undefined;
  }
  const rgb = StringToRGB(color, true);
  if (rgb) {
    const { r, g, b } = rgb
    return `${ANSICodes(type)};2;${r};${g};${b};`;
  }
  return `${ANSICodes(type)};2;0;0;0;`;
}

export function ANSICodes(type: 'background' | 'color' | 'bold' | 'reset') {
  switch (type) {
    case 'reset':
      return '0';
    case 'bold':
      return '1';
    case 'color':
      return '38';
    case 'background':
      return '48';
  }
}

export function maxTableColumnLength(column: LogTableInput[0]) {
  let max = 0;
  for (let i = 0; i < column.length; i++) {
    const field = column[i];
    if (field) {
      const length = removeNodeStyles(typeof field === 'object' ? field.message : field).length;
      max = length > max ? length : max;
    }
  }
  return max;
}

export function removeNodeStyles(item: string | number) {
  // deno-lint-ignore no-control-regex
  return item.toString().replace(/[\033\x1b\u001b]\[.*?m/g, '');
}

export function pad(text: string, start: number, end: number) {
  const space = (amount: number) => ' '.repeat(amount);
  return `${space(start)}${text}${space(end)}`;
}

export function getColumn(matrix: LogTableInput, col: number) {
  return matrix.map((row) => row[col]);
}

export function addReset(input: number | string) {
  return `${input}\u001b[0m`;
}
