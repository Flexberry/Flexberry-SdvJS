/**
 * Base namespace for SDV.js library GEOJSON utils.
 * All supporting GEOJSON utils are accessible through it.
 * @see {@link http://geojson.org/geojson-spec.html|Learn about GEOJSON data format.}
 * @namespace SDV.Util.Geojson
 * @memberof SDV.Util
 */
SDV.Util.Geojson = {
};

// Using closure for SDV.Util.Geojson methods assigning, to hide some private members.
(function() {
    var geometryGeoObjectsTypes = [
        'Point',
        'MultiPoint',
        'LineString',
        'MultiLineString',
        'Polygon',
        'MultiPolygon'
    ];

    var allGeoObjectsTypes = geometryGeoObjectsTypes.concat(['GeometryCollection', 'Feature', 'FeatureCollection']);

    var validateCommonPropertiesInGeoObject = function(geoObject, allowNullGeoObject, allowedGeoTypes, geoObjectName) {
        geoObjectName = geoObjectName || 'geoObject';

        var allowedTypes = ['Object'];
        if (allowNullGeoObject) {
            allowedTypes.push('Null');
        }

        // First of all, received geoObject must be a defined plain object (or null if allowed).
        var validationResult = SDV.Util.Validation.validateOption({
            optionName: geoObjectName,
            isRequired: true,
            allowedTypes: allowedTypes
        }, geoObject);

        if (!validationResult.isValid) {
            return validationResult;
        }

        // Property 'type' is required for all geoObjects.
        // The value of the 'type' member must one of the following strings: 'Point', 'MultiPoint', 'LineString',
        // 'MultiLineString', 'Polygon', 'MultiPolygon' for geometry geoObject.
        // Or 'GeometryCollection' for geometry collection object,
        // or 'Feature' for feature object, or 'FeatureCollection' for feature collection object.
        // Property 'bbox' is optional.
        // The value of the 'bbox' member must be a 2*n decimal numbers array,
        // where n is the number of dimensions represented in the contained geometries (n > 0).
        validationResult = SDV.Util.Validation.validateOptions([{
            optionName: 'type',
            optionFullName: geoObjectName + '.type',
            isRequired: true,
            allowedTypes: ['String'],
            allowedValues: allowedGeoTypes
        }, {
            optionName: 'bbox',
            optionFullName: geoObjectName + '.bbox',
            isRequired: false,
            allowedTypes: ['NumberArray'],
            postValidationMethod: function(bbox) {
                var result = {
                    isValid: true,
                    message: ''
                };

                if (SDV.Util.Number.isOdd(bbox.length)) {
                    result.isValid = false;
                    result.message = SDV.Localization.getResource('wrongParameterValueError')({
                        parameterName: geoObjectName + '.bbox.length',
                        allowedValues: '2*n, n > 0',
                        actualValue: bbox.length
                    });
                }

                return result;
            },
            postValidationMethodOptions: geoObject.bbox
        }], geoObject);

        return validationResult;
    };

    var validateCrsInGeoObject = function(geoObject, geoObjectName) {
        geoObjectName = geoObjectName || 'geoObject';

        // First of all, received geoObject must be a defined plain object.
        var validationResult = SDV.Util.Validation.validateOption({
            optionName: geoObjectName,
            isRequired: true,
            allowedTypes: ['Object']
        }, geoObject);

        if (!validationResult.isValid) {
            return validationResult;
        }

        // GeoJSON object can contain optional 'crs' member which must be a plain object or null.
        validationResult = SDV.Util.Validation.validateOptions([{
            optionName: 'crs',
            optionFullName: geoObjectName + '.crs',
            isRequired: false,
            allowedTypes: ['Null', 'Object'],
            postValidationMethod: function(crs) {
                var result = {
                    isValid: true,
                    message: ''
                };

                if (crs !== null) {
                    // A non-null 'crs' object has two mandatory members: 'type' and 'properties'.
                    // The value of the 'type' member must be a string, indicating the type of CRS object.
                    // Member 'type' can be 'name' or 'link'.
                    // Member 'properties' must be a plain object.
                    result = SDV.Util.Validation.validateOptions([{
                        optionName: 'type',
                        optionFullName: geoObjectName + '.crs.type',
                        isRequired: true,
                        allowedTypes: ['String'],
                        allowedValues: ['name', 'link']
                    }, {
                        optionName: 'properties',
                        optionFullName: geoObjectName + '.crs.properties',
                        isRequired: true,
                        allowedTypes: ['Object']
                    }], crs);

                    if (!result.isValid) {
                        return result;
                    }

                    if (crs.type === 'link') {
                        // if 'type' == 'link' then properties object has one required member:
                        // 'href', and one optional member: 'type'.
                        // The value of the required 'href' member must be a string representing a dereferenceable URI.
                        // The value of the optional 'type' member must be a string that hints at the format
                        // used to represent CRS parameters at the provided URI.
                        // Suggested values are: 'proj4', 'ogcwkt', 'esriwkt', but others can be used.
                        result = SDV.Util.Validation.validateOptions([{
                            optionName: 'href',
                            optionFullName: geoObjectName + '.crs.properties.href',
                            isRequired: true,
                            allowedTypes: ['String']
                        }, {
                            optionName: 'type',
                            optionFullName: geoObjectName + '.crs.properties.type',
                            isRequired: false,
                            allowedTypes: ['String']
                        }], crs.properties);
                    } else if (crs.type === 'name') {
                        // if 'type' == 'name' then 'properties' could only be: {name: 'stringed crs name'}.
                        result = SDV.Util.Validation.validateOptions([{
                            optionName: 'name',
                            optionFullName: geoObjectName + '.crs.properties.name',
                            isRequired: true,
                            allowedTypes: ['String']
                        }], crs.properties);
                    }
                }

                return result;
            },
            postValidationMethodOptions: geoObject.crs
        }], geoObject);

        return validationResult;
    };

    var validateGeometryGeoObject = function (geoObject, allowNullGeoObject, geoObjectName) {
        geoObjectName = geoObjectName || 'geoObject';

        // Validate geoObject, its 'type' and 'bbox'.
        var validationResult = validateCommonPropertiesInGeoObject(geoObject, allowNullGeoObject, geometryGeoObjectsTypes, geoObjectName);

        if (!validationResult.isValid) {
            return validationResult;
        }

        // Property 'coordinates' is required for geometry, and it could be simple or multidimensional array
        // (depending on the geometry type).
        // Coordinates arrays could be very large, so we would not check them thoroughly.
        // If 'coordinates' member is defined, and it is array, that is enough for superficially validation.
        validationResult = SDV.Util.Validation.validateOptions([{
            optionName: 'coordinates',
            optionFullName: geoObjectName  + '.coordinates',
            isRequired: true,
            allowedTypes: ['Array']
        }], geoObject);

        return validationResult;
    };

    var validateGeometryCollectionGeoObject = function(geoObject, geoObjectName) {
        geoObjectName = geoObjectName || 'geoObject';

        // A GeoObject with type 'GeometryCollection' is a geometry object which represents a collection of geometry objects.

        // Validate geoObject, its 'type' and 'bbox'.
        var validationResult = validateCommonPropertiesInGeoObject(geoObject, false, ['GeometryCollection'], geoObjectName);

        if (!validationResult.isValid) {
            return validationResult;
        }

        // A geometry collection must have a member with the name 'geometries'.
        // The value corresponding to 'geometries' is an array.
        validationResult = SDV.Util.Validation.validateOptions([{
            optionName: 'geometries',
            optionFullName: geoObjectName + '.geometries',
            isRequired: true,
            allowedTypes: ['Array'],
            postValidationMethod: function(geometries) {
                var result = {
                    isValid: true,
                    message: ''
                };

                // Each element in the geometries array must be a geometry geoObject.
                for (var i = 0, len = geometries.length; i < len; i++) {
                    result = validateGeometryGeoObject(geometries[i], false, geoObjectName + '.geometries[' + i + ']');

                    if (!result.isValid) {
                        return result;
                    }
                }

                return result;
            },
            postValidationMethodOptions: geoObject.geometries
        }], geoObject);

        return validationResult;
    };

    var validateFeatureGeoObject = function(geoObject, geoObjectName) {
        geoObjectName = geoObjectName || 'geoObject';

        // A GeoJSON object with the type 'Feature' is a feature geoObject.

        // Validate geoObject, its 'type' and 'bbox'.
        var validationResult = validateCommonPropertiesInGeoObject(geoObject, false, ['Feature'], geoObjectName);

        if (!validationResult.isValid) {
            return validationResult;
        }

        // A feature must have a member with the name 'geometry'.
        // The value of the geometry member must be a geometry geoObject or null.
        validationResult = validateGeometryGeoObject(geoObject.geometry, true, geoObjectName + '.geometry');

        if (!validationResult.isValid) {
            return validationResult;
        }

        // Feature geoObject must have a member with the name 'properties'.
        // The value of the 'properties' member must be a plain object or null.
        validationResult = SDV.Util.Validation.validateOption({
            optionName: 'properties',
            fullOptionName: geoObjectName + '.properties',
            isRequired: true,
            allowedTypes: ['Null', 'Object']
        }, geoObject);

        return validationResult;
    };

    var validateFeatureCollectionGeoObject = function(geoObject, geoObjectName) {
        geoObjectName = geoObjectName || 'geoObject';

        // A geoObject with the type 'FeatureCollection' is a feature collection object.

        // Validate geoObject, its 'type' and 'bbox'.
        var validationResult = validateCommonPropertiesInGeoObject(geoObject, false, ['FeatureCollection'], geoObjectName);

        if (!validationResult.isValid) {
            return validationResult;
        }

        // An object of type 'FeatureCollection' must have a member with the name 'features'.
        // The value corresponding to 'features' is an array.
        validationResult = SDV.Util.Validation.validateOptions([{
            optionName: 'features',
            optionFullName: geoObjectName + '.features',
            isRequired: true,
            allowedTypes: ['Array'],
            postValidationMethod: function(features) {
                var result = {
                    isValid: true,
                    message: ''
                };

                // Each element in the array must be a 'Feature' geoObject.
                for (var i = 0, len = features.length; i < len; i++) {
                    result = validateFeatureGeoObject(features[i], geoObjectName + '.features[' + i + ']');

                    if (!result.isValid) {
                        return result;
                    }
                }

                return result;
            },
            postValidationMethodOptions: geoObject.features
        }], geoObject);

        return validationResult;
    };

    var geoObjectValidationFunction = {
        'Point': validateGeometryGeoObject,
        'MultiPoint': validateGeometryGeoObject,
        'LineString': validateGeometryGeoObject,
        'MultiLineString': validateGeometryGeoObject,
        'Polygon': validateGeometryGeoObject,
        'MultiPolygon': validateGeometryGeoObject,
        'GeometryCollection': validateGeometryCollectionGeoObject,
        'Feature': validateFeatureGeoObject,
        'FeatureCollection': validateFeatureCollectionGeoObject
    };

    /**
     * Checks whether a given object is a {@link http://geojson.org/geojson-spec.html|valid GeoJSON object}.
     * @memberof SDV.Util.Geojson
     * @public
     * @function
     * @param {object} geoJsonObject Inspected object.
     * @param {Array} [allowedGeoObjectTypes] Allowed geoObjectTypes for inspected object (all types are allowed by default).
     * @returns {optionsValidationResult} Returns object contains validation results.
     *
     * @example
     * // It will return { isValid: false, message: 'Error. Required parameter 'geoJsonObject' is undefined.' }.
     * SDV.Util.Geojson.validate();
     *
     * // It will return {
     * //   isValid: false,
     * //   message: 'Error. Parameter 'geoJsonObject' must be of type 'Object', but not of type '[object Null]'.'
     * // }.
     * SDV.Util.Geojson.validate(null); // Same logic for all types except plain object [object Object].
     *
     * // It will return {
     * //   isValid: false,
     * //   message: 'Error. Required parameter 'geoJsonObject.type' is undefined.'
     * // }.
     * SDV.Util.Geojson.validate({});
     *
     * // It will return {
     * //   isValid: false,
     * //   message: 'Error. Parameter 'geoJsonObject.type' must have one of the following values:
     * //       'Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon', 'GeometryCollection',
     * //       'Feature', 'FeatureCollection'. This value is not allowed: 'MyType'.'
     * // }.
     * SDV.Util.Geojson.validate({type: 'MyType'});
     *
     * // It will return { isValid: false, message: 'Error. Required parameter 'geoObject.coordinates' is undefined.' }.
     * SDV.Util.Geojson.validate({type: 'Point'});
     *
     * // It will return { isValid: true, message: '' }.
     * SDV.Util.Geojson.validate({type: 'Point', coordinates: [100.0, 0.0]});
     */
    var validate = function(geoJsonObject, allowedGeoObjectTypes) {
        var geoObjectName = 'geoJsonObject';


        var allGeoObjectTypes = SDV.Util.Object.getPropertiesNames(geoObjectValidationFunction);

        // Validate allowedGeoObjectTypes if defined.
        var validationResult = SDV.Util.Validation.validateOption({
            optionName: 'allowedGeoObjectTypes',
            isRequired: false,
            allowedTypes: ['StringArray'],
            postValidationMethod: function() {
                var result = {
                    isValid: true,
                    message: ''
                };

                if (typeof allowedGeoObjectTypes !== 'undefined') {
                    // Each element in the given allowedGeoObjectTypes array must be a valid GeoJSON-type.
                    for (var i = 0, len = allowedGeoObjectTypes.length; i < len; i++) {
                        result = SDV.Util.Validation.validateOption({
                            optionName: 'allowedGeoObjectTypes[' + i + ']',
                            isRequired: true,
                            allowedTypes: ['String'],
                            allowedValues: allGeoObjectTypes
                        }, allowedGeoObjectTypes[i]);

                        if (!result.isValid) {
                            return result;
                        }
                    }
                }

                return result;
            }
        }, allowedGeoObjectTypes);

        if (!validationResult.isValid) {
            return validationResult;
        }

        // Validate geoJsonObject common properties (its 'type' and 'bbox').
        validationResult = validateCommonPropertiesInGeoObject(
            geoJsonObject,
            false,
            allGeoObjectTypes,
            geoObjectName
        );

        if (!validationResult.isValid) {
            return validationResult;
        }

        // Make 'type'-related specific validation.
        if (geoObjectValidationFunction.hasOwnProperty(geoJsonObject.type)) {
            validationResult = geoObjectValidationFunction[geoJsonObject.type](geoJsonObject, geoObjectName);
        } else {
            validationResult = false;
            validationResult.message = SDV.Localization.getResource('wrongParameterValueError')({
                parameterName: geoObjectName + '.type',
                actualValue: geoJsonObject.type,
                allowedValues: allGeoObjectTypes
            });
        }

        if (!validationResult.isValid) {
            return validationResult;
        }

        // Validate optional 'crs' member.
        validationResult = validateCrsInGeoObject(geoJsonObject, geoObjectName);

        return validationResult;
    };

    /**
     * Checks whether a given object is a {@link http://geojson.org/geojson-spec.html|valid GeoJSON object}.
     * @memberof SDV.Util.Geojson
     * @public
     * @function
     * @param {object} obj Inspected object.
     * @returns {boolean} Returns true if inspected object is a valid GEOJSON object, otherwise returns false.
     *
     * @example
     * SDV.Util.Geojson.isGeojson(); // false.
     * SDV.Util.Geojson.isGeojson(null); // false.
     * SDV.Util.Geojson.isGeojson('This is a string'); // false.
     * SDV.Util.Geojson.isGeojson(1); // false.
     * SDV.Util.Geojson.isGeojson([1]); // false.
     * SDV.Util.Geojson.isGeojson(function(){return 1;}); // false.
     * SDV.Util.Geojson.isGeojson({one: 1}); // false.
     * SDV.Util.Geojson.isGeojson({type: 'Point', coordinates: [100.0, 0.0]}); // true.
     */
    var isGeojson = function(obj) {
        return validate(obj).isValid;
    };

    /**
     * Gets array of geo-objects contained in given GeoJSON object.
     * @memberof SDV.Util.Geojson
     * @public
     * @function
     * @param {object} geoJsonObject GeoJSON object of interest.
     * @param {boolean} validationNeeded Flag: indicates whether preliminary validation of given object is needed or not.
     * @returns {boolean} Returns array of geo-objects contained in given GeoJSON object.
     *
     * @example
     * SDV.Util.Geojson.getGeoObjects(); // []. And error message in console, about invalid GeoJSON.
     * SDV.Util.Geojson.getGeoObjects(null); // []. And error message in console, about invalid GeoJSON.
     * SDV.Util.Geojson.getGeoObjects('This is a string'); // []. And error message in console, about invalid GeoJSON.
     * SDV.Util.Geojson.getGeoObjects(1); // []. And error message in console, about invalid GeoJSON.
     * SDV.Util.Geojson.getGeoObjects([1]); // []. And error message in console, about invalid GeoJSON.
     * SDV.Util.Geojson.getGeoObjects(function(){ return 1; }); // []. And error message in console, about invalid GeoJSON.
     * SDV.Util.Geojson.getGeoObjects({}); // []. And error message in console, about invalid GeoJSON.
     *
     * // [{type: 'Point', coordinates: [0.0, 1.0]}].
     * SDV.Util.Geojson.getGeoObjects({
     *      type: 'Point',
     *      coordinates: [0.0, 1.0]
     * });
     *
     * // [{type: 'MultiPoint', coordinates: [[0.0, 1.0], [0.0, 2.0]]}].
     * SDV.Util.Geojson.getGeoObjects({
     *      type: 'MultiPoint',
     *      coordinates: [[0.0, 1.0]]
     * });
     *
     * // [{type: 'LineString', coordinates: [[0.0, 1.0], [0.0, 2.0]]}].
     * SDV.Util.Geojson.getGeoObjects({
     *      type: 'LineString',
     *      coordinates: [[0.0, 1.0], [0.0, 2.0]]
     * });
     *
     * // [{type: 'MultiLineString', coordinates: [[[0.0, 1.0], [0.0, 2.0]], [[0.0, 1.0], [0.0, 3.0]]]}].
     * SDV.Util.Geojson.getGeoObjects({
     *      type: 'MultiLineString',
     *      coordinates: [[[0.0, 1.0], [0.0, 2.0]], [[0.0, 1.0], [0.0, 3.0]]]
     * });
     *
     * // [{type: 'Polygon', coordinates: [[[1.0, 0.0], [2.0, 0.0], [2.0, 1.0]]]}].
     * SDV.Util.Geojson.getGeoObjects({
     *      type: 'Polygon',
     *      coordinates: [[[1.0, 0.0], [2.0, 0.0], [2.0, 1.0]]]
     * });
     *
     * // [{type: 'MultiPolygon', coordinates: [[[[1.0, 0.0], [2.0, 0.0], [2.0, 1.0]]], [[[3.0, 0.0], [4.0, 0.0], [4.0, 1.0]]]]}].
     * SDV.Util.Geojson.getGeoObjects({
     *      type: 'MultiPolygon',
     *      coordinates: [[[[1.0, 0.0], [2.0, 0.0], [2.0, 1.0]]], [[[3.0, 0.0], [4.0, 0.0], [4.0, 1.0]]]]
     * });
     *
     * // [{type: 'Point', coordinates: [0.0, 1.0]}, {type: 'Point', coordinates: [0.0, 2.0]}].
     * SDV.Util.Geojson.getGeoObjects({
     *      type: 'GeometryCollection',
     *          geometries: [{
     *              type: 'Point',
     *              coordinates: [0.0, 1.0]
     *          }, {
     *              type: 'Point',
     *              coordinates: [0.0, 2.0]
     *          }]
     * });
     *
     * // [{type: 'Feature', geometry: {type: 'Point', coordinates: [0.0, 1.0]}, properties: {property1: 1, property2: 2}}].
     * SDV.Util.Geojson.getGeoObjects({
     *      type: 'Feature',
     *      geometry: {
     *          type: 'Point',
     *          coordinates: [0.0, 1.0]
     *      },
     *      properties: {
     *          property1: 1,
     *          property2: 2
     *      }
     * });
     *
     * // [{type: 'Feature', geometry: {type: 'Point', coordinates: [0.0, 1.0]}, properties: {property1: 1, property2: 2}},
     * //  {type: 'Feature', geometry: {type: 'Point', coordinates: [0.0, 2.0]}, properties: {property1: '1', property2: '2'}}].
     * SDV.Util.Geojson.getGeoObjects({
     *      type: 'FeatureCollection',
     *      features: [{
     *          type: 'Feature',
     *          geometry: {
     *              type: 'Point',
     *              coordinates: [0.0, 1.0]
     *          },
     *          properties: {
     *              property1: 1,
     *              property2: 2
     *          }
     *      }, {
     *          type: 'Feature',
     *          geometry: {
     *              type: 'Point',
     *              coordinates: [0.0, 2.0]
     *          },
     *          properties: {
     *              property1: '1',
     *              property2: '2'
     *          }
     *      }]
     * });
     */
    var getGeoObjects = function(geoJsonObject, validationNeeded) {
        var result = [];

        // Don't validate given object only if validationNeeded === false.
        validationNeeded = validationNeeded !== false;

        if (validationNeeded) {
            var validationResult = validate(geoJsonObject);

            if (!validationResult.isValid) {
                console.error(validationResult.message);
            }
        }

        if (SDV.Util.Array.contains(geometryGeoObjectsTypes, geoJsonObject.type) || geoJsonObject.type === 'Feature') {
            // If given GeoJSON object is geometry geoObject or a feature, then we should just push it to result array.
            result.push(geoJsonObject);
        } else if (geoJsonObject.type === 'GeometryCollection') {
            // If given GeoJSON object is GeometryCollection then we should just return its 'geometries' member as result.
            result = geoJsonObject.geometries;
        } else if (geoJsonObject.type === 'FeatureCollection') {
            // If given GeoJSON object is FeatureCollection then we should just return its 'features' member as result.
            result = geoJsonObject.features;
        }

        return result;
    };

    // Assign public methods to SDV.Util.Geojson namespace.
    SDV.Util.Geojson.validate = validate;
    SDV.Util.Geojson.isGeojson = isGeojson;
    SDV.Util.Geojson.getGeoObjects = getGeoObjects;
})();