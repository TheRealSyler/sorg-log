import { LogTable, Log, LogS } from '../loggers';
import { styler } from '../styler';
import { SetLoggerEnvironment } from '../utils';
// import { converter } from '../converter';
import { JestStoreLog } from 'jest-store-log';
import { LogStyle } from '../interfaces';

SetLoggerEnvironment('node');

test('Log Table', () => {
  const log = new JestStoreLog();
  const e = '\x1b[0m';
  const num = (n: string | number) => styler(`${n}`, '#0f0');
  const ms = styler('ms', '#f00');

  LogTable([
    ['', 'b', 'c'],
    ['1', `${num(2)}${ms}`, 3],
  ]);
  LogTable([]); // added for codecov
  expect(log.data).toBe(`  b   c
1 \x1b[38;2;0;255;0m2${e}\x1b[38;2;255;0;0mms${e} 3`);

  log.data = '';
  LogTable([['1', { style: { color: 'blue' }, message: 'a' }]]);
  expect(log.data).toBe(`1 \x1b[38;2;0;0;255ma${e}`);
  log.data = '';
  LogTable(
    [
      ['1', 'b'],
      [':  :', 'a'],
    ],
    { padding: 4 }
  );
  expect(log.data).toBe(`    1    b    
    :  : a    `);
  log.data = '';
  LogTable([['1', 'b']], { spacing: 3 });
  expect(log.data).toBe(`1   b`);

  log.data = '';
  const style: LogStyle = {
    background: '#fff',
    color: '#000',
  };
  const text = (text: string) => ({ message: text, style });

  LogTable([
    [text('First Column'), text('Second Column'), text('Third Column')],
    [text('32561'), text('test')],
  ]);

  const s = '\x1b[38;2;0;0;0;48;2;255;255;255m';

  expect(log.data).toEqual(`${s}First Column ${e}${s}Second Column ${e}${s}Third Column${e}
${s}32561        ${e}${s}test         ${e}`);
  log.TestEnd();
});

test('Log Function (Node)', () => {
  const log = new JestStoreLog();

  Log(
    { message: 'a', style: '#f00' },
    'b',
    { message: 'c for codecov' },
    {
      message: 'd',
      style: { 'font-weight': 'bold', background: 'blue' },
    },
    {
      message: 'e',
      style: { 'font-weight': '-moz-initial' },
    }
  );

  expect(log.data).toBe(
    `\x1b[38;2;255;0;0ma\x1b[0m b c for codecov \x1b[1;48;2;0;0;255md\x1b[0m \x1b[me\x1b[0m`
  );

  log.TestEnd();
});

test('LogS Function (Node)', () => {
  const log = new JestStoreLog();

  const start = {
    color: '#fff',
    background: '#000',
  };

  const endStyle = '#000';
  const a = [start, endStyle];
  LogS(a, 'Awd', 'Test');

  expect(log.logs[0]).toBe(
    `\x1b[38;2;255;255;255;48;2;0;0;0mAwd\x1b[0m \x1b[38;2;0;0;0mTest\x1b[0m`
  );

  log.TestEnd();
});
