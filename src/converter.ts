import { Converter, ConverterContext, LoggerStyle } from './interfaces';
import { styler } from './styler';
import { createBrowserStyle } from './handleStyle';

export const converter: Converter = (message, ctx) => {
  switch (typeof message) {
    case 'string':
      return { message: convertString(message, ctx), styled: !!ctx.styled };
    case 'number':
      return { message: convertNumber(message, ctx), styled: !!ctx.styled };
    case 'object':
      return { message: convertObject(message, ctx), styled: true };
  }

  return { message: '::NOT IMPLEMENTED::', styled: false };
};

function convertString(message: string, ctx: ConverterContext) {
  if (ctx.isObject) {
    addBrowserStyle(ctx, ctx.typeStyles.string);
    return styler({ message, styled: false }, ctx.typeStyles.string, ['"', '"\n']);
  }
  return message;
}
function convertNumber(message: number, ctx: ConverterContext) {
  removeCurrentBrowserStyle(ctx);
  addBrowserStyle(ctx, ctx.typeStyles.number);
  return styler(
    { message: `${message}`, styled: !ctx.isObject, wrap: true },
    ctx.typeStyles.number,
    ctx.isObject ? [' ', '\n'] : [' ', ' ']
  );
}
function addObjectKey(key: string, ctx: ConverterContext) {
  addBrowserStyle(ctx, ctx.typeStyles.key);
  return styler({ message: `${key}: `, styled: false }, ctx.typeStyles.key, null);
}

function convertObject(object: object, ctx: ConverterContext): string {
  let brackets = ['{', '}'];
  if (Array.isArray(object)) {
    brackets = ['[', ']'];
    if (object.length === 0) {
      return 'EMPTY';
    }
  }
  const name = object.constructor.name;
  ctx.indentation = ctx.indentation ? ctx.indentation + 2 : 2;
  ctx.isObject = true;

  removeCurrentBrowserStyle(ctx);
  addBrowserStyle(ctx, ctx.typeStyles.name);
  let output = styler(`${name} `, ctx.typeStyles.name, null);
  addBrowserStyle(ctx, ctx.typeStyles.bracket);
  output += styler(`${brackets[0]}\n`, ctx.typeStyles.bracket, null);

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const item = object[key];
      output += addIndentation(`${addObjectKey(key, ctx)}${converter(item, ctx).message}`, ctx.indentation);
    }
  }

  output = output.replace(/\n?$/, '\n');
  ctx.indentation -= 2;
  output += styler(addIndentation(`${brackets[1]}\n`, ctx.indentation), ctx.typeStyles.bracket, null);
  addBrowserStyle(ctx, ctx.typeStyles.bracket);
  return output;
}

function addIndentation(text: string, indentation: number) {
  return text.replace(/^/, ' '.repeat(indentation));
}

function addBrowserStyle(ctx: ConverterContext, style: LoggerStyle, offset?: boolean) {
  if (ctx.browserContext) {
    const i = ctx.browserContext.index;
    const o = ctx.browserContext.offset;
    ctx.browserContext.styles.splice(i + o, 0, createBrowserStyle(style));
    if (offset) {
      ctx.browserContext.offset++;
    }
  }
}
function removeCurrentBrowserStyle(ctx: ConverterContext) {
  if (ctx.browserContext) {
    const i = ctx.browserContext.index;
    const o = ctx.browserContext.offset;
    ctx.browserContext.styles.splice(i + o, 1);
  }
}
