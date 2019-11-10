import { RGBColor } from 's.color';

type Color = string | RGBColor;

export type LoggerWrapper = [string, string] | undefined | null;

/**
 * color/background work in node and the browser, the other properties only work in the browser.
 */
export type LoggerStyle =
  | string
  | {
      background?: Color;
      color?: Color;
      padding?: string;
      margin?: string;
      border?: string;
      [key: string]: Color | string | undefined;
    };

export type LoggerAcceptableLogTypes = string | number;

export type convertedMessage = { message: string; canStyle: boolean };
export type Converter = (message: LoggerAcceptableLogTypes) => convertedMessage;
export type Styler = (msg: convertedMessage, style: LoggerStyle, wrapper: LoggerWrapper) => string;

export interface LoggerType {
  styles: LoggerStyle[];
  wrappers?: LoggerWrapper[];
  /**
   * Used to change Messages before they get styled.
   */
  customHandler?: (
    data: { rawMessages: LoggerAcceptableLogTypes[]; wrappers: LoggerWrapper[]; styles: LoggerStyle[] },
    converter: Converter,
    styler: Styler
  ) => string;
  enabled?: boolean;
}
