export default function(patterns, callback) {
    return function watch(resolve, reject) {
        const chokidar = require('chokidar');

        function call(file) {
            callback(file).catch(reject);
        }

        chokidar
            .watch(patterns, { persistent: true })
            .on('change', call)
            .on('add', call)
            .on('error', reject);

        callback(patterns).catch(reject);
    };
}
