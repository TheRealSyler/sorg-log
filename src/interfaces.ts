import { PresetBase } from './presets';

export type LoggerWrapper = [string, string] | undefined | null;

/**
 * color/background work in node and the browser, the other properties only work in the browser.
 */
export type LoggerStyle =
  | string
  | {
      background?: string;
      color?: string;
      padding?: string;
      margin?: string;
      border?: string;
      /**
       * if true the style doesn't get reset in node.
       */
      removeResetColorCode?: boolean;
      [key: string]: boolean | string | undefined;
    };

export type LoggerAcceptableLogType = string | number; // | any[] | object;

export interface BrowserContext {
  styles: LoggerStyle[];
  index: number;
  offset: number;
}

export interface ConverterContext {
  isObject?: boolean;
  styled?: boolean;
  browserContext?: BrowserContext;
  indentation?: number;
  typeStyles: LoggerTypeStyles;
}
export interface LoggerTypeStyles {
  /**
   * Style Applied to any number.
   */
  number: LoggerStyle;
  /**
   * Style Applied to any string inside of an array or object.
   */
  string: LoggerStyle;
  /**
   * Style Applied to the brackets of any array or object
   */
  bracket: LoggerStyle;
  /**
   * Style Applied to the key of any array or object
   */
  key: LoggerStyle;
  /**
   * Style Applied to the name (constructor) of any array or object
   */
  name: LoggerStyle;
}
export type ConverterOutput = { message: string; styled: boolean; nodeOnly?: boolean; wrap?: boolean };
export type Converter = (message: LoggerAcceptableLogType, context: ConverterContext) => ConverterOutput;
export type Styler = (message: ConverterOutput | string, style: LoggerStyle, wrapper: LoggerWrapper) => string;

export interface LoggerType {
  styles: LoggerStyle[];
  wrappers?: LoggerWrapper[];
  preset?: PresetBase;
  /**
   * Used to change Messages before they get styled.
   */
  customHandler?: CustomHandler;
  enabled?: boolean;
  /**
   * Customize styles of arrays, objects, string etc.
   */
  typeStyles?: LoggerTypeStyles;
}
export type CustomHandlerData = {
  rawMessages: LoggerAcceptableLogType[];
  wrappers: LoggerWrapper[];
  styles: LoggerStyle[];
  typeStyles: LoggerTypeStyles;
};
export type CustomHandler = (data: CustomHandlerData, converter: Converter, styler: Styler) => string;

export type PresetHandler<T> = (preset: T, data: CustomHandlerData) => string;
