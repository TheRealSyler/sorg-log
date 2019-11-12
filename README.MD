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
    wrappers: [
      ['ERROR [', ']: '],
      [' ', '! ']
    ]
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

##### Or

```typescript
import { Logger, LoggerType } from 's.logger';

const logger = new Logger<{ help: LoggerType }>({
  help: {
    styles: [
      { color: '#f27', background: '#111' },
      { color: '#4e0', background: '#222' },
      { color: '#fa0', background: '#222' }
    ],
    preset: new PresetNodeHelp(
      `Help;
;
--concurrent;Number Of concurrent pages, this cli uses puppeteer to scrape the data.
--outPath;Path Where the Files will be created.;NOTE: The path has to exist.
--fileType;File Type Only Supported Types Are:;json | ts | js
--prefix;prefixes every File.
--ignore;Files in this list don't get Created.;This Arg is Comma Separated Example: 'noDataProps,standardProps'
-h h --help help;Shows this Message.`
    )
  }
});

logger.Log('help');
```

<span style="display: flex; justify-content: space-around;">
<img src="https://raw.githubusercontent.com/TheRealSyler/s.logger/master/images/arrow.png" style="display: inline;">
<img src="https://raw.githubusercontent.com/TheRealSyler/s.logger/master/images/arrow.png" style="display: inline;">
</span>

![](https://raw.githubusercontent.com/TheRealSyler/s.logger/master/images/logger-ex.png)
