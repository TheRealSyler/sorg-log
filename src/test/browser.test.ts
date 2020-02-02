import { SetLoggerEnvironment } from '../utils';
import { Log } from '../index';

SetLoggerEnvironment('browser');

test('Log Function (Browser)', () => {
  const log = new StoreLog();

  Log(
    { message: 'a', style: 'red' },
    'b',
    { message: 'c', style: { color: '#0f0' } },
    { message: 'd' }
  );

  expect(log.data).toBe(`%ca b %cc %cd`);
  log.TestEnd();
});

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
