import { isBrowser } from './utils';
import { createBrowserStyle } from './handleStyle';
import {
  LoggerType,
  LogType,
  BrowserContext,
  LoggerTypeStyles,
  CustomHandlerData,
  LoggerStyle,
  LoggerWrapper
} from './interfaces';
import { converter } from './converter';
import { styler } from './styler';

export { SetLoggerEnvironment as SetEnvironment } from './utils';
export { converter } from './converter';
export { styler } from './styler';
export { LoggerType } from './interfaces';
export { PresetNodeHelp } from './presets';

const defaultStyles: LoggerTypeStyles = {
  bracket: '#fa4',
  key: '#0c1',
  number: '#0AA',
  string: '#f64',
  name: '#fff',
  null: '#06f',
  undefined: '#06f',
  emptyArray: '#06f'
};

interface LoggerTypes {
  [key: string]: LoggerType;
}
export class Logger<T extends LoggerTypes> {
  constructor(public types: T) {
    for (const key in types) {
      if (types.hasOwnProperty(key)) {
        const type = types[key];
        type.enabled = type.enabled === false ? false : true;
        if (isBrowser && type.styles) {
          type.styles = type.styles.map(style => createBrowserStyle(style));
        }
      }
    }
  }
  Log(type: keyof T, ...messages: LogType[]) {
    if (this.types[type].enabled) {
      const _typeStyles = this.types[type].typeStyles;
      const typeStyles = _typeStyles ? _typeStyles : defaultStyles;
      const _styles = this.types[type].styles;
      const styles: LoggerStyle[] = _styles ? _styles : [];
      const browserContext: BrowserContext | undefined = isBrowser
        ? { styles: cleanBrowserStyles(messages, typeStyles, ...styles), index: 0, offset: 0 }
        : undefined;

      const wrappers = (this.types[type].wrappers === undefined ? [] : this.types[type].wrappers) as LoggerWrapper[];
      const data: CustomHandlerData = { rawMessages: messages, styles, wrappers, typeStyles };
      let msg = '';
      const preset = this.types[type].preset;
      if (preset !== undefined) {
        msg = preset.Use(data);
      } else {
        const CustomHandler = this.types[type].customHandler;
        if (CustomHandler !== undefined) {
          msg = CustomHandler(data);
        } else {
          for (let i = 0; i < messages.length; i++) {
            if (browserContext) {
              browserContext.index = i;
            }
            msg += styler(converter(messages[i], { browserContext, typeStyles, index: i }), styles[i], wrappers[i]);
          }
        }
      }

      if (browserContext) {
        console.log(msg, ...browserContext.styles);
      } else {
        console.log(msg);
      }
    }
  }

  SetEnabled(type: keyof T, val: boolean) {
    this.types[type].enabled = val;
  }
}
function cleanBrowserStyles(messages: LogType[], typeStyles: LoggerTypeStyles, ...styles: LoggerStyle[]) {
  for (let i = 0; i < messages.length; i++) {
    if (typeof messages[i] !== 'string') {
      styles.splice(i, 0, 'PLACEHOLDER');
    } else if (styles[i] === undefined) {
      styles.splice(i, 0, createBrowserStyle(typeStyles.string));
    }
  }

  if (styles.length > messages.length) {
    styles = styles.slice(0, messages.length);
  }
  return styles;
}
