## S.Logger

[![Size](https://badgen.net/bundlephobia/min/s.logger)](https://bundlephobia.com/result?p=s.logger) [![Size](https://badgen.net/packagephobia/install/s.logger)](https://bundlephobia.com/result?p=s.logger) [![Npm](https://img.shields.io/npm/v/s.logger)](https://www.npmjs.com/package/s.logger) [![Npm](https://img.shields.io/github/last-commit/TheRealSyler/s.logger)](https://github.com/TheRealSyler/s.logger)

s.loggers purpose is to have colored output in the browser and in node, only supports strings for now.

![](https://raw.githubusercontent.com/TheRealSyler/s.logger/master/images/s.logger.png)

#### Usage

```typescript
import { Logger, LoggerType } from 's.logger';

const logger = new Logger<{ error: LoggerType; info: LoggerType; browserMessage: LoggerType }>({
  error: {
    styles: ['#f24', { color: '#fc0', background: '#001' }],
    wrappers: [['ERROR [', ']: '], [' ', '! ']]
  },
  info: {
    styles: ['#39f'],
    wrappers: [['INFO: (', ')']]
  },
  // in the Browser, you can add css properties to style the message, in node you can only use color and background.
  browserMessage: {
    styles: [
      {
        color: '#fff',
        padding: '2rem',
        'text-shadow': '1.5px 1.5px 1px red, -1.5px -1.5px 1px blue',
        'font-size': '2rem'
      }
    ],
    wrappers: []
  }
});

logger.Log('error', '404', 'Message');
logger.Log('info', 'Message');
logger.Log('browserMessage', 'Message');
```
