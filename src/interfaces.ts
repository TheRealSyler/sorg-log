import { FontWeightProperty } from 'csstype';

/**
 * color/background/font-weight work in node and the browser, the other properties only work in the browser.
 */
export type LogStyle =
  | string
  | {
      background?: string;
      color?: string;
      padding?: string;
      margin?: string;
      border?: string;
      /** for bold text in node add the value 'bold' */
      'font-weight'?: FontWeightProperty;
      /** if true the style doesn't get reset in node. */
      [key: string]: number | boolean | string | undefined;
    };

type AcceptableTypes = string | number | null | undefined | object;

export type ConverterInput = AcceptableTypes | Array<AcceptableTypes>;

// REVIEW What is BrowserContext? and is it useful?
// export interface BrowserContext {
//   styles: LogStyle[];
//   index: number;
//   offset: number;
// }

// export interface ConverterContext {
//   isObject?: boolean;
//   styled?: boolean;
//   browserContext?: BrowserContext;
//   indentation?: number;
//   index?: number;
//   typeStyles?: ConverterTypeStyles;
// }
// export interface ConverterTypeStyles {
//   /** Style Applied to any number. */
//   number: LogStyle;

//   /** Style Applied to any string inside of an array or object. */
//   string: LogStyle;

//   /** Style Applied to the brackets of any array or object */
//   bracket: LogStyle;

//   /** Style Applied to the key of any array or object */
//   key: LogStyle;

//   /** * Style Applied to the name (constructor) of any array or object */
//   name: LogStyle;

//   /** Style Applied to null type. */
//   null: LogStyle;

//   /** Style Applied to undefined type. */
//   undefined: LogStyle;

//   /** Style Applied to empty arrays. */
//   emptyArray: LogStyle;
// }
// export type ConverterOutput = {
//   message: string;
//   styled: boolean;
// };

// export type Converter = (message: ConverterInput, context?: ConverterContext) => ConverterOutput;

export type LogMessage = {
  message: string;
  style?: LogStyle;
};

export type LogTable = (number | string | LogMessage)[][];
