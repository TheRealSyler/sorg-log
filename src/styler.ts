import { WrapStyle, getNodeStyle } from './handleStyle';
import { isBrowser } from './utils';
import { LogStyle } from './interfaces';

export function styler(input: string, style?: LogStyle) {
  if (isBrowser) {
    return `%c${WrapStyle(input)}`;
  } else {
    if (style) {
      return WrapStyle(input, getNodeStyle(style), true);
    } else {
      return WrapStyle(input);
    }
  }
}
