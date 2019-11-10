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
      [key: string]: string | undefined;
    };

export type LoggerAcceptableLogTypes = string | number | any[];

export type convertedMessage = { message: string; canStyle: boolean };
export type Converter = (message: LoggerAcceptableLogTypes) => convertedMessage;
export type Styler = (msg: convertedMessage, style: LoggerStyle, wrapper: LoggerWrapper) => string;

export interface LoggerType {
  styles: LoggerStyle[];
  wrappers?: LoggerWrapper[];
  preset?: PresetBase;
  /**
   * Used to change Messages before they get styled.
   */
  customHandler?: CustomHandler;
  enabled?: boolean;
}
export type CustomHandlerData = {
  rawMessages: LoggerAcceptableLogTypes[];
  wrappers: LoggerWrapper[];
  styles: LoggerStyle[];
};
export type CustomHandler = (data: CustomHandlerData, converter: Converter, styler: Styler) => string;

export type PresetHandler<T> = (preset: T, data: CustomHandlerData) => string;
