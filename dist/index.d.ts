interface LoggerTypes {
    [key: string]: LoggerType;
}
export interface LoggerType {
    styles: LoggerStyle[];
    wrappers?: LoggerWrapper[];
    enabled?: boolean;
}
declare type LoggerWrapper = [string, string] | undefined | null;
/**
 * color/background work in node and the browser, the other properties only work in the browser.
 */
declare type LoggerStyle = string | {
    background?: string;
    color?: string;
    padding?: string;
    margin?: string;
    border?: string;
    [key: string]: string | undefined;
};
export declare class Logger<T extends LoggerTypes> {
    types: T;
    constructor(types: T);
    Log(type: keyof T, ...messages: string[]): void;
    SetEnabled(type: keyof T, val: boolean): void;
}
export {};
