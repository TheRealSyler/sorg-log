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

export type LogMessage = {
  message: string;
  style?: LogStyle;
};

export type LogTable = (number | string | LogMessage)[][];
