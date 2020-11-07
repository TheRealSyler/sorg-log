import { ANSICodes, removeStyles } from '../index';

test('codeCov completion', () => {
  removeStyles('');
  expect(ANSICodes('reset')).toEqual('0');
});
