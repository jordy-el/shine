const environment = require('./environment');

environment.plugins.get('Manifest').opts.writeToFileEmit = false;

module.exports = environment.toWebpackConfig();
