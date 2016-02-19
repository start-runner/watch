# start-watch

[![npm](https://img.shields.io/npm/v/start-watch.svg?style=flat-square)](https://www.npmjs.com/package/start-watch)
[![linux build](https://img.shields.io/travis/start-runner/watch.svg?label=linux&style=flat-square)](https://travis-ci.org/start-runner/watch)
[![windows build](https://img.shields.io/appveyor/ci/start-runner/watch.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/start-runner/watch)
[![coverage](https://img.shields.io/codecov/c/github/start-runner/watch.svg?style=flat-square)](https://codecov.io/github/start-runner/watch)
[![deps](https://img.shields.io/gemnasium/start-runner/watch.svg?style=flat-square)](https://gemnasium.com/start-runner/watch)
[![gitter](https://img.shields.io/badge/gitter-join_chat_%E2%86%92-00d06f.svg?style=flat-square)](https://gitter.im/start-runner/start)

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

## Arguments

`watch(callback)`

* `callback(file)` – callback function which will be called on matched file changes
