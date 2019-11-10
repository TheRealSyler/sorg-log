import { LoggerStyle, LoggerWrapper, wrap, getNodeStyle } from './handleStyle';
import { isBrowser, rgbToAnsi256, ConvertHexString } from './utils';
import { convertedMessage, Styler } from './interfaces';

export const styler: Styler = (msg: convertedMessage, style: LoggerStyle, wrapper: LoggerWrapper) => {
  const { canStyle, message } = msg;
  if (canStyle) {
    if (isBrowser) {
      return `%c${wrap(message, wrapper)}`;
    } else {
      if (style) {
        const NodeStyle = getNodeStyle(style);
        const color = `\u001B[38;5;${rgbToAnsi256(...ConvertHexString(NodeStyle.color))}m`;
        const background = `\u001B[48;5;${rgbToAnsi256(...ConvertHexString(NodeStyle.background))}m`;

        return wrap(message, wrapper, `${color}${background}`);
      } else {
        return wrap(message, wrapper);
      }
    }
  }
  return '::ERROR undefined ERROR::';
};
