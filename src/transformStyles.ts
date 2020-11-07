import { stringColorToAnsiColor, ANSICodes } from './utils';
import { LogStyle } from './interfaces';

export function transformToNodeStyle(style: LogStyle) {
  if (typeof style === 'string') {
    return `\x1b[${handleUndefined(stringColorToAnsiColor('color', style)).replace(/;$/, '')}m`;
  } else {
    const codes = `${addBoldStyle(style)}${handleUndefined(
      stringColorToAnsiColor('color', style.color)
    )}${handleUndefined(stringColorToAnsiColor('background', style.background))}`;
    return `\x1b[${codes.replace(/;$/, '')}m`;
  }
}

function addBoldStyle(style: Exclude<LogStyle, string>) {
  return style['font-weight'] === 'bold' ? `${ANSICodes('bold')};` : '';
}

function handleUndefined(input?: string) {
  return input ? input : '';
}

export function transformToBrowserStyle(style?: LogStyle) {
  if (style == undefined) return '';
  if (typeof style === 'string') {
    return `color: ${style};`;
  }
  let out = '';
  if (!('display' in style)) {
    out += `display: inline-block; `;
  }
  for (const key in style) {
    if (Object.prototype.hasOwnProperty.call(style, key)) {
      out += `${key}: ${style[key]}; `;
    }
  }
  return out;
}
