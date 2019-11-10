import { Converter } from './interfaces';

export const converter: Converter = message => {
  // console.log(message, typeof message);
  // TODO
  if (Array.isArray(message)) {
    return { message: JSON.stringify(message), canStyle: true };
  }
  return { message: `${message}`, canStyle: true };
};
