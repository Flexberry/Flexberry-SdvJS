(function(){
    var tool = {
        // Tool default options;
        defaultOptions: {
            data: {},
            cloneData: false,
            preprocessData: function (data) {
                return false;
            },
            mode: 'default',
            modeOptions: undefined
        },

        // Tool validate options method.
        validateOptions: function (options) {
            var validationResult = SDV.Util.Validation.validateOptions([{
                optionName: 'cloneData',
                optionFullName: 'options.cloneData',
                isRequired: false,
                allowedTypes: ['Boolean'],
                replaceWithDefaultIfUndefined: true
            }, {
                optionName: 'preprocessData',
                optionFullName: 'options.preprocessData',
                isRequired: false,
                allowedTypes: ['Function'],
                replaceWithDefaultIfUndefined: false
            }, {
                optionName: 'mode',
                optionFullName: 'options.mode',
                isRequired: false,
                allowedTypes: ['String'],
                allowedValues: this.Mode.getNames(),
                replaceWithDefaultIfUndefined: true
            }, {
                optionName: 'modeOptions',
                optionFullName: 'options.modeOptions',
                isRequired: false,
                allowedTypes: ['Object']
            }], options, this.defaultOptions);

            if (!validationResult.isValid) {
                // Something goes wrong. Given options are invalid.
                // We should break method execution.
                throw new Error(validationResult.message);
            }

            return validationResult;
        },

        // Tool validate data method.
        validateData: function (options) {
            options = options || {};
            var validationResult = SDV.Util.Validation.validateOptions([{
                optionName: 'data',
                optionFullName: 'options.data',
                isRequired: true,
                allowedTypes: ['Object'],
                postValidationMethod: function (data) {
                    // By default, GeoJSON data expected. We should check if given object is valid GeoJSON.
                    return SDV.Util.Geojson.validate(data);
                },
                postValidationMethodOptions: options.data
            }], options);

            if (!validationResult.isValid) {
                // Something goes wrong. Given data is invalid.
                // We should break method execution.
                throw new Error(validationResult.message);
            }

            return validationResult;
        },

        // Tool preprocess data method.
        preprocess: function (options) {
            options = options || {};

            // Given options and data are valid.
            // We can clone given data (so as not to screw up the original).
            var preprocessedData = options.cloneData ? SDV.Util.Json.parse(SDV.Util.Json.stringify(options.data)) : options.data;

            // Preprocess given data.
            var dataPreprocessingMethod = options.preprocessData;
            if (SDV.Util.Function.isFunction(dataPreprocessingMethod)) {
                dataPreprocessingMethod(preprocessedData)
            }

            return preprocessedData;
        },

        // Tool process data method (this method should handle preprocessed data with chosen mode).
        process: function (options, preprocessedData) {
            options = options || {};
            var modeMethod = this.Mode.getMethod(options.mode);

            if (SDV.Util.Function.isFunction(modeMethod)) {
                return modeMethod(preprocessedData, options.modeOptions);
            }
        },

        // Tool postprosess data method
        // (this method should handle data and procession results, and should transform them to the final results view).
        postprocess: function (options, preprocessedData, processionResults) {
            return processionResults;
        }
    };

    tool.extend = function(toolOptions) {
        toolOptions = toolOptions || {};

        var defaultOptionsExtended = SDV.Util.Object.isObject(toolOptions.defaultOptions)
            ? toolOptions.defaultOptions
            : this.defaultOptions;

        var validateOptionsExtended = SDV.Util.Function.isFunction(toolOptions.validateOptions)
            ? toolOptions.validateOptions
            : this.validateOptions;

        var validateDataExtended = SDV.Util.Function.isFunction(toolOptions.validateData)
            ? toolOptions.validateData
            : this.validateData;

        var preprocessExtended = SDV.Util.Function.isFunction(toolOptions.preprocess)
            ? toolOptions.preprocess
            : this.preprocess;

        var processExtended = SDV.Util.Function.isFunction(toolOptions.process)
            ? toolOptions.process
            : this.process;

        var postprocessExtended = SDV.Util.Function.isFunction(toolOptions.postprocess)
            ? toolOptions.postprocess
            : this.postprocess;

        // Tool itself (static method returning handled data).
        var toolExtended = function(options) {
            var optionsValidationResult = validateOptionsExtended.call(toolExtended, options);
            var dataValidationResult = validateDataExtended.call(toolExtended, options);
            var preprocessedData = preprocessExtended.call(toolExtended, options);
            var processionResults = processExtended.call(toolExtended, options, preprocessedData);
            var results = postprocessExtended.call(toolExtended, options, preprocessedData, processionResults);

            return results;
        };

        // Tool static members.
        toolExtended.defaultOptions = defaultOptionsExtended;
        toolExtended.validateOptions = validateOptionsExtended;
        toolExtended.validateData = validateDataExtended;
        toolExtended.preprocess = preprocessExtended;
        toolExtended.process = processExtended;
        toolExtended.postprocess = postprocessExtended;
        toolExtended.extend = this.extend;

        var mode ={};

        toolExtended.Mode = {
            extend: function(toolModeOptions) {
                var validationResult = SDV.Util.Validation.validateOptions([{
                    optionName: 'name',
                    optionFullName: 'toolModeOptions.name',
                    isRequired: true,
                    allowedTypes: ['String']
                }, {
                    optionName: 'method',
                    optionFullName: 'toolModeOptions.method',
                    isRequired: true,
                    allowedTypes: ['Function']
                }], toolModeOptions);

                if (!validationResult.isValid) {
                    throw  new Error(validationResult.message);
                }

                mode[toolModeOptions.name] = toolModeOptions.method;
            },
            contains: function (modeName) {
                return SDV.Util.String.isString(modeName) && mode.hasOwnProperty(modeName);
            },
            getNames: function () {
                return SDV.Util.Object.getPropertiesNames(mode);
            },
            getMethod: function(modeName) {
                if (SDV.Util.String.isString(modeName)) {
                    return mode[modeName];
                }
            }
        };

        return toolExtended;
    };

    /**
     * Base and abstract analysis tool. Other tools must be a base tool extensions.
     * @memberof SDV.Tool
     */
    SDV.Tool.base = tool.extend();

    // Default base tool mode.
    SDV.Tool.base.Mode.extend({name: 'default', method: function(data, modeOptions){ return data; }});
})();