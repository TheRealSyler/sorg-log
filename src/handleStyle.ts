import { stringColorToAnsiColor } from './utils';
import { LoggerStyle, LoggerWrapper } from './interfaces';

export function WrapStyle(
  message: string,
  wrapper: LoggerWrapper,
  style?: string,
  removeResetColorCode = false
) {
  return handleStyle(
    `${wrapper && wrapper[0] ? wrapper[0] : ''}${message}${
      wrapper && wrapper[1] ? wrapper[1] : ''
    }`,
    style,
    removeResetColorCode
  );
}
function handleStyle(msg: string, style: string | undefined, removeResetColorCode: boolean) {
  if (style) {
    if (removeResetColorCode) {
      return `${style}${msg}`;
    }
    return getANSICode('reset', `${style}${msg}`);
  }
  return msg;
}

export function getNodeStyle(style: LoggerStyle) {
  if (typeof style === 'string') {
    return {
      color: getANSICode('color', stringColorToAnsiColor(style)),
      background: '',
      bold: ''
    };
  } else {
    return {
      bold: style['font-weight'] === 'bold' ? getANSICode('bold') : '',
      color: getANSICode('color', stringColorToAnsiColor(style.color)),
      background: getANSICode('background', stringColorToAnsiColor(style.background))
    };
  }
}

function getANSICode(type: 'color' | 'background' | 'reset' | 'bold', color?: number | string) {
  switch (type) {
    case 'color':
      return color !== undefined ? `\u001B[38;${color}m` : '';
    case 'background':
      return color !== undefined ? `\u001B[48;${color}m` : '';
    case 'bold':
      return `\u001B[1m`;
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
