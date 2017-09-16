module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [{ pattern: '**/*.spec.js', watched: false }],
    preprocessors: {
      '**/*.spec.js': ['webpack']
    },
    webpack: require('../../config/webpack/test.js'),
    browsers: ['PhantomJS']
  });
};
