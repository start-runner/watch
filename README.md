[![npm](https://img.shields.io/npm/v/start-watch.svg?style=flat-square)](https://www.npmjs.com/package/start-watch)
[![travis](http://img.shields.io/travis/start-runner/watch.svg?style=flat-square)](https://travis-ci.org/start-runner/watch)
[![deps](https://img.shields.io/gemnasium/start-runner/watch.svg?style=flat-square)](https://gemnasium.com/start-runner/watch)

Watch wrapper for [Start](https://github.com/start-runner/start).

## Install

```
npm i -D start-watch
```

## Usage

```js
// tasks/index.js
import start from 'start';
import logger from 'start-simple-logger';
import watch from 'start-watch';
import babel from 'start-babel';

export function dev() {
    return watch('src/**/*.js', function(file) {
        start(logger)(
            babel(file, 'build/')
        );
    });
}
```

```js
// package.json
"scripts": {
  "task": "babel-node node_modules/.bin/start tasks/",
  "dev": "npm run task dev"
}
```

## Arguments

`watch(patterns, callback)`

* `patterns` – [globby patterns](https://github.com/sindresorhus/globby)
* `callback(file)` – callback function which will be called on matched file changes
