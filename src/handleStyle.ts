import { stringColorToAnsi256 } from './utils';
import { LoggerStyle, LoggerWrapper } from './interfaces';

export function wrap(message: string, wrapper: LoggerWrapper, style?: string, removeResetColorCode = false) {
  return handleStyle(
    `${wrapper && wrapper[0] ? wrapper[0] : ''}${message}${wrapper && wrapper[1] ? wrapper[1] : ''}`,
    style,
    removeResetColorCode
  );
}
function handleStyle(msg: string, style: string | undefined, removeResetColorCode: boolean) {
  if (style) {
    if (removeResetColorCode) {
      return `${style}${msg}`;
    }
    return getColorCode('reset', `${style}${msg}`);
  }
  return msg;
}

export function getNodeStyle(style: LoggerStyle) {
  if (typeof style === 'string') {
    return { color: getColorCode('color', stringColorToAnsi256(style)), background: '' };
  } else {
    return {
      color: getColorCode('color', stringColorToAnsi256(style.color)),
      background: getColorCode('background', stringColorToAnsi256(style.background))
    };
  }
}

function getColorCode(type: 'color' | 'background' | 'reset', color?: number | string) {
  switch (type) {
    case 'color':
      return color !== undefined ? `\u001B[38;5;${color}m` : '';
    case 'background':
      return color !== undefined ? `\u001B[48;5;${color}m` : '';
    case 'reset':
      return color !== undefined ? `${color}\u001b[0m` : '';
  }
}

export function createBrowserStyle(style: LoggerStyle) {
  if (typeof style === 'string') {
    return `color: ${style};`;
  } else {
    let res = '';
    for (const key in style) {
      if (style.hasOwnProperty(key)) {
        res += `${key}: ${style[key]};`;
      }
    }
    return res;
  }
}
