import { Log, SetEnvironment } from '../index';
import { JestStoreLog } from 'jest-store-log';

test('Log Function (Browser)', () => {
  SetEnvironment('browser');
  let log = new JestStoreLog();

  Log({ message: 'a', style: 'red' });

  expect(log.logs).toStrictEqual([`%ca`, 'color: red;']);
  log.TestEnd();
  log = new JestStoreLog();
  SetEnvironment('node');
  Log({ message: 'a', style: 'red' });

  expect(log.logs).toStrictEqual(['\x1b[38;2;255;0;0ma\x1b[0m']);
  log.TestEnd();
});
