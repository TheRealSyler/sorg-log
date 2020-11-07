import { getBrowserStyle, SetLoggerEnvironment } from '../utils';
import { Log, LogS } from '../index';
import { JestStoreLog } from 'jest-store-log';
SetLoggerEnvironment('browser');

test('Log Function (Browser)', () => {
  const log = new JestStoreLog();

  Log(
    { message: 'a', style: 'red' },
    'b',
    { message: 'c', style: { color: '#0f0', display: 'none', background: '#000' } },
    { message: 'd' }
  );

  expect(log.logs).toStrictEqual([
    `%ca b %cc %cd`,
    'color: red;',
    'color: #0f0; display: none; background: #000; ',
  ]);
  log.TestEnd();
});

test('LogS Function (Browser)', () => {
  const log = new JestStoreLog();
  const start = {
    color: '#fff',
    background: '#000',
  };

  const endStyle = '#000';
  const a = [start, endStyle];
  LogS(a, 'Awd', 'Test');

  expect(log.logs).toStrictEqual([
    `%cAwd %cTest`,
    'display: inline-block; color: #fff; background: #000; ',
    'color: #000;',
  ]);
  log.logs = [];
  LogS(['#fff'], 'Awd', 'Test');
  expect(log.logs).toStrictEqual([`%cAwd %cTest`, 'color: #fff;']);

  log.TestEnd();
});

test('getBrowserStyle codecov completion', () => {
  class Test {
    test() {}
  }

  getBrowserStyle(new Test() as any);
});
