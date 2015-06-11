/**
 * Analysis by categories tool (choropleth tool).
 * It can apply GeoJSON data and divide its features into several categories, according to the specified mode and mode options.
 * @public
 * @function
 * @memberof SDV.Tool
 *
 * @param {object} options Categorization options.
 * @param {object} options.data GeoJSON data (only 'Feature' and 'FeaturesCollection' types are allowed for choropleth tool).
 * @param {boolean} [options.cloneData = false] Flag: indicates whether to clone given data before recording analysis results into it.
 * If cloneData flag is true, then given data will be cloned before preprocessing, processing, and recording of the results,
 * otherwise same data object will be used, and results will be recorded into features of the same object.
 *
 * @param {function} options.preprocessor Method of data preprocessing.
 * This method will be called for each feature in given data, method applies three arguments:
 * feature (current feature),
 * featureIndex (index of current feature in whole features array),
 * featuresArray (array of all features).
 * This method could be used, for example, to compute some additional properties and push them inside features
 * (distance from each feature to some dynamicly defined point is a good example of usage).
 * To break preprocessing (to stop iteration over features) preprocessing method must return exactly false value.
 *
 * @param {string} options.mode Name of desirable mode, for example 'random', or 'manual'.
 * @param {object} options.modeOptions Specific mode options.
 *
 * @returns {object} Returns similar (or even same) GeoJSON data object, in which every feature contains following property:
 * feature.properties.sdv.choropleth = {category: '', style: {}}.
 */
SDV.Tool.choropleth = SDV.Tool.base.extend({
    // Choropleth default options.
    defaultOptions: {
        data: {},
        cloneData: false,
        preprocessor: function(feature, featureIndex, featuresArray) { return false; },
        mode: 'random',
        modeOptions: undefined
    },

    // Choropleth options validation method is the same as in the base tool.
    validateOptions: SDV.Tool.base.validateOptions,

    // Choropleth data validation method.
    validateData: function (options) {
        options = options || {};
        var validationResult = SDV.Util.Validation.validateOptions([{
            optionName: 'data',
            optionFullName: 'options.data',
            isRequired: true,
            allowedTypes: ['Object'],
            postValidationMethod: function (data) {
                // Check if given data is valid GeoJSON (only 'Feature', 'FeatureCollection' are allowed for choropleth tool).
                return SDV.Util.Geojson.validate(data, ['Feature', 'FeatureCollection']);
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

    // Choropleth data preprocessing method.
    preprocess: function (options) {
        options = options || {};

        // Given options and GeoJSON data are valid. We can clone given GeoJSON (so as not to screw up the original).
        var geojson = options.cloneData ? SDV.Util.Json.parse(SDV.Util.Json.stringify(options.data)) : options.data;

        // It would be easier to work with array of features then with whole GeoJSON object.
        var featuresArray = SDV.Util.Geojson.getGeoObjects(geojson, false);

        // Preprocess given data.
        var dataPreprocessingMethod = options.preprocessData;
        if (SDV.Util.Function.isFunction(dataPreprocessingMethod)) {
            SDV.Util.Array.each(featuresArray, dataPreprocessingMethod);
        }

        return {
            geojson: geojson,
            featuresArray: featuresArray
        };
    },

    // Choropleth data processing method (this method should handle preprocessed data with chosen mode).
    process: function (options, preprocessedData) {
        options = options || {};
        var modeMethod = this.Mode.getMethod(options.mode);

        // Do categorization.
        // Returned categorizationResults - it should be an array of such objects: {
        //      category: 'Some category name',
        //      style: {
        //          fill: {
        //              color: 'Some color hex code in 3/6-character dash notation as string',
        //              opacity: fill opacity (0...1)
        //          },
        //          stroke: {
        //              color: 'Some color hex code in 6-character dash notation as string',
        //              weight: stroke weight in pixels (0...),
        //              opacity: stroke opacity (0...1)
        //          }
        //      }
        // },
        // and each object in this array should be related to the same index feature in geoJsonFeatures array.
        if (SDV.Util.Function.isFunction(modeMethod)) {
            return modeMethod(preprocessedData.featuresArray, options.modeOptions);
        }
    },

    // Tool postprosess data method
    // (this method should handle data and procession results, and should transform them to the final results view).
    postprocess: function (options, preprocessedData, categorizationResults) {
        var geojson = preprocessedData.geojson;
        var featuresArray = preprocessedData.featuresArray;

        if (!SDV.Util.Array.isArray(categorizationResults)) {
            categorizationResults = [];
        }

        SDV.Util.Array.each(featuresArray, function(feature, featureIndex) {
            // Places categorization results into features properties (feature.properties.sdv.choropleth).
            var properties = feature.properties = SDV.Util.Object.isObject(feature.properties) ? feature.properties : {};
            var sdv = properties.sdv = SDV.Util.Object.isObject(properties.sdv) ? properties.sdv : {};
            var choropleth = sdv.choropleth = categorizationResults[featureIndex];

            if (!SDV.Util.Object.isObject(choropleth)) {
                choropleth = null;
            }
        });

        // Categorization finished.
        // Now we can return results.
        if (geojson.type === 'Feature') {
            geojson.properties = featuresArray[0].properties;
        } else if (geojson.type === 'FeatureCollection') {
            geojson.features = featuresArray;
        }

        return geojson;
    }
});