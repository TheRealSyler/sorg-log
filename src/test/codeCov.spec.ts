import { ANSICodes, removeNodeStyles } from '../index';

test('codeCov completion', () => {
  removeNodeStyles('');
  expect(ANSICodes('reset')).toEqual('0');
});
