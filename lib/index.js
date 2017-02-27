const defaultEvents = [ 'add', 'change' ];
const defaultOptions = { persistent: true };

export default (files, events = defaultEvents, userOptions) => (callback) => () => {
  if (!files || (Array.isArray(files) && !files.length)) {
    throw new Error('Need files to watch');
  }

  if (!callback || typeof callback !== 'function') {
    throw new Error('Need a callback function');
  }

  return function watch(log) {
    const chokidar = require('chokidar');

    const options = {
      ...defaultOptions,
      ...userOptions
    };

    return new Promise((resolve, reject) => {
      const initialFiles = [];
      const initialListener = (file) => initialFiles.push(file);

      const watcher = chokidar.watch(files, options);

      watcher.once('error', reject);

      watcher.on('add', initialListener);
      watcher.once('ready', () => {
        watcher.removeListener('add', initialListener);

        const watchForChanges = () => {
          events.forEach((event) => {
            watcher.once(event, (file) => {
              callback([ file ])
                .then(watchForChanges)
                .catch(watchForChanges);
            });
          });
        };

        callback(initialFiles)
          .then(watchForChanges)
          .catch(watchForChanges)
          .then(() => {
            log('watching for changes, press ctrl-c to exit');
          });
      });
    });
  };
};
