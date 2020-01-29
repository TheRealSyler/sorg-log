import { LogTable } from '../loggers';
import { styler } from '../styler';
import { SetLoggerEnvironment } from '../utils';
import { Logger } from '..';
import { LoggerType } from '../interfaces';

SetLoggerEnvironment('node');

test('Log Table', () => {
  const log = new Log();

  const num = (n: string | number) => styler(`${n}`, '#0f0');
  const ms = styler('ms', '#f00');

  LogTable([
    ['', 'b', 'c'],
    ['1', `${num(2)}${ms}`, 3]
  ]);
  LogTable([]); // added for codecov
  expect(log.data).toBe(`  b   c 
1 \x1b[38;2;0;255;0m2\x1b[0m\x1b[38;2;255;0;0mms\x1b[0m 3 `);
  log.TestEnd();
});

// test('Logger', () => {
//   const log = new Log();

//   const logger = new Logger<{ test: LoggerType }>({
//     test: {
//       styles: ['#000'],
//       wrappers: [['', ':']]
//     }
//   });

//   logger.Log('test', 'a', 'b');
//   expect(log.data).toBe(`\x1b[38;2;0;0;0ma\x1b[0m:\x1b[38;2;0;0;0mb\x1b[0m`);
//   log.TestEnd();
// });

class Log {
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
