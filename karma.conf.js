// Karma configuration.
// Generated on Sun Mar 08 2015 22:08:33 GMT+0500.
module.exports = function(config) {
    config.set({

        // Base path that will be used to resolve all patterns (eg. files, exclude).
        basePath: '',

        // Frameworks to use.
        // Available frameworks: https://npmjs.org/browse/keyword/karma-adapter.
        frameworks: ['mocha', 'sinon-chai'],

        // List of files / patterns to load in the browser.
        files: [
            /* Library code source files. */
            /* Base script including library entry point. */
            'src/sdv.js',

            /* Scripts including base library utilities. */
            'src/util/sdv.util.js',

            /* Script including validation utilities. */
            'src/util/sdv.util.validation.js',

            /* Script with type-related utilities. */
            'src/util/sdv.util.boolean.js',
            'src/util/sdv.util.string.js',
            'src/util/sdv.util.number.js',
            'src/util/sdv.util.array.js',
            'src/util/sdv.util.function.js',
            'src/util/sdv.util.object.js',

            /* Script including JSON utilities. */
            'src/util/sdv.util.json.js',

            /* Script including XML utilities. */
            'src/util/sdv.util.xml.js',

            /* Script including AJAX utilities. */
            'src/util/sdv.util.ajax.js',

            /* Script including GeoJSON utilities. */
            'src/util/sdv.util.geojson.js',

            /* Scripts including facilities to localize text resources/messages of the library. */
            'src/localization/sdv.localization.js',
            'src/localization/sdv.localization.ru.js',
            'src/localization/sdv.localization.en.js',

            /* Script including LINQ-like enumerable facilities. */
            'src/enumerable/sdv.enumerable.js',

            /* Script including templated conditions facilities. */
            'src/condition/sdv.condition.js',

            /* Script including capabilities for working with colors. */
            'src/color/sdv.color.js',
            'src/color/sdv.color.random.js',
            'src/color/model/sdv.color.model.js',
            'src/color/model/sdv.color.model.hex.js',
            'src/color/model/sdv.color.model.rgb.js',
            'src/color/model/sdv.color.model.hsl.js',
            'src/color/model/sdv.color.model.hsb.js',

            /* Analysis tools */
            'src/tool/sdv.tool.js',
            'src/tool/base/sdv.tool.base.js',
            'src/tool/choropleth/sdv.tool.choropleth.js',
            'src/tool/choropleth/mode/sdv.tool.choropleth.mode.random.js',

            /* Scripts with unit tests. */
            'test/**/*.spec.js'
        ],

        // List of files to exclude.
        exclude: [
        ],

        // Test results reporter to use.
        // Possible values: 'dots', 'progress'.
        // Available reporters: https://npmjs.org/browse/keyword/karma-reporter.
        reporters: ['progress', 'coverage'],

        // Preprocess matching files before serving them to the browser.
        // Available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor.
        preprocessors: {
            'src/sdv.js': ['wrap'],
            'src/**/*.js': ['coverage']
        },

        // Wrap preprocessor options.
        wrapPreprocessor: {
            // Wrap some source files with basic definitions in an IIFE before running tests.
            template: '(function(window, document, undefined) {\'use strict\'; <%= contents %> })(window, document);'
        },

        // Code coverage reporter options.
        coverageReporter: {
            reporters: [{
                type: 'text'
            }, {
                type : 'html',
                dir : 'pagesDist/coverage',
                subdir: '.'
            }]
        },

        // Web server port.
        port: 9876,

        // Enable / disable colors in the output (reporters and logs).
        colors: true,

        // Level of logging.
        // Possible values:
        // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG.
        logLevel: config.LOG_INFO,

        // Enable / disable watching file and executing tests whenever any file changes.
        autoWatch: false,

        // Start these browsers.
        // Available browser launchers: https://npmjs.org/browse/keyword/karma-launcher.
        browsers: ['PhantomJS', 'Chrome'],

        // Continuous Integration mode.
        // If true, Karma captures browsers, runs the tests and exits.
        singleRun: true
    });
};
