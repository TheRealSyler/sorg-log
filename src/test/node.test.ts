import { LogTable, Log } from '../loggers';
import { styler } from '../styler';
import { SetLoggerEnvironment } from '../utils';
// import { converter } from '../converter';

SetLoggerEnvironment('node');

test('Log Table', () => {
  const log = new StoreLog();

  const num = (n: string | number) => styler(`${n}`, '#0f0');
  const ms = styler('ms', '#f00');

  LogTable([
    ['', 'b', 'c'],
    ['1', `${num(2)}${ms}`, 3]
  ]);
  LogTable([]); // added for codecov
  expect(log.data).toBe(`  b   c 
1 \x1b[38;2;0;255;0m2\x1b[0;m\x1b[38;2;255;0;0mms\x1b[0;m 3 `);
  log.TestEnd();
});

test('Log Function (Node)', () => {
  const log = new StoreLog();

  Log(
    { message: 'a', style: '#f00' },
    'b',
    { message: 'c for codecov' },
    {
      message: 'd',
      style: { 'font-weight': 'bold', background: 'blue' }
    }
  );

  expect(log.data).toBe(
    `\x1b[38;2;255;0;0ma\x1b[0;m b c for codecov \x1b[1;48;2;0;0;255md\x1b[0;m`
  );
  log.TestEnd();
});

// test('Converter', () => {
//   const log = new StoreLog();

//   Log(converter({ wd: 'awd', a: [23, null, undefined] }).message);

//   expect(log.data).toBe(
//     `Object {
//   wd: awd  a:
// Array [
//      0: 23
//      1: null
//      2: undefined
// ]}`
//   );
//   log.TestEnd();
// });

class StoreLog {
  data = '';
  private oldConsoleLog = console['log'];
  constructor() {
    console['log'] = jest.fn(this.Store);
  }

  Store = (inputs: string) => (this.data += inputs);

  TestEnd() {
    console.log = this.oldConsoleLog;
  }
}
