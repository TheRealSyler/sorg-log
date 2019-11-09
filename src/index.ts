const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

export interface LoggerTypes {
  [key: string]: LoggerType;
}
export interface LoggerType {
  styles: LoggerStyle[];
  wrappers: LoggerWrapper[];
  enabled?: boolean;
}
type LoggerWrapper = [string, string] | undefined | null;
type LoggerStyle =
  | string
  | {
      background?: string;
      color?: string;
      padding?: string;
      margin?: string;
      border?: string;
      [key: string]: string | undefined;
    };
export class Logger<T extends LoggerTypes> {
  constructor(public types: T) {
    for (const key in types) {
      if (types.hasOwnProperty(key)) {
        const type = types[key];
        if (isBrowser) {
          type.styles = type.styles.map(style => getStyle(style));
        }
      }
    }
  }
  Log(type: keyof T, messages: string[] | string) {
    if (this.types[type].enabled) {
      let msg = '';
      if (typeof messages === 'string') {
        const message = messages[0];
        const wrapper = this.types[type].wrappers[0];
        const style = this.types[type].styles[0];
        msg += getMessage(message, style, wrapper);
      } else {
        for (let i = 0; i < messages.length; i++) {
          const message = messages[i];
          const wrapper = this.types[type].wrappers[i];
          const style = this.types[type].styles[i];
          msg += getMessage(message, style, wrapper);
        }
      }
      if (isBrowser) {
        console.log(msg, ...this.types[type].styles);
      } else {
        console.log(msg);
      }
    }
  }

  SetEnabled(type: keyof T, val: boolean) {
    this.types[type].enabled = val;
  }
}

function getMessage(message: string, style: LoggerStyle, wrapper: LoggerWrapper) {
  if (isBrowser) {
    return `%c${wrapper && wrapper[0] ? wrapper[0] : ''}${message}${wrapper && wrapper[1] ? wrapper[1] : ''}`;
  } else {
    const color =
      typeof style === 'string'
        ? `\u001B[38;5;${rgbToAnsi256(...ConvertHexString(style.replace(/color: (.*?);/, '$1')))}m`
        : style.color
        ? `\u001B[38;5;${rgbToAnsi256(...ConvertHexString(style.color.replace(/color: (.*?);/, '$1')))}m`
        : '';
    return `${color}${wrapper && wrapper[0] ? wrapper[0] : ''}${message}${
      wrapper && wrapper[1] ? wrapper[1] : ''
    }\u001b[0m`;
  }
}

function getStyle(style: LoggerStyle) {
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

function rgbToAnsi256(r: number, g: number, b: number) {
  if (r === g && g === b) {
    if (r < 8) {
      return 16;
    }
    if (r > 248) {
      return 231;
    }

    return Math.round(((r - 8) / 247) * 24) + 232;
  }

  const ansi = 16 + 36 * Math.round((r / 255) * 5) + 6 * Math.round((g / 255) * 5) + Math.round((b / 255) * 5);

  return ansi;
}

function ConvertHexString(text: string): [number, number, number] {
  let color = { red: 0, green: 0, blue: 0, alpha: 0 };
  const raw = text.replace('#', '');
  const length = raw.length;
  const modulo = length % 3;
  color.red =
    length > 4 ? parseInt(raw.substring(0, 2), 16) : parseInt(raw.substring(0, 1).concat(raw.substring(0, 1)), 16);
  color.green =
    length > 4 ? parseInt(raw.substring(2, 4), 16) : parseInt(raw.substring(1, 2).concat(raw.substring(1, 2)), 16);
  color.blue =
    length > 4 ? parseInt(raw.substring(4, 6), 16) : parseInt(raw.substring(2, 3).concat(raw.substring(2, 3)), 16);

  if (modulo) {
    color.alpha =
      length > 4
        ? parseInt(raw.substring(length - modulo, length), 16)
        : parseInt(raw.substring(length - modulo, length).concat(raw.substring(length - modulo, length)), 16);
    color.alpha = color.alpha;
  } else {
    color.alpha = 1;
  }
  return [color.red, color.green, color.blue];
}
