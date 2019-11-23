import { Converter, ConverterContext, LoggerStyle, LoggerWrapper } from './interfaces';
import { styler } from './styler';
import { createBrowserStyle } from './handleStyle';

export const converter: Converter = (message, ctx) => {
  if (message === null) {
    return { message: convertNullOrUndefined('null', ctx), styled: true };
  }
  switch (typeof message) {
    case 'undefined':
      return { message: convertNullOrUndefined('undefined', ctx), styled: true };
    case 'string':
      return { message: convertString(message, ctx), styled: !!ctx.styled };
    case 'number':
      return { message: convertNumber(message, ctx), styled: !!ctx.styled };
    case 'object':
      return { message: convertObject(message, ctx), styled: true };
  }

  return { message: '::NOT IMPLEMENTED::', styled: false };
};

function getWrapper(ctx: ConverterContext): LoggerWrapper {
  return ctx.isObject ? [' ', '\n'] : [ctx.index === 0 ? '' : ' ', ''];
}

function convertNullOrUndefined(type: 'null' | 'undefined', ctx: ConverterContext) {
  removeCurrentBrowserStyle(ctx);
  addBrowserStyle(ctx, ctx.typeStyles[type]);
  return styler({ message: type, wrap: true, styled: false }, ctx.typeStyles[type], getWrapper(ctx));
}

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
  return styler({ message: `${message}`, styled: false, wrap: true }, ctx.typeStyles.number, getWrapper(ctx));
}
function addObjectKey(key: string, ctx: ConverterContext) {
  addBrowserStyle(ctx, ctx.typeStyles.key);
  return styler({ message: `${key}: `, styled: false }, ctx.typeStyles.key);
}

function convertObject(object: object, ctx: ConverterContext): string {
  let brackets = ['{', '}'];
  if (Array.isArray(object)) {
    brackets = ['[', ']'];
    if (object.length === 0) {
      return `\n${styler('Array', ctx.typeStyles.name)} ${styler('[EMPTY]', ctx.typeStyles.emptyArray)}`;
    }
  }
  const name = object.constructor.name;
  ctx.indentation = ctx.indentation ? ctx.indentation + 2 : 2;
  ctx.isObject = true;

  removeCurrentBrowserStyle(ctx);
  addBrowserStyle(ctx, ctx.typeStyles.name);
  let output = styler(`\n${name} `, ctx.typeStyles.name);
  addBrowserStyle(ctx, ctx.typeStyles.bracket);
  output += styler(`${brackets[0]}\n`, ctx.typeStyles.bracket);

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const item = object[key];
      output += addIndentation(`${addObjectKey(key, ctx)}${converter(item, ctx).message}`, ctx.indentation);
    }
  }

  output = output.replace(/\n?$/, '');
  ctx.indentation -= 2;
  output += styler(addIndentation(`${brackets[1]}`, ctx.indentation), ctx.typeStyles.bracket);
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
