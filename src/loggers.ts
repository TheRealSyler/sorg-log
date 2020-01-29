import { styler } from './styler';

type Matrix = (number | string)[][];

/**Logs a table in node. */
export function LogTable(table: Matrix) {
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

function getMaxLength(column: Matrix[0]) {
  let max = 0;
  for (let i = 0; i < column.length; i++) {
    const field = column[i];
    if (field) {
      const length = replaceStyles(field).length;
      max = length > max ? length : max;
    }
  }
  return max;
}

function replaceStyles(item: string | number) {
  return item.toString().replace(/[\033\x1b\u001b]\[.*?m/g, '');
}

function getColumn(matrix: Matrix, col: number) {
  return matrix.map(row => row[col]);
}
