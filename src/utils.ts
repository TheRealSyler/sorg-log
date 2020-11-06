import { StringToRGB } from 's.color';
import { LogStyle, LogTable } from './interfaces';

export let isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

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
  const { r, g, b } = StringToRGB(color, true);

  return `${ANSICodes(type)}2;${r};${g};${b};`;
}

export function ANSICodes(type: 'background' | 'color' | 'bold' | 'reset') {
  switch (type) {
    case 'reset':
      return '0';
    case 'bold':
      return '1;';
    case 'color':
      return '38;';
    case 'background':
      return '48;';
  }
}

export function getBrowserStyle(style?: LogStyle) {
  if (style == undefined) return '';
  if (typeof style === 'string') {
    return `color: ${style};`;
  }
  let out = '';
  for (const key in style) {
    if (Object.prototype.hasOwnProperty.call(style, key)) {
      out += `${key}: ${style[key]}; `;
    }
  }
  return out;
}

export function maxTableColumnLength(column: LogTable[0]) {
  let max = 0;
  for (let i = 0; i < column.length; i++) {
    const field = column[i];
    if (field) {
      const length = removeStyles(typeof field === 'object' ? field.message : field).length;
      max = length > max ? length : max;
    }
  }
  return max;
}

export function removeStyles(item: string | number) {
  return item.toString().replace(/[\033\x1b\u001b]\[.*?m/g, '');
}

export function pad(text: string, start: number, end: number) {
  const space = (amount: number) => ' '.repeat(amount);
  return `${space(start)}${text}${space(end)}`;
}

export function getColumn(matrix: LogTable, col: number) {
  return matrix.map((row) => row[col]);
}
