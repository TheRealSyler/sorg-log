import { isBrowser } from './utils';
import { LoggerWrapper, createBrowserStyle } from './handleStyle';
import { LoggerType, LoggerAcceptableLogTypes } from './interfaces';
import { converter } from './converter';
import { styler } from './styler';
// import { presets } from './presets';

export { LoggerType, convertedMessage } from './interfaces';
export { PresetNodeHelp } from './presets';

interface LoggerTypes {
  [key: string]: LoggerType;
}
export class Logger<T extends LoggerTypes> {
  constructor(public types: T) {
    for (const key in types) {
      if (types.hasOwnProperty(key)) {
        const type = types[key];
        type.enabled = type.enabled === false ? false : true;
        if (isBrowser) {
          type.styles = type.styles.map(style => createBrowserStyle(style));
        }
      }
    }
  }
  Log(type: keyof T, ...messages: LoggerAcceptableLogTypes[]) {
    if (this.types[type].enabled) {
      const wrappers = (this.types[type].wrappers === undefined ? [] : this.types[type].wrappers) as LoggerWrapper[];
      let msg = '';
      const preset = this.types[type].preset;
      if (preset !== undefined) {
        msg = preset.Use({ rawMessages: messages, styles: this.types[type].styles, wrappers });
      } else {
        const CustomHandler = this.types[type].customHandler;
        if (CustomHandler !== undefined) {
          msg = CustomHandler({ rawMessages: messages, styles: this.types[type].styles, wrappers }, converter, styler);
        } else {
          for (let i = 0; i < messages.length; i++) {
            msg += styler(converter(messages[i]), this.types[type].styles[i], wrappers[i]);
          }
        }
      }
      if (isBrowser) {
        console.log(msg, ...this.types[type].styles);
      } else {
        console.log(msg);
      }
    }
  }

  SetEnabled(type: keyof T, val: boolean) {
    this.types[type].enabled = val;
  }
}
