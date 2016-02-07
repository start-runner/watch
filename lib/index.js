export default (callback) => (input) => {
    return function watch(/* log */) {
        const chokidar = require('chokidar');

        return new Promise((resolve, reject) => {
            function init() {
                chokidar
                    .watch(input, { persistent: true })
                    .on('change', callback)
                    .on('error', reject);
            }

            callback(input)
                .then(init)
                .catch(init);
        });
    };
};
