import { Converter } from './interfaces';

export const converter: Converter = message => {
  // TODO
  return { message: `${message}`, canStyle: true };
};
