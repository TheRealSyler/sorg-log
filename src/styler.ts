import { getNodeStyle, addReset } from './handleStyle';
import { isBrowser } from './utils';
import { LogStyle } from './interfaces';

/**
 * this function is not browser compatible*.
 * @example ```ts
 * console.log(styler('test', 'red'))
 * ```
 *
 * *you have to add the styles manually, use the Log function for browser compatibly.
 */
export function styler(input: string, style?: LogStyle) {
  if (isBrowser) {
    return `%c${input}`;
  }

  if (style) {
    return addReset(`${getNodeStyle(style)}${input}`);
  }

  return input;
}
