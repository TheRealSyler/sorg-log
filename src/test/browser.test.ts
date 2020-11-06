import { SetLoggerEnvironment } from '../utils';
import { Log } from '../index';
import { JestStoreLog } from 'jest-store-log';
SetLoggerEnvironment('browser');

test('Log Function (Browser)', () => {
  const log = new JestStoreLog();

  Log(
    { message: 'a', style: 'red' },
    'b',
    { message: 'c', style: { color: '#0f0', background: '#000' } },
    { message: 'd' }
  );

  expect(log.logs).toStrictEqual([
    `%ca b %cc %cd`,
    'color: red;',
    'color: #0f0; background: #000; ',
  ]);
  log.TestEnd();
});
