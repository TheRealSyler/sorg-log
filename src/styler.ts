import { getNodeStyle, addReset } from './handleStyle';
import { isBrowser } from './utils';
import { LogStyle } from './interfaces';

export function styler(input: string, style?: LogStyle) {
  if (isBrowser) {
    // TODO add browser style
    return `%c${input}`;
  }

  if (style) {
    return addReset(`${getNodeStyle(style)}${input}`);
  }

  return input;
}
