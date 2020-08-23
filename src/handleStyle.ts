import { stringColorToAnsiColor, ANSICodes } from './utils';
import { LogStyle } from './interfaces';

export function getNodeStyle(style: LogStyle) {
  if (typeof style === 'string') {
    return `\x1b[${handleUndefined(stringColorToAnsiColor('color', style)).replace(/;$/, '')}m`;
  } else {
    const codes = `${style['font-weight'] === 'bold' ? ANSICodes('bold') : ''}${handleUndefined(
      stringColorToAnsiColor('color', style.color)
    )}${handleUndefined(stringColorToAnsiColor('background', style.background))}`;
    return `\x1b[${codes.replace(/;$/, '')}m`;
  }
}

function handleUndefined(input?: string) {
  return input ? input : '';
}

export function addReset(input: number | string) {
  return `${input}\u001b[${ANSICodes('reset')}m`;
}

// export function createBrowserStyle(style: LogStyle) {
//   if (typeof style === 'string') {
//     return `color: ${style};`;
//   } else {
//     let res = '';
//     for (const key in style) {
//       if (style.hasOwnProperty(key)) {
//         res += `${key}: ${style[key]};`;
//       }
//     }
//     return res;
//   }
// }
