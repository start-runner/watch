export default function(patterns, callback) {
    return function watch(resolve, reject) {
        const chokidar = require('chokidar');

        const watcher = chokidar
            .watch(patterns, { persistent: true })
            .on('change', callback)
            .on('ready', function() {
                watcher.on('add', callback);
                watcher.on('addDir', callback);
            })
            .on('error', reject);

        function afterInitial() {
            resolve('press CTRL+C to exit');
        }

        callback(patterns)
            .then(afterInitial)
            .catch(afterInitial);
    };
}
