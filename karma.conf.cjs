module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [{ pattern: 'src/**/*.spec.jsx', watched: false }],
    preprocessors: { 'src/**/*.spec.jsx': ['webpack'] },
    webpack: { mode: 'development', resolve: { extensions: ['.js', '.jsx'] }, module: { rules: [{ test: /\.jsx?$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: [['@babel/preset-env', { targets: { chrome: '120' } }], ['@babel/preset-react', { runtime: 'automatic' }]] } } }] } },
    reporters: ['progress', 'coverage'],
    coverageReporter: { dir: 'coverage/', reporters: [{ type: 'html' }, { type: 'text-summary' }] },
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--user-data-dir=./.karma-chrome']
      }
    },
    browsers: ['ChromeHeadlessCI'],
    singleRun: true,
    autoWatch: false
  });
};
