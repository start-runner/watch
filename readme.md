# start-watch

[![npm](https://img.shields.io/npm/v/start-watch.svg?style=flat-square)](https://www.npmjs.com/package/start-watch)
[![linux build](https://img.shields.io/travis/start-runner/watch/master.svg?label=linux&style=flat-square)](https://travis-ci.org/start-runner/watch)
[![windows build](https://img.shields.io/appveyor/ci/start-runner/watch/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/start-runner/watch)
[![coverage](https://img.shields.io/codecov/c/github/start-runner/watch/master.svg?style=flat-square)](https://codecov.io/github/start-runner/watch)
[![deps](https://img.shields.io/gemnasium/start-runner/watch.svg?style=flat-square)](https://gemnasium.com/start-runner/watch)

Watch task for [Start](https://github.com/start-runner/start).

## Install

```
npm i -D start-watch
```

## Usage

```js
import Start from 'start';
import reporter from 'start-pretty-reporter';
import files from 'start-files';
import clean from 'start-clean';
import watch from 'start-watch';
import read from 'start-read';
import babel from 'start-babel';
import write from 'start-write';
import mocha from 'start-mocha';

cosnt start = Start(reporter());

export function dev() {
    return start(
        files('build/'),
        clean(),
        files('lib/**/*.js'),
        watch(file => start(
            files(file),
            read(),
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

This task relies on array of files, see [documentation](https://github.com/start-runner/start#readme) for details.

:point_right: Note that this task may not work properly with tasks like [start-webpack](https://github.com/start-runner/webpack) and [start-karma](https://github.com/start-runner/karma) which have their own file watching functionality.

## Arguments

`watch(callback)`

* `callback(file)` – callback function which will be called on matched file changes
