[![npm](https://img.shields.io/npm/v/start-watch.svg?style=flat-square)](https://www.npmjs.com/package/start-watch)
[![travis](http://img.shields.io/travis/start-runner/watch.svg?style=flat-square)](https://travis-ci.org/start-runner/watch)
[![deps](https://img.shields.io/gemnasium/start-runner/watch.svg?style=flat-square)](https://gemnasium.com/start-runner/watch)

Watch task for [Start](https://github.com/start-runner/start).

## Install

```
npm i -D start-watch
```

## Usage

Task is rely on array of files.

```js
// tasks/index.js
import Start from 'start';
import logger from 'start-simple-logger';
import files from 'start-files';
import clean from 'start-clean';
import watch from 'start-watch';
import babel from 'start-babel';
import write from 'start-write';
import mocha from 'start-mocha';

cosnt start = Start(logger());

export function dev() {
    return start(
        files('build/'),
        clean(),
        files('lib/**/*.js'),
        watch(file => start(
            files(file),
            babel(),
            write('build/')
        ))
    );
}

export function tdd() {
    return start(
        files([ 'lib/**/*.js', 'test/**/*.js']),
        watch(() => start(
            files('test/**/*.js'),
            mocha()
        ))
    );
}
```

```js
// package.json
"scripts": {
  "task": "babel-node node_modules/.bin/start tasks/",
  "dev": "npm run task dev",
  "tdd": "npm run task tdd"
}
```

## Arguments

`watch(callback)`

* `callback(file)` – callback function which will be called on matched file changes
