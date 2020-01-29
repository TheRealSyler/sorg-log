import { StringToRGB } from 's.color';

export let isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
/**
 * Can be used to change the assumed environment
 */
export function SetLoggerEnvironment(env: 'node' | 'browser') {
  isBrowser = env === 'browser';
}
export function stringColorToAnsiColor(color?: string) {
  if (!color) {
    return undefined;
  }
  const { r, g, b } = StringToRGB(color, true);

  // CONVERT TO ANSI 256
  // if (r === g && g === b) {
  //   if (r < 8) {
  //     return 16;
  //   }
  //   if (r > 248) {
  //     return 231;
  //   }

  //   return Math.round(((r - 8) / 247) * 24) + 232;
  // }

  // const ansi =
  //   16 + 36 * Math.round((r / 255) * 5) + 6 * Math.round((g / 255) * 5) + Math.round((b / 255) * 5);

  return `2;${r};${g};${b}`;
}

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
