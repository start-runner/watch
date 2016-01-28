export default function(patterns, callback) {
    return function watch(resolve, reject) {
        const chokidar = require('chokidar');

        function call(file) {
            callback(file).catch(reject);
        }

        chokidar
            .watch(patterns, { persistent: true })
            .on('change', callback)
            .on('add', callback)
            .on('error', reject);

        callback(patterns);
    };
}
