import { LoggerStyle, LoggerWrapper, wrap, getNodeStyle } from './handleStyle';
import { isBrowser } from './utils';
import { convertedMessage, Styler } from './interfaces';

export const styler: Styler = (msg: convertedMessage, style: LoggerStyle, wrapper: LoggerWrapper) => {
  const { canStyle, message } = msg;
  if (canStyle) {
    if (isBrowser) {
      return `%c${wrap(message, wrapper)}`;
    } else {
      if (style) {
        const NodeStyle = getNodeStyle(style);
        return wrap(
          message,
          wrapper,
          `${NodeStyle.color}${NodeStyle.background}`,
          typeof style !== 'string' ? style.removeResetColorCode : false
        );
      } else {
        return wrap(message, wrapper);
      }
    }
  }
  return '::ERROR undefined ERROR::';
};
