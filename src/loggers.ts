import { getColumn, getMaxLength, isBrowser, getBrowserStyle, replaceStyles } from './utils';
import { LogMessage, LogStyle, LogTable } from './interfaces';
import { styler } from '.';

/**Logs a table in node. */
export function LogTable(table: LogTable) {
  if (table[0] === undefined) return;

  let output = '';
  let maxLengths: number[] = [];

  for (let i = 0; i < table[0].length; i++) {
    const column = getColumn(table, i);
    maxLengths.push(getMaxLength(column));
  }

  for (let i = 0; i < table.length; i++) {
    const row = table[i];
    for (let j = 0; j < row.length; j++) {
      const field = row[j];

      output += field
        .toString()
        .concat(' '.repeat(maxLengths[j] - replaceStyles(field).length + 1));
    }
    output += '\n';
  }
  console.log(output.replace(/\n$/, ''));
}

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
