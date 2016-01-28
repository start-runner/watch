export default function(patterns, callback) {
    return function watch(resolve, reject) {
        const chokidar = require('chokidar');

        chokidar
            .watch(patterns, { persistent: true })
            .on('change', function(file) {
                callback(file).catch(reject);
            })
            .on('add', function(file) {
                callback(file).catch(reject);
            })
            .on('error', reject);

        callback(patterns).catch(reject);
    };
}
