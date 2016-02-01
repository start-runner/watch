export default (callback) => (input) => {
    return function watch(/* log */) {
        return callback(input).then(() => {
            const chokidar = require('chokidar');

            return new Promise((resolve, reject) => {
                const watcher = chokidar
                    .watch(input, { persistent: true })
                    .on('ready', () => {
                        watcher
                            .on('change', callback)
                            .on('add', callback)
                            .on('addDir', callback);
                    })
                    .on('error', reject);
            });
        });
    };
};
