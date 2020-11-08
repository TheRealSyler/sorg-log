import {
  getColumn,
  maxTableColumnLength,
  isBrowser,
  removeNodeStyles,
  pad,
  defaultLogTableOptions,
} from './utils';
import { LogMessage, LogStyle, LogTableInput } from './interfaces';
import { styler } from '.';
import { transformToBrowserStyle } from './transformStyles';

/**works in node and the browser.*/
export function Log(...messages: (string | LogMessage)[]): void {
  let output = '';
  const browserStyles: string[] = [];
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    if (typeof msg === 'object') {
      if (isBrowser) {
        const style = transformToBrowserStyle(msg.style);
        if (style) browserStyles.push(style);
      }
      output += styler(msg.message, msg.style);
    } else {
      output += msg;
    }
    if (i < messages.length - 1) {
      output += ' ';
    }
  }
  console.log(output, ...browserStyles);
}

export interface LogTableOptions {
  padding?: number;
  spacing?: number;
}

/**node only*/
export function LogTable(table: LogTableInput, options: LogTableOptions = defaultLogTableOptions) {
  if (table[0] === undefined) return;
  const { padding, spacing } = { ...defaultLogTableOptions, ...options };

  let output = '';
  let maxLengths: number[] = [];

  for (let i = 0; i < table[0].length; i++) {
    const column = getColumn(table, i);
    maxLengths.push(maxTableColumnLength(column));
  }

  for (let i = 0; i < table.length; i++) {
    const row = table[i];
    for (let j = 0; j < row.length; j++) {
      const field = row[j];
      let text = '';
      let style: LogStyle | undefined;
      if (typeof field === 'object') {
        style = field.style;
        text = field.message;
      } else {
        text = field.toString();
      }

      const startPadding = j === 0 ? padding : 0;
      const endPadding = maxLengths[j] + (j === row.length - 1 ? padding : spacing);

      const textLength = removeNodeStyles(text).length;

      const paddedText = pad(text, startPadding, endPadding - textLength);

      if (style) {
        output += styler(paddedText, style);
      } else {
        output += paddedText;
      }
    }
    output += '\n';
  }
  console.log(output.replace(/\n$/, ''));
}

/**works in the browser and node. */
export function LogS(styles: LogStyle[], ...messages: string[]) {
  const browserStyles: string[] = [];
  let output = '';

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    if (isBrowser) {
      const style = transformToBrowserStyle(styles[i]);
      if (style) browserStyles.push(style);
    }

    output += styler(msg, styles[i]);

    if (i < messages.length - 1) {
      output += ' ';
    }
  }
  console.log(output, ...browserStyles);
}

/**Log a single message with an optional style, works in the browser and node. */
export function LogSingle(message: string, style?: LogStyle) {
  const output = styler(message, style);

  if (isBrowser) {
    console.log(output, transformToBrowserStyle(style) || '');
    return;
  }

  console.log(output);
}
