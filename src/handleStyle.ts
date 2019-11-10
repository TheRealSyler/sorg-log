import color, { RGBColor } from 's.color';

type Color = string | RGBColor;

export type LoggerWrapper = [string, string] | undefined | null;

/**
 * color/background work in node and the browser, the other properties only work in the browser.
 */
export type LoggerStyle =
  | string
  | {
      background?: Color;
      color?: Color;
      padding?: string;
      margin?: string;
      border?: string;
      [key: string]: Color | string | undefined;
    };

export function wrap(message: string, wrapper: LoggerWrapper, style?: string) {
  return handleStyle(
    `${wrapper && wrapper[0] ? wrapper[0] : ''}${message}${wrapper && wrapper[1] ? wrapper[1] : ''}`,
    style
  );
}
function handleStyle(msg: string, style?: string) {
  if (style) {
    return `${style}${msg}\u001b[0m`;
  }
  return msg;
}

export function getNodeStyle(style: LoggerStyle) {
  if (typeof style === 'string') {
    return { color: new color(style).Get('hex') as string, background: '' };
  } else {
    return {
      color: new color(style.color).Get('hex') as string,
      background: new color(style.background).Get('hex') as string
    };
  }
}

export function createBrowserStyle(style: LoggerStyle) {
  if (typeof style === 'string') {
    return `color: ${new color(style).Get('hex')};`;
  } else {
    let res = '';
    for (const key in style) {
      if (style.hasOwnProperty(key)) {
        res += `${key}: ${new color(style[key]).Get('hex')};`;
      }
    }
    return res;
  }
}
