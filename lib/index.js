export default (opts = {}, callback) => (input) => {
  return function watch(log) {
    const chokidar = require('chokidar');

    if (!callback && typeof opts === 'function') {
      callback = opts;
      opts = {};
    }

    if (typeof opts === 'string' || Array.isArray(opts)) {
      opts = { files: opts };
    }

    if (input && input.length && !opts.files) {
      opts.files = input;
    }

    opts.events = opts.events || [ 'add', 'change' ];

    return new Promise((resolve, reject) => {

      log('Globbing files...');

      const initialFileList = [];
      const initialListener = (file) => initialFileList.push(file);

      const watcher = chokidar.watch(opts.files, { persistent: true, ...opts });

      watcher.once('error', reject);

      watcher.on('add', initialListener);
      watcher.once('ready', () => {
        watcher.removeListener('add', initialListener);

        log('initial scan complete, running task...');

        const onDone = (err) => {
          if (err && opts.bail) {
            reject(err);
          } else {
            log('watching for changes, press ctrl-c to exit');
            opts.events.forEach((event) => watcher.on(event, callback));
            resolve();
          }
        };

        try {
          const ret = callback(initialFileList);

          if (ret && ret.then) {
            ret.then(onDone).catch(onDone);
          } else {
            onDone();
          }
        } catch (err) {
          onDone(err);
        }
      });
    });
  };
};
