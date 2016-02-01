export default (callback) => (input) => {
    return function watch(/* log */) {
        return callback(input).then(() => {
            const chokidar = require('chokidar');

            return new Promise((resolve, reject) => {
                chokidar
                    .watch(input, { persistent: true })
                    .on('change', callback)
                    .on('error', reject);
            });
        });
    };
};
