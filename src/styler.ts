import { WrapStyle, getNodeStyle } from './handleStyle';
import { isBrowser } from './utils';
import { Styler, ConverterOutput, LoggerStyle, LoggerWrapper } from './interfaces';

export const styler: Styler = (
  input: ConverterOutput | string,
  style: LoggerStyle | undefined,
  wrapper: LoggerWrapper
) => {
  if (typeof input === 'string') {
    input = { message: input, styled: false };
  }

  if (input.styled || (isBrowser && input.nodeOnly)) {
    if (input.wrap) {
      return `${WrapStyle(input.message, wrapper)}`;
    }
    return input.message;
  } else {
    if (isBrowser) {
      return `%c${WrapStyle(input.message, wrapper)}`;
    } else {
      if (style) {
        const NodeStyle = getNodeStyle(style);
        return WrapStyle(
          input.message,
          wrapper,
          `${NodeStyle.color}${NodeStyle.background}${NodeStyle.bold}`,
          typeof style !== 'string' ? style.removeResetColorCode : false
        );
      } else {
        return WrapStyle(input.message, wrapper);
      }
    }
  }
};
