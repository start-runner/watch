export default function(patterns, callback) {
    return new Promise(function(resolve, reject) {
        const chokidar = require('chokidar');

        chokidar
            .watch(patterns, { persistent: true })
            .on('change', callback)
            .on('error', reject);

        callback(patterns);
    });
}
