import { LoggerWrapper, wrap, getNodeStyle } from './handleStyle';
import { isBrowser } from './utils';
import { Styler, ConverterOutput, LoggerStyle } from './interfaces';

export const styler: Styler = (input: ConverterOutput | string, style: LoggerStyle, wrapper: LoggerWrapper) => {
  if (typeof input === 'string') {
    input = { message: input, styled: false };
  }

  if (input.styled || (isBrowser && input.nodeOnly)) {
    if (input.wrap) {
      return `${wrap(input.message, wrapper)}`;
    }
    return input.message;
  } else {
    if (isBrowser) {
      return `%c${wrap(input.message, wrapper)}`;
    } else {
      if (style) {
        const NodeStyle = getNodeStyle(style);
        return wrap(
          input.message,
          wrapper,
          `${NodeStyle.color}${NodeStyle.background}`,
          typeof style !== 'string' ? style.removeResetColorCode : false
        );
      } else {
        return wrap(input.message, wrapper);
      }
    }
  }
};
