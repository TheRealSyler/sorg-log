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

export function getBrowserStyle(style?: LogStyle): LogStyle {
  if (typeof style === 'string') {
    return { color: style };
  }
  return style ? style : '';
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

// function convertToANSI256Color(color: string) {
//   const { r, g, b } = StringToRGB(color, true);
//   if (r === g && g === b) {
//     if (r < 8) {
//       return 16;
//     }
//     if (r > 248) {
//       return 231;
//     }

//     return Math.round(((r - 8) / 247) * 24) + 232;
//   }

//   return (
//     16 + 36 * Math.round((r / 255) * 5) + 6 * Math.round((g / 255) * 5) + Math.round((b / 255) * 5)
//   );
// }

// function ConvertHexString(text: string): [number, number, number] {
//   let color = { red: 0, green: 0, blue: 0, alpha: 0 };
//   const raw = text.replace('#', '');
//   const length = raw.length;
//   const modulo = length % 3;
//   color.red =
//     length > 4
//       ? parseInt(raw.substring(0, 2), 16)
//       : parseInt(raw.substring(0, 1).concat(raw.substring(0, 1)), 16);
//   color.green =
//     length > 4
//       ? parseInt(raw.substring(2, 4), 16)
//       : parseInt(raw.substring(1, 2).concat(raw.substring(1, 2)), 16);
//   color.blue =
//     length > 4
//       ? parseInt(raw.substring(4, 6), 16)
//       : parseInt(raw.substring(2, 3).concat(raw.substring(2, 3)), 16);

//   if (modulo) {
//     color.alpha =
//       length > 4
//         ? parseInt(raw.substring(length - modulo, length), 16)
//         : parseInt(
//             raw.substring(length - modulo, length).concat(raw.substring(length - modulo, length)),
//             16
//           );
//     color.alpha = color.alpha;
//   } else {
//     color.alpha = 1;
//   }
//   return [color.red, color.green, color.blue];
// }
