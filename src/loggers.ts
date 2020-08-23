import {
  getColumn,
  maxTableColumnLength,
  isBrowser,
  getBrowserStyle,
  removeStyles,
  pad,
  defaultLogTableOptions,
} from './utils';
import { LogMessage, LogStyle, LogTable } from './interfaces';
import { styler } from '.';

export function Log(...messages: (string | LogMessage)[]): void {
  let output = '';
  const browserStyles: LogStyle[] = [];
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    if (typeof msg === 'object') {
      if (isBrowser) {
        browserStyles.push(getBrowserStyle(msg.style));
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

/**Logs a table in node. */
export function LogTable(table: LogTable, options: LogTableOptions = defaultLogTableOptions) {
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

      const textLength = removeStyles(text).length;

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
