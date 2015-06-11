/*! SDV.js (Spatial Data Visualization) version 0.1.0-dev.
    A JS library for spatial data analysis and visualization on interactive web maps.
    Builded 2015-06-11.
 */
(function(window, document, undefined) {
    'use strict';

    /**
     * Base namespace for SDV.js library.
     * All library facilities are accessible through it.
     * @global
     * @namespace
     */
    var SDV = {
        /**
         * Current library version.
         * @member {string}
         */
        version: '0.1.0',
    
        /**
         * Library name.
         * @member {string}
         */
        name: 'SDV.js'
    };
    
    /**
     * Defines spatial data visualization namespace object (SDV) globally, and stores previously existing SDV object.
     * @memberof SDV
     * @public
     * @function
     */
    SDV.defineSdv = function() {
        var existingSdv = window.SDV;
    
        /**
         * Returns spatial data visualization namespace object (SDV) locally, and assigns stored,
         * previously existing SDV object to window.SDV.
         * Allows to use spatial data visualization library without conflicts with another libraries
         * having the same global namespace.
         * @memberof SDV
         * @public
         * @function
         * @returns {object} Object which points to spatial data visualization namespace.
         *
         * @example
         * // If you use other library which points to SDV as its global namespace, you can avoid such problem.
         * // Before usage of SDV.js facilities you can assign its global namespace to a local variable as follows:
         * var sdvjs = SDV.noConflict();
         *
         * // Now sdvjs variable points to SDV.js library global namespace, and SDV points to that other library namespace.
         * // So you can use SDV.js facilities through a local variable as follows:
         * console.log('Current SDV.js version is ' + sdvjs.version);
         */
        SDV.noConflict = function () {
            window.SDV = existingSdv;
            return this;
        };
    
        window.SDV = SDV;
    };
    
    // Defines SDV as a global variable, storing the already existing SDV-object in order
    // to be able to restore it later if needed.
    if (window !== undefined) {
        SDV.defineSdv();
    }
    
    

    /**
     * Base namespace for SDV.js library utils.
     * All supporting library utils are accessible through it.
     * @namespace SDV.Util
     * @memberof SDV
     */
    SDV.Util = {};

    /**
     * Base namespace for SDV.js library validation utils.
     * All supporting validation utils are accessible through it.
     * @namespace SDV.Util.Validation
     * @memberof SDV.Util
     */
    SDV.Util.Validation = {
        /**
         * Option validation result.
         * @memberof SDV.Util.Validation
         * @typedef {object} optionValidationResult
         * @property {boolean} isValid Flag: represents if checked option is valid.
         * @property {boolean} isDefined Flag: represents if checked option is defined.
         * @property {string} message Message with error information if option is invalid, otherwise it will be an empty string.
         */
    
        /**
         * Options validation result.
         * @memberof SDV.Util.Validation
         * @typedef {object} optionsValidationResult
         * @property {boolean} isValid Flag: represents if checked option is valid.
         * @property {string} message Message with error information if option is invalid, otherwise it will be an empty string.
         */
    
        /**
         * Options contains validation rules.
         * @memberof SDV.Util.Validation
         * @typedef {object} validationOptions
         * @property {string} validationOptions.optionName Name of validating option.
         * @property {string} [validationOptions.optionFullName] Full name of validating option
         * (will be used instead of optionName in error message if option is invalid).
         *
         * @property {boolean} [validationOptions.isRequired = false] Flag: represents if given option is required.
         * @property {string[]} [validationOptions.allowedTypes = []] Array of type names allowed for given option
         * (allowed values for this option are following:
         * 'String', 'Number', 'Integer', 'Boolean', 'Function', 'Object', 'Null', 'Array',
         * 'StringArray' ,'NumberArray', 'IntegerArray', 'BooleanArray', 'FunctionArray', 'ObjectArray', 'ObjectOrNullArray').
         * By default all types are allowed.
         *
         * @property {object[]} [validationOptions.allowedValues = []] Array of type values allowed for given option.
         * By default all values are allowed.
         *
         * @property {number} [validationOptions.minValue] Minimum value allowed for given option (if option is numeric).
         * @property {number} [validationOptions.maxValue] Maximum value allowed for given option (if option is numeric).
         * @property {boolean} [validationOptions.minValueEqualityAllowed = false]
         * Flag: represents if value equals to given minValue is allowed.
         *
         * @property {boolean} [validationOptions.maxValueEqualityAllowed = false]
         * Flag: represents if value equals to given maxValue is allowed.
         *
         * @property {boolean} [validationOptions.replaceWithDefaultIfUndefined = false]
         * Flag: represents if it is possible to replace undefined option with predefined default value.
         *
         * @property {boolean} [validationOptions.replaceWithDefaultIfInvalid = false]
         * Flag: represents if it is possible to replace invalid option with predefined default value.
         *
         * @property {function} [validationOptions.postValidationMethod]
         * Custom method to be executed at the end of the validation process.
         * It should apply one parameter - value of the validation option,
         * and should return {@link optionsValidationResult} as its result.
         *
         * @property {*} [validationOptions.postValidationMethodOptions]
         * Options for postValidationMethod (method will be called with these options).
         */
    
        /** Validates given option with given validation rules.
         * @memberof SDV.Util.Validation
         * @public
         * @function
         *
         * @param {validationOptions} validationOptions Options contains validation rules.
         * @param {*} optionValue Value of validating option.
         *
         * @returns {optionValidationResult} Object contains validation results.
         *
         * @example
         * var httpMethodValidationOptions = {
         *      optionName: 'method',
         *      isRequired: true,
         *      allowedTypes: ['String'],
         *      allowedValues: ['GET', 'POST', 'PUT', 'DELETE']
         * };
         *
         * // It will return { isValid: false, isDefined: false, message: 'Error. Required parameter \'method\' is undefined.' }.
         * SDV.Util.Validation.validateOption(httpMethodValidationOptions);
         *
         * // It will return {
         * //    isValid: false,
         * //    isDefined: true,
         * //    message: 'Error. Parameter \'method\' must be of type \'[object String]\', but not of type \'[object Number]\'.'
         * // }.
         * SDV.Util.Validation.validateOption(httpMethodValidationOptions, 12345);
         *
         * // It will return {
         * //    isValid: false,
         * //    isDefined: true,
         * //    message: 'Error. Parameter \'method\' must have one of the following values: ' +
         * //             '\'GET\', \'POST\', \'PUT\', \'DELETE\'. This value is not allowed: \'MyHttpMethod\'.'
         * // }.
         * SDV.Util.Validation.validateOption(httpMethodValidationOptions, 'MyHttpMethod');
         *
         * // It will return { isValid: true, isDefined: true, message: '' }.
         * SDV.Util.Validation.validateOption(httpMethodValidationOptions, 'GET');
         */
        validateOption: function(validationOptions, optionValue) {
            var validationResult = {
                isValid: true,
                isDefined: typeof optionValue !== 'undefined',
                message: ''
            };
    
            var optionNameForErrorMessage = validationOptions.optionFullName || validationOptions.optionName;
    
            // If validation options are undefined, then option is valid anyway.
            if (typeof validationOptions === 'undefined') {
                return validationResult;
            }
    
            if (!validationResult.isDefined) {
                // Required option should be defined.
                if (validationOptions.isRequired) {
                    validationResult.isValid = false;
                    validationResult.message = SDV.Localization
                        .getResource('missingRequiredParameterError')(optionNameForErrorMessage);
                }
    
                return validationResult;
            }
    
            if (SDV.Util.Array.isArray(validationOptions.allowedTypes)) {
                // Defined option should have a valid type.
                var typeIsValid = true;
                var typeErrorMessage = '';
    
                var isTypedArray = function(obj, typeValidationFunction) {
                    if (!SDV.Util.Array.isArray(obj)) {
                        return false;
                    }
    
                    for (var i = 0, len = obj.length; i < len; i++) {
                        if (!typeValidationFunction(obj[i])) {
                            return false;
                        }
                    }
    
                    return true;
                };
    
                var typeValidationFunction = {
                    'String': SDV.Util.String.isString,
                    'Number': SDV.Util.Number.isNumber,
                    'Integer': SDV.Util.Number.isInteger,
                    'Boolean': SDV.Util.Boolean.isBoolean,
                    'Function': SDV.Util.Function.isFunction,
                    'Array': SDV.Util.Array.isArray,
                    'Object': SDV.Util.Object.isObject,
                    'Null': function(obj) { return SDV.Util.Object.isObject(obj, true); },
                    'StringArray': function(obj) { return isTypedArray(obj, SDV.Util.String.isString); },
                    'NumberArray': function(obj) { return isTypedArray(obj, SDV.Util.Number.isNumber); },
                    'IntegerArray': function(obj) { return isTypedArray(obj, SDV.Util.Number.isInteger); },
                    'BooleanArray': function(obj) { return isTypedArray(obj, SDV.Util.Boolean.isBoolean); },
                    'FunctionArray': function(obj) { return isTypedArray(obj, SDV.Util.Function.isFunction); },
                    'ObjectArray': function(obj) { return isTypedArray(obj, SDV.Util.Object.isObject); },
                    'ObjectOrNullArray': function(obj) {
                        return isTypedArray(obj, function(obj) { return SDV.Util.Object.isObject(obj, true); });
                    }
                };
    
                for (var i=0, len=validationOptions.allowedTypes.length; i<len; i++) {
                    var typeName = validationOptions.allowedTypes[i];
    
                    if (typeValidationFunction.hasOwnProperty(typeName)) {
                        if (typeValidationFunction[typeName](optionValue)) {
                            typeIsValid = true;
                            typeErrorMessage = '';
                            break;
                        } else {
                            typeIsValid = false;
                            typeErrorMessage = SDV.Localization.getResource('wrongParameterTypeError')({
                                parameterName: optionNameForErrorMessage,
                                actualValue: optionValue,
                                expectedType: validationOptions.allowedTypes
                            });
                        }
                    } else {
                        typeIsValid = false;
                        typeErrorMessage = SDV.Localization.getResource('wrongParameterValueError')({
                            parameterName: 'validationOptions.allowedTypes[' + i + ']',
                            actualValue: typeName,
                            allowedValues: SDV.Util.Object.getPropertiesNames(typeValidationFunction)
                        });
                    }
                }
    
                if (!typeIsValid) {
                    validationResult.isValid = false;
                    validationResult.message = typeErrorMessage;
    
                    return validationResult;
                }
            }
    
            // Defined option should have a valid value.
            var valueIsValid = true;
            var valueErrorMessage = '';
    
            if (SDV.Util.Number.isNumber(optionValue)) {
                if (typeof validationOptions.minValue != 'undefined') {
                    valueIsValid = validationOptions.minValueEqualityAllowed
                        ? optionValue >= validationOptions.minValue
                        : optionValue > validationOptions.minValue;
    
                    if (!valueIsValid) {
                        valueErrorMessage = SDV.Localization.getResource('wrongParameterValueError')({
                            parameterName: optionNameForErrorMessage,
                            actualValue: optionValue,
                            allowedValues: (validationOptions.minValueEqualityAllowed ? '>= ' : '> ') + validationOptions.minValue
                        });
                        validationResult.isValid = false;
                        validationResult.message = valueErrorMessage;
    
                        return validationResult;
                    }
                }
    
                if (typeof validationOptions.maxValue != 'undefined') {
                    valueIsValid = validationOptions.maxValueEqualityAllowed
                        ? optionValue <= validationOptions.maxValue
                        : optionValue < validationOptions.maxValue;
    
                    if (!valueIsValid) {
                        valueErrorMessage = SDV.Localization.getResource('wrongParameterValueError')({
                            parameterName: optionNameForErrorMessage,
                            actualValue: optionValue,
                            allowedValues: (validationOptions.maxValueEqualityAllowed ? '<= ' : '< ') + validationOptions.maxValue
                        });
                        validationResult.isValid = false;
                        validationResult.message = valueErrorMessage;
    
                        return validationResult;
                    }
                }
            }
    
            if (SDV.Util.Array.isArray(validationOptions.allowedValues)) {
                var allowedValuesLength = validationOptions.allowedValues.length;
                valueIsValid = (allowedValuesLength > 0 && SDV.Util.Array.contains(validationOptions.allowedValues, optionValue))
                    || allowedValuesLength == 0;
    
                if (!valueIsValid) {
                    valueErrorMessage = SDV.Localization.getResource('wrongParameterValueError')({
                        parameterName: optionNameForErrorMessage,
                        actualValue: optionValue,
                        allowedValues: validationOptions.allowedValues
                    });
                    validationResult.isValid = false;
                    validationResult.message = valueErrorMessage;
    
                    return validationResult;
                }
            }
    
            if (SDV.Util.Function.isFunction(validationOptions.postValidationMethod)) {
                var customValidationResult = validationOptions.postValidationMethod(validationOptions.postValidationMethodOptions);
    
                if (SDV.Util.Object.isObject(customValidationResult)) {
                    validationResult.isValid = customValidationResult.isValid === true;
                    validationResult.message = customValidationResult.message || '';
                }
            }
    
            return validationResult;
        },
    
        /** Validates given options-object with given set (array) of validation rules.
         * Unlike the {@link SDV.Util.Validation.validateOption} method,
         * this method allows to replace wrong or undefined options with given default values.
         * @memberof SDV.Util.Validation
         * @public
         * @function
         *
         * @param {validationOptions[]} validationOptions Array contains validation rules for each option.
         * @param {object} options Validating options.
         * @param {object} defaults Options default values.
         *
         * @returns {optionsValidationResult} Object contains validation results.
         *
         * @example
         * // Option 'method' is required, but 'timeout' is not.
         * var myValidationOptions = [{
         *      optionName: 'method',
         *      isRequired: true,
         *      allowedTypes: ['String'],
         *      allowedValues: ['GET', 'POST', 'PUT', 'DELETE']
         * }, {
         *      optionName: 'timeout',
         *      allowedTypes: ['Integer'],
         *      minValue: 0,
         *      minValueEqualityAllowed = true,
         *      replaceWithDefaultIfUndefined = true
         * }];
         *
         * // It will return { isValid: false, message: 'Error. Required parameter \'method\' is undefined.' }.
         * SDV.Util.Validation.validateOptions(myValidationOptions);
         *
         * // It will return {
         * //    isValid: false,
         * //    message: 'Error. Parameter \'method\' must be of type \'[object String]\', but not of type \'[object Number]\'.'
         * // }.
         * var options = { method: 12345 };
         * SDV.Util.Validation.validateOptions(myValidationOptions, options);
         *
         * // It will return {
         * //    isValid: false,
         * //    message: 'Error. Parameter \'method\' must have one of the following values: ' +
         * //             '\'GET\', \'POST\', \'PUT\', \'DELETE\'. This value is not allowed: \'MyHttpMethod\'.'
         * // }.
         * var options = { method: 'MyHttpMethod' };
         * SDV.Util.Validation.validateOptions(myValidationOptions, options);
         *
         * // It will return { isValid: true, message: '' }. And options will be equal to: { method: 'MyHttpMethod', timeout: 0 }.
         * var options = { method: 'GET' };
         * var defaults = { timeout: 0 };
         * SDV.Util.Validation.validateOptions(myValidationOptions, options, defaults);
         *
         * // It will return {
         * //    isValid: false,
         * //    message: 'Error. Parameter \'timeout\' must be of type \'[object Integer]\', but not of type \'[object Number]\'.'
         * // }.
         * var options = { method: 'GET', timeout: 2.5 };
         * SDV.Util.Validation.validateOptions(myValidationOptions, options);
         *
         * // It will return {
         * //    isValid: false,
         * //    message: 'Error. Parameter \'method\' must have one of the following values: >= 0'. This value is not allowed: -1.'
         * // }.
         * var options = { method: 'GET', timeout: -1 };
         * SDV.Util.Validation.s(myValidationOptions, options);
         *
         * // It will return { isValid: true, message: '' }.
         * var options = { method: 'GET', timeout: 1000 };
         * SDV.Util.Validation.validateOptions(myValidationOptions, options);
         */
        validateOptions: function(validationOptions, options, defaults) {
            var validationResult = {
                isValid: true,
                message: ''
            };
    
            if (typeof validationOptions === 'undefined') {
                return validationResult;
            }
    
            options = options || {};
    
            if (!SDV.Util.Object.isObject(options)) {
                validationResult.isValid = false;
                validationResult.message = SDV.Localization.getResource('wrongParameterTypeError')({
                    parameterName: 'options',
                    actualValue: options,
                    expectedType: '[object Object]'
                });
    
                return validationResult;
            }
    
            var defaultsAreDefined = typeof defaults !== 'undefined';
    
            for (var i=0, len=validationOptions.length; i<len; i++) {
                // Current validation rule.
                var currentValidationOption = validationOptions[i];
    
                // Validation result for current option.
                var currentValidationResult = SDV.Util.Validation.validateOption(
                    currentValidationOption,
                    options[currentValidationOption.optionName]);
    
                // We should validate given default value, and try to replace wrong or undefined option with it (if needed of course).
                if (defaultsAreDefined && ((currentValidationOption.replaceWithDefaultIfInvalid && !currentValidationResult.isValid)
                    || (currentValidationOption.replaceWithDefaultIfUndefined && !currentValidationResult.isDefined))) {
                    var currentDefaultValueValidationResult = SDV.Util.Validation.validateOption(
                        currentValidationOption,
                        defaults[currentValidationOption.optionName]);
    
                    if (currentDefaultValueValidationResult.isValid) {
                        options[currentValidationOption.optionName] = defaults[currentValidationOption.optionName];
                        currentValidationResult.isValid = true;
                        currentValidationResult.isDefined = typeof options[currentValidationOption.optionName] !== 'undefined';
                    } else {
                        // Default value for current option is wrong, so current option is wrong too.
                        validationResult = currentDefaultValueValidationResult;
                    }
                }
    
                if (!currentValidationResult.isValid) {
                    validationResult.isValid = false;
                    validationResult.message = currentValidationResult.message;
    
                    return validationResult;
                }
            }
    
            return validationResult;
        }
    };
    

    /**
     * Base namespace for SDV.js library boolean utils.
     * All supporting boolean utils are accessible through it.
     * @namespace SDV.Util.Boolean
     * @memberof SDV.Util
     */
    SDV.Util.Boolean = {
    
        /**
         * Checks whether a given object has boolean type.
         * @memberof SDV.Util.Boolean
         * @public
         * @function
         * @param {object} obj Inspected object.
         * @returns {boolean} Returns true if inspected object has boolean type, otherwise returns false.
         *
         * @example
         * SDV.Util.Boolean.isBoolean(); // false.
         * SDV.Util.Boolean.isBoolean(null); // false.
         * SDV.Util.Boolean.isBoolean(1); // false.
         * SDV.Util.Boolean.isBoolean([1]); // false.
         * SDV.Util.Boolean.isBoolean({one: 1}); // false.
         * SDV.Util.Boolean.isBoolean(function(){return 1;}); // false.
         * SDV.Util.Boolean.isBoolean('This is a string'); // true.
         * SDV.Util.Boolean.isBoolean(true); // true.
         * SDV.Util.Boolean.isBoolean(false); // true.
         * SDV.Util.Boolean.isBoolean(1>0); // true.
         */
        isBoolean: function (obj) {
            return (Object.prototype.toString.call(obj) === '[object Boolean]');
        }
    };
    

    /**
     * Base namespace for SDV.js library string utils.
     * All supporting string utils are accessible through it.
     * @namespace SDV.Util.String
     * @memberof SDV.Util
     */
    SDV.Util.String = {
    
        /**
         * Checks whether a given object is a string.
         * @memberof SDV.Util.String
         * @public
         * @function
         * @param {object} obj Inspected object.
         * @returns {boolean} Returns true if inspected object is a string, otherwise returns false.
         *
         * @example
         * SDV.Util.String.isString(); // false.
         * SDV.Util.String.isString(null); // false.
         * SDV.Util.String.isString(1); // false.
         * SDV.Util.String.isString([1]); // false.
         * SDV.Util.String.isString({one: 1}); // false.
         * SDV.Util.String.isString(function(){return 1;}); // false.
         * SDV.Util.String.isString('This is a string'); // true.
         * SDV.Util.String.isString(''); // true.
         */
        isString: function(obj) {
            return (Object.prototype.toString.call(obj) === '[object String]');
        },
    
        /**
         * Removes whitespace from both sides of a given string.
         * @memberof SDV.Util.String
         * @public
         * @function
         * @throws {SyntaxError} Will throw an error if the given parameter is not a string.
         *
         * @param  {string} str A string with some undesirable spaces on its sides.
         * @returns {string} Same string, but without spaces on both sides of it.
         *
         * @example
         * SDV.Util.String.trim('   This is a string   ') // Returns 'This is a string'.
         */
        trim: function(str) {
            return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
        },
    
        /**
         * Adds one string to another in given position/
         * @memberof SDV.Util.String
         * @public
         * @function
         * @throws {Error} Will throw an error if the given strings are not strings, or if given indexes are wrong.
         *
         * @param  {string} strDist A string to which ne substring will be added.
         * @param  {string} strSrc A new substring which need to be added in strDist.
         * @param  {number} start Index in strDist where will be the beginning of new substring.
         * @param  {number} [end] Index in strDist where will be the ending of new substring.
         * if this parameter is defined, then symbols of strDist from start to end will be replaced with new substring (strSrc),
         * otherwise strSrc will be simply inserted into strDist without replacing.
         *
         * @returns {string} New string with strSrc inserted into strDist.
         *
         * @example
         * SDV.Util.String.insert('ade', 'bc', 1) // Returns 'abcde'.
         * SDV.Util.String.insert('ade', 'bc', 1, 2) // Returns 'abc'.
         * SDV.Util.String.insert('adc', 'b', 1, 1) // Returns 'abc'. End is defined, and symbol 'd' was replaced.
         * SDV.Util.String.insert('ab', 'c', 2) // Returns 'abc'. Symbol 'c' was added to the end of string.
         */
        insert: function(strDist, strSrc, start, end) {
            var maxIndex = SDV.Util.String.isString(strDist) ? strDist.length : 0;
    
            var validationResult = SDV.Util.Validation.validateOptions([{
                optionName: 'strDist',
                isRequired: true,
                allowedTypes: ['String']
            }, {
                optionName: 'strSrc',
                isRequired: true,
                allowedTypes: ['String']
            }, {
                optionName: 'start',
                isRequired: true,
                allowedTypes: ['Integer'],
                minValue: 0,
                minValueEqualityAllowed: true,
                maxValue: maxIndex,
                maxValueEqualityAllowed: true
            }, {
                optionName: 'end',
                isRequired: false,
                allowedTypes: ['Integer'],
                minValue: start,
                minValueEqualityAllowed: true,
                maxValue: maxIndex,
                maxValueEqualityAllowed: true
            }], {
                strDist: strDist,
                strSrc: strSrc,
                start: start,
                end: end
            });
    
            if (!validationResult.isValid) {
                throw new Error(validationResult.message);
            }
    
            var insertToTheEnd = start === maxIndex;
            var insertWithoutReplace = typeof end === 'undefined';
    
            if (insertToTheEnd) {
                return strDist + strSrc;
            } else {
                return strDist.substr(0, start) +
                    strSrc +
                    (insertWithoutReplace
                        ? strDist.substr(start)
                        : (end + 1 <= maxIndex ? strDist.substr(end + 1) : ''));
            }
        },
    
        /**
         * Splits a given string into array of words.
         * @memberof SDV.Util.String
         * @public
         * @function
         * @throws {SyntaxError} Will throw an error if the given parameter is not a string.
         *
         * @param {string} str A string that contains several words delimited by spaces.
         * @returns {string[]} Array of words.
         *
         * @example
         * SDV.Util.String.getWords('This is a string'); // Returns ['This', 'is', 'a', 'string'].
         * SDV.Util.String.getWords(''); // Returns [].
         */
        getWords: function(str) {
            return SDV.Util.String.trim(str).split(/\s+/);
        },
    
        /**
         * Produces string transliteration from cyrillic symbols to latin symbols.
         * @memberof SDV.Util.String
         * @public
         * @function
         *
         * @param {string} cyrillicString String with cyrillic symbols.
         * @returns {string} Transliterated string contains latin symbols instead of cyrillic.
         *
         * @example
         * SDV.Util.String.transliterateCyrillicToLatin('Привет мир!'); // Returns 'Privet mir' (it means 'Hello world!').
         */
        transliterateCyrillicToLatin: function(cyrillicString) {
            var dictionary = {'а':'a', 'б':'b', 'в':'v', 'г':'g', 'д':'d', 'е':'e', 'ё':'yo', 'ж':'zh', 'з':'z', 'и':'i', 'й':'y',
                'к':'k', 'л':'l', 'м':'m', 'н':'n', 'о':'o', 'п':'p', 'р':'r', 'с':'s', 'т':'t', 'у':'u', 'ф':'f', 'х':'h', 'ц':'ts',
                'ч':'ch', 'ш':'sh', 'щ':'shch', 'ъ':'', 'ы':'y', 'ь':'', 'э':'e', 'ю':'yu', 'я':'ya'};
    
            return cyrillicString.replace(/[\s\S]/g, function(x){
                var result, lowerX;
                result = lowerX = x.toLowerCase();
    
                if( dictionary.hasOwnProperty(lowerX)) {
                    result = dictionary[lowerX];
    
                    if (x === x.toUpperCase()) {
                        result = result.charAt(0).toUpperCase() + result.substr(1);
                    }
                }
    
                return result;
            });
        }
    };

    /**
     * Base namespace for SDV.js library number utils.
     * All supporting number utils are accessible through it.
     * @namespace SDV.Util.Number
     * @memberof SDV.Util
     */
    SDV.Util.Number = {
    
        /**
         * Checks whether a given object is a number.
         * @memberof SDV.Util.Number
         * @public
         * @function
         * @param {object} obj Inspected object.
         * @returns {boolean} Returns true if inspected object is a number, otherwise returns false.
         *
         * @example
         * SDV.Util.Number.isNumber(); // false.
         * SDV.Util.Number.isNumber(null); // false.
         * SDV.Util.Number.isNumber([1]); // false.
         * SDV.Util.Number.isNumber({one: 1}); // false.
         * SDV.Util.Number.isNumber(function(){return 1;}); // false.
         * SDV.Util.Number.isNumber('This is a string'); // false.
         * SDV.Util.Number.isNumber(1); // true.
         * SDV.Util.Number.isNumber(0.12345); // true.
         * SDV.Util.Number.isNumber(1.2345e+10); // true.
         */
        isNumber: function(obj) {
            return (Object.prototype.toString.call(obj) === '[object Number]');
        },
    
        /**
         * Checks whether a given object is an integer number.
         * @memberof SDV.Util.Number
         * @public
         * @function
         * @param {object} obj Inspected object.
         * @returns {boolean} Returns true if inspected object is an integer number, otherwise returns false.
         *
         * @example
         * SDV.Util.Number.isInteger(); // false.
         * SDV.Util.Number.isInteger(null); // false.
         * SDV.Util.Number.isInteger([1]); // false.
         * SDV.Util.Number.isInteger({one: 1}); // false.
         * SDV.Util.Number.isInteger(function(){return 1;}); // false.
         * SDV.Util.Number.isInteger('This is a string'); // false.
         * SDV.Util.Number.isInteger(1); // true.
         * SDV.Util.Number.isInteger(-1); // true.
         * SDV.Util.Number.isInteger(0.12345); // false.
         * SDV.Util.Number.isInteger(1.2345e+10); // false.
         */
        isInteger: window.Number.isInteger || function(obj) {
            return SDV.Util.Number.isNumber(obj) && isFinite(obj) && Math.floor(obj) === obj;
        },
    
        /**
         * Checks if given number is even.
         * @memberof SDV.Util.Number
         * @param {number} n inspected number.
         * @returns {boolean} Returns true if inspected number is number and it is even, otherwise returns false.
         *
         * @example
         * SDV.Util.Number.isEven();   // false.
         * SDV.Util.Number.isEven({}); // false.
         * SDV.Util.Number.isEven(5);  // false.
         * SDV.Util.Number.isEven(4);  // true.
         */
        isEven: function (n) {
            return SDV.Util.Number.isNumber(n) && (n % 2 == 0);
        },
    
        /**
         * Checks if given number is odd.
         * @memberof SDV.Util.Number
         * @param {number} n inspected number.
         * @returns {boolean} Returns true if inspected number is number and it is odd, otherwise returns false.
         *
         * @example
         * SDV.Util.Number.isOdd();   // false.
         * SDV.Util.Number.isOdd({}); // false.
         * SDV.Util.Number.isOdd(4);  // false.
         * SDV.Util.Number.isOdd(5);  // true.
         */
        isOdd: function(n) {
            return SDV.Util.Number.isNumber(n) && (Math.abs(n) % 2 == 1);
        }
    };

    /**
     * Base namespace for SDV.js library array utils.
     * All supporting array utils are accessible through it.
     * @namespace SDV.Util.Array
     * @memberof SDV.Util
     */
    SDV.Util.Array = {
        /**
         * Checks whether a given object is an array.
         * @memberof SDV.Util.Array
         * @public
         * @function
         * @param {object} obj Inspected object.
         * @returns {boolean} Returns true if inspected object is an array, otherwise returns false.
         *
         * @example
         * SDV.Util.Array.isArray(); // false.
         * SDV.Util.Array.isArray(null); // false.
         * SDV.Util.Array.isArray({one: 1}); // false.
         * SDV.Util.Array.isArray(function(){return 1;}); // false.
         * SDV.Util.Array.isArray('This is a string'); // false.
         * SDV.Util.Array.isArray(1); // false.
         * SDV.Util.Array.isArray([1]); // true.
         * SDV.Util.Array.isArray([]); // true.
         */
        isArray: window.Array.isArray || function(obj) {
            return (Object.prototype.toString.call(obj) === '[object Array]');
        },
    
        /**
         * Returns the first index at which a given element can be found in the given array.
         * @memberof SDV.Util.Array
         * @public
         * @function
         * @param {object[]} array An array in which to search a given element.
         * @param {object} searchElement Element to locate in the given array.
         * @param {int} fromIndex The index to start the search at.
         * @returns {int} Returns First index at which a given element can be found in the given array, or -1 if it is not present.
         *
         * @throws {TypeError} The first argument is required and must be type of [object Array].
         *
         * @example
         * SDV.Util.Array.indexOf(); // Will throw TypeError.
         * SDV.Util.Array.isArray([1,2,3,1]); // -1. Search element is not defined.
         * SDV.Util.Array.isArray([1,2,3,1], 4); // -1. Search element is not present.
         * SDV.Util.Array.isArray([1,2,3,1], 1); // 0. Search element is the first element in a given array.
         * SDV.Util.Array.isArray([1,2,3,1], 1, 1); // 3. Search element is also the 4th element in a given array.
         * SDV.Util.Array.isArray([1,2,3,1], 1, -1); // -1. Stat index if less then 0;
         * SDV.Util.Array.isArray([1,2,3,1], 1, 4); // -1. Stat index if greater then a given array length;
         */
        indexOf: function(array, searchElement, fromIndex) {
            if (!SDV.Util.Array.isArray(array)) {
                throw new TypeError(
                    SDV.Localization.getResource('wrongParameterTypeError', {
                        parameterName: 'array',
                        actualValue: array,
                        expectedType: '[object Array]'
                    })
                );
            }
    
            if (window.Array.prototype.indexOf) {
                return array.indexOf(searchElement, fromIndex);
            }
    
            // Array.indexOf polyfill from MDN:
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Polyfill.
            var k;
            var arrayObject = Object(array);
            var length = arrayObject.length >>> 0;
    
            if (length === 0) {
                return -1;
            }
    
            var n = +fromIndex || 0;
    
            if (Math.abs(n) === Infinity) {
                n = 0;
            }
    
            if (n >= length) {
                return -1;
            }
    
            k = Math.max(n >= 0 ? n : length - Math.abs(n), 0);
            while (k < length) {
                if (k in arrayObject && arrayObject[k] === searchElement) {
                    return k;
                }
    
                k++;
            }
    
            return -1;
        },
    
        /**
         * Returns a flag indicating whether there is a given element in the given array.
         * @memberof SDV.Util.Array
         * @public
         * @function
         * @param {object[]} array An array in which to search a given element.
         * @param {object} searchElement Element to locate in the array.
         * @returns {boolean} Returns true if a given element can be found in the array, or false if it is not present.
         *
         * @throws {TypeError} The first argument is required and must be type of [object Array].
         *
         * @example
         * SDV.Util.Array.contains(); // Will throw TypeError.
         * SDV.Util.Array.contains([1,2,3,1]); // false. Search element is not defined.
         * SDV.Util.Array.contains([1,2,3,1], 4); // false. Search element is not present.
         * SDV.Util.Array.contains([1,2,3,1], 1); // true. Search element is the first and the 4th element in a given array.
         */
        contains: function(array, searchElement) {
            return SDV.Util.Array.indexOf(array, searchElement) > -1;
        },
    
        /**
         * Iterates over the given array elements.
         * @memberof SDV.Util.Array
         * @public
         * @function
         * @param {array} array The array to iterate over.
         * @param {function} callback The function that will be executed on every object, method applies three arguments:
         * element (current element of the array),
         * elementIndex (index of current element in whole elements array),
         * elementsArray (array of all elements).
         * To break iteration over array elements callback method must return exactly false value.
         *
         * @throws {Error} Throws an error if parameters types are wrong, or if parameters are undefined.
         *
         * @example
         * // It will log following strings:
         * // 1: first
         * // 2: second
         * // 3: third
         * SDV.Util.Array.each(['first', 'second', 'third'], function(element, elementIndex, elementsArray) {
         *      console.log(elementIndex + ': ' + element);
         * });
         */
        each: function(array, callback) {
            var validationResult = SDV.Util.Validation.validateOptions([{
                optionName: 'array',
                isRequired: true,
                allowedTypes: ['Array']
            }, {
                optionName: 'callback',
                isRequired: true,
                allowedTypes: ['Function']
            }], {
                array: array,
                callback: callback
            });
    
            if (!validationResult.isValid) {
                throw new Error(validationResult.message);
            }
    
            for (var i = 0, len = array.length; i < len; i++) {
                var breakEnumeration = callback(array[i], i, array) === false;
    
                if (breakEnumeration) {
                    break;
                }
            }
        }
    };

    /**
     * Base namespace for SDV.js library function utils.
     * All supporting function utils are accessible through it.
     * @namespace SDV.Util.Function
     * @memberof SDV.Util
     */
    SDV.Util.Function = {
    
        /**
         * Checks whether a given object is a function.
         * @memberof SDV.Util.Function
         * @public
         * @function
         * @param {object} obj Inspected object.
         * @returns {boolean} Returns true if inspected object is a function, otherwise returns false.
         *
         * @example
         * SDV.Util.Function.isFunction(); // false.
         * SDV.Util.Function.isFunction(null); // false.
         * SDV.Util.Function.isFunction({one: 1}); // false.
         * SDV.Util.Function.isFunction('This is a string'); // false.
         * SDV.Util.Function.isFunction(1); // false.
         * SDV.Util.Function.isFunction([1]); // false.
         * SDV.Util.Function.isFunction(function(){return 1;}); // true.
         */
        isFunction: function(obj) {
            return (Object.prototype.toString.call(obj) === '[object Function]');
        },
    
        /** Binds a function to be called with a given context.
         * @memberof SDV.Util.Function
         * @public
         * @function
         *
         * @param {function} fn A function which must be called.
         * @param {object} desiredContext Desired context of the call.
         * @returns {function} A given function binded to be called with a given context.
         *
         * @example
         * var printMyName = function(greeting) {
         *     console.log((greeting || '') + 'My name is ' + this.name + '.');
         * };
         * SDV.Util.Function.bind(printMyName, {name: 'Jack'})(); // It will log 'My name is Jack.' to console.
         * SDV.Util.Function.bind(printMyName, {name: 'John'})(); // It will log 'My name is John.' to console.
         * SDV.Util.Function.bind(printMyName, {name: 'Jerry'})('Hello!'); // It will log 'Hello! My name is John.' to console.
         */
        bind: function(fn, desiredContext) {
            var slice = Array.prototype.slice;
    
            if (fn.bind) {
                return fn.bind.apply(fn, slice.call(arguments, 1));
            }
    
            var args = slice.call(arguments, 2);
    
            return function() {
                return fn.apply(desiredContext, args.length ? args.concat(slice.call(arguments)) : arguments);
            };
        }
    };

    /**
     * Base namespace for SDV.js library object utils.
     * All supporting object utils are accessible through it.
     * @namespace SDV.Util.Object
     * @memberof SDV.Util
     */
    SDV.Util.Object = {
        /**
         * Checks whether a given parameter is an object.
         * @memberof SDV.Util.Object
         * @public
         * @function
         * @param {object} obj Inspected parameter.
         * @param {boolean} [nullIsAllowed=false] Flag: allows to return true if inspected parameter is null.
         * @returns {boolean} Returns true if inspected parameter is an object, otherwise returns false.
         *
         * @example
         * SDV.Util.Object.isObject(); // false.
         * SDV.Util.Object.isObject(null); // false.
         * SDV.Util.Object.isObject('This is a string'); // false.
         * SDV.Util.Object.isObject(1); // false.
         * SDV.Util.Object.isObject([1]); // false.
         * SDV.Util.Object.isObject(function(){return 1;}); // false.
         * SDV.Util.Object.isObject({one: 1}); // true.
         * SDV.Util.Object.isObject({}); // true.
         *
         * var allowNull = true;
         * SDV.Util.Object.isObject(null, allowNull); // true.
         */
        isObject: function (obj, nullIsAllowed) {
            var objectType = Object.prototype.toString.call(obj);
            var result = objectType === '[object Object]';
    
            if (!result && nullIsAllowed) {
                result = obj === null;
            }
    
            return result;
        },
    
        /**
         * Creates a new object with the specified prototype.
         * @memberof SDV.Util.Object
         * @public
         * @function
         * @throws {TypeError} Will throw an error if the given parameter is not an object.
         *
         * @param {object} Desirable prototype object.
         * @returns {object} New object with the specified prototype.
         *
         * @example
         * var prototypeObject = {
         *     printMyName: function() {
         *         console.log('My name is ' + this.name + '.');
         *     }
         * };
         * var newObject = SDV.Util.Object.create(prototypeObject);
         * newObject.name = 'John';
         * newObject.printMyName(); // It will log 'My name is John.' to console.
         */
        create: Object.create || (function () {
            var tmp = function () { };
    
            var polyfillForCreate = function (prototype) {
                if (typeof prototype != 'object') {
                    throw new TypeError(SDV.Localization.getResource('wrongParameterTypeError')({
                        parameterName: 'prototype',
                        actualValue: prototype,
                        expectedType: '[object Object]'
                    }));
                }
    
                tmp.prototype = prototype;
                var result = new tmp();
                tmp.prototype = null;
    
                return result;
            };
    
            return polyfillForCreate;
        })(),
    
        /** Extends an object with properties of one or more other objects.
         * @memberof SDV.Util.Object
         * @public
         * @function
         * @throws {TypeError} Will throw an error if the given parameter is not an object.
         *
         * @param {object} dest An object in which to accumulate properties of other given objects.
         * @param {object} src Properties source object.
         * @param {boolean} recursive Flag: indicates whether inner objects-properties must be extended too.
         * @returns {Object} An object in which accumulated properties of other given objects.
         *
         * @example
         * var dest = {one: 1, two: 2};
         * SDV.Util.Object.extend(dest, {a: 'a', two: '1+1'}); // {one: 1, two: '1+1', a: 'a'}.
         *
         * var dest = {one: 1, two: {value: 2, caption: 'Two'}};
         *
         * // {one: 1, two: {value: 2, caption: 'THIS IS TWO!!!', binary: '10'}, a: 'a'}.
         * SDV.Util.Object.extend(dest, {two: {caption: 'THIS IS TWO!!!', binary: '10'}, a: 'a'});
         */
        extend: function(dest, src, recursive) {
            if (SDV.Util.Object.isObject(dest) && SDV.Util.Object.isObject(src)) {
                for (var i in src) {
                    var destProperty = dest[i];
                    var srcProperty = src[i];
    
                    if (recursive === true && SDV.Util.Object.isObject(destProperty) && SDV.Util.Object.isObject(srcProperty)) {
                        SDV.Util.Object.extend(destProperty, srcProperty, recursive);
                    } else {
                        dest[i] = srcProperty;
                    }
                }
            }
    
            return dest;
        },
    
        /**
         * Gets array of names of given object properties.
         * @memberof SDV.Util.Object
         * @public
         * @function
         * @param {object} obj Object of interest.
         * @param {boolean} [allowPrototypeProperties = false] Flag: allows to include properties of object prototype.
         * If false, then names only of own properties will be included to result.
         *
         * @returns {string[]} Returns array of names of given object properties.
         *
         * @example
         * SDV.Util.Object.getPropertiesNames(); // [].
         * SDV.Util.Object.getPropertiesNames(null); // [].
         * SDV.Util.Object.getPropertiesNames('This is a string'); // [].
         * SDV.Util.Object.getPropertiesNames(1); // [].
         * SDV.Util.Object.getPropertiesNames([1]); // [].
         * SDV.Util.Object.getPropertiesNames(function(){ return 1; }); // [].
         * SDV.Util.Object.getPropertiesNames({}); // [].
         * SDV.Util.Object.getPropertiesNames({ one: 1, two: 2 }); // ['one', 'two'].
         *
         * var MyClass = function() { this.one = 1; this.two = 2; };
         * var proto = { three: 3 };
         * MyClass.prototype = proto;
         * var obj = new MyClass();
         *
         * SDV.Util.Object.getPropertiesNames(obj); // ['one', 'two'].
         * SDV.Util.Object.getPropertiesNames(obj, true); // ['one', 'two', 'three'].
         */
        getPropertiesNames: function(obj, allowPrototypeProperties) {
            var result = [];
    
            if (SDV.Util.Object.isObject(obj)) {
                for(var propertyName in obj) {
                    if (allowPrototypeProperties || (!allowPrototypeProperties && obj.hasOwnProperty(propertyName))) {
                        result.push(propertyName);
                    }
                }
            }
    
            return result;
        },
    
        /**
         * Gets value of object property with given name.
         * @memberof SDV.Util.Object
         * @public
         * @function
         * @param {object} options Method options.
         * @param {object} options.srcObject Object of interest.
         * @param {string} options.propertyName Name of object property (all string values allowed, but be careful with dots in names).
         *
         * @returns {*} Returns value of given property, or undefined, if property doesn't exist.
         *
         * @example
         * SDV.Util.Object.getPropertyValue(); // undefined.
         * SDV.Util.Object.getPropertyValue({ one: 1, two: 2 }); // undefined.
         * SDV.Util.Object.getPropertyValue({ one: 1, two: '1+1' }, 'one'); // 1.
         * SDV.Util.Object.getPropertyValue({ one: 1, two: '1+1' }, 'two'); // '1+1'.
         * SDV.Util.Object.getPropertyValue({ one: 1, two: '1+1' }, 'two.length'); // 3 (length of '1+1' string).
         * SDV.Util.Object.getPropertyValue({ a: 'a', b: {value: 'b'}}, 'b.value'); // 'b'.
         * SDV.Util.Object.getPropertyValue({ a: 'a', b: {value: 'b'}}, 'b.value.length'); // '1'.
         * SDV.Util.Object.getPropertyValue({ a: 'a', 'a.b': 'ab', 'a.b.c': {value: 'abc'}}, 'a.b.c.value'); // 'abc'.
         * SDV.Util.Object.getPropertyValue({ a: 'a', 'a.b': 'ab', 'a.b.c': {value: 'abc'}}, 'a.b'); // 'ab'.
         */
        getPropertyValue: function(options) {
            options = options || {};
            var srcObject = options.srcObject;
            var propertyName = options.propertyName;
    
            if (typeof srcObject !== 'undefined' && srcObject !== null && SDV.Util.String.isString(propertyName)) {
                var subProperties = propertyName.split('.');
                var subPropertiesCount = subProperties.length;
    
                for (var i = subPropertiesCount; i >= 0; i--) {
                    var property = subProperties.slice(0, i).join('.');
                    var propertyValue = srcObject[property];
    
                    if (typeof propertyValue !== 'undefined') {
                        if (i < subPropertiesCount) {
                            var propertyTail = subProperties.slice(i, subPropertiesCount).join('.');
    
                            return SDV.Util.Object.getPropertyValue({
                                srcObject: propertyValue,
                                propertyName: propertyTail
                            });
                        } else {
                            return propertyValue
                        }
                    }
                }
            }
        }
    };
    
    // Using closure to define SDV.Util.Object.uniqueId function (to hide lastUsedId variable).
    (function(lastId) {
        /**
         * Assigns integer unique ID to an object (unique ID is greater or equal to 0 integer number).
         * @memberof SDV.Util.Object
         * @public
         * @function
         *
         * @param {object} obj An object which need to be marked with unique ID.
         * @param {string} [idProperty = 'uniqueId'] Name of unique ID property.
         * @returns {number|null} New integer unique ID, or existing ID, or null if given obj properties are not assignable.
         *
         * @example
         * var obj = {};
         * SDV.Util.Object.uniqueId(obj); // Returns 0. And  obj now has a property obj.uniqueId == 0.
         *
         * var obj2 = {};
         * SDV.Util.Object.uniqueId(obj2); // Returns 1. And  obj2 now has a property obj2.uniqueId == 1.
         *
         * SDV.Util.Object.uniqueId(obj); // Returns 0, because obj already has a property obj.uniqueId == 0.
         *
         * var obj3 = {};
         * SDV.Util.Object.uniqueId(obj3, 'ID'); // Returns 2. And  obj3 now has a property obj3.ID == 3.
         * SDV.Util.Object.uniqueId(obj3, 'ID'); // Returns 2, because obj3 already has a property obj.ID == 3.
         *
         * // Returns 4, because obj3 idProperty is not defined and obj3 doesn't have a property obj.uniqueId.
         * SDV.Util.Object.uniqueId(obj3);
         */
        SDV.Util.Object.uniqueId = function (obj, idProperty) {
            if (!SDV.Util.String.isString(idProperty) || SDV.Util.String.trim(idProperty) === '') {
                idProperty = 'uniqueId';
            }
    
            if (typeof obj === 'undefined' && obj === null) {
                return null;
            }
    
            if (!SDV.Util.Number.isNumber(obj[idProperty])) {
                try {
                    obj[idProperty] = ++lastId;
                }
                catch (ex) {
                    lastId--;
    
                    return null;
                }
            }
    
            return obj[idProperty];
        }
    })(0);

    /**
     * Base namespace for SDV.js library JSON utils.
     * All supporting JSON utils are accessible through it.
     * @namespace SDV.Util.Json
     * @memberof SDV.Util
     */
    SDV.Util.Json = {
        /**
         * Transforms given string into JSON object.
         * @memberof SDV.Util.Json
         * @public
         * @function
         * @throws {SyntaxError} Throws a SyntaxError exception if the given string contains invalid JSON.
         * @param {string} jsonString String, contains stringed JSON-information.
         * @returns {object} Returns JSON-object, if given string contains valid stringed JSON.
         *
         * @example
         * SDV.Util.Json.parse(); // Will throw SyntaxError.
         * SDV.Util.Json.parse(''); // Will throw SyntaxError.
         *
         * // Will throw SyntaxError, because in valid stringed JSON properties names must be enclosed in double quotes.
         * SDV.Util.Json.parse('{ property1: 1 }');
         *
         * SDV.Util.Json.parse('{ \"property1\": 1 }'); // Will return following JSON-object: { property1: 1 }.
         */
        parse: window.JSON ? window.JSON.parse : function (jsonString) {
            return eval('(' + jsonString + ')');
        },
    
        /**
         * Transforms given JSON-object into string, contains stringed representation of given object.
         * Note, that all symbol-keyed properties will be completely ignored.
         * @memberof SDV.Util.Json
         * @public
         * @function
         * @param {object} value JSON-object being converted to a string.
         * @returns {string} Returns string, contains stringed representation of given JSON-object.
         *
         * @example
         * SDV.Util.Json.stringify({});                  // '{}'
         * SDV.Util.Json.stringify(true);                // 'true'
         * SDV.Util.Json.stringify('foo');               // '"foo"'
         * SDV.Util.Json.stringify([1, 'false', false]); // '[1,"false",false]'
         * SDV.Util.Json.stringify({ x: 5 });            // '{"x":5}'
         * SDV.Util.Json.stringify({ x: 5, y: 6 });      // '{"x":5,"y":6}' or '{"y":6,"x":5}'
         *
         * // Symbol-keyed properties will be completely ignored:
         * SDV.Util.Json.stringify({ x: undefined, y: Object, z: Symbol('') }); // '{}'
         */
        stringify: window.JSON ? window.JSON.stringify : (function () {
            var toString = window.Object.prototype.toString;
            var isArray = SDV.Util.Array.isArray;
            var escMap = {'"': '\\"', '\\': '\\\\', '\b': '\\b', '\f': '\\f', '\n': '\\n', '\r': '\\r', '\t': '\\t'};
            var escFunc = function (m) {
                return escMap[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1);
            };
            var escRE = /[\\"\u0000-\u001F\u2028\u2029]/g;
            return function stringify(value) {
                if (value == null) {
                    return 'null';
                } else if (typeof value === 'number') {
                    return window.isFinite(value) ? value.toString() : 'null';
                } else if (typeof value === 'boolean') {
                    return value.toString();
                } else if (typeof value === 'object') {
                    if (typeof value.toJSON === 'function') {
                        return stringify(value.toJSON());
                    } else if (isArray(value)) {
                        var res = '[';
                        for (var i = 0; i < value.length; i++)
                            res += (i ? ', ' : '') + stringify(value[i]);
                        return res + ']';
                    } else if (toString.call(value) === '[object Object]') {
                        var tmp = [];
                        for (var k in value) {
                            if (value.hasOwnProperty(k))
                                tmp.push(stringify(k) + ': ' + stringify(value[k]));
                        }
                        return '{' + tmp.join(', ') + '}';
                    }
                }
                return '"' + value.toString().replace(escRE, escFunc) + '"';
            };
        })(),
    
        /**
         * Makes a GET-request to address specified in 'filePath'-option, and receives JSON-object (in a case of success).
         * In case of invalid data in file, data will be received as string instead of JSON-object.
         * @memberof SDV.Util.Json
         * @public
         * @function
         * @param {object} options Request options.
         * @param {string} options.filePath Path to target JSON-file (for most browsers it could be even cross domain URL).
         * @param {boolean} [options.async = true] Flag: represents if request should be asynchronous or not.
         * @param {number} [options.timeout = 0] Request timeout (Non negative integer value).
         * @param {function} options.onSuccess Callback-function that handles successful request completion.
         * @param {function} [options.onError = function(error, xhr) { console.error(error.message); }]
         * Callback-function that handles failed request.
         *
         * @returns {object} Returns XMLHttpRequest-object, or ActiveXObject (for old IE versions),
         * or XDomainRequest-object (for IE8/IE9 if given file path is cross domain URL).
         *
         * @example
         * // If server contains file 'myJsonFile.json' in the same path as the current page, and that file contains following data:
         * // { "property1": 1 }, then onSuccess callback-function will receive that data and log it to console.
         * // In the case of fail, error message will be logged to browser console.
         * SDV.Util.Json.getFromFile({ filePath: 'myJsonFile.json', onSuccess: function(data, xhr) { console.log(data); } });
         */
        getFromFile: function(options) {
            return SDV.Util.Ajax.makeRequest({
                url: options.filePath,
                method: 'GET',
                async: options.async,
                timeout: options.timeout,
                responseContentType: 'json',
                onSuccess: options.onSuccess,
                onError: options.onError
            });
        }
    };
    

    /**
     * Base namespace for SDV.js library XML utils.
     * All supporting XML utils are accessible through it.
     * @namespace SDV.Util.Xml
     * @memberof SDV.Util
     */
    SDV.Util.Xml = {
        /**
         * Checks whether a given object is an XML-document.
         * @memberof SDV.Util.Xml
         * @public
         * @function
         * @param {object} xmlObject Inspected object.
         * @returns {boolean} Returns true if inspected object is an XML-document, otherwise returns false.
         *
         * @example
         * SDV.Util.Xml.isXml(); // false.
         * SDV.Util.Xml.isXml(null); // false.
         * SDV.Util.Xml.isXml('This is a string'); // false.
         * SDV.Util.Xml.isXml(1); // false.
         * SDV.Util.Xml.isXml([1]); // false.
         * SDV.Util.Xml.isXml(function(){return 1;}); // false.
         * SDV.Util.Xml.isXml({one: 1}); // true.
         * SDV.Util.Xml.isXml(SDV.Util.Xml.parse('<node1>1</node1>')); // true.
         */
        isXml: function(xmlObject) {
            var givenType = Object.prototype.toString.call(xmlObject);
            return (givenType === '[object XMLDocument]'
                || (givenType === '[object Document]' && SDV.Util.String.isString(xmlObject.xmlVersion))
                || (givenType === '[object Object]'
                    && window.ActiveXObject
                    && SDV.Util.String.isString(xmlObject.xml)
                    && typeof xmlObject.getElementsByTagName !== 'undefined'));
        },
    
        /**
         * Transforms given string into XML-document.
         * @memberof SDV.Util.Xml
         * @public
         * @function
         * @throws {SyntaxError} Throws a SyntaxError exception if the given string contains invalid XML.
         * @param {string} xmlString String, contains stringed XML-information.
         * @returns {object} A {@link https://developer.mozilla.org/en-US/docs/Web/API/XMLDocument|XMLDocument}
         * or common {@link https://developer.mozilla.org/en-US/docs/Web/API/Document|Document}
         * that represents the DOM tree of the XML source.
         *
         * @example
         * SDV.Util.Xml.parse(); // Will throw SyntaxError.
         * SDV.Util.Xml.parse(''); // Will throw SyntaxError.
         * SDV.Util.Xml.parse('{ property1: 1 }'); // Will throw SyntaxError.
         * SDV.Util.Xml.parse('<node1>1</node1>'); // Will return document, contains parsed XML: <root><node1>1</node1></root>.
         */
        parse: function(xmlString) {
            var xml, tmp;
    
            try {
                if (window.DOMParser) {
                    tmp = new window.DOMParser();
                    xml = tmp.parseFromString(xmlString , 'text/xml');
                } else if (window.ActiveXObject){
                    xml = new window.ActiveXObject('Microsoft.XMLDOM');
                    xml.async = 'false';
                    xml.loadXML(xmlString);
                }
            } catch(e) {
                xml = null;
            }
    
            if (!xml || !xml.documentElement || xml.getElementsByTagName('parsererror').length) {
                throw new SyntaxError(SDV.Localization.getResource('wrongParameterFormatError')({
                    parameterName: 'xmlString',
                    actualValue: xmlString,
                    expectedFormat: 'XML'
                }));
            }
    
            return xml;
        },
    
        /**
         * Transforms given XML-document into string, contains stringed representation of given XML.
         * @memberof SDV.Util.Xml
         * @public
         * @function
         * @throws {TypeError} Throws a TypeError exception if given object is not a document at all,
         * if it is, for example, a number, or a string.
         * @throws {SyntaxError} Throws a SyntaxError exception if the given object is not valid XML-document.
         * @throws {Error} Throws common Error exception if browser don't support any XML-serialization facilities.
         *
         * @param {document} xmlObject XML-document being converted to a string.
         * @returns {string} Returns string, contains stringed representation of given XML-document.
         *
         * @example
         * SDV.Util.Xml.stringify();                  // It will throw TypeError.
         * SDV.Util.Xml.stringify(true);                // It will throw TypeError.
         * SDV.Util.Xml.stringify('foo');               // It will throw TypeError.
         * SDV.Util.Xml.stringify([1, 'false', false]); // It will throw TypeError.
         * SDV.Util.Xml.stringify({ x: 5 });            // It will throw TypeError.
         *
         * // It will throw SyntaxError, because '<node1>' isn't closed.
         * SDV.Util.Xml.stringify(SDV.Util.Xml.parse('<node1>1</blahblah>'));
         *
         * // It will return '<node1>1</node1>'.
         * SDV.Util.Xml.stringify(SDV.Util.Xml.parse('<node1>1</node1>'));
         */
        stringify: function(xmlObject) {
            if (!SDV.Util.Xml.isXml(xmlObject)) {
                throw new TypeError(SDV.Localization.getResource('wrongParameterTypeError')({
                    parameterName: 'xmlObject',
                    actualValue: xmlObject,
                    expectedType: '[object XMLDocument]'
                }));
            }
    
            var xmlString = null;
    
            try {
                if (window.XMLSerializer) {
                    xmlString = (new window.XMLSerializer()).serializeToString(xmlObject);
                } else if (window.ActiveXObject
                    && typeof xmlObject.getElementsByTagName !== 'undefined'
                    && SDV.Util.String.isString(xmlObject.xml)) {
                    xmlString = xmlObject.xml;
                }
            }
            catch(e) {
                throw new SyntaxError(SDV.Localization.getResource('wrongParameterFormatError')({
                    parameterName: 'xmlObject',
                    actualValue: xmlObject,
                    expectedFormat: 'XML'
                }));
            }
    
            if (xmlString === null) {
                throw new Error(SDV.Localization.getResource('unsupportedFacilityError')([
                    'XMLSerializer',
                    'ActiveXObject(\'Microsoft.XMLDOM\')'
                ]));
            }
    
            return xmlString;
        },
    
        /**
         * Makes a GET-request to address specified in 'filePath'-option, and receives XML-document (in a case of success).
         * In case of invalid data in file, data will be received as string instead of XML-document.
         * @memberof SDV.Util.Xml
         * @public
         * @function
         * @param {object} options Request options.
         * @param {string} options.filePath Path to target XML-document (for most browsers it could be even cross domain URL).
         * @param {boolean} [options.async = true] Flag: represents if request should be asynchronous or not.
         * @param {number} [options.timeout = 0] Request timeout (Non negative integer value).
         * @param {function} options.onSuccess Callback-function that handles successful request completion.
         * @param {function} [options.onError = function(error, xhr) { console.error(error.message); }]
         * Callback-function that handles failed request.
         *
         * @returns {object} Returns XMLHttpRequest-object, or ActiveXObject (for old IE versions),
         * or XDomainRequest-object (for IE8/IE9 if given file path is cross domain URL).
         *
         * @example
         * // If server contains file 'myXmlFile.xml' in the same path as the current page, and that file contains following data:
         * // <node1>1</node1>, then onSuccess callback-function will receive that data and log it to console.
         * // In the case of fail, error message will be logged to browser console.
         * SDV.Util.Xml.getFromFile({ filePath: 'myXmlFile.xml', onSuccess: function(data, xhr) { console.log(data); } });
         */
        getFromFile: function(options) {
            return SDV.Util.Ajax.makeRequest({
                url: options.filePath,
                method: 'GET',
                async: options.async,
                timeout: options.timeout,
                responseContentType: 'document',
                onSuccess: options.onSuccess,
                onError: options.onError
            });
        }
    };
    

    /**
     * Base namespace for SDV.js library AJAX utils.
     * All supporting AJAX utils are accessible through it.
     * @namespace SDV.Util.Ajax
     * @memberof SDV.Util
     */
    SDV.Util.Ajax = {
    };
    
    // Using closure for SDV.Util.Ajax methods assigning, to hide some private members.
    (function() {
        // Request allowed HTTP methods.
        var makeRequestAllowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    
        // Request default options.
        var makeRequestDefaultOptions = {
            url: '',
            method: 'GET',
            timeout: 0,
            async: true,
            user: '',
            password: '',
            headers: {
            },
            requestContent: null,
            requestContentType: 'application/x-www-form-urlencoded',
            responseContentType: '',
            onSuccess: function(data, xhr) {
                console.log(xhr.responseText);
            },
            onError: function(error, xhr) {
                console.error(error.message);
            }
        };
    
        // Validates request options.
        var makeRequestValidateOptions = function(options) {
            var onErrorValidationOptions = {
                optionName: 'onError',
                allowedTypes: ['Function'],
                replaceWithDefaultIfUndefined: true,
                replaceWithDefaultIfInvalid: true
            };
            var onSuccessValidationOptions = {
                optionName: 'onSuccess',
                isRequired: true,
                allowedTypes: ['Function']
            };
            var urlValidationOptions = {
                optionName: 'url',
                isRequired: true,
                allowedTypes: ['String']
            };
            var methodValidationOptions = {
                optionName: 'method',
                allowedTypes: ['String'],
                allowedValues: makeRequestAllowedMethods,
                replaceWithDefaultIfUndefined: true
            };
            var userValidationOptions = {
                optionName: 'user',
                allowedTypes: ['String'],
                replaceWithDefaultIfUndefined: true
            };
            var passwordValidationOptions = {
                optionName: 'password',
                allowedTypes: ['String'],
                replaceWithDefaultIfUndefined: true
            };
            var timeoutValidationOptions = {
                optionName: 'timeout',
                allowedTypes: ['Integer'],
                minValue: 0,
                minValueEqualityAllowed: true,
                replaceWithDefaultIfUndefined: true
            };
            var asyncValidationOptions = {
                optionName: 'async',
                allowedTypes: ['Boolean'],
                replaceWithDefaultIfUndefined: true
            };
            var requestContentValidationOptions = {
                optionName: 'requestContent',
                replaceWithDefaultIfUndefined: true
            };
            var headersValidationOptions = {
                optionName: 'headers',
                allowedTypes: ['Object'],
                replaceWithDefaultIfUndefined: true
            };
            var requestContentTypeValidationOptions = {
                optionName: 'requestContentType',
                allowedTypes: ['String'],
                replaceWithDefaultIfUndefined: true
            };
            var responseContentTypeValidationOptions = {
                optionName: 'responseContentType',
                allowedTypes: ['String'],
                replaceWithDefaultIfUndefined: true
            };
    
            var validationResult = SDV.Util.Validation.validateOptions([
                    onErrorValidationOptions,
                    onSuccessValidationOptions,
                    urlValidationOptions,
                    methodValidationOptions,
                    userValidationOptions,
                    passwordValidationOptions,
                    timeoutValidationOptions,
                    asyncValidationOptions,
                    requestContentValidationOptions,
                    headersValidationOptions,
                    requestContentTypeValidationOptions,
                    responseContentTypeValidationOptions
                ],
                options,
                makeRequestDefaultOptions);
    
            return validationResult;
        };
    
        /**
         * Checks if given url is cross domain.
         * @memberof SDV.Util.Ajax
         * @public
         * @function
         * @param {string} url Inspected url.
         * @returns {boolean} Returns true if inspected url is cross domain, otherwise returns false.
         *
         * @example
         * // Suppose that the current page has following address: http://localhost:63342/SpatialDataVisualization/pagesDist/examples.html
         * SDV.Util.Ajax.isUrlCrossDomain(); // false, because url is undefined.
         * SDV.Util.Ajax.isUrlCrossDomain(null); // false, because url is not a string.
         *
         * // It will return false, because given url is a relative path to a file on the same domain.
         * SDV.Util.Ajax.isUrlCrossDomain('data/myXmlFile.xml');
         *
         * // It will return true, because protocols are different.
         * SDV.Util.Ajax.isUrlCrossDomain('https://localhost:63342/SpatialDataVisualization/pagesDist/examples.html');
         *
         * // It will return true, because domains are different.
         * SDV.Util.Ajax.isUrlCrossDomain('http://anotherhost:63342/SpatialDataVisualization/pagesDist/examples.html');
         *
         * // It will return true, because ports are different.
         * SDV.Util.Ajax.isUrlCrossDomain('http://localhost:8080/SpatialDataVisualization/pagesDist/examples.html');
         */
        var isUrlCrossDomain = function(url) {
    
            if (SDV.Util.String.isString(url)) {
                var currentLocation = window.location;
                var givenUrl = document.createElement('a');
                givenUrl.href = url;
    
                if (givenUrl.protocol !== '' && currentLocation.protocol !== givenUrl.protocol) {
                    return true;
                }
    
                if (givenUrl.hostname !== '' && currentLocation.hostname !== givenUrl.hostname) {
                    return true;
                }
    
                if (givenUrl.port !== '' && currentLocation.port !== givenUrl.port) {
                    return true;
                }
            }
    
            return false;
        };
    
        // Creates new xhr object.
        var getXhr = function(){
            var xhr = null;
    
            // IE7 has XMLHttpRequest, but it can't request to local files,
            // also in IE7/IE8 XMLHttpRequest can be disabled, so we need an ActiveXObject instead of XMLHttpRequest.
            var ie8OrLower =  !document.addEventListener || !document.querySelector;
    
            if (window.ActiveXObject && (!window.XMLHttpRequest || ie8OrLower)) {
                var activexRealizations = [
                    'Msxml2.XMLHTTP.6.0',
                    'Msxml2.XMLHTTP.3.0',
                    'Msxml2.XMLHTTP',
                    'Microsoft.XMLHTTP'
                ];
    
                for (var i=0, len=activexRealizations.length; i<len; i++) {
                    try {
                        xhr = new window.ActiveXObject(activexRealizations[i]);
                    }
                    catch(e) {}
                }
            } else if (window.XMLHttpRequest) {
                xhr = new window.XMLHttpRequest();
            }
    
            return xhr;
        };
    
        /**
         * Makes AJAX request.
         * @memberof SDV.Util.Ajax
         * @public
         * @function
         * @param {object} options Request options.
         * @param {string} options.url Request URL (cross domain urls are supported even in IE8/IE9).
         * @param {string} [options.method = 'GET'] Desirable HTTP-method for request
         * (should be one of the followings: 'GET', 'POST', 'PUT', 'DELETE').
         *
         * @param {number} [options.timeout = 0] Request timeout (should be non-negative integer number).
         * @param {boolean} [options.async = true] Flag: represents if request should be asynchronous or not.
         * @param {string} [options.user = ''] User on whose behalf the request is made.
         * @param {string} [options.password = ''] Password of those user on whose behalf the request is made
         * @param {object} [options.headers] Object with request headers
         * (for example { "MyHeader1": 'blah blah1', "MyHeader2": 'blah blah2' }).
         *
         * @param {*} [options.requestContent = null] Data that will be transferred to the given URL-address
         * (for requests such as POST, PATH, or DELETE),
         * or will be translated to string and object's properties will be added to the URL query parameters (for GET-request).
         *
         * @param {string} [options.requestContentType = 'application/x-www-form-urlencoded']
         * Type of outgoing data (of RequestContent).
         * See supported types {@link http://en.wikipedia.org/wiki/Internet_media_type#List_of_common_media_types|here}.
         *
         * @param {string} [options.responseContentType = ''] Desirable type of incoming data (for example, 'json', or 'document' for xml).
         * @param {function} options.onSuccess Callback-function to handle successful request completion
         * (Something like this: function(data, xhr) { console.log('Successful request! Received data: '); console.log(data); }).
         *
         * @param {function}[options.onError = function(error, xhr) { console.error(error.message); }]
         * Callback-function to handle failed request.
         *
         * @returns {object} Returns XMLHttpRequest-object, or ActiveXObject (for old IE versions),
         * or XDomainRequest-object (for IE8/IE9 if given file path is cross domain URL).
         *
         * @example
         * // If server contains file 'myJsonFile.json' in the same path as the current page, and that file contains following data:
         * // { "property1": 1 }, then onSuccess callback-function will receive that data and log it to console.
         * // In the case of fail, error message will be logged to browser console.
         * SDV.Util.Ajax.makeRequest({
         *      url: 'myJsonFile.json',
         *      method: 'GET',
         *      onSuccess: function(data, xhr) { console.log(data); },
         *      responseContentType: 'json'
         * });
         */
        var makeRequest = function(options) {
            // Preprocess string request options.
            if (SDV.Util.String.isString(options.method)) {
                options.method = SDV.Util.String.trim(options.method).toUpperCase();
            }
    
            if (SDV.Util.String.isString(options.requestContentType)) {
                options.requestContentType = SDV.Util.String.trim(options.requestContentType).toLowerCase();
            }
    
            if (SDV.Util.String.isString(options.responseContentType)) {
                options.responseContentType = SDV.Util.String.trim(options.responseContentType).toLowerCase();
            }
    
            // Validate request options.
            var validationResult = makeRequestValidateOptions(options);
            if (!validationResult.isValid) {
                options.onError({
                    name: 'AjaxOptionsError',
                    message: validationResult.message
                });
    
                return null;
            }
    
            // Define xhr.
            var xhr = getXhr();
            if (!xhr) {
                options.onError({
                    name: 'AjaxOptionsError',
                    message: SDV.Localization.getResource('unsupportedFacilityError')([
                        'XMLHttpRequest',
                        'ActiveXObject(\'Msxml2.XMLHTTP\')',
                        'ActiveXObject(\'Microsoft.XMLHTTP\')'
                    ])
                });
    
                return null;
            }
    
            // Additional checks are needed for cross domain requests.
            var xhrSupportCrossDomain = typeof xhr.withCredentials !== 'undefined';
            var xdr = null;
    
            if (isUrlCrossDomain(options.url) && !xhrSupportCrossDomain) {
                // In IE8/IE9 XMLHttpRequest doesn't support cross domain requests,
                // but we can use special XDomainRequest object.
                if (window.XDomainRequest) {
                    xdr = new window.XDomainRequest();
                } else {
                    options.onError({
                        name: 'AjaxOptionsError',
                        message: SDV.Localization.getResource('unsupportedFacilityError')('XDomainRequest')
                    });
    
                    return null;
                }
            }
    
            var requestObject = xdr || xhr;
            var requestTimeout;
            var errorUnhandled = true;
            var requestFinished = false;
    
            // Method to stop timer if needed.
            var stopTimer = function() {
                if (requestTimeout) {
                    clearTimeout(requestTimeout);
                    requestTimeout = null;
    
                    if (!requestFinished) {
                        requestFinished = true;
                        requestObject.abort();
                    }
                }
            };
    
            // Request timeout handler.
            var handleTimeOut = function() {
                errorUnhandled = false;
                stopTimer();
                options.onError({
                    name: 'RequestTimeOut',
                    message: 'Request is timed out (' + options.timeout + 'ms).'
                }, requestObject);
            };
    
            // Request error handler.
            var handleError = function(error) {
                requestFinished = true;
                stopTimer();
    
                if (errorUnhandled) {
                    if (typeof error !== 'undefined') {
                        options.onError({
                            name: error.name || 'RequestError',
                            message: error.message || error
                        }, requestObject);
                    } else {
                        options.onError({
                            name: requestObject.statusText || 'RequestError',
                            message: (requestObject.status
                                ? 'Error ' + (requestObject.status == 1223 ? 204 : requestObject.status) + ' '
                                : 'Error. ') +
                            (requestObject.statusText
                                ? '(' + requestObject.statusText + '). '
                                : '') +
                            (requestObject.responseText
                                ? requestObject.responseText
                                : '')
                        }, requestObject);
                    }
                }
            };
    
            // Request success handler.
            var handleSuccess = function() {
                requestFinished = true;
                stopTimer();
    
                var data = null;
    
                try {
                    if (options.responseContentType === 'json') {
                        data = SDV.Util.Json.parse(requestObject.responseText);
                    } else if (options.responseContentType === 'document') {
                        data = SDV.Util.Xml.parse(requestObject.responseText);
                    } else {
                        data = requestObject.responseText;
                    }
                }
                catch(e) {
                    data = requestObject.responseText;
                }
    
                options.onSuccess(data, requestObject);
            };
    
            // Request onreadystatechange handler.
            var handleStateChange = function () {
                var requestStatus = 0;
                var requestError;
    
                // In IE9, reads to any property (e.g. status) off of an aborted XHR will
                // result in the error 'Could not complete the operation due to error c00c023f'.
                // That's why we need try-catch here.
                try {
                    if (xhr.readyState !== 4) {
                        return;
                    }
    
                    requestFinished = true;
                    requestStatus = xhr.status;
                }
                catch(e) {
                    requestStatus = 0;
                    requestError = e;
                }
    
                if (requestStatus === 200) {
                    handleSuccess();
                } else {
                    handleError(requestError);
                }
            };
    
            // Add requestContent to url of GET request.
            if (SDV.Util.Object.isObject(options.requestContent) && options.method === 'GET') {
                if (options.url.indexOf('?') == -1) {
                    options.url = options.url + '?';
                }
    
                var isNotFirstParameter = false;
                for (var parameter in options.requestContent) {
                    if (options.requestContent.hasOwnProperty(parameter)) {
                        if (isNotFirstParameter) {
                            options.url = options.url + '&';
                        }
    
                        options.url = options.url + parameter + '=' + options.requestContent[parameter];
                        isNotFirstParameter = true;
                    }
                }
            }
    
            // Set timeout if needed.
            if (options.timeout > 0) {
                // Even if xhr.timeout property exists,
                // xhr.onreadystatechange occurs before xhr.ontimeout, so timeout error handles twice.
                // That's why we use manual SetTimeout/ClearTimeout instead of xhr.timeout.
                requestTimeout = setTimeout(handleTimeOut, options.timeout);
            }
    
            if (requestObject === xhr) {
                // Here we use XMLHttpRequest object.
    
                // XMLHttpRequest.onreadystatechange should not be used with synchronous requests.
                if (options.async) {
                    xhr.onreadystatechange = handleStateChange;
                }
    
                // Prepare request.
                xhr.open(options.method, options.url, options.async, options.user, options.password);
    
                // Set request headers.
                for (var headerName in options.headers) {
                    if (options.headers.hasOwnProperty(headerName)) {
                        xhr.setRequestHeader(headerName, options.headers[headerName]);
                    }
                }
    
                // Finally send request.
                if(options.method === 'GET') {
                    xhr.send(null);
                } else {
                    xhr.setRequestHeader('Content-type', options.requestContentType);
                    xhr.send(options.requestContent)
                }
    
                // Handle results of synchronous request after call to XMLHttpRequest.send(...).
                if (!options.async) {
                    handleStateChange();
                }
            } else {
                // Here we use XDomainRequest object.
                // Note that requests through XDomainRequest are always asynchronous.
                xdr.open(options.method, options.url);
                xdr.onload = handleSuccess;
                xdr.onerror = handleError;
    
                if(options.method === 'GET') {
                    xdr.send(null);
                } else {
                    xdr.send(options.requestContent)
                }
            }
    
            return requestObject;
        };
    
        // Assign public methods to SDV.Util.Ajax namespace.
        SDV.Util.Ajax.makeRequest = makeRequest;
        SDV.Util.Ajax.isUrlCrossDomain = isUrlCrossDomain;
    })();

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

    /**
     * Base namespace for SDV.js library localization methods.
     * Localization methods are designed to add to the library string resources in different languages,
     * and then get access to them.
     * As the examples of such resources can act error messages.
     * @namespace SDV.Localization
     * @memberof SDV
     */
    SDV.Localization = {};
    
    // Using closure for SDV.Localization methods assigning, to hide private variables.
    (function() {
        var defaultLanguage = 'en';
        var currentLanguage = defaultLanguage;
    
        // Dictionaries storage;
        var dictionaries = {
        };
    
        var dictionariesCount = 0;
    
        /**
         * Gets dictionary for requested language.
         * @memberof SDV.Localization
         * @private
         * @function
         * @param {string} locale Language of desired dictionary.
         * @param {boolean} [canUseDefaultLanguage=false] Can default language be used,
         * if there is no dictionary for a given language.
         * @returns {object|undefined} Returns dictionary-object or undefined, if desirable dictionary doesn't exist.
         */
        var getDictionary = function (locale, canUseDefaultLanguage) {
            var result = undefined;
    
            if (locale != undefined) {
                if (!SDV.Util.String.isString(locale)) {
                    console.error(getResource('wrongParameterTypeError', currentLanguage)({
                        parameterName: 'locale',
                        actualValue: locale,
                        expectedType: '[object String]'
                    }));
                } else {
                    result = dictionaries[locale];
                    if (result == undefined) {
                        console.error(getResource('missingDictionaryError', currentLanguage)(locale));
                    }
                }
            }
    
            if (result == undefined && canUseDefaultLanguage && locale !== currentLanguage) {
                result = getDictionary(currentLanguage);
            }
    
            if (result == undefined
                && canUseDefaultLanguage
                && currentLanguage != defaultLanguage
                && locale !== defaultLanguage) {
                result = getDictionary(defaultLanguage);
            }
    
            return result;
        };
    
        /**
         * Gets requested localized resource by its name and desired language locale name (locale is optional).
         * @memberof SDV.Localization
         * @public
         * @function
         * @param {string} resourceName Name of desired localized resource.
         * @param {string} [locale] Language of desired dictionary (by default equals to current language (if it is setted),
         * or to default language - language of the first added dictionary).
         * @returns {*|undefined} Returns desired localized resource, or undefined if desirable dictionary doesn't exist.
         *
         * @example
         * // It will log 'Hello, world!' to console.
         * // Because initially english language is used as current and as default.
         * console.log(SDV.Localization.getResource('greeting'));
         *
         * // It will log 'Привет, мир!' to console.
         * console.log(SDV.Localization.getResource('greeting', 'ru'));
         */
        var getResource = function(resourceName, locale) {
            var result = undefined;
    
            if (!SDV.Util.String.isString(resourceName)) {
                console.error(getResource('wrongParameterTypeError', currentLanguage)({
                    parameterName: 'resourceName',
                    actualValue: resourceName,
                    expectedType: '[object String]'
                }));
            } else {
                var dictionary = getDictionary(locale, true) || {};
                result = dictionary[resourceName];
            }
    
            return result;
        };
    
        /**
         * Adds given dictionary for a given language to dictionaries storage.
         * @memberof SDV.Localization
         * @private
         * @function
         * @param {string} locale Language of given dictionary.
         * @param {object} dictionary Dictionary with some localized string resources.
         * @returns {boolean} Returns true if given dictionary was added successfully, otherwise returns false.
         */
        var addDictionary = function(locale, dictionary) {
            if (!SDV.Util.Object.isObject(dictionary)) {
                console.error(getResource('wrongParameterTypeError', currentLanguage)({
                    parameterName: 'dictionary',
                    actualValue: dictionary,
                    expectedType: '[object Object]'
                }));
                return false;
            }
    
            if (!SDV.Util.String.isString(locale)) {
                console.error(getResource('wrongParameterTypeError', currentLanguage)({
                    parameterName: 'locale',
                    actualValue: locale,
                    expectedType: '[object String]'
                }));
                return false;
            }
    
            var alreadyExistingDictionary = dictionaries[locale];
            if (alreadyExistingDictionary != undefined) {
                SDV.Util.Object.extend(alreadyExistingDictionary, dictionary);
            } else {
                dictionaries[locale] = dictionary;
            }
    
            if (dictionariesCount == 0) {
                defaultLanguage = currentLanguage = locale;
            }
    
            dictionariesCount++;
    
            return true;
        };
    
        /**
         * Returns locale of current library language.
         * @memberof SDV.Localization
         * @public
         * @function
         * @returns {string} Returns locale of current library language.
         */
        var getCurrentLanguage = function() {
            return currentLanguage;
        };
    
        /**
         * Returns locale of default library language.
         * @memberof SDV.Localization
         * @public
         * @function
         * @returns {string} Returns locale of default library language.
         */
        var getDefaultLanguage = function() {
            return defaultLanguage;
        };
    
        /**
         * Sets locale of current library language.
         * @memberof SDV.Localization
         * @public
         * @function
         * @param {string} locale Language of one of already existing dictionaries.
         */
        var setCurrentLanguage = function (locale) {
            if (getDictionary(locale) != undefined) {
                currentLanguage = locale;
            }
        };
    
        /**
         * Extends existing localized string resources with given localization extension.
         * @memberof SDV.Localization
         * @public
         * @function
         * @param {object} options Localization extension options.
         * @param {string} options.locale Locale of given localization extension.
         * @param {boolean} options.setAsCurrent Flag: is it necessary to set up given localization extension as current.
         * @param {object} options.dictionary Dictionary containing localized string resources.
         * @returns {boolean} Returns true if given localization dictionary was added successfully, otherwise returns false.
         *
         * @example
         * SDV.Localization.extend({locale: 'en', setAsCurrent: true, dictionary: {greeting: 'Hello, world!'}});
         * console.log(SDV.Localization.getResource('greeting')); // It will log 'Hello, world!' to console.
         *
         * // Secondary extension will not remove existing resources, existing dictionary will be extended.
         * // So you can add additional resources to already existing dictionaries.
         * SDV.Localization.extend({locale: 'en', dictionary: {greeting2: 'Hello, world again!'}});
         * console.log(SDV.Localization.getResource('greeting')); // It will log 'Hello, world!' to console.
         * console.log(SDV.Localization.getResource('greeting2')); // It will log 'Hello, world again!' to console.
         */
        var extend = function(options) {
            if (!SDV.Util.Object.isObject(options)) {
                console.error(getResource('wrongParameterTypeError', currentLanguage)({
                    parameterName: 'options',
                    actualValue: options,
                    expectedType: '[object Object]'
                }));
                return false;
            }
    
            var addedSuccessfully = addDictionary(options.locale, options.dictionary);
    
            if (addedSuccessfully && options.setAsCurrent) {
                setCurrentLanguage(options.locale);
            }
    
            return addedSuccessfully;
        };
    
        // Assign public methods to SDV.Localization namespace.
        SDV.Localization.getResource = getResource;
        SDV.Localization.getDefaultLanguage = getDefaultLanguage;
        SDV.Localization.getCurrentLanguage = getCurrentLanguage;
        SDV.Localization.setCurrentLanguage = setCurrentLanguage;
        SDV.Localization.extend = extend;
    })();

    // Add russian localization dictionary.
    SDV.Localization.extend({
        locale: 'ru',
        dictionary: {
            // Тестовое приветствие.
            greeting: 'Привет, мир!',
    
            // Метод для получения сообщения об отсутствующем словаре локализации для указанного языка.
            missingDictionaryError: function (locale) {
                return 'Ошибка. Не найден словарь локализации для языка \'' + locale + '\'.';
            },
    
            wrongColorRepresentation: function(stringedColor) {
                return 'Ошибка. Не удалось найти цвет, которому соответствовало бы строковое представление \'' + stringedColor + '\'.';
            },
    
            // Метод для получения сообщения об ошибочном типе параметра.
            wrongParameterTypeError: function (options) {
                options = options || {};
                return 'Ошибка. Параметр \'' + options.parameterName + '\' должен иметь один из следующих разрешенных типов: ' +
                    (SDV.Util.Array.isArray(options.expectedType)
                        ? '\'' + options.expectedType.join('\', \'') + '\''
                        : '\'' + options.expectedType + '\'') + '. ' +
                    'Тип \'' + Object.prototype.toString.call(options.actualValue) + '\' не является разрешенным для этого параметра.';
            },
    
            // Метод для получения сообщения об ошибочном формате параметра.
            wrongParameterFormatError: function (options) {
                options = options || {};
                return 'Ошибка. Параметер \'' + options.parameterName + '\' имеет неверный формат (' + options.actualValue + ').' +
                    ' Он должен соответствовать формату \'' + options.expectedFormat + '\'.';
            },
    
            // Метод для получения сообщения об ошибочном значении параметра.
            wrongParameterValueError: function (options) {
                options = options || {};
                return 'Ошибка. Параметр \'' + options.parameterName + '\' должен иметь одно из следующих разрешенных значений: ' +
                    (SDV.Util.Array.isArray(options.allowedValues)
                        ? '\'' + options.allowedValues.join('\', \'') + '\''
                        : '\'' + options.allowedValues + '\'') + '. ' +
                    'Значение \'' + options.actualValue + '\' не является разрешенным для этого параметра.';
            },
    
            // Метод для получения сообщения о незаданном обязательном параметре.
            missingRequiredParameter: function (parameterName) {
                return 'Ошибка. Не задан обязательный параметр \'' + parameterName + '\'.';
            },
    
            // Метод для получения сообщения о еподдерживаемом браузером свойстве.
            unsupportedFacilityError: function (unsupported) {
                return 'Ошибка. Ваш браузер не поддерживает ' +
                    (SDV.Util.Array.isArray(unsupported)
                        ? 'ни одну из следующих возможностей: ' + unsupported.join(', ')
                        : unsupported) +
                    '.';
            },
    
            // Метод для получения сообщений о синтаксических ошибках в строках.
            syntaxError: function(options) {
                return 'Синтаксическая ошибка в строке \'' + options.originalString +'\' на позиции №' + options.errorPosition + '. ' +
                    'Ожидается одня из следующих конструкций: ' +
                    (SDV.Util.Array.isArray(options.allowedConstructions)
                        ? '\'' + options.allowedConstructions.join('\', \'') + '\''
                        : '\'' + options.allowedConstructions + '\'') +
                    '. ' +
                    'Конструкция \'' + options.actualConstruction + '\' не является разрешенной.';
            }
        }
    });

    // Add english localization dictionary.
    SDV.Localization.extend({
        locale: 'en',
        setAsCurrent: true,
        dictionary: {
            // Test greeting.
            greeting: 'Hello, world!',
    
            // Method to get an error-message about missing localization dictionary.
            missingDictionaryError: function (locale) {
                return 'Error. There is no dictionary for \'' + locale + '\' language.';
            },
    
            wrongColorRepresentation: function(stringedColor) {
                return 'Error. There is no color with such \'' + stringedColor + '\' stringed representation.';
            },
    
            // Method to get an error-message about wrong parameter type.
            wrongParameterTypeError: function (options) {
                options = options || {};
                return 'Error. Parameter \'' + options.parameterName + '\' must have one of the following types: ' +
                    (SDV.Util.Array.isArray(options.expectedType)
                        ? '\'' + options.expectedType.join('\', \'') + '\''
                        : '\'' + options.expectedType + '\'') + '. ' +
                    'Type \'' + Object.prototype.toString.call(options.actualValue) + '\' is not allowed.';
            },
    
            // Method to get an error-message about wrong parameter format.
            wrongParameterFormatError: function (options) {
                options = options || {};
                return 'Error. Parameter \'' + options.parameterName + '\' has invalid format (' + options.actualValue + ').' +
                    ' It must have valid \'' + options.expectedFormat + '\' format.';
            },
    
            // Method to get an error-message about wrong parameter value.
            wrongParameterValueError: function (options) {
                options = options || {};
                return 'Error. Parameter \'' + options.parameterName + '\' must have one of the following values: ' +
                    (SDV.Util.Array.isArray(options.allowedValues)
                        ? '\'' + options.allowedValues.join('\', \'') + '\''
                        : '\'' + options.allowedValues + '\'') + '. ' +
                    'Value \'' + options.actualValue + '\' is not allowed.';
            },
    
            // Method to get an error-message about undefined required parameter.
            missingRequiredParameterError: function (parameterName) {
                return 'Error. Required parameter \'' + parameterName + '\' is undefined.';
            },
    
            // Method to get an error-message about browser unsupported property.
            unsupportedFacilityError: function (unsupported) {
                return 'Error. Your browser doesn\'t support ' +
                    (SDV.Util.Array.isArray(unsupported)
                        ? 'any of the following facilities: ' + unsupported.join(', ')
                        : unsupported) +
                    '.';
            },
    
            // Method to get an error-message about syntax errors in the strings.
            syntaxError: function(options) {
                return 'Syntax error in \'' + options.originalString +'\', at position №' + options.errorPosition + '. ' +
                    'One of the following constructions expected: ' +
                    (SDV.Util.Array.isArray(options.allowedConstructions)
                        ? '\'' + options.allowedConstructions.join('\', \'') + '\''
                        : '\'' + options.allowedConstructions + '\'') +
                    '. ' +
                    'Construction \'' + options.actualConstruction + '\' is not allowed.';
            }
        }
    });

    /**
     * Base namespace for SDV.js library LINQ-like enumerable facilities.
     * All supporting LINQ-like enumerable facilities are accessible through it.
     * @namespace SDV.Enumerable
     * @memberof SDV
     */
    SDV.Enumerable = {
    };
    
    // Using closure for SDV.Enumerable methods assigning, to hide some private members.
    (function() {
        /**
         * Constructs new instance of enumerable, which wraps given items array,
         * and provides a methods for selecting and filtering its items.
         * Constructor is private, so use factory-method {@link SDV.Enumerable.create} to create an instance.
         * @public
         * @class Enumerable
         * @param {Array} items Array, which need to be transformed into enumerable.
         */
        var Enumerable = function (items) {
            this._items = items;
        };
    
        /**
         * {@link Enumerable} factory-method. It is an entry point to library LINQ-like enumerable facilities.
         * @static
         * @function
         * @memberof SDV.Enumerable
         * @param {Array} items Array, which need to be transformed into {@link Enumerable}.
         * @returns {Enumerable} Returns new instance of {@link Enumerable} if given items-parameter is array, otherwise returns null.
         */
        SDV.Enumerable.create = function(items) {
            if (!SDV.Util.Array.isArray(items)) {
                console.error(SDV.Localization.getResource('wrongParameterTypeError')({
                    parameterName: 'items',
                    expectedType: '[object Array]',
                    actualValue: items
                }));
    
                return null;
            }
    
            return new Enumerable(items);
        };
    
        /**
         * Checks if given object is instance of {@link Enumerable}.
         * @static
         * @function
         * @memberof SDV.Enumerable
         * @param {*} obj Inspected object.
         * @returns {boolean} Returns true if given object is instance of {@link Enumerable}, otherwise returns false.
         *
         * @example
         * var integersEnumerable = SDV.Enumerable.create([1, 2, 3,4 , 5]);
         *
         * SDV.Enumerable.isEnumerable(); // false.
         * SDV.Enumerable.isEnumerable(null); // false.
         * SDV.Enumerable.isEnumerable('enumerable'); // false.
         * SDV.Enumerable.isEnumerable({}); // false.
         * SDV.Enumerable.isEnumerable([1, 2, 3, 4, 5]); // false.
         * SDV.Enumerable.isEnumerable(integersEnumerable); // true.
         */
        SDV.Enumerable.isEnumerable = function(obj) {
            return obj instanceof Enumerable;
        };
    
        // Prototype shortcut.
        var enumerable = SDV.Enumerable.prototype = Enumerable.prototype = {};
    
        /**
         * Adds given element to items array.
         * @public
         * @function
         * @memberof Enumerable
         * @returns {Array} Returns new length of items array.
         *
         * @example
         * var items = ['Bill', 'John', 'Jack'];
         * ];
         *
         * var names = SDV.Enumerable.create(items);
         *
         * // ['Bill', 'John', 'Jack'].
         * console.log(names);
         *
         * // New length is 4.
         * var removedName = names.push('Susan');
         *
         * // ['Bill', 'John', 'Jack', 'Susan'].
         * console.log(names);
         */
        enumerable.push = function(obj) {
            return this._items.push(obj);
        };
    
        /**
         * Removes the last element in items array.
         * @public
         * @function
         * @memberof Enumerable
         * @returns {Array} Returns removed item.
         *
         * @example
         * var items = ['Bill', 'John', 'Jack', 'Susan'];
         * ];
         *
         * var names = SDV.Enumerable.create(items);
         *
         * // ['Bill', 'John', 'Jack', 'Susan'].
         * console.log(names);
         *
         * // 'Susan'.
         * var removedName = names.pop();
         *
         * // ['Bill', 'John', 'Jack'].
         * console.log(names);
         */
        enumerable.pop = function(obj) {
            return this._items.pop(obj);
        };
    
        /**
         * Transforms {@link Enumerable} to array.
         * @public
         * @function
         * @memberof Enumerable
         * @returns {Array} Returns array of items wrapped in used {@link Enumerable} instance.
         *
         * @example
         * var items = [
         *      {id: 1, name: 'Bill', age: 20},
         *      {id: 2, name: 'John', age: 13},
         *      {id: 3, name: 'Jack', age: 17},
         *      {id: 3, name: 'Susan', age: 7}
         * ];
         *
         * // It will return array equals to ['John', 'Jack'].
         * var teenagersNames = SDV.Enumerable.create(items)
         *      .where(function(x) { return x.age >= 13 && x.age <= 19; })
         *      .select(function(x){ return x.name; })
         *      .toArray();
         */
        enumerable.toArray = function () {
            return this._items;
        };
    
        /**
         * Provides a way to make a new selection be each of {@link Enumerable} items.
         * @public
         * @function
         * @memberof Enumerable
         * @param {function} selectionMethod Method which applies item of used {@link Enumerable}, and returns item of new selection.
         * Something like: function(item) { return someValue(item); }.
         * @returns {Enumerable} Returns new {@link Enumerable} instance, contains selected items.
         *
         * @example
         * var items = [
         *      {id: 1, name: 'Bill', age: 20},
         *      {id: 2, name: 'John', age: 13},
         *      {id: 3, name: 'Jack', age: 17},
         *      {id: 3, name: 'Susan', age: 7}
         * ];
         *
         * // It will return array equals to ['1) Bill', '2) John', '3) Jack', '4) Susan'].
         * var names = SDV.Enumerable.create(items)
         *      .select(function(x){ return x.id + ') ' + x.name; })
         *      .toArray();
         */
        enumerable.select = function(selectionMethod) {
            var currentItem;
            var selectedItems = [];
    
            if (SDV.Util.Function.isFunction(selectionMethod)) {
                for (var i = 0, len = this._items.length; i < this._items.length; i++) {
                    currentItem = this._items[i];
    
                    // Given selectionMethod must return some value, which must be pushed to result array.
                    selectedItems.push(selectionMethod(currentItem, i));
                }
            }
    
            return new Enumerable(selectedItems);
        };
    
        /**
         * Provides a way to filter {@link Enumerable} items, and get new filtered selection.
         * @public
         * @function
         * @memberof Enumerable
         * @param {function} clauseMethod Method which applies item of used {@link Enumerable}, optionally applies its index,
         * and returns true if some given condition is satisfied, otherwise returns false.
         * Something like: function(item, itemIndex) { return isSomeConditionSatisfied(item, itemIndex); }.
         * @returns {Enumerable} Returns new {@link Enumerable} instance, contains filtered items, which satisfies given condition.
         *
         * @example
         * var items = [
         *      {id: 1, name: 'Bill', age: 20},
         *      {id: 2, name: 'John', age: 13},
         *      {id: 3, name: 'Jack', age: 17},
         *      {id: 3, name: 'Susan', age: 7}
         * ];
         *
         * // It will return array equals to [{id: 2, name: 'John', age: 13},{id: 3, name: 'Jack', age: 17}].
         * var teenagers = SDV.Enumerable.create(items)
         *      .where(function(x) { return x.age >= 13 && x.age <= 19; })
         *      .toArray();
         */
        enumerable.where = function(clauseMethod) {
            var currentItem;
            var matchingItems = [];
    
            if (SDV.Util.Function.isFunction(clauseMethod)) {
                for (var i = 0, len = this._items.length; i < this._items.length; i++) {
                    currentItem = this._items[i];
    
                    // Given clauseMethod must return boolean value.
                    if (clauseMethod(currentItem, i) === true) {
                        matchingItems.push(currentItem);
                    }
                }
            }
    
            return new Enumerable(matchingItems);
        };
    
        /**
         * Checks if any of {@link Enumerable} items, satisfies some given condition.
         * @public
         * @function
         * @memberof Enumerable
         * @param {function} clauseMethod Method which applies item of used {@link Enumerable}, optionally applies its index,
         * and returns true if some given condition is satisfied, otherwise returns false.
         * Something like: function(item, itemIndex) { return isSomeConditionSatisfied(item, itemIndex); }.
         * @returns {boolean} Returns true if at least one item satisfies given condition, otherwise returns false.
         *
         * @example
         * var items = [
         *      {id: 1, name: 'Bill', age: 20},
         *      {id: 2, name: 'John', age: 13},
         *      {id: 3, name: 'Jack', age: 17},
         *      {id: 3, name: 'Susan', age: 7}
         * ];
         *
         * // It will return true.
         * var olderThenTenExists = SDV.Enumerable.create(items)
         *      .any(function(x) { return x.age > 10; });
         *
         * // It will return false.
         * var youngerThenFiveExists = SDV.Enumerable.create(items)
         *      .any(function(x) { return x.age < 5; });
         */
        enumerable.any = function(clauseMethod) {
            var currentItem;
    
            if (SDV.Util.Function.isFunction(clauseMethod)) {
                for (var i = 0, len = this._items.length; i < this._items.length; i++) {
                    currentItem = this._items[i];
    
                    // Given clauseMethod must return boolean value.
                    if (clauseMethod(currentItem, i)) {
                        return true;
                    }
                }
            }
    
            return false;
        };
    
        /**
         * Checks if all items in {@link Enumerable}, satisfies some given condition.
         * @public
         * @function
         * @memberof Enumerable
         * @param {function} clauseMethod Method which applies item of used {@link Enumerable}, optionally applies its index,
         * and returns true if some given condition is satisfied, otherwise returns false.
         * Something like: function(item, itemIndex) { return isSomeConditionSatisfied(item, itemIndex); }.
         * @returns {boolean} Returns true if all items satisfies given condition, otherwise returns false.
         *
         * @example
         * var items = [
         *      {id: 1, name: 'Bill', age: 20},
         *      {id: 2, name: 'John', age: 13},
         *      {id: 3, name: 'Jack', age: 17},
         *      {id: 3, name: 'Susan', age: 7}
         * ];
         *
         * // It will return true.
         * var allAreOlderThenFive = SDV.Enumerable.create(items)
         *      .all(function(x) { return x.age > 5; });
         *
         * // It will return false.
         * var allAreYoungerThenEighteen = SDV.Enumerable.create(items)
         *      .all(function(x) { return x.age < 18; });
         */
        enumerable.all = function(clauseMethod) {
            var currentItem;
    
            if (SDV.Util.Function.isFunction(clauseMethod)) {
                for (var i = 0, len = this._items.length; i < this._items.length; i++) {
                    currentItem = this._items[i];
    
                    // Given clauseMethod must return boolean value.
                    if (!clauseMethod(currentItem, i)) {
                        return false;
                    }
                }
            }
    
            return true;
        };
    
        /**
         * Provides a way to filter {@link Enumerable} items, and get the first item, which satisfies given filter (if filter defined),
         * or simply the first item in used {@link Enumerable} (if filter is undefined).
         * @public
         * @function
         * @memberof Enumerable
         * @param {function} [clauseMethod] Method which applies item of used {@link Enumerable}, optionally applies its index,
         * and returns true if some given condition is satisfied, otherwise returns false.
         * Something like: function(item, itemIndex) { return isSomeConditionSatisfied(item, itemIndex); }.
         * @returns {*} Returns first item, which satisfies given condition.
         *
         * @example
         * var items = [
         *      {id: 1, name: 'Bill', age: 20},
         *      {id: 2, name: 'John', age: 13},
         *      {id: 3, name: 'Jack', age: 17},
         *      {id: 3, name: 'Susan', age: 7}
         * ];
         *
         * // It will return {id: 1, name: 'Bill', age: 20}.
         * var first = SDV.Enumerable.create(items)
         *      .first();
         *
         * // It will return {id: 2, name: 'John', age: 13}.
         * var firstYoungerThenFifteen = SDV.Enumerable.create(items)
         *      .first(function(x) { return x.age < 15; });
         *
         * // It will return undefined.
         * var firstYoungerThenFive = SDV.Enumerable.create(items)
         *      .first(function(x) { return x.age < 5; });
         */
        enumerable.first = function(clauseMethod) {
            var currentItem;
    
            if (SDV.Util.Function.isFunction(clauseMethod)) {
                for (var i = 0, len = this._items.length; i < this._items.length; i++) {
                    currentItem = this._items[i];
    
                    // Given clauseMethod must return boolean value.
                    if (clauseMethod(currentItem, i)) {
                        return currentItem;
                    }
                }
            } else {
                // Method 'first' called without parameter, or parameter is not a function.
    
                if (this._items.length > 0)
                    return this._items[0];
                else
                    return null;
            }
        };
    
        /**
         * Provides a way to filter {@link Enumerable} items, and get the first item, which satisfies given filter (if filter defined),
         * or simply the first item in used {@link Enumerable} (if filter is undefined),
         * or default value if none of the items do not satisfy the given filter.
         * @public
         * @function
         * @memberof Enumerable
         * @param {function} [clauseMethod] Method which applies item of used {@link Enumerable}, optionally applies its index,
         * and returns true if some given condition is satisfied, otherwise returns false.
         * Something like: function(item, itemIndex) { return isSomeConditionSatisfied(item, itemIndex); }.
         *
         * @param {*} [defaultValue] The value to be returned if none of the items do not satisfy the given filter.
         * @returns {*} Returns first item, which satisfies given condition or given default value.
         *
         * @example
         * var items = [
         *      {id: 1, name: 'Bill', age: 20},
         *      {id: 2, name: 'John', age: 13},
         *      {id: 3, name: 'Jack', age: 17},
         *      {id: 3, name: 'Susan', age: 7}
         * ];
         *
         * // It will return {id: 1, name: 'Bill', age: 20}.
         * var first = SDV.Enumerable.create(items)
         *      .firstOrDefault();
         *
         * // It will return {id: 2, name: 'John', age: 13}.
         * var firstYoungerThenFifteen = SDV.Enumerable.create(items)
         *      .firstOrDefault(function(x) { return x.age < 15; });
         *
         * // It will return default value {id: 0, name: '', age: 0}.
         * var firstYoungerThenFive = SDV.Enumerable.create(items)
         *      .firstOrDefault(function(x) { return x.age < 5; }, {id: 0, name: '', age: 0});
         */
        enumerable.firstOrDefault = function(clauseMethod, defaultValue) {
            return this.first(clauseMethod) || defaultValue;
        };
    
        /**
         * Provides a way to filter {@link Enumerable} items, and get the last item, which satisfies given filter (if filter defined),
         * or simply the last item in used {@link Enumerable} (if filter is undefined).
         * @public
         * @function
         * @memberof Enumerable
         * @param {function} [clauseMethod] Method which applies item of used {@link Enumerable}, optionally applies its index,
         * and returns true if some given condition is satisfied, otherwise returns false.
         * Something like: function(item, itemIndex) { return isSomeConditionSatisfied(item, itemIndex); }.
         * @returns {*} Returns last item, which satisfies given condition.
         *
         * @example
         * var items = [
         *      {id: 1, name: 'Bill', age: 20},
         *      {id: 2, name: 'John', age: 13},
         *      {id: 3, name: 'Jack', age: 17},
         *      {id: 3, name: 'Susan', age: 7}
         * ];
         *
         * // It will return {id: 3, name: 'Susan', age: 7}.
         * var last = SDV.Enumerable.create(items)
         *      .last();
         *
         * // It will return {id: 3, name: 'Jack', age: 17}.
         * var lastOlderThenTen = SDV.Enumerable.create(items)
         *      .first(function(x) { return x.age > 10; });
         *
         * // It will return undefined.
         * var lastYoungerThenFive = SDV.Enumerable.create(items)
         *      .first(function(x) { return x.age < 5; });
         */
        enumerable.last = function(clauseMethod) {
            var currentItem;
    
            if (SDV.Util.Function.isFunction(clauseMethod)) {
                for (var i = this._items.length - 1; i >= 0; i--) {
                    currentItem = this._items[i];
    
                    // Given clauseMethod must return boolean value.
                    if (clauseMethod(currentItem, i)) {
                        return currentItem;
                    }
                }
            } else {
                // Method 'last' called without parameter, or parameter is not a function.
    
                if (this._items.length > 0)
                    return this._items[this._items.length - 1];
                else
                    return null;
            }
        };
    
        /**
         * Provides a way to filter {@link Enumerable} items, and get the last item, which satisfies given filter (if filter defined),
         * or simply the last item in used {@link Enumerable} (if filter is undefined),
         * or default value if none of the items do not satisfy the given filter.
         * @public
         * @function
         * @memberof Enumerable
         * @param {function} [clauseMethod] Method which applies item of used {@link Enumerable}, optionally applies its index,
         * and returns true if some given condition is satisfied, otherwise returns false.
         * Something like: function(item, itemIndex) { return isSomeConditionSatisfied(item, itemIndex); }.
         *
         * @param {*} [defaultValue] The value to be returned if none of the items do not satisfy the given filter.
         * @returns {*} Returns last item, which satisfies given condition or given default value.
         *
         * @example
         * var items = [
         *      {id: 1, name: 'Bill', age: 20},
         *      {id: 2, name: 'John', age: 13},
         *      {id: 3, name: 'Jack', age: 17},
         *      {id: 3, name: 'Susan', age: 7}
         * ];
         *
         * // It will return {id: 3, name: 'Susan', age: 7}.
         * var last = SDV.Enumerable.create(items)
         *      .lastOrDefault();
         *
         * // It will return {id: 3, name: 'Jack', age: 17}.
         * var lastOlderThenTen = SDV.Enumerable.create(items)
         *      .lastOrDefault(function(x) { return x.age > 10; });
         *
         * // It will return default value {id: 0, name: '', age: 0}.
         * var lastYoungerThenFive = SDV.Enumerable.create(items)
         *      .lastOrDefault(function(x) { return x.age < 5; }, {id: 0, name: '', age: 0});
         */
        enumerable.lastOrDefault = function(clauseMethod, defaultValue) {
            return this.last(clauseMethod) || defaultValue;
        };
    
        /**
         * Provides a way to get one of  the {@link Enumerable} items, by its index.
         * @public
         * @function
         * @memberof Enumerable
         * @param {number} index Index of desirable item.
         * @returns {*} Returns desirable item or undefined (if there is no item with index as given).
         *
         * @example
         * var items = [
         *      {id: 1, name: 'Bill', age: 20},
         *      {id: 2, name: 'John', age: 13},
         *      {id: 3, name: 'Jack', age: 17},
         *      {id: 3, name: 'Susan', age: 7}
         * ];
         *
         * // It will return {id: 2, name: 'John', age: 13}.
         * var item1 = SDV.Enumerable.create(items)
         *      .elementAt(1);
         *
         * // It will return undefined.
         * var item5 = SDV.Enumerable.create(items)
         *      .elementAt(5);
         */
        enumerable.elementAt = function(index) {
            return this._items[index];
        };
    
        /**
         * Provides a way to get one of  the {@link Enumerable} items, by its index.
         * @public
         * @function
         * @memberof Enumerable
         * @param {number} index Index of desirable item.
         * @param {*} [defaultValue] The value to be returned if there is no item with index as given.
         * @returns {*} Returns desirable item or given default value (if there is no item with index as given).
         *
         * @example
         * var items = [
         *      {id: 1, name: 'Bill', age: 20},
         *      {id: 2, name: 'John', age: 13},
         *      {id: 3, name: 'Jack', age: 17},
         *      {id: 3, name: 'Susan', age: 7}
         * ];
         *
         * // It will return {id: 2, name: 'John', age: 13}.
         * var item1 = SDV.Enumerable.create(items)
         *      .elementAtOrDefault(1);
         *
         * // It will return default value {id: 0, name: '', age: 0}.
         * var item5 = SDV.Enumerable.create(items)
         *      .elementAtOrDefault(5, {id: 0, name: '', age: 0});
         */
        enumerable.elementAtOrDefault = function(index, defaultValue) {
            return this.elementAt(index) || defaultValue;
        };
    
        /**
         * Gets count of {@link Enumerable} items, satisfies some given condition (if condition is defined),
         * or count of all wrapped items (if condition is undefined).
         * @public
         * @function
         * @memberof Enumerable
         * @param {function} clauseMethod Method which applies item of used {@link Enumerable}, optionally applies its index,
         * and returns true if some given condition is satisfied, otherwise returns false.
         * Something like: function(item, itemIndex) { return isSomeConditionSatisfied(item, itemIndex); }.
         * @returns {number} Returns count of {@link Enumerable} items, satisfies some given condition.
         *
         * @example
         * var items = [
         *      {id: 1, name: 'Bill', age: 20},
         *      {id: 2, name: 'John', age: 13},
         *      {id: 3, name: 'Jack', age: 17},
         *      {id: 3, name: 'Susan', age: 7}
         * ];
         *
         * // It will return 4.
         * var allItemsCount = SDV.Enumerable.create(items)
         *      .count();
         *
         * // It will return 3.
         * var olderThenTenCount = SDV.Enumerable.create(items)
         *      .count(function(x) { return x.age > 10; });
         *
         * // It will return 0.
         * var youngerThenFiveCount = SDV.Enumerable.create(items)
         *      .count(function(x) { return x.age < 5; });
         */
        enumerable.count = function(clauseMethod) {
            if (SDV.Util.Function.isFunction(clauseMethod)) {
                // Given clauseMethod must return boolean value.
                return this.where(clauseMethod).items.length;
            } else {
                // Method 'count' called without parameter, or parameter is not a function.
                return this._items.length;
            }
        };
    
        /**
         * Creates new {@link Enumerable} instance, contains concatenated set of items
         * (items of current {@link Enumerable} and items of array or {@link Enumerable} given as method parameter).
         * @param {Array|Enumerable} enumerableObject Array or {@link Enumerable} instance
         * to be concatenated with current {@link Enumerable}.
         * @returns {Enumerable} Returns new {@link Enumerable} instance, contains concatenated set of items.
         *
         * @example
         * var items = [
         *      {id: 1, name: 'Bill', age: 20},
         *      {id: 2, name: 'John', age: 13}
         * ];
         *
         * var items2 = [
         *      {id: 3, name: 'Jack', age: 17},
         *      {id: 3, name: 'Susan', age: 7}
         * ];
         *
         * // It will return [{id: 2, name: 'John', age: 13},  {id: 3, name: 'Susan', age: 7}].
         * var youngerThenFifteen = SDV.Enumerable.create(items)
         *      .concat(items2)
         *      .where(function(x) { return x.age < 15; })
         *      .toArray();
         *
         * // It will return same result [{id: 2, name: 'John', age: 13},  {id: 3, name: 'Susan', age: 7}].
         * var youngerThenFifteen2 =
         *      SDV.Enumerable.create(items).where(function(x) { return x.age < 15; })
         *      .concat(SDV.Enumerable.create(items2).where(function(x) { return x.age < 15; }))
         *      .toArray();
         */
        enumerable.concat = function(enumerableObject) {
            var givenItems = [];
            if (enumerableObject instanceof Enumerable) {
                givenItems = enumerableObject.items;
            } else if (SDV.Util.Array.isArray(enumerableObject)) {
                givenItems = enumerableObject;
            }
    
            return new Enumerable(this._items.concat(givenItems));
        };
    
        /**
         * Provides a way to order {@link Enumerable} items in ascending order by some selected property.
         * @public
         * @function
         * @memberof Enumerable
         * @param {function} selectionMethod Method which applies item of current {@link Enumerable}, and returns item of new selection.
         * Something like: function(item) { return someValue(item); }.
         * @returns {Enumerable} Returns new {@link Enumerable} instance, contains original items, but ordered in ascending order
         * by result values of given selectionMethod.
         *
         * @example
         * var items = [
         *      {id: 1, name: 'Bill', age: 20},
         *      {id: 2, name: 'John', age: 13},
         *      {id: 3, name: 'Jack', age: 17},
         *      {id: 3, name: 'Susan', age: 7}
         * ];
         *
         * // It will return array ordered in ascending order by 'age': [
         * //     {id: 3, name: 'Susan', age: 7},
         * //     {id: 2, name: 'John', age: 13},
         * //     {id: 3, name: 'Jack', age: 17},
         * //     {id: 1, name: 'Bill', age: 20}
         * // ].
         * var names = SDV.Enumerable.create(items)
         *      .orderBy(function(x){ x.age; })
         *      .toArray();
         */
        enumerable.orderBy = function(selectionMethod) {
            var tmpArray = [].concat(this._items);
    
            return new Enumerable(
                SDV.Util.Function.isFunction(selectionMethod)
                    ? tmpArray.sort(function(a, b) {
                    var x = selectionMethod(a);
                    var y = selectionMethod(b);
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                })
                    : tmpArray
            );
        };
    
        /**
         * Provides a way to order {@link Enumerable} items in descending order by some selected property.
         * @public
         * @function
         * @memberof Enumerable
         * @param {function} selectionMethod Method which applies item of current {@link Enumerable}, and returns item of new selection.
         * Something like: function(item) { return someValue(item); }.
         * @returns {Enumerable} Returns new {@link Enumerable} instance, contains original items, but ordered in descending order
         * by result values of given selectionMethod.
         *
         * @example
         * var items = [
         *      {id: 1, name: 'Bill', age: 20},
         *      {id: 2, name: 'John', age: 13},
         *      {id: 3, name: 'Jack', age: 17},
         *      {id: 3, name: 'Susan', age: 7}
         * ];
         *
         * // It will return array ordered in descending order by 'age': [
         * //     {id: 1, name: 'Bill', age: 20},
         * //     {id: 3, name: 'Jack', age: 17},
         * //     {id: 2, name: 'John', age: 13},
         * //     {id: 3, name: 'Susan', age: 7}
         * // ].
         * var names = SDV.Enumerable.create(items)
         *      .orderBy(function(x){ x.age; })
         *      .toArray();
         */
        enumerable.orderByDescending = function(selectionMethod) {
            var tmpArray = [].concat(this._items);
    
            return new Enumerable(
                SDV.Util.Function.isFunction(selectionMethod)
                    ? tmpArray.sort(function(a, b) {
                        var x = selectionMethod(b);
                        var y = selectionMethod(a);
                        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                    })
                    : tmpArray
            );
        };
    })();

    /**
     * Base namespace for SDV.js library templated conditions utils.
     * All supporting templated conditions utils are accessible through it.
     * @namespace SDV.Condition
     * @memberof SDV
     */
    SDV.Condition = {
        /**
         * Parsed template.
         * @memberof SDV.Condition
         * @typedef {object} parsedTemplate
         * @property {number} start Template start index in condition string.
         * @property {number} end Template end index in condition string.
         * @property {string} propertyName propertyName contained inside the template.
         *
         * @example
         * // For condition '{{a.b}} > 5' it will be next object.
         * { start: 0, end: 6, propertyName: 'a.b' };
         */
    
        /**
         * Condition parse result.
         * @memberof SDV.Condition
         * @typedef {object} conditionParseResult
         * @property {boolean} isValid Flag: represents if parsed condition is valid.
         * @property {string} message Message with error information if condition is invalid, otherwise it will be an empty string.
         * @property {parsedTemplate[]} templates Array of parsed templates,
         *
         * @example
         * // For condition '{{a.b}} > 5 || {{c.d}} < 10' it will be next array.
         * [{ start: 0, end: 6, propertyName: 'a.b' }, { start: 15, end: 21, propertyName: 'c.d' }];
         */
    
        /**
         * Checks whether a given object is a valid templated condition.
         * @memberof SDV.Condition
         * @public
         * @function
         * @param {string} condition Templated condition to parse.
         * @returns {conditionParseResult} Returns object contains validation results.
         *
         * @example
         * // It will return { isValid: false, message: 'Error. Required parameter 'condition' is undefined.', templates: null }.
         * SDV.Condition.parse();
         *
         * // It will return {
         * //   isValid: false,
         * //   message: 'Error. Parameter 'condition' must be of type 'String', but not of type '[object Null]'.',
         * //   templates: null
         * // }.
         * SDV.Condition.parse(null); // Same logic for all types except string.
         *
         * // It will return {
         * //   isValid: true,
         * //   message: '',
         * //   templates: []
         * // }.
         * SDV.Condition.parse('');
         *
         * // It will return {
         * //   isValid: true,
         * //   message: '',
         * //   templates: [{ start: 0, end: 6, propertyName: 'a.b' }]
         * // }.
         * SDV.Condition.parse('{{a.b}} > 5');
         */
        parse: function(condition) {
            var result = {
                isValid: true,
                message: '',
                templates: null
            };
    
            var validationResult = SDV.Util.Validation.validateOption({
                optionName: 'condition',
                isRequired: true,
                allowedTypes: ['String']
            }, condition);
    
            result.isValid = validationResult.isValid;
            result.message = validationResult.message;
    
            if (!result.isValid) {
                return result;
            }
    
            var conditionLength = condition.length;
            var templates = [];
    
            // We should replace all strings (for a while) to avoid such situations
            // (when template-like constructions could exist inside condition inner strings):
            // condition = '{{myProperty}} + \'{{myProperty}}\' === \'blahBlah{{myProperty}}\''.
            var conditionWithoutInnerStrings = condition.replace(/'(.*?)'|"(.*?)"/g, function(subStr, subStrPosition, originalStr) {
                return '\'' + new Array(subStr.length - 1).join('_') + '\'';
            });
    
            // Start positions of substrings which starts with '{{'.
            var templatesStartPositions = [];
            conditionWithoutInnerStrings.replace(/{{/g, function(subStr, subStrPosition, originalStr) {
                templatesStartPositions.push(subStrPosition);
    
                return subStr;
            });
    
            var templateStart = -1;
            var templateEnd = -1;
            var templateLength = 0;
            var template = '';
    
            // Each substring which starts with '{{' must contain some property name ('myProperty')
            // or properties chain (myProperty1.myProperty2...),
            // and must be finished with '}}'.
            // Remember that in JS objects could contain any strings as properties names, even an empty string.
            var fullTemplateRegex = /^{{(.*?)}}$/g;
            for (var i = 0, len = templatesStartPositions.length; i < len; i++) {
                templateStart = templatesStartPositions[i];
    
                templateEnd = conditionWithoutInnerStrings.indexOf('}}', templateStart + 1);
                templateEnd = templateEnd > 0 ? templateEnd + 1 : conditionWithoutInnerStrings.indexOf('{{', templateStart + 1) + 1;
                templateEnd = templateEnd > 0 ? templateEnd : conditionLength - 1;
    
                templateLength = templateEnd - templateStart + 1;
    
                template = condition.substr(templateStart, templateLength);
    
                if (!template.match(fullTemplateRegex)) {
                    result.isValid = false;
                    result.message = SDV.Localization.getResource('syntaxError')({
                        originalString: condition,
                        allowedConstructions: ['{{propertyName}}', '{{propertyName1.propertyName2...}}'],
                        actualConstruction: template,
                        errorPosition: templateStart
                    });
    
                    return result;
                }
    
                templates.push({
                    start: templateStart,
                    end: templateEnd,
                    propertyName: template.substr(2, templateLength - 4)
                });
            }
    
            // Additionally we need to check for unstarted templates.
            // Substrings which ends with '}}'.
            var templatesEndPositions = [];
            conditionWithoutInnerStrings.replace(/}}/g, function(subStr, subStrPosition, originalStr) {
                templatesEndPositions.push(subStrPosition);
    
                return subStr;
            });
    
            // Each substring finished with '}}' must contain some property name ('myProperty')
            // or properties chain (myProperty1.myProperty2...),
            // and must be started with '{{'.
            for (i = 0, len = templatesEndPositions.length; i < len; i++) {
                templateEnd = templatesEndPositions[i] + 1;
    
                template = conditionWithoutInnerStrings.substr(0, templateEnd + 1);
    
                templateStart = template.lastIndexOf('{{');
                templateStart = templateStart >= 0 ? templateStart : template.substr(0, template.length - 2).lastIndexOf('}}');
                templateStart = templateStart >= 0 ? templateStart : 0;
    
                templateLength = templateEnd - templateStart + 1;
    
                template = condition.substr(templateStart, templateLength);
    
                if (!template.match(fullTemplateRegex)) {
                    result.isValid = false;
                    result.message = SDV.Localization.getResource('syntaxError')({
                        originalString: condition,
                        allowedConstructions: ['{{propertyName}}', '{{propertyName1.propertyName2...}}'],
                        actualConstruction: template,
                        errorPosition: templateStart
                    });
    
                    return result;
                }
            }
    
            result.templates = templates;
    
            return result;
        }
    };
    
    // Using closure for SDV.Condition methods assigning, to hide some private members.
    (function() {
        /**
         * Constructs new instance of templated condition.
         * Constructor is private, so use factory-method {@link SDV.Condition.create} to create an instance.
         * @public
         * @class Condition
         * @param {string} condition Templated condition.
         * @param {parsedTemplate[]} conditionTemplates Array of parsed templates contained inside condition.
         */
        var Condition = function(condition, conditionTemplates) {
            this._condition = condition;
            this._templates = conditionTemplates;
        };
    
        /**
         * {@link Condition} factory-method. It is an entry point to library templated conditions facilities.
         * @static
         * @function
         * @memberof SDV.Condition
         * @param {string} condition Templated condition.
         * @returns {Condition|null} Returns new instance of {@link Condition} if given condition is valid, otherwise returns null.
         *
         * @example
         * // null.
         * var conditionInstance = SDV.Condition.create();
         *
         * // null
         * var conditionInstance = SDV.Condition.create(null);
         *
         * // Creates white color RGB representation from its stringed name.
         * var conditionInstance = SDV.Condition.create('{{properties.area}} >= 100 && {{properties.area}} <= 200');
         */
        SDV.Condition.create = function(condition) {
            var parsedCondition = null;
    
            var validationResult = SDV.Util.Validation.validateOption({
                optionName: 'condition',
                isRequired: true,
                allowedTypes: ['String'],
                postValidationMethod: function() {
                    parsedCondition = SDV.Condition.parse(condition);
    
                    return parsedCondition;
                }
            }, condition);
    
            if (!validationResult.isValid) {
                console.error(validationResult.message);
    
                return null;
            }
    
            if (parsedCondition && parsedCondition.templates) {
                return new Condition(condition, parsedCondition.templates);
            }
    
            return null;
        };
    
        /**
         * Checks whether a given object is a valid templated condition.
         * @memberof SDV.Condition
         * @public
         * @function
         * @param {*} obj Inspected object.
         * @param {boolean} allowString Flag: indicates whether unparsed condition string is allowed.
         * @returns {boolean} Returns true if inspected object is a valid templated condition, otherwise returns false.
         *
         * @example
         * SDV.Condition.isCondition(); // false.
         * SDV.Condition.isCondition(null); // false.
         * SDV.Condition.isCondition('2 > 1'); // false.
         * SDV.Condition.isCondition('2 > 1', true); // true.
         * SDV.Condition.isCondition('{{myOption}} > 1', true); // true.
         * SDV.Condition.isCondition('{{myOption1}} > 1 && {{myOption2}, true} < 2'); // true.
         * SDV.Condition.isCondition('({{myOption1}} + {{myOption2}}) < 2', true); // true.
         * SDV.Condition.isCondition('Math.Max({{myOption1}}, {{myOption2}}, true) == {{myOption1}}'); // true.
         * SDV.Condition.isCondition('{{myOption.mySubOption}} > 1', true); // true.
         *
         * var conditionInstance = SDV.Condition.create('{{myOption}} > 1');
         * SDV.Condition.isCondition(conditionInstance); // true.
         */
        SDV.Condition.isCondition = function(obj, allowString) {
            return obj instanceof Condition || (allowString === true && SDV.Condition.parse(obj).isValid);
        };
    
        // Prototype shortcut.
        var condition = SDV.Condition.prototype = Condition.prototype = {};
    
        /**
         * Gets an array of data objects satisfying to a given templated condition.
         * @memberof Condition
         * @public
         * @function
         * @throws {Error} Will throw an error if given data is not an object or objects array.
         *
         * @param {object|object[]} data Single data object or array of data objects,
         * which needed to be checked for condition satisfaction.
         * @param {boolean} tillFirstSatisfaction Flag: indicates whether to stop checking,
         * if some of data objects already satisfies given condition.
         * @returns {object[]} Returns array of those data objects which satisfies condition.
         *
         * @example
         * var absolutelyTrueCondition = SDV.Condition.create('2 > 1');
         *
         * // It will return [{name: 'first'}, {name: 'second'}, {name: 'third'}],
         * // because '2 > 1' is absolutely true regardless of data objects properties values.
         * absolutelyTrueCondition.getSatisfyingData([{name: 'first'}, {name: 'second'}, {name: 'third'}]);
         *
         * var stStringsCondition = SDV.Condition.create('{{name}}.charAt(0) === \'f\' || {{name}}.charAt(0) === \'t\'');
         *
         * // It will return [{name: 'second'}, {name: 'third'}],
         * stStringsCondition.getSatisfyingData([{name: 'first'}, {name: 'second'}, {name: 'third'}]);
         *
         * var absolutelyFalseCondition = SDV.Condition.create('2 < 1');
         *
         * // It will return [],
         * absolutelyFalseCondition.getSatisfyingData([{name: 'first'}, {name: 'second'}, {name: 'third'}]);
         */
        condition.getSatisfyingData = function(data, tillFirstSatisfaction) {
            var dataValidationResult = SDV.Util.Validation.validateOption({
                optionName: 'data',
                isRequired: true,
                allowedTypes: ['Object', 'ObjectArray']
            }, data);
    
            if (!dataValidationResult.isValid) {
                throw new Error(dataValidationResult.message);
            }
    
            tillFirstSatisfaction = tillFirstSatisfaction === true;
    
            var satisfyingDataObjects = [];
            var templates = this._templates;
            var templatesDataObjects = SDV.Util.Array.isArray(data) ? data : [data];
    
            for (var i = 0, templatesDataObjectsCount = templatesDataObjects.length; i < templatesDataObjectsCount; i++) {
                var templateOffset = 0;
                var currentCondition = this._condition;
    
                for (var j = 0, templatesCount = templates.length; j < templatesCount; j++) {
                    var template = templates[j];
                    var templateDataObject = templatesDataObjects[i];
                    var templatePropertyName = template.propertyName;
                    var templatePropertyValue = SDV.Util.Object.getPropertyValue({
                        srcObject: templateDataObject,
                        propertyName: templatePropertyName
                    });
    
                    templatePropertyValue = typeof templatePropertyValue !== 'undefined'
                        ? SDV.Util.Json.stringify(templatePropertyValue)
                        : 'undefined';
    
                    currentCondition = SDV.Util.String.insert(
                        currentCondition,
                        templatePropertyValue,
                        template.start + templateOffset,
                        template.end + templateOffset);
    
                    templateOffset += templatePropertyValue.length - (template.end - template.start + 1);
                }
    
                if (eval(currentCondition) === true) {
                    satisfyingDataObjects.push(templatesDataObjects[i]);
    
                    if (tillFirstSatisfaction) {
                        break;
                    }
                }
            }
    
            return satisfyingDataObjects;
        };
    
        /**
         * Checks if given data satisfies condition.
         * @memberof Condition
         * @public
         * @function
         * @throws {Error} Will throw an error if given data is not an object or objects array.
         *
         * @param {object|object[]} data Single data object or array of data objects,
         * which needed to be checked for condition satisfaction.
         * @returns {boolean} Returns true if some (even one) of given data objects satisfies given condition, otherwise returns false.
         *
         * @example
         * // It will return true,
         * // because '2 > 1' is absolutely true regardless of data objects properties values.
         * SDV.Condition.create('2 > 1').isSatisfiedBy([{name: 'first'}, {name: 'second'}, {name: 'third'}]);
         *
         * // It will return true, because second object satisfies given condition,
         * SDV.Condition.create('{{name}}.charAt(0) === \'f\' || {{name}}.charAt(0) === \'t\'')
         *              .isSatisfiedBy([{name: 'first'}, {name: 'second'}, {name: 'third'}]);
         *
         * // It will return false, because names lengths of all given objects are greater or equals to 5, but not less then 5.
         * SDV.Condition.create('{{name}}.length < 5').isSatisfiedBy([{name: 'first'}, {name: 'second'}, {name: 'third'}]);
         */
        condition.isSatisfiedBy = function(data) {
            return  this.getSatisfyingData(data, true).length > 0;
        }
    })();

    /**
     * Base namespace for SDV.js library capabilities for working with colors.
     * All supporting colors capabilities are accessible through it.
     * @namespace SDV.Color
     * @memberof SDV
     */
    SDV.Color = {
    };
    
    // Using closure for SDV.Color methods assigning, to hide some private members.
    (function() {
        /**
         * Constructs new color instance.
         * Constructor is private, so use factory-method {@link SDV.Color.create} to create an instance.
         * @public
         * @class Color
         * @param {string} colorDefinition Color represented as string (3/6-character hex code or color-name).
         */
        var Color = function(colorDefinition) {
            this._rgb = SDV.Color.Model.Rgb.create(colorDefinition)
        };
    
        /**
         * {@link Color} factory-method. It is an entry point to library color facilities.
         * @static
         * @function
         * @memberof SDV.Color
         * @param {string|Rgb|Hsl|Hsb|object} colorDefinition Color represented as:
         * 1. String (3/6-character hex code or color-name);
         * 2. Or {@link Rgb} (Red Green Blue) color representation instance;
         * 3. Or {@link Hsl} (Hue Saturation Lightness) color representation instance;
         * 4. Or {@link Hsb} (Hue Saturation Brightness) color representation instance;
         * 5. Or instance of some other color representation model
         * (instance should contain method toHex, which must be able to return 6-character color hex code).
         *
         * @returns {Color} Returns new instance of {@link Color} if given color definition is valid color representation,
         * otherwise returns null.
         *
         * @example
         * SDV.Color.create('#fff');    // It will return instance of white color.
         * SDV.Color.create('#ffffff'); // It will return instance of white color.
         * SDV.Color.create('white');  // It will return instance of white color.
         *
         * // It will return instance of white color.
         * SDV.Color.create(SDV.Color.Model.Rgb.create({ red: 255, green: 255, blue: 255 }));
         *
         * // It will return instance of white color.
         * SDV.Color.create(SDV.Color.Model.Hsl.create({ hue: 0, saturation: 0, lightness: 1 }));
         *
         * // It will return instance of white color.
         * SDV.Color.create(SDV.Color.Model.Hsb.create({ hue: 0, saturation: 0, brightness: 1 }));
         *
         * // It will return null.
         * SDV.Color.create('blahblah');
         */
        SDV.Color.create = function(colorDefinition) {
            var colorNameOrHexCode = colorDefinition;
    
            var validationResult = SDV.Util.Validation.validateOption({
                optionName: 'colorDefinition',
                isRequired: true,
                allowedTypes: ['Object', 'String'],
                postValidationMethod: function() {
                    var result = {
                        isValid: true,
                        message: ''
                    };
    
                    if (SDV.Util.Object.isObject(colorDefinition)) {
                        if (SDV.Util.Function.isFunction(colorDefinition.toHex)) {
                            colorNameOrHexCode = colorDefinition.toHex();
                        } else {
                            result.isValid = false;
                            result.message = SDV.Localization.getResource('wrongParameterTypeError')({
                                parameterName: 'colorDefinition.toHex',
                                expectedType: '[object Function]',
                                actualValue: colorDefinition.toHex
                            });
                        }
                    }
    
                    if (!result.isValid) {
                        return result;
                    }
    
                    var definitionIsHexCode = SDV.Color.Model.Hex.isHex(colorNameOrHexCode);
                    var definitionIsName = SDV.Color.Model.Hex.Code.hasOwnProperty(colorNameOrHexCode);
    
                    if (!(definitionIsHexCode || definitionIsName)) {
                        result.isValid = false;
                        result.message = SDV.Localization.getResource('wrongColorRepresentation')(colorNameOrHexCode);
                    }
    
                    return result;
                }
            }, colorDefinition);
    
            if (!validationResult.isValid) {
                console.error(validationResult.message);
    
                return null;
            }
    
            return new Color(colorNameOrHexCode);
        };
    
        /**
         * Checks if given object is instance of {@link Color}.
         * @static
         * @function
         * @memberof SDV.Color
         * @param {*} obj Inspected object.
         * @returns {boolean} Returns true if given object is instance of {@link Color}, otherwise returns false.
         *
         * @example
         * var whiteColor = SDV.Color.create('white');
         *
         * SDV.Color.isColor(); // false.
         * SDV.Color.isColor('#ffffff'); // false.
         * SDV.Color.isColor('white'); // false.
         * SDV.Color.isColor(whiteColor); // true.
         */
        SDV.Color.isColor = function(obj) {
            return obj instanceof Color;
        };
    
        // Prototype shortcut.
        var color = SDV.Color.prototype = Color.prototype = {};
    
        /**
         * Gets or sets red channel value for color {@link Rgb} representation.
         * @public
         * @function
         * @memberof Color
         * @param {number} [channelValue] Desirable integer ([0..255]) value for red channel of color {@link Rgb} representation.
         * If channelValue isn't defined then method works as getter, otherwise it works as setter.
         *
         * @returns {number|Color} Returns value of red channel (if method works as getter),
         * or returns current {@link Color} instance (if method works as setter).
         *
         * @example
         * var softBlueColor = SDV.Color.create('#204080');
         *
         * // It will return 32.
         * softBlueColor.red();
         *
         * // It will set red channel to 36.
         * softBlueColor.red(36);
         *
         * // Now it will return 36.
         * softBlueColor.red();
         */
        color.red = function(channelValue) {
            var result = this._rgb.red(channelValue);
    
            return SDV.Color.Model.Rgb.isRgb(result) ? this : result;
        };
    
        /**
         * Gets or sets green channel value for color {@link Rgb} representation.
         * @public
         * @function
         * @memberof Color
         * @param {number} [channelValue] Desirable integer ([0..255]) value for green channel of color {@link Rgb} representation.
         * If channelValue isn't defined then method works as getter, otherwise it works as setter.
         *
         * @returns {number|Color} Returns value of green channel (if method works as getter),
         * or returns current {@link Color} instance (if method works as setter).
         *
         * @example
         * var softBlueColor = SDV.Color.create('#204080');
         *
         * // It will return 64.
         * softBlueColor.green();
         *
         * // It will set green channel to 66.
         * softBlueColor.green(66);
         *
         * // Now it will return 66.
         * softBlueColor.green();
         */
        color.green = function(channelValue) {
            var result = this._rgb.green(channelValue);
    
            return SDV.Color.Model.Rgb.isRgb(result) ? this : result;
        };
    
        /**
         * Gets or sets blue channel value for color {@link Rgb} representation.
         * @public
         * @function
         * @memberof Color
         * @param {number} [channelValue] Desirable integer ([0..255]) value for blue channel of color {@link Rgb} representation.
         * If channelValue isn't defined then method works as getter, otherwise it works as setter.
         *
         * @returns {number|Color} Returns value of blue channel (if method works as getter),
         * or returns current {@link Color} instance (if method works as setter).
         *
         * @example
         * var softBlueColor = SDV.Color.create('#204080');
         *
         * // It will return 128.
         * softBlueColor.blue();
         *
         * // It will set blue channel to 126.
         * softBlueColor.blue(126);
         *
         * // Now it will return 126.
         * softBlueColor.blue();
         */
        color.blue = function(channelValue) {
            var result = this._rgb.blue(channelValue);
    
            return SDV.Color.Model.Rgb.isRgb(result) ? this : result;
        };
    
        /**
         * Gets or sets value for hue component of {@link Hsb} color representation.
         * @public
         * @function
         * @memberof Color
         * @param {number} [componentValue] Desirable ([0..1]) value for hue component of {@link Hsb} color representation.
         * If componentValue isn't defined then method works as getter, otherwise it works as setter.
         *
         * @returns {number|Color} Returns value of hue component (if method works as getter),
         * or returns current {@link Color} instance (if method works as setter).
         *
         * @example
         * var softBlueColor = SDV.Color.create('#204080');
         *
         * // It will return nearly 0.61.
         * softBlueColor.hue();
         *
         * // It will set hue component to 0.59.
         * softBlueColor.hue(0.59);
         *
         * // Now it will return 0.59.
         * softBlueColor.hue();
         */
        color.hue = function(componentValue) {
            var result = this.toHsb().hue(componentValue);
    
            var shouldReturnColor = false;
            if (SDV.Color.Model.Hsb.isHsb(result)) {
                shouldReturnColor = true;
                this._rgb = result.toRgb();
            }
    
            return shouldReturnColor ? this : result;
        };
    
        /**
         * Gets or sets value for saturation component of {@link Hsb} color representation.
         * @public
         * @function
         * @memberof Color
         * @param {number} [componentValue] Desirable ([0..1]) value for saturation component of {@link Hsb} color representation.
         * If componentValue isn't defined then method works as getter, otherwise it works as setter.
         *
         * @returns {number|Color} Returns value of saturation component (if method works as getter),
         * or returns current {@link Color} instance (if method works as setter).
         *
         * @example
         * var softBlueColor = SDV.Color.create('#204080');
         *
         * // It will return nearly 0.75.
         * softBlueColor.saturation();
         *
         * // It will set saturation component to 0.76.
         * softBlueColor.saturation(0.76);
         *
         * // Now it will return 0.76.
         * softBlueColor.saturation();
         */
        color.saturation = function(componentValue) {
            var result = this.toHsb().saturation(componentValue);
    
            var shouldReturnColor = false;
            if (SDV.Color.Model.Hsb.isHsb(result)) {
                shouldReturnColor = true;
                this._rgb = result.toRgb();
            }
    
            return shouldReturnColor ? this : result;
        };
    
        /**
         * Gets or sets value for brightness component of {@link Hsb} color representation.
         * @public
         * @function
         * @memberof Color
         * @param {number} [componentValue] Desirable ([0..1]) value for brightness component of {@link Hsb} color representation.
         * If componentValue isn't defined then method works as getter, otherwise it works as setter.
         *
         * @returns {number|Color} Returns value of brightness component (if method works as getter),
         * or returns current {@link Color} instance (if method works as setter).
         *
         * @example
         * var softBlueColor = SDV.Color.create('#204080');
         *
         * // It will return nearly 0.5.
         * softBlueColor.brightness();
         *
         * // It will set brightness component to 0.56.
         * softBlueColor.brightness(0.56);
         *
         * // Now it will return 0.56.
         * softBlueColor.brightness();
         */
        color.brightness = function(componentValue) {
            var result = this.toHsb().brightness(componentValue);
    
            var shouldReturnColor = false;
            if (SDV.Color.Model.Hsb.isHsb(result)) {
                shouldReturnColor = true;
                this._rgb = result.toRgb();
            }
    
            return shouldReturnColor ? this : result;
        };
    
        /**
         * Gets or sets value for lightness component of {@link Hsl} color representation.
         * @public
         * @function
         * @memberof Color
         * @param {number} [componentValue] Desirable ([0..1]) value for lightness component of {@link Hsl} color representation.
         * If componentValue isn't defined then method works as getter, otherwise it works as setter.
         *
         * @returns {number|Color} Returns value of lightness component (if method works as getter),
         * or returns current {@link Color} instance (if method works as setter).
         *
         * @example
         * var softBlueColor = SDV.Color.create('#204080');
         *
         * // It will return nearly 0.3.
         * softBlueColor.lightness();
         *
         * // It will set lightness component to 0.36.
         * softBlueColor.lightness(0.36);
         *
         * // Now it will return 0.36.
         * softBlueColor.lightness();
         */
        color.lightness = function(componentValue) {
            var result = this.toHsl().lightness(componentValue);
    
            var shouldReturnColor = false;
            if (SDV.Color.Model.Hsl.isHsl(result)) {
                shouldReturnColor = true;
                this._rgb = result.toRgb();
            }
    
            return shouldReturnColor ? this : result;
        };
    
        /**
         * Gets object contains values of all color components in different representations.
         * @public
         * @function
         * @memberof Color
         *
         * @returns {object} Returns object contains values of all color components in different representations.
         *
         * @example
         * var softBlueColor = SDV.Color.create('#204080');
         *
         * // It will return {
         * //    red: 32,
         * //    green: 64,
         * //    blue: 128,
         * //    hue: 0.61,
         * //    saturation: 0.75,
         * //    brightness: 0.5,
         * //    lightness: 0.3
         * // }.
         * softBlueColor.allComponents();
         */
        color.allComponents = function() {
            return {
                red: this.red(),
                green: this.green(),
                blue: this.blue(),
                hue: this.hue(),
                saturation: this.saturation(),
                brightness: this.brightness(),
                lightness: this.lightness()
            };
        };
    
        /**
         * Gets distance between color and another color.
         * @public
         * @function
         * @memberof Color
         *
         * @param {number} anotherColor Another color, distance to which we need to know.
         * @returns {number|null} Returns distance between color and another color (from 0.0 till 1.0),
         * or null if given parameter is not an instance of @see{Color}.
         *
         * @example
         * var blackColor = SDV.Color.create('#000000');
         * var redColor = SDV.Color.create('#ff0000');
         *
         * // It will return 1;
         * blackColor.distanceTo(redColor);
         */
        color.distanceTo = function(anotherColor) {
            if (!SDV.Color.isColor(anotherColor)) {
                return null;
            }
    
            var colorHsb = this.toHsb();
            var anotherColorHsb = anotherColor.toHsb();
    
            return colorHsb.distanceTo(anotherColorHsb);
        };
    
        /**
         * Transforms {@link Color} instance to its stringed 6-character hex-code.
         * @public
         * @function
         * @memberof Color
         * @returns {string} Returns 6-character color hex-code.
         *
         * @example
         * var whiteColor = SDV.Color.create('white');
         *
         * // It will return '#ffffff'.
         * var whiteHex = whiteColor.toHex();
         */
        color.toHex = function() {
            return this._rgb.toHex();
        };
    
        /**
         * Transforms {@link Color} instance to its {@link Rgb} representation.
         * @public
         * @function
         * @memberof Color
         * @returns {Rgb} Returns new instance of {@link Rgb} color representation.
         *
         * @example
         * var whiteColor = SDV.Color.create('white');
         *
         * // It will return new instance of RGB color representation with red = 255, green = 255, blue = 255.
         * var whiteRgb = whiteColor.toRgb();
         */
        color.toRgb = function() {
            return this._rgb.clone();
        };
    
        /**
         * Transforms {@link Color} instance to its {@link Hsl} (Hue Saturation Lightness) representation.
         * @public
         * @function
         * @memberof Color
         * @returns {Hsl} Returns new instance of {@link Hsl} (Hue Saturation Lightness) color representation.
         *
         * @example
         * var whiteColor = SDV.Color.create('white');
         *
         * // It will return new instance of HSL color representation with hue = 0, saturation = 0, lightness = 1.
         * var whiteHsl = whiteColor.toHsl();
         */
        color.toHsl = function() {
            return this._rgb.toHsl();
        };
    
        /**
         * Transforms {@link Color} instance to its {@link Hsb} (Hue Saturation Brightness) representation.
         * @public
         * @function
         * @memberof Color
         * @returns {Hsb} Returns new instance of {@link Hsb} (Hue Saturation Brightness) color representation.
         *
         * @example
         * var whiteColor = SDV.Color.create('white');
         *
         * // It will return new instance of HSB color representation with hue = 0, saturation = 0, brightness = 1.
         * var whiteHsb = whiteColor.toHsb();
         */
        color.toHsb = function() {
            return this._rgb.toHsb();
        };
    
        /**
         * Creates new {@link Color} instance with same specification.
         * @public
         * @function
         * @memberof Color
         * @returns {Color} Returns new {@link Color} instance with same specification.
         *
         * @example
         * var whiteColor = SDV.Color.create('white');
         *
         * // It will return new color instance of RGB color representation with same specification.
         * var whiteColorClone = whiteColor.clone();
         *
         * // So it will return '#ffffff'.
         * whiteColor.toHex();
         *
         * // And it will return the same '#ffffff'.
         * whiteColorClone.toHex();
         */
        color.clone = function() {
            return SDV.Color.create(this.toHex());
        };
    
        /**
         * Checks if given object is equals to {@link Color} instance.
         * @public
         * @function
         * @memberof Color
         * @param {object} obj Another color, for equality comparison.
         * @param {number} eps Permissible comparison inaccuracy (from 0 to 1).
         * @returns {boolean} Returns true if given object is {@link Color} instance with same specification, otherwise returns false.
         *
         * @example
         * var whiteColor = SDV.Color.create('white');
         *
         * var anotherWhiteColor = whiteColor.clone();
         *
         * var blackColor = SDV.Color.create('black');
         *
         * var darkGrayColor = SDV.Color.create('darkgray');
         *
         * whiteColor.equals(); // false.
         * whiteColor.equals('#ffffff'); // false.
         * whiteColor.equals('white'); // false.
         * whiteColor.equals(blackColor); // false.
         * whiteColor.equals(anotherWhiteColor); // true.
         * blackColor.equals(darkGrayColor); // false.
         * blackColor.equals(darkGrayColor, 0.5); // true.
         */
        color.equals = function(obj, eps) {
            if (!SDV.Color.isColor(obj)) {
                return false;
            }
    
            if (!SDV.Util.Number.isNumber(eps) || eps < 0) {
                eps = 0;
            }
    
            if (eps > 1) {
                eps = 1;
            }
    
            var result = false;
    
            if (eps == 0) {
                result = this._rgb.equals(obj._rgb);
            } else {
                result = !(this.distanceTo(obj) > eps);
            }
    
            return result;
        };
    })();
    

    (function() {
        var hueEps = 0.06;
        var hueRange = {
            monochrome: [0.0, 0.0],
            random: [0.0, 1.0]
        };
    
        var saturationEps = 0.1;
        var saturationRange = {
            monochrome: [0.0, 0.0],
            pale: [0.3, 0.7],
            rich: [0.7, 1.0],
            random: [0.0, 1.0]
        };
    
        var brightnessEps = 0.1;
        var brightnessRange = {
            monochrome: [0.0, 1.0],
            dark: [0.1, 0.5],
            bright: [0.5, 1.0],
            random: [0.0, 1.0]
        };
    
        var isStringedColor = function(value) {
            return SDV.Util.String.isString(value)
                && (SDV.Color.Model.Hex.isHex(value) || SDV.Color.Model.Hex.Code.hasOwnProperty(value));
        };
    
        var isMonochromeColor =function(colorDefinition) {
            if (!isStringedColor(colorDefinition)) {
                return false;
            }
    
            var hsb = SDV.Color.Model.Hsb.create(colorDefinition);
    
            var s = hsb.saturation();
            var b = hsb.brightness();
    
            var monochromeSaturationRange = [0.0, 0.3];
            var monochromeBrightnessRange = [0.0, 0.1];
    
            return !!(s >= monochromeSaturationRange[0] && s <= monochromeSaturationRange[1]
            || b >= monochromeBrightnessRange[0] && b <= monochromeBrightnessRange[1]);
        };
    
        var postValidateComponent = function(options) {
            var name = options.componentName;
            var value = options.componentValue;
            var keywords = options.keywords;
    
            var result = {
                isValid: true,
                message: ''
            };
    
            if (SDV.Util.String.isString(value)) {
                var valueIsKeyword = SDV.Util.Array.contains(keywords, value);
                var valueIsColor = isStringedColor(value);
                if (!(valueIsKeyword || valueIsColor)) {
                    result.isValid = false;
                    result.message = SDV.Localization.getResource('wrongColorRepresentation')(value);
                }
            } else if (SDV.Util.Number.isNumber(value)) {
                result = SDV.Util.Validation.validateOption({
                    optionName: name,
                    optionFullName: 'options.' + name,
                    isRequired: true,
                    allowedTypes: ['Number'],
                    minValue: 0,
                    minValueEqualityAllowed: true,
                    maxValue: 1,
                    maxValueEqualityAllowed: true
                }, value)
            }
    
            return result;
        };
    
        var validateOptions = function(options, defaults) {
            return SDV.Util.Validation.validateOptions([{
                optionName: 'count',
                optionFullName: 'options.count',
                isRequired: false,
                allowedTypes: ['Integer'],
                minValue: 0,
                minValueEqualityAllowed: true,
                replaceWithDefaultIfUndefined: false
            }, {
                optionName: 'hue',
                optionFullName: 'options.hue',
                isRequired: false,
                allowedTypes: ['String', 'Number'],
                postValidationMethod: postValidateComponent,
                postValidationMethodOptions: {
                    componentName: 'hue',
                    componentValue: options.hue,
                    keywords: SDV.Util.Object.getPropertiesNames(hueRange)
                },
                replaceWithDefaultIfUndefined: true
            }, {
                optionName: 'saturation',
                optionFullName: 'options.saturation',
                isRequired: false,
                allowedTypes: ['String', 'Number'],
                postValidationMethod: postValidateComponent,
                postValidationMethodOptions: {
                    componentName: 'saturation',
                    componentValue: options.saturation,
                    keywords: SDV.Util.Object.getPropertiesNames(saturationRange)
                },
                replaceWithDefaultIfUndefined: true
            }, {
                optionName: 'brightness',
                optionFullName: 'options.brightness',
                isRequired: false,
                allowedTypes: ['String', 'Number'],
                postValidationMethod: postValidateComponent,
                postValidationMethodOptions: {
                    componentName: 'brightness',
                    componentValue: options.brightness,
                    keywords: SDV.Util.Object.getPropertiesNames(brightnessRange)
                },
                replaceWithDefaultIfUndefined: true
            }], options, defaults);
        };
    
        var getComponentRange = function(componentName, componentValue, componentRangeDictionary, componentEps) {
            if (SDV.Util.Number.isNumber(componentValue)) {
                return [componentValue, componentValue];
            } else if (componentRangeDictionary[componentValue]) {
                return componentRangeDictionary[componentValue];
            } else {
                var component = SDV.Color.Model.Hsb.create(componentValue)[componentName]();
                return [component - componentEps, component + componentEps];
            }
        };
    
        var getRandomInRange = function(range) {
            return Math.random() * (range[1] - range[0]) + range[0];
        };
    
        // Generates random color hex code in 6-character dash notation.
        var getRandomColor = function(ranges) {
            var h = getRandomInRange(ranges.hueRange);
            h = h < 0 ? 1 - h : h;
            if (h < 0) h = 1 - h;
            if (h > 1) h = h - 1;
    
            var s = getRandomInRange(ranges.saturationRange);
            if (s < 0) s = 0;
            if (s > 1) s = 1;
    
            var b = getRandomInRange(ranges.brightnessRange);
            if (b < 0) b = 0;
            if (b > 1) b = 1;
    
            return SDV.Color.Model.Hsb.create({
                hue: h,
                saturation: s,
                brightness: b
            }).toHex();
        };
    
        /**
         * Generates new random color/colors (rather its hex code/codes in 6-character dash notation).
         * @memberof SDV.Color
         * @public
         * @function
         * @param {object} [options] Method options.
         * @param {number} [options.count] Colors count (how much colors to generate).
         * If undefined, then single color will be generated.
         *
         * @param {string|number} [options.hue = 'random'] Desirable hue of generated colors.
         * As a string it could be color hex-code, color name, or one of the following keywords: 'random', 'monochrome'.
         * As a number it could be float number from 0.0 to 1.0.
         *
         * @param {string|number} [options.saturation = 'rich'] Desirable saturation of generated colors.
         * As a string it could be color hex-code, color name, or one of the following keywords: 'random', 'rich', 'pale'.
         * As a number it could be float number from 0.0 to 1.0.
         *
         * @param {string|number} [options.brightness = 'bright'] Desirable brightness of generated colors.
         * As a string it could be color hex-code, color name, or one of the following keywords: 'random', 'bright', 'dark'.
         * As a number it could be float number from 0.0 to 1.0.
         *
         * @returns {string|string[]|null} Returns generated color hex-code in 6-character dash notation (if colorsCount wasn't defined),
         * or array of hex-codes in 6-character dash notation (if colorsCount was defined), or null (if given options are invalid).
         *
         * @example
         * SDV.Color.random(); // It will return something like '#b3446c'.
         * SDV.Color.random({ count: 2 }); // It will return something like ['#b3446c', '#2b48ef'].
         *
         * // It will return something like ['#3fd422', '#199101', '#4b8c27', #77ff2e] (different hues of green).
         * SDV.Color.random({ count: 4, hue: 'green' });
         */
        var random = function(options) {
            options = options || {};
            var defaults = {
                count: undefined,
                hue: 'random',
                saturation: 'rich',
                brightness: 'bright'
            };
    
            var validationResult = validateOptions(options, defaults);
    
            if (!validationResult.isValid) {
                console.error(validationResult.message);
                return null;
            }
    
            var hueValue = isMonochromeColor(options.hue) ? 'monochrome' : options.hue;
            var ranges = {
                hueRange: getComponentRange('hue', hueValue, hueRange, hueEps),
                saturationRange: hueValue === 'monochrome'
                    ? saturationRange.monochrome
                    : getComponentRange('saturation', options.saturation, saturationRange, saturationEps),
                brightnessRange: hueValue === 'monochrome'
                    ? brightnessRange.monochrome
                    : getComponentRange('brightness', options.brightness, brightnessRange, brightnessEps)
            };
    
            if (typeof options.count !== 'undefined') {
                // If colors count is defined then we need to generate array of random colors.
                var result = [];
    
                for (var i = 0; i < options.count; i++) {
                    result.push(getRandomColor(ranges));
                }
    
                return result;
            } else {
                // If colorsCount is undefined then we need to generate only one random color.
                return getRandomColor(ranges);
            }
        };
    
        // Assign static method to SDV.Color namespace.
        SDV.Color.random = random;
    })();
    

    /**
     * Base namespace for SDV.js library color representation models.
     * All supporting color representation models are accessible through it.
     * @namespace SDV.Color.Model
     * @memberof SDV.Color
     */
    SDV.Color.Model = {
    };
    

    /**
     * Base namespace for SDV.js library HEX color representation model.
     * All supporting HEX model facilities are accessible through it.
     * @namespace SDV.Color.Model.Hex
     * @memberof SDV.Color.Model
     */
    SDV.Color.Model.Hex = {
        /**
         * Enum containing hex-codes of all major web-colors.
         * @enum {string}
         * @memberof SDV.Color.Model.Hex
         */
        Code: {
            /** '#000000' */
            black: '#000000',
    
            /** '#000080' */
            navy: '#000080',
    
            /** '#00008b' */
            darkblue: '#00008b',
    
            /** '#0000cd' */
            mediumblue: '#0000cd',
    
            /** '#0000ff' */
            blue: '#0000ff',
    
            /** '#006400' */
            darkgreen: '#006400',
    
            /** '#008000' */
            green: '#008000',
    
            /** '#008080' */
            teal: '#008080',
    
            /** '#008b8b' */
            darkcyan: '#008b8b',
    
            /** '#00bfff' */
            deepskyblue: '#00bfff',
    
            /** '#00ced1' */
            darkturquoise: '#00ced1',
    
            /** '#00fa9a' */
            mediumspringgreen: '#00fa9a',
    
            /** '#00ff00' */
            lime: '#00ff00',
    
            /** '#00ff7f' */
            springgreen: '#00ff7f',
    
            /** '#00ffff' */
            aqua: '#00ffff',
    
            /** '#00ffff' */
            cyan: '#00ffff',
    
            /** '#191970' */
            midnightblue: '#191970',
    
            /** '#1e90ff' */
            dodgerblue: '#1e90ff',
    
            /** '#20b2aa' */
            lightseagreen: '#20b2aa',
    
            /** '#228b22' */
            forestgreen: '#228b22',
    
            /** '#2e8b57' */
            seagreen: '#2e8b57',
    
            /** '#2f4f4f' */
            darkslategrey: '#2f4f4f',
    
            /** '#2f4f4f' */
            darkslategray: '#2f4f4f',
    
            /** '#32cd32' */
            limegreen: '#32cd32',
    
            /** '#3cb371' */
            mediumseagreen: '#3cb371',
    
            /** '#40e0d0' */
            turquoise: '#40e0d0',
    
            /** '#4169e1' */
            royalblue: '#4169e1',
    
            /** '#4682b4' */
            steelblue: '#4682b4',
    
            /** '#483d8b' */
            darkslateblue: '#483d8b',
    
            /** '#48d1cc' */
            mediumturquoise: '#48d1cc',
    
            /** '#4b0082' */
            indigo: '#4b0082',
    
            /** '#556b2f' */
            darkolivegreen: '#556b2f',
    
            /** '#5f9ea0' */
            cadetblue: '#5f9ea0',
    
            /** '#6495ed' */
            cornflowerblue: '#6495ed',
    
            /** '#66cdaa' */
            mediumaquamarine: '#66cdaa',
    
            /** '#696969' */
            dimgray: '#696969',
    
            /** '#696969' */
            dimgrey: '#696969',
    
            /** '#6a5acd' */
            slateblue: '#6a5acd',
    
            /** '#6b8e23' */
            olivedrab: '#6b8e23',
    
            /** '#708090' */
            slategrey: '#708090',
    
            /** '#708090' */
            slategray: '#708090',
    
            /** '#778899' */
            lightslategrey: '#778899',
    
            /** '#778899' */
            lightslategray: '#778899',
    
            /** '#7b68ee' */
            mediumslateblue: '#7b68ee',
    
            /** '#7cfc00' */
            lawngreen: '#7cfc00',
    
            /** '#7fff00' */
            chartreuse: '#7fff00',
    
            /** '#7fffd4' */
            aquamarine: '#7fffd4',
    
            /** '#800000' */
            maroon: '#800000',
    
            /** '#800080' */
            purple: '#800080',
    
            /** '#808000' */
            olive: '#808000',
    
            /** '#808080' */
            gray: '#808080',
    
            /** '#808080' */
            grey: '#808080',
    
            /** '#87ceeb' */
            skyblue: '#87ceeb',
    
            /** '#87cefa' */
            lightskyblue: '#87cefa',
    
            /** '#8a2be2' */
            blueviolet: '#8a2be2',
    
            /** '#8b0000' */
            darkred: '#8b0000',
    
            /** '#8b008b' */
            darkmagenta: '#8b008b',
    
            /** '#8b4513' */
            saddlebrown: '#8b4513',
    
            /** '#8fbc8f' */
            darkseagreen: '#8fbc8f',
    
            /** '#90ee90' */
            lightgreen: '#90ee90',
    
            /** '#9370db' */
            mediumpurple: '#9370db',
    
            /** '#9400d3' */
            darkviolet: '#9400d3',
    
            /** '#98fb98' */
            palegreen: '#98fb98',
    
            /** '#9932cc' */
            darkorchid: '#9932cc',
    
            /** '#9acd32' */
            yellowgreen: '#9acd32',
    
            /** '#a0522d' */
            sienna: '#a0522d',
    
            /** '#a52a2a' */
            brown: '#a52a2a',
    
            /** '#a9a9a9' */
            darkgray: '#a9a9a9',
    
            /** '#a9a9a9' */
            darkgrey: '#a9a9a9',
    
            /** '#add8e6' */
            lightblue: '#add8e6',
    
            /** '#adff2f' */
            greenyellow: '#adff2f',
    
            /** '#afeeee' */
            paleturquoise: '#afeeee',
    
            /** '#b0c4de' */
            lightsteelblue: '#b0c4de',
    
            /** '#b0e0e6' */
            powderblue: '#b0e0e6',
    
            /** '#b22222' */
            firebrick: '#b22222',
    
            /** '#b8860b' */
            darkgoldenrod: '#b8860b',
    
            /** '#ba55d3' */
            mediumorchid: '#ba55d3',
    
            /** '#bc8f8f' */
            rosybrown: '#bc8f8f',
    
            /** '#bdb76b' */
            darkkhaki: '#bdb76b',
    
            /** '#c0c0c0' */
            silver: '#c0c0c0',
    
            /** '#c71585' */
            mediumvioletred: '#c71585',
    
            /** '#cd5c5c' */
            indianred: '#cd5c5c',
    
            /** '#cd853f' */
            peru: '#cd853f',
    
            /** '#d2691e' */
            chocolate: '#d2691e',
    
            /** '#d2b48c' */
            tan: '#d2b48c',
    
            /** '#d3d3d3' */
            lightgray: '#d3d3d3',
    
            /** '#d3d3d3' */
            lightgrey: '#d3d3d3',
    
            /** '#d8bfd8' */
            thistle: '#d8bfd8',
    
            /** '#da70d6' */
            orchid: '#da70d6',
    
            /** '#daa520' */
            goldenrod: '#daa520',
    
            /** '#db7093' */
            palevioletred: '#db7093',
    
            /** '#dc143c' */
            crimson: '#dc143c',
    
            /** '#dcdcdc' */
            gainsboro: '#dcdcdc',
    
            /** '#dda0dd' */
            plum: '#dda0dd',
    
            /** '#deb887' */
            burlywood: '#deb887',
    
            /** '#e0ffff' */
            lightcyan: '#e0ffff',
    
            /** '#e6e6fa' */
            lavender: '#e6e6fa',
    
            /** '#e9967a' */
            darksalmon: '#e9967a',
    
            /** '#ee82ee' */
            violet: '#ee82ee',
    
            /** '#eee8aa' */
            palegoldenrod: '#eee8aa',
    
            /** '#f08080' */
            lightcoral: '#f08080',
    
            /** '#f0e68c' */
            khaki: '#f0e68c',
    
            /** '#f0f8ff' */
            aliceblue: '#f0f8ff',
    
            /** '#f0fff0' */
            honeydew: '#f0fff0',
    
            /** '#f0ffff' */
            azure: '#f0ffff',
    
            /** '#f4a460' */
            sandybrown: '#f4a460',
    
            /** '#f5deb3' */
            wheat: '#f5deb3',
    
            /** '#f5f5dc' */
            beige: '#f5f5dc',
    
            /** '#f5f5f5' */
            whitesmoke: '#f5f5f5',
    
            /** '#f5fffa' */
            mintcream: '#f5fffa',
    
            /** '#f8f8ff' */
            ghostwhite: '#f8f8ff',
    
            /** '#fa8072' */
            salmon: '#fa8072',
    
            /** '#faebd7' */
            antiquewhite: '#faebd7',
    
            /** '#faf0e6' */
            linen: '#faf0e6',
    
            /** '#fafad2' */
            lightgoldenrodyellow: '#fafad2',
    
            /** '#fdf5e6' */
            oldlace: '#fdf5e6',
    
            /** '#ff0000' */
            red: '#ff0000',
    
            /** '#ff00ff' */
            magenta: '#ff00ff',
    
            /** '#ff00ff' */
            fuchsia: '#ff00ff',
    
            /** '#ff1493' */
            deeppink: '#ff1493',
    
            /** '#ff4500' */
            orangered: '#ff4500',
    
            /** '#ff6347' */
            tomato: '#ff6347',
    
            /** '#ff69b4' */
            hotpink: '#ff69b4',
    
            /** '#ff7f50' */
            coral: '#ff7f50',
    
            /** '#ff8c00' */
            darkorange: '#ff8c00',
    
            /** '#ffa07a' */
            lightsalmon: '#ffa07a',
    
            /** '#ffa500' */
            orange: '#ffa500',
    
            /** '#ffb6c1' */
            lightpink: '#ffb6c1',
    
            /** '#ffc0cb' */
            pink: '#ffc0cb',
    
            /** '#ffd700' */
            gold: '#ffd700',
    
            /** '#ffdab9' */
            peachpuff: '#ffdab9',
    
            /** '#ffdead' */
            navajowhite: '#ffdead',
    
            /** '#ffe4b5' */
            moccasin: '#ffe4b5',
    
            /** '#ffe4c4' */
            bisque: '#ffe4c4',
    
            /** '#ffe4e1' */
            mistyrose: '#ffe4e1',
    
            /** '#ffebcd' */
            blanchedalmond: '#ffebcd',
    
            /** '#ffefd5' */
            papayawhip: '#ffefd5',
    
            /** '#fff0f5' */
            lavenderblush: '#fff0f5',
    
            /** '#fff5ee' */
            seashell: '#fff5ee',
    
            /** '#fff8dc' */
            cornsilk: '#fff8dc',
    
            /** '#fffacd' */
            lemonchiffon: '#fffacd',
    
            /** '#fffaf0' */
            floralwhite: '#fffaf0',
    
            /** '#fffafa' */
            snow: '#fffafa',
    
            /** '#ffff00' */
            yellow: '#ffff00',
    
            /** '#ffffe0' */
            lightyellow: '#ffffe0',
    
            /** '#fffff0' */
            ivory: '#fffff0',
    
            /** '#ffffff' */
            white: '#ffffff'
        }
    };
    
    // Using closure for SDV.Color.Model.Hex methods assigning, to hide some private members.
    (function() {
    
        // Expand shorthand form (e.g. '#03f') to full form (e.g. '#0033ff').
        var getExpandedHex = function(hex) {
            try {
                return hex.toLowerCase().replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (m, r, g, b) {
                    return '#' + r + r + g + g + b + b;
                });
            } catch(ex) {
                return null;
            }
        };
    
        // Get color hex-code from given color name.
        var getHexFromName = function(colorName) {
            var name = colorName.toLowerCase();
    
            return SDV.Color.Model.Hex.Code.hasOwnProperty(colorName)
                ? SDV.Color.Model.Hex.Code[colorName]
                : null;
        };
    
        /**
         * Color hex-code factory-method. It is an entry point to library HEX color representation model.
         * @static
         * @function
         * @memberof SDV.Color.Model.Hex
         * @param {string} colorDefinition Color definition represented as:
         * 1. String color name, for example 'white';
         * 2. String color 3/6-character hex-code , for example '#fff' or '#ffffff'.
         * @returns {string|null} Returns 6-character color hex-code if given colorDefinition is valid, otherwise returns null.
         *
         * @example
         * // Creates white color RGB representation from its 3-character hex-code.
         * // It will return '#ffffff'.
         * var whiteRgb = SDV.Color.Model.Rgb.create('#fff');
         *
         * // Creates white color RGB representation from its 6-character hex-code.
         * // It will return '#ffffff'.
         * var whiteRgb = SDV.Color.Model.Rgb.create('#ffffff');
         *
         * // Creates white color RGB representation from its stringed name.
         * // It will return '#ffffff'.
         * var whiteRgb = SDV.Color.Model.Rgb.create('white');
         */
        SDV.Color.Model.Hex.create = function(colorDefinition) {
            var definitionIsHexCode, definitionIsName = false;
    
            var validationResult = SDV.Util.Validation.validateOption({
                optionName: 'colorDefinition',
                isRequired: true,
                allowedTypes: ['String'],
                postValidationMethod: function() {
                    var result = {
                        isValid: true,
                        message: ''
                    };
    
                    definitionIsHexCode = SDV.Color.Model.Hex.isHex(colorDefinition);
                    definitionIsName = SDV.Color.Model.Hex.Code.hasOwnProperty(colorDefinition);
    
                    if (!(definitionIsHexCode || definitionIsName)) {
                        result.isValid = false;
                        result.message = SDV.Localization.getResource('wrongColorRepresentation')(colorDefinition);
                    }
    
                    return result;
                }
            }, colorDefinition);
    
            if (!validationResult.isValid) {
                console.error(validationResult.message);
    
                return null;
            }
    
            if (definitionIsHexCode) {
                return getExpandedHex(colorDefinition);
            }
    
            if (definitionIsName) {
                return getHexFromName(colorDefinition);
            }
    
            return null;
        };
    
        /**
         * Checks if given object is stringed color hex-code.
         * @static
         * @function
         * @memberof SDV.Color.Model.Hex
         * @param {*} obj Inspected object.
         * @returns {boolean} Returns true if given object is is stringed color hex-code, otherwise returns false.
         *
         * @example
         * SDV.Color.Model.Hex.isHex(); // false.
         * SDV.Color.Model.Hex.isHex('white'); // false.
         * SDV.Color.Model.Hex.isHex('#fff'); // true.
         * SDV.Color.Model.Hex.isHex('#ffffff'); // true.
         */
        SDV.Color.Model.Hex.isHex = function(obj) {
            return SDV.Util.String.isString(obj) && obj.match(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
        };
    })();

    /**
     * Base namespace for SDV.js library RGB color representation model.
     * All supporting RGB model facilities are accessible through it.
     * @namespace SDV.Color.Model.Rgb
     * @memberof SDV.Color.Model
     */
    SDV.Color.Model.Rgb = {
    };
    
    // Using closure for SDV.Color.Model.Rgb methods assigning, to hide some private members.
    (function() {
        /**
         * Constructs new instance of RGB-represented color.
         * Constructor is private, so use factory-method {@link SDV.Color.Model.Rgb.create} to create an instance.
         * @public
         * @class Rgb
         * @param {object} colorDefinition Color definition represented as
         * object, containing values for reg, green and blue channels, for example { red: 255, green: 255, blue: 255 }.
         */
        var Rgb = function(colorDefinition) {
            this._red = colorDefinition.red;
            this._green = colorDefinition.green;
            this._blue = colorDefinition.blue;
        };
    
        // Factory-method constructing RGB from given color hex-code or name.
        var createRgbFromHexCodeOrColorName = function(colorDefinition) {
            var expandedHex = SDV.Color.Model.Hex.create(colorDefinition);
            var hexComponents = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(expandedHex);
    
            return hexComponents
                ? new Rgb({
                    red: parseInt(hexComponents[1], 16),
                    green: parseInt(hexComponents[2], 16),
                    blue: parseInt(hexComponents[3], 16)
                })
                : null;
        };
    
        /**
         * {@link Rgb} factory-method. It is an entry point to library RGB color representation model.
         * @static
         * @function
         * @memberof SDV.Color.Model.Rgb
         * @param {string|object} colorDefinition Color definition represented as:
         * 1. String color name, for example 'white';
         * 2. String color 3/6-character hex-code , for example '#fff' or '#ffffff';
         * 3. Object, containing values for reg, green and blue channels, for example { red: 255, green: 255, blue: 255 }.
         * @returns {Rgb|null} Returns new instance of {@link Rgb} if given colorDefinition is valid, otherwise returns null.
         *
         * @example
         * // Creates white color RGB representation from its channels values.
         * var whiteRgb = SDV.Color.Model.Rgb.create({
         *      red: 255,
         *      green: 255,
         *      blue: 255
         * });
         *
         * // Creates white color RGB representation from its 3-character hex-code.
         * var whiteRgb = SDV.Color.Model.Rgb.create('#fff');
         *
         * // Creates white color RGB representation from its 6-character hex-code.
         * var whiteRgb = SDV.Color.Model.Rgb.create('#ffffff');
         *
         * // Creates white color RGB representation from its stringed name.
         * var whiteRgb = SDV.Color.Model.Rgb.create('white');
         */
        SDV.Color.Model.Rgb.create = function(colorDefinition) {
            var definitionIsHexCode, definitionIsName, definitionIsObject = false;
    
            var validationResult = SDV.Util.Validation.validateOption({
                optionName: 'colorDefinition',
                isRequired: true,
                allowedTypes: ['Object', 'String'],
                postValidationMethod: function() {
                    var result = {
                        isValid: true,
                        message: ''
                    };
    
                    if (SDV.Util.String.isString(colorDefinition)) {
                        definitionIsHexCode = SDV.Color.Model.Hex.isHex(colorDefinition);
                        definitionIsName = SDV.Color.Model.Hex.Code.hasOwnProperty(colorDefinition);
    
                        if (!(definitionIsHexCode || definitionIsName)) {
                            result.isValid = false;
                            result.message = SDV.Localization.getResource('wrongColorRepresentation')(colorDefinition);
                        }
                    } else {
                        definitionIsObject = true;
    
                        result = SDV.Util.Validation.validateOptions([{
                            optionName: 'red',
                            optionFullName: 'colorDefinition.red',
                            isRequired: true,
                            allowedTypes: ['Integer'],
                            minValue: 0,
                            minValueEqualityAllowed: true,
                            maxValue: 255,
                            maxValueEqualityAllowed: true
                        }, {
                            optionName: 'green',
                            optionFullName: 'colorDefinition.green',
                            isRequired: true,
                            allowedTypes: ['Integer'],
                            minValue: 0,
                            minValueEqualityAllowed: true,
                            maxValue: 255,
                            maxValueEqualityAllowed: true
                        }, {
                            optionName: 'blue',
                            optionFullName: 'colorDefinition.blue',
                            isRequired: true,
                            allowedTypes: ['Integer'],
                            minValue: 0,
                            minValueEqualityAllowed: true,
                            maxValue: 255,
                            maxValueEqualityAllowed: true
                        }], colorDefinition);
                    }
    
                    return result;
                }
            }, colorDefinition);
    
            if (!validationResult.isValid) {
                console.error(validationResult.message);
    
                return null;
            }
    
            if (definitionIsHexCode || definitionIsName) {
                return createRgbFromHexCodeOrColorName(colorDefinition);
            }
    
            if (definitionIsObject) {
                return new Rgb(colorDefinition);
            }
    
            return null;
        };
    
        /**
         * Checks if given object is instance of {@link Rgb}.
         * @static
         * @function
         * @memberof SDV.Color.Model.Rgb
         * @param {*} obj Inspected object.
         * @returns {boolean} Returns true if given object is instance of {@link Rgb}, otherwise returns false.
         *
         * @example
         * var whiteRgb = SDV.Color.Model.Rgb.create({
         *      red: 255,
         *      green: 255,
         *      blue: 255
         * });
         *
         * SDV.Color.Model.Rgb.isRgb(); // false.
         * SDV.Color.Model.Rgb.isRgb('#ffffff'); // false.
         * SDV.Color.Model.Rgb.isRgb('white'); // false.
         * SDV.Color.Model.Rgb.isRgb({ red: 255, green: 255, blue: 255 }); // false.
         * SDV.Color.Model.Rgb.isRgb(whiteRgb); // true.
         */
        SDV.Color.Model.Rgb.isRgb = function(obj) {
            return obj instanceof Rgb;
        };
    
        // Gets or sets one of RGB channels value.
        // If channelValue is defined then method is setter, otherwise it is getter.
        var getOrSetChannelValue = function(rgbInstance, channelName, channelValue){
            var validationResult = SDV.Util.Validation.validateOption({
                optionName: 'channelValue',
                isRequired: false,
                allowedTypes: ['Integer'],
                minValue: 0,
                minValueEqualityAllowed: true,
                maxValue: 255,
                maxValueEqualityAllowed: true
            }, channelValue);
    
            if (!validationResult.isValid) {
                console.error(validationResult.message);
                return rgbInstance;
            }
    
            var innerChannelName = '_' + channelName;
    
            if (!validationResult.isDefined) {
                return rgbInstance[innerChannelName];
            }
    
            rgbInstance[innerChannelName] = channelValue;
    
            // Return instance for chain calls support.
            return rgbInstance;
        };
    
        // Prototype shortcut.
        var rgb = SDV.Color.Model.Rgb.prototype = Rgb.prototype = {};
    
        /**
         * Gets or sets red channel value for {@link Rgb}.
         * @public
         * @function
         * @memberof Rgb
         * @param {number} [channelValue] Desirable integer ([0..255]) value for red channel of {@link Rgb}.
         * If channelValue isn't defined then method works as getter, otherwise it works as setter.
         *
         * @returns {number|Rgb} Returns value of red channel (if method works as getter),
         * or returns current {@link Rgb} instance (if method works as setter).
         *
         * @example
         * var softBlueRgb = SDV.Color.Model.Rgb.create({
         *      red: 32,
         *      green: 64,
         *      blue: 128
         * });
         *
         * // It will return 32.
         * softBlueRgb.red();
         *
         * // It will set red channel to 36.
         * softBlueRgb.red(36);
         *
         * // Now it will return 36.
         * softBlueRgb.red();
         */
        rgb.red = function(channelValue) {
            return getOrSetChannelValue(this, 'red', channelValue);
        };
    
        /**
         * Gets or sets green channel value for {@link Rgb}.
         * @public
         * @function
         * @memberof Rgb
         * @param {number} [channelValue] Desirable integer ([0..255]) value for green channel of {@link Rgb}.
         * If channelValue isn't defined then method works as getter, otherwise it works as setter.
         *
         * @returns {number|Rgb} Returns value of green channel (if method works as getter),
         * or returns current {@link Rgb} instance (if method works as setter).
         *
         * @example
         * var softBlueRgb = SDV.Color.Model.Rgb.create({
         *      red: 32,
         *      green: 64,
         *      blue: 128
         * });
         *
         * // It will return 64.
         * softBlueRgb.green();
         *
         * // It will set green channel to 66.
         * softBlueRgb.green(66);
         *
         * // Now it will return 66.
         * softBlueRgb.green();
         */
        rgb.green = function(channelValue) {
            return getOrSetChannelValue(this, 'green', channelValue);
        };
    
        /**
         * Gets or sets blue channel value for {@link Rgb}.
         * @public
         * @function
         * @memberof Rgb
         * @param {number} [channelValue] Desirable integer ([0..255]) value for blue channel of {@link Rgb}.
         * If channelValue isn't defined then method works as getter, otherwise it works as setter.
         *
         * @returns {number|Rgb} Returns value of blue channel (if method works as getter),
         * or returns current {@link Rgb} instance (if method works as setter).
         *
         * @example
         * var softBlueRgb = SDV.Color.Model.Rgb.create({
         *      red: 32,
         *      green: 64,
         *      blue: 128
         * });
         *
         * // It will return 128.
         * softBlueRgb.blue();
         *
         * // It will set blue channel to 126.
         * softBlueRgb.blue(126);
         *
         * // Now it will return 126.
         * softBlueRgb.blue();
         */
        rgb.blue = function(channelValue) {
            return getOrSetChannelValue(this, 'blue', channelValue);
        };
    
        /**
         * Gets distance between RGB color representation and another RGB color representation.
         * @public
         * @function
         * @memberof Rgb
         *
         * @param {Rgb} anotherRgb Another RGB color representation, distance to which we need to know.
         * @returns {number|null} Returns distance (from 0.0 till 1.0),
         * or null if given parameter is not an instance of @see{Hsb}.
         *
         * @example
         * var blackColorRgb = SDV.Color.Model.Rgb.create('#000000');
         * var redColorRgb = SDV.Color.Model.Rgb.create('#ff0000');
         *
         * // It will return 1;
         * blackColorRgb.distanceTo(redColorRgb);
         */
        rgb.distanceTo = function(anotherRgb) {
            if (!SDV.Color.Model.Rgb.isRgb(anotherRgb)) {
                return null;
            }
    
            var r = (anotherRgb._red - this._red) / 255.0;
            var g = anotherRgb._green - this._green / 255.0;
            var b = anotherRgb._blue - this._blue / 255.0;
    
            // Math.sqrt(3) is max possible distance.
            return Math.sqrt(r*r + g*g + b*b) / Math.sqrt(3);
        };
    
        /**
         * Transforms {@link Rgb} color to its stringed 6-character hex-code.
         * @public
         * @function
         * @memberof Rgb
         * @returns {string} Returns 6-character color hex-code.
         *
         * @example
         * var whiteRgb = SDV.Color.Model.Rgb.create({
         *      red: 255,
         *      green: 255,
         *      blue: 255
         * });
         *
         * // It will return '#ffffff'.
         * var whiteHex = whiteRgb.toHex();
         */
        rgb.toHex = function() {
            return '#' + ((1 << 24) + (this._red << 16) + (this._green << 8) + this._blue).toString(16).slice(1);
        };
    
        /**
         * Transforms {@link Rgb} color to its {@link Hsl} (Hue Saturation Lightness) color representation.
         * @public
         * @function
         * @memberof Rgb
         * @returns {Hsl} Returns new instance of {@link Hsl} (Hue Saturation Lightness) color representation.
         *
         * @example
         * var whiteRgb = SDV.Color.Model.Rgb.create({
         *      red: 255,
         *      green: 255,
         *      blue: 255
         * });
         *
         * // It will return new instance of HSL color representation with hue = 0, saturation = 0, lightness = 1.
         * var whiteHsl = whiteRgb.toHsl();
         */
        rgb.toHsl = function() {
            var r = this._red / 255.0;
            var g = this._green / 255.0;
            var b = this._blue / 255.0;
    
            var max = Math.max(r, g, b);
            var min = Math.min(r, g, b);
    
            var hue, saturation, lightness = (max + min) * 0.5;
    
            if(max == min){
                // Color is achromatic.
                hue = saturation = 0.0;
            }else{
                var delta = max - min;
                saturation = lightness > 0.5 ? delta / (2.0 - max - min) : delta / (max + min);
                switch(max){
                    case r:
                        hue = (g - b) / delta + (g - b < 0.0001 ? 6.0 : 0.0);
                        break;
                    case g:
                        hue = (b - r) / delta + 2.0;
                        break;
                    case b:
                        hue = (r - g) / delta + 4.0;
                        break;
                }
    
                hue = hue / 6.0;
            }
    
            return SDV.Color.Model.Hsl.create({
                hue: hue,
                saturation: saturation,
                lightness: lightness
            });
        };
    
        /**
         * Transforms {@link Rgb} color to its {@link Hsb} (Hue Saturation Brightness) color representation.
         * @public
         * @function
         * @memberof Rgb
         * @returns {Hsb} Returns new instance of {@link Hsb} (Hue Saturation Brightness) color representation.
         *
         * @example
         * var whiteRgb = SDV.Color.Model.Rgb.create({
         *      red: 255,
         *      green: 255,
         *      blue: 255
         * });
         *
         * // It will return new instance of HSB color representation with hue = 0, saturation = 0, brightness = 1.
         * var whiteHsb = whiteRgb.toHsb();
         */
        rgb.toHsb = function() {
            var r = this._red / 255.0;
            var g = this._green / 255.0;
            var b = this._blue / 255.0;
    
            var min = Math.min(r, g, b);
            var max = Math.max(r, g, b);
            var delta = max - min;
            var hue = 0.0;
            var saturation = 0.0;
            var brightness = max;
    
            if (min != max)
            {
                saturation = (delta / max);
    
                switch (max)
                {
                    case r:
                        hue = (g - b) / delta + (g - b < 0.0001 ? 6.0 : 0.0);
                        break;
                    case g:
                        hue = (b - r) / delta + 2.0;
                        break;
                    case b:
                        hue = (r - g) / delta + 4.0;
                        break;
                }
    
                hue = hue / 6.0;
            }
    
            return SDV.Color.Model.Hsb.create({
                hue: hue,
                saturation: saturation,
                brightness: brightness
            });
        };
    
        /**
         * Creates new {@link Rgb} instance with same RGB-channels values.
         * @public
         * @function
         * @memberof Rgb
         * @returns {Rgb} Returns new {@link Rgb} instance with same RGB-channels values.
         *
         * @example
         * var whiteRgb = SDV.Color.Model.Rgb.create({
         *      red: 255,
         *      green: 255,
         *      blue: 255
         * });
         *
         * // It will return new instance of RGB color representation with same channels values:
         * // red = 255, green = 255, blue = 255.
         * var whiteRgbClone = whiteRgb.clone();
         */
        rgb.clone = function() {
            return SDV.Color.Model.Rgb.create({
                red: this._red,
                green: this._green,
                blue: this._blue
            });
        };
    
        /**
         * Checks if given object is equals to {@link Rgb} instance.
         * @public
         * @function
         * @memberof Rgb
         * @param {object} obj Another HSB color representation, for equality comparison.
         * @param {number} eps Permissible comparison inaccuracy (from 0 to 1).
         *
         * @returns {boolean} Returns true if given object is {@link Rgb} instance with same RGB-channels values, otherwise returns false.
         *
         * @example
         * var whiteRgb = SDV.Color.Model.Rgb.create({
         *      red: 255,
         *      green: 255,
         *      blue: 255
         * });
         *
         * var anotherWhiteRgb = whiteRgb.clone();
         *
         * var blackRgb = SDV.Color.Model.Rgb.create({
         *      red: 0,
         *      green: 0,
         *      blue: 0
         * });
         *
         * var darkGrayRgb= SDV.Color.Model.Rgb.create('darkgray');
         *
         * whiteRgb.equals(); // false.
         * whiteRgb.equals('#ffffff'); // false.
         * whiteRgb.equals('white'); // false.
         * whiteRgb.equals({ red: 255, green: 255, blue: 255 }); // false.
         * whiteRgb.equals(blackRgb); // false.
         * whiteRgb.equals(anotherWhiteRgb); // true.
         * blackRgb.equals(darkGrayRgb); // false.
         * blackRgb.equals(darkGrayRgb, 0.5); // true.
         */
        rgb.equals = function(obj, eps) {
            if (!SDV.Color.Model.Rgb.isRgb(obj)) {
                return false;
            }
    
            if (!SDV.Util.Number.isNumber(eps) || eps < 0) {
                eps = 0;
            }
    
            if (eps > 1) {
                eps = 1;
            }
    
            var result = false;
    
            if (eps == 0) {
                result = this._red === obj._red
                && this._green === obj._green
                && this._blue === obj._blue;
            } else {
                result = !(this.distanceTo(obj) > eps);
            }
    
            return result;
        };
    })();

    /**
     * Base namespace for SDV.js library HSL (Hue Saturation Lightness) color representation model.
     * All supporting HSL model facilities are accessible through it.
     * @namespace SDV.Color.Model.Hsl
     * @memberof SDV.Color.Model
     */
    SDV.Color.Model.Hsl = {
    };
    
    // Using closure for SDV.Color.Model.Hsl methods assigning, to hide some private members.
    (function() {
        /**
         * Constructs new instance of HSL-represented color.
         * Constructor is private, so use factory-method {@link SDV.Color.Model.Hsl.create} to create an instance.
         * @public
         * @class Hsl
         * @param {object} colorDefinition Color definition represented as
         * object, containing values of hue, saturation and lightness, for example { hue: 0, saturation: 0, lightness: 1 }.
         */
        var Hsl = function(colorDefinition) {
            this._hue = colorDefinition.hue;
            this._saturation = colorDefinition.saturation;
            this._lightness = colorDefinition.lightness;
        };
    
        // Factory-method constructing HSL from given color hex-code or name.
        var createHslFromHexCodeOrColorName = function(colorDefinition) {
            var rgb = SDV.Color.Model.Rgb.create(colorDefinition);
    
            return rgb !== null ? rgb.toHsl() : null;
        };
    
        /**
         * {@link Hsl} factory-method.
         * It is an entry point to library HSL (Hue Saturation Lightness) color representation model.
         * @static
         * @function
         * @memberof SDV.Color.Model.Hsl
         * @param {string|object} colorDefinition Color definition represented as:
         * 1. String color name, for example 'white';
         * 2. String color 3/6-character hex-code , for example '#fff' or '#ffffff';
         * 3. Object, containing values of hue, saturation and lightness, for example { hue: 0, saturation: 0, lightness: 1 }.
         * @returns {Hsl|null} Returns new instance of {@link Hsl} if given colorDefinition is valid, otherwise returns null.
         *
         * @example
         * // Creates white color HSL representation from its numeric values.
         * var whiteHsl = SDV.Color.Model.Hsl.create({
         *      hue: 0,
         *      saturation: 0,
         *      lightness: 1
         * });
         *
         * // Creates white color HSL representation from its 3-character hex-code.
         * var whiteHsl = SDV.Color.Model.Hsl.create('#fff');
         *
         * // Creates white color HSL representation from its 6-character hex-code.
         * var whiteHsl = SDV.Color.Model.Hsl.create('#ffffff');
         *
         * // Creates white color HSL representation from its stringed name.
         * var whiteHsl = SDV.Color.Model.Hsl.create('white');
         */
        SDV.Color.Model.Hsl.create = function(colorDefinition) {
            var definitionIsHexCode, definitionIsName, definitionIsObject = false;
    
            var validationResult = SDV.Util.Validation.validateOption({
                optionName: 'colorDefinition',
                isRequired: true,
                allowedTypes: ['Object', 'String'],
                postValidationMethod: function() {
                    var result = {
                        isValid: true,
                        message: ''
                    };
    
                    if (SDV.Util.String.isString(colorDefinition)) {
                        definitionIsHexCode = SDV.Color.Model.Hex.isHex(colorDefinition);
                        definitionIsName = SDV.Color.Model.Hex.Code.hasOwnProperty(colorDefinition);
    
                        if (!(definitionIsHexCode || definitionIsName)) {
                            result.isValid = false;
                            result.message = SDV.Localization.getResource('wrongColorRepresentation')(colorDefinition);
                        }
                    } else {
                        definitionIsObject = true;
    
                        result = SDV.Util.Validation.validateOptions([{
                            optionName: 'hue',
                            optionFullName: 'colorDefinition.hue',
                            isRequired: true,
                            allowedTypes: ['Number'],
                            minValue: 0,
                            minValueEqualityAllowed: true,
                            maxValue: 1,
                            maxValueEqualityAllowed: true
                        }, {
                            optionName: 'saturation',
                            optionFullName: 'colorDefinition.saturation',
                            isRequired: true,
                            allowedTypes: ['Number'],
                            minValue: 0,
                            minValueEqualityAllowed: true,
                            maxValue: 1,
                            maxValueEqualityAllowed: true
                        }, {
                            optionName: 'lightness',
                            optionFullName: 'colorDefinition.lightness',
                            isRequired: true,
                            allowedTypes: ['Number'],
                            minValue: 0,
                            minValueEqualityAllowed: true,
                            maxValue: 1,
                            maxValueEqualityAllowed: true
                        }], colorDefinition);
                    }
    
                    return result;
                }
            }, colorDefinition);
    
            if (!validationResult.isValid) {
                console.error(validationResult.message);
    
                return null;
            }
    
            if (definitionIsHexCode || definitionIsName) {
                return createHslFromHexCodeOrColorName(colorDefinition);
            }
    
            if (definitionIsObject) {
                return new Hsl(colorDefinition);
            }
    
            return null;
        };
    
        /**
         * Checks if given object is instance of {@link Hsl}.
         * @static
         * @function
         * @memberof SDV.Color.Model.Hsl
         * @param {*} obj Inspected object.
         * @returns {boolean} Returns true if given object is instance of {@link Hsl}, otherwise returns false.
         *
         * @example
         * var whiteHsl = SDV.Color.Model.Hsl.create({
         *      hue: 0,
         *      saturation: 0,
         *      lightness: 1
         * });
         *
         * SDV.Color.Model.Hsl.isHsl(); // false.
         * SDV.Color.Model.Hsl.isHsl('#ffffff'); // false.
         * SDV.Color.Model.Hsl.isHsl('white'); // false.
         * SDV.Color.Model.Hsl.isHsl({ hue: 0, saturation: 0, lightness: 1 }); // false.
         * SDV.Color.Model.Hsl.isHsl(whiteHsl); // true.
         */
        SDV.Color.Model.Hsl.isHsl = function(obj) {
            return obj instanceof Hsl;
        };
    
        // Gets or sets one of HSL components value.
        // If componentValue is defined then method is setter, otherwise it is getter.
        var getOrSetComponentValue = function(hslInstance, componentName, componentValue){
            var validationResult = SDV.Util.Validation.validateOption({
                optionName: 'componentValue',
                isRequired: false,
                allowedTypes: ['Number'],
                minValue: 0,
                minValueEqualityAllowed: true,
                maxValue: 1,
                maxValueEqualityAllowed: true
            }, componentValue);
    
            if (!validationResult.isValid) {
                console.error(validationResult.message);
                return hslInstance;
            }
    
            var innerComponentName = '_' + componentName;
    
            if (!validationResult.isDefined) {
                return hslInstance[innerComponentName];
            }
    
            hslInstance[innerComponentName] = componentValue;
    
            // Return instance for chain calls support.
            return hslInstance;
        };
    
        // Prototype shortcut.
        var hsl = SDV.Color.Model.Hsl.prototype = Hsl.prototype = {};
    
        /**
         * Gets or sets value for hue component of {@link Hsl}.
         * @public
         * @function
         * @memberof Hsl
         * @param {number} [componentValue] Desirable ([0..1]) value for hue component of {@link Hsl}.
         * If componentValue isn't defined then method works as getter, otherwise it works as setter.
         *
         * @returns {number|Hsl} Returns value of hue component (if method works as getter),
         * or returns current {@link Hsl} instance (if method works as setter).
         *
         * @example
         * var softBlueHsl = SDV.Color.Model.Hsl.create({
         *      hue: 0.61,
         *      saturation: 0.6,
         *      lightness: 0.3
         * });
         *
         * // It will return 0.61.
         * softBlueHsl.hue();
         *
         * // It will set hue component to 0.59.
         * softBlueHsl.hue(0.59);
         *
         * // Now it will return 0.59.
         * softBlueHsl.hue();
         */
        hsl.hue = function(componentValue) {
            return getOrSetComponentValue(this, 'hue', componentValue);
        };
    
        /**
         * Gets or sets value for saturation component of {@link Hsl}.
         * @public
         * @function
         * @memberof Hsl
         * @param {number} [componentValue] Desirable ([0..1]) value for saturation component of {@link Hsl}.
         * If componentValue isn't defined then method works as getter, otherwise it works as setter.
         *
         * @returns {number|Hsl} Returns value of saturation component (if method works as getter),
         * or returns current {@link Hsl} instance (if method works as setter).
         *
         * @example
         * var softBlueHsl = SDV.Color.Model.Hsl.create({
         *      hue: 0.61,
         *      saturation: 0.6,
         *      lightness: 0.3
         * });
         *
         * // It will return 0.6.
         * softBlueHsl.saturation();
         *
         * // It will set saturation component to 0.66.
         * softBlueHsl.saturation(0.66);
         *
         * // Now it will return 0.66.
         * softBlueHsl.saturation();
         */
        hsl.saturation = function(componentValue) {
            return getOrSetComponentValue(this, 'saturation', componentValue);
        };
    
        /**
         * Gets or sets value for lightness component of {@link Hsl}.
         * @public
         * @function
         * @memberof Hsl
         * @param {number} [componentValue] Desirable ([0..1]) value for lightness component of {@link Hsl}.
         * If componentValue isn't defined then method works as getter, otherwise it works as setter.
         *
         * @returns {number|Hsl} Returns value of lightness component (if method works as getter),
         * or returns current {@link Hsl} instance (if method works as setter).
         *
         * @example
         * var softBlueHsl = SDV.Color.Model.Hsl.create({
         *      hue: 0.61,
         *      saturation: 0.6,
         *      lightness: 0.3
         * });
         *
         * // It will return 0.3.
         * softBlueHsl.lightness();
         *
         * // It will set hue component to 0.36.
         * softBlueHsl.lightness(0.36);
         *
         * // Now it will return 0.36.
         * softBlueHsl.lightness();
         */
        hsl.lightness = function(componentValue) {
            return getOrSetComponentValue(this, 'lightness', componentValue);
        };
    
        /**
         * Gets distance between HSL color representation and another HSL color representation.
         * @public
         * @function
         * @memberof Hsl
         *
         * @param {Hsl} anotherHsl Another color HSL representation, distance to which we need to know.
         * @returns {number|null} Returns distance (from 0.0 till 1.0),
         * or null if given parameter is not an instance of @see{Hsl}.
         *
         * @example
         * var blackColorHsl = SDV.Color.Model.Hsl.create('#000000');
         * var redColorHsl = SDV.Color.Model.Hsl.create('#ff0000');
         *
         * // It will return 1;
         * blackColorHsl.distanceTo(redColorHsl);
         */
        hsl.distanceTo = function(anotherHsl) {
            if (!SDV.Color.Model.Hsl.isHsl(anotherHsl)) {
                return null;
            }
    
            var h = anotherHsl._hue - this._hue;
            var s = anotherHsl._saturation - this._saturation;
            var l = anotherHsl._lightness - this._lightness;
    
            // Math.sqrt(3) is max possible distance.
            return Math.sqrt(h*h + s*s + l*l) / Math.sqrt(3);
        };
    
        /**
         * Transforms {@link Hsl} (Hue Saturation Lightness) color to its stringed 6-character hex-code.
         * @public
         * @function
         * @memberof Hsl
         * @returns {string} Returns 6-character color hex-code.
         *
         * @example
         * var whiteHsl = SDV.Color.Model.Hsl.create({
         *      hue: 0,
         *      saturation: 0,
         *      lightness: 1
         * });
         *
         * // It will return '#ffffff'.
         * var whiteHex = whiteHsl.toHex();
         */
        hsl.toHex = function() {
            return this.toRgb().toHex();
        };
    
        /**
         * Transforms {@link Hsl} (Hue Saturation Lightness) color representation to its {@link Rgb} representation.
         * @public
         * @function
         * @memberof Hsl
         * @returns {Rgb} Returns new instance of {@link Rgb} color representation.
         *
         * @example
         * var whiteHsl = SDV.Color.Model.Hsl.create({
         *      hue: 0,
         *      saturation: 0,
         *      lightness: 1
         * });
         *
         * // It will return new instance of RGB color representation with red = 255, green = 255, blue = 255.
         * var whiteRgb = whiteHsl.toRgb();
         */
        hsl.toRgb = function() {
            var r, g, b;
    
            if(this._saturation == 0){
                // Color is achromatic.
                r = g = b = this._lightness;
            }else{
                var hueToRgb = function(p, q, t){
                    if(t < 0.0) {
                        t += 1.0;
                    }
    
                    if(t > 1.0) {
                        t -= 1.0;
                    }
    
                    if(t < 1.0 / 6.0) {
                        return p + (q - p) * 6.0 * t;
                    }
    
                    if(t < 1.0 / 2.0) {
                        return q;
                    }
    
                    if(t < 2.0 / 3.0) {
                        return p + (q - p) * (2.0 / 3.0 - t) * 6.0;
                    }
    
                    return p;
                };
    
                var q = this._lightness < 0.5
                    ? this._lightness * (1.0 + this._saturation)
                    : this._lightness + this._saturation - (this._lightness * this._saturation);
                var p = 2.0 * this._lightness - q;
    
                r = hueToRgb(p, q, this._hue + 1.0 / 3.0);
                g = hueToRgb(p, q, this._hue);
                b = hueToRgb(p, q, this._hue - 1.0 / 3.0);
            }
    
            return SDV.Color.Model.Rgb.create({
                red: Math.round(r * 255.0),
                green: Math.round(g * 255.0),
                blue: Math.round(b * 255.0)
            });
        };
    
        /**
         * Transforms {@link Hsl} (Hue Saturation Lightness) color representation
         * to its {@link Hsb} (Hue Saturation Brightness) color representation.
         * @public
         * @function
         * @memberof Hsl
         * @returns {Hsb} Returns new instance of {@link Hsb} (Hue Saturation Brightness) color representation.
         *
         * @example
         * var whiteHsl = SDV.Color.Model.Hsl.create({
         *      hue: 0,
         *      saturation: 0,
         *      lightness: 1
         * });
         *
         * // It will return new instance of HSB color representation with hue = 0, saturation = 0, brightness = 1.
         * var whiteHsb = whiteHsl.toHsb();
         */
        hsl.toHsb = function() {
            return this.toRgb().toHsb();
        };
    
        /**
         * Creates new {@link Hsl} instance with same HSL-components values.
         * @public
         * @function
         * @memberof Hsl
         * @returns {Hsl} Returns new {@link Hsl} instance with same HSL-components values.
         *
         * @example
         * var whiteHsl = SDV.Color.Model.Hsl.create({
         *      hue: 0,
         *      saturation: 0,
         *      lightness: 1
         * });
         *
         * // It will return new instance of HSL color representation with same components values:
         * // hue = 0, saturation = 0, lightness = 1.
         * var whiteHslClone = whiteHsl.clone();
         */
        hsl.clone = function() {
            return SDV.Color.Model.Hsl.create({
                hue: this._hue,
                saturation: this._saturation,
                lightness: this._lightness
            });
        };
    
        /**
         * Checks if given object is equals to {@link Hsl} instance.
         * @public
         * @function
         * @memberof Hsl
         * @param {object} obj Another HSL color representation, for equality comparison.
         * @param {number} eps Permissible comparison inaccuracy (from 0 to 1).
         *
         * @returns {boolean} Returns true if given object is {@link Hsl} instance with same HSL-channels values, otherwise returns false.
         *
         * @example
         * var whiteHsl = SDV.Color.Model.Hsl.create({
         *      hue: 0,
         *      saturation: 0,
         *      lightness: 1
         * });
         *
         * var anotherWhiteHsl = whiteHsl.clone();
         *
         * var blackHsl = SDV.Color.Model.Hsl.create({
         *      hue: 0,
         *      saturation: 0,
         *      lightness: 0
         * });
         *
         * var darkGrayHsl = SDV.Color.Model.Hsl.create('darkgray');
         *
         * whiteHsl.equals(); // false.
         * whiteHsl.equals('#ffffff'); // false.
         * whiteHsl.equals('white'); // false.
         * whiteHsl.equals({ hue: 0, saturation: 0, lightness: 1 }); // false.
         * whiteHsl.equals(blackHsl); // false.
         * whiteHsl.equals(anotherWhiteHsl); // true.
         * blackHsl.equals(darkGrayHsl); // false.
         * blackHsl.equals(darkGrayHsl, 0.5); // true.
         */
        hsl.equals = function(obj, eps) {
            if (!SDV.Color.Model.Hsl.isHsl(obj)) {
                return false;
            }
    
            if (!SDV.Util.Number.isNumber(eps) || eps < 0) {
                eps = 0;
            }
    
            if (eps > 1) {
                eps = 1;
            }
    
            var result = false;
    
            if (eps == 0) {
                result = this._hue === obj._hue
                && this._saturation === obj._saturation
                && this._lightness === obj._lightness;
            } else {
                result = !(this.distanceTo(obj) > eps);
            }
    
            return result;
        };
    })();

    /**
     * Base namespace for SDV.js library HSB (Hue Saturation Brightness) color representation model.
     * All supporting HSB model facilities are accessible through it.
     * @namespace SDV.Color.Model.Hsb
     * @memberof SDV.Color.Model
     */
    SDV.Color.Model.Hsb = {
    };
    
    // Using closure for SDV.Color.Model.Hsl methods assigning, to hide some private members.
    (function() {
        /**
         * Constructs new instance of HSB-represented color.
         * Constructor is private, so use factory-method {@link SDV.Color.Model.Hsb.create} to create an instance.
         * @public
         * @class Hsb
         * @param {object} colorDefinition Color definition represented as
         * object, containing values of hue, saturation and brightness, for example { hue: 0, saturation: 0, brightness: 1 }.
         */
        var Hsb = function(colorDefinition) {
            this._hue = colorDefinition.hue;
            this._saturation = colorDefinition.saturation;
            this._brightness = colorDefinition.brightness;
        };
    
        // Factory-method constructing HSB from given color hex-code or name.
        var createHsbFromHexCodeOrColorName = function(colorDefinition) {
            var rgb = SDV.Color.Model.Rgb.create(colorDefinition);
    
            return rgb !== null ? rgb.toHsb() : null;
        };
    
        /**
         * {@link Hsb} factory-method. It is an entry point to library HSB (Hue Saturation Brightness) color representation model.
         * @static
         * @function
         * @memberof SDV.Color.Model.Hsb
         * @param {string|object} colorDefinition Color definition represented as:
         * 1. String color name, for example 'white';
         * 2. String color 3/6-character hex-code , for example '#fff' or '#ffffff';
         * 3. Object, containing values of hue, saturation and brightness, for example { hue: 0, saturation: 0, brightness: 1 }.
         * @returns {Hsb} Returns new instance of {@link Hsb} if given colorDefinition is valid, otherwise returns null.
         *
         * @example
         * // Creates white color HSB representation from its numeric values.
         * var whiteHsb = SDV.Color.Model.Hsb.create({
         *      hue: 0,
         *      saturation: 0,
         *      brightness: 1
         * });
         *
         * // Creates white color HSB representation from its 3-character hex-code.
         * var whiteHsb = SDV.Color.Model.Hsb.create('#fff');
         *
         * // Creates white color HSB representation from its 6-character hex-code.
         * var whiteHsb = SDV.Color.Model.Hsb.create('#ffffff');
         *
         * // Creates white color HSB representation from its stringed name.
         * var whiteHsb = SDV.Color.Model.Hsb.create('white');
         */
        SDV.Color.Model.Hsb.create = function(colorDefinition) {
            var definitionIsHexCode, definitionIsName, definitionIsObject = false;
    
            var validationResult = SDV.Util.Validation.validateOption({
                optionName: 'colorDefinition',
                isRequired: true,
                allowedTypes: ['Object', 'String'],
                postValidationMethod: function() {
                    var result = {
                        isValid: true,
                        message: ''
                    };
    
                    if (SDV.Util.String.isString(colorDefinition)) {
                        definitionIsHexCode = SDV.Color.Model.Hex.isHex(colorDefinition);
                        definitionIsName = SDV.Color.Model.Hex.Code.hasOwnProperty(colorDefinition);
    
                        if (!(definitionIsHexCode || definitionIsName)) {
                            result.isValid = false;
                            result.message = SDV.Localization.getResource('wrongColorRepresentation')(colorDefinition);
                        }
                    } else {
                        definitionIsObject = true;
    
                        result = SDV.Util.Validation.validateOptions([{
                            optionName: 'hue',
                            optionFullName: 'colorDefinition.hue',
                            isRequired: true,
                            allowedTypes: ['Number'],
                            minValue: 0,
                            minValueEqualityAllowed: true,
                            maxValue: 1,
                            maxValueEqualityAllowed: true
                        }, {
                            optionName: 'saturation',
                            optionFullName: 'colorDefinition.saturation',
                            isRequired: true,
                            allowedTypes: ['Number'],
                            minValue: 0,
                            minValueEqualityAllowed: true,
                            maxValue: 1,
                            maxValueEqualityAllowed: true
                        }, {
                            optionName: 'brightness',
                            optionFullName: 'colorDefinition.brightness',
                            isRequired: true,
                            allowedTypes: ['Number'],
                            minValue: 0,
                            minValueEqualityAllowed: true,
                            maxValue: 1,
                            maxValueEqualityAllowed: true
                        }], colorDefinition);
                    }
    
                    return result;
                }
            }, colorDefinition);
    
            if (!validationResult.isValid) {
                console.error(validationResult.message);
    
                return null;
            }
    
            if (definitionIsHexCode || definitionIsName) {
                return createHsbFromHexCodeOrColorName(colorDefinition);
            }
    
            if (definitionIsObject) {
                return new Hsb(colorDefinition);
            }
    
            return null;
        };
    
        /**
         * Checks if given object is instance of {@link Hsb}.
         * @static
         * @function
         * @memberof SDV.Color.Model.Hsb
         * @param {*} obj Inspected object.
         * @returns {boolean} Returns true if given object is instance of {@link Hsb}, otherwise returns false.
         *
         * @example
         * var whiteHsb = SDV.Color.Model.Hsb.create({
         *      hue: 0,
         *      saturation: 0,
         *      brightness: 1
         * });
         *
         * SDV.Color.Model.Hsb.isHsb(); // false.
         * SDV.Color.Model.Hsb.isHsb('#ffffff'); // false.
         * SDV.Color.Model.Hsb.isHsb('white'); // false.
         * SDV.Color.Model.Hsb.isHsb({ hue: 0, saturation: 0, brightness: 1 }); // false.
         * SDV.Color.Model.Hsb.isHsb(whiteHsb); // true.
         */
        SDV.Color.Model.Hsb.isHsb = function(obj) {
            return obj instanceof Hsb;
        };
    
        // Gets or sets one of HSB components value.
        // If componentValue is defined then method is setter, otherwise it is getter.
        var getOrSetComponentValue = function(hsbInstance, componentName, componentValue){
            var validationResult = SDV.Util.Validation.validateOption({
                optionName: 'componentValue',
                isRequired: false,
                allowedTypes: ['Number'],
                minValue: 0,
                minValueEqualityAllowed: true,
                maxValue: 1,
                maxValueEqualityAllowed: true
            }, componentValue);
    
            if (!validationResult.isValid) {
                console.error(validationResult.message);
                return hsbInstance;
            }
    
            var innerComponentName = '_' + componentName;
    
            if (!validationResult.isDefined) {
                return hsbInstance[innerComponentName];
            }
    
            hsbInstance[innerComponentName] = componentValue;
    
            // Return instance for chain calls support.
            return hsbInstance;
        };
    
        // Prototype shortcut.
        var hsb = SDV.Color.Model.Hsb.prototype = Hsb.prototype = {};
    
        /**
         * Gets or sets value for hue component of {@link Hsb}.
         * @public
         * @function
         * @memberof Hsb
         * @param {number} [componentValue] Desirable ([0..1]) value for hue component of {@link Hsb}.
         * If componentValue isn't defined then method works as getter, otherwise it works as setter.
         *
         * @returns {number|Hsb} Returns value of hue component (if method works as getter),
         * or returns current {@link Hsb} instance (if method works as setter).
         *
         * @example
         * var softBlueHsl = SDV.Color.Model.Hsb.create({
         *      hue: 0.61,
         *      saturation: 0.75,
         *      brightness: 0.5
         * });
         *
         * // It will return 0.61.
         * softBlueHsl.hue();
         *
         * // It will set hue component to 0.59.
         * softBlueHsl.hue(0.59);
         *
         * // Now it will return 0.59.
         * softBlueHsl.hue();
         */
        hsb.hue = function(componentValue) {
            return getOrSetComponentValue(this, 'hue', componentValue);
        };
    
        /**
         * Gets or sets value for saturation component of {@link Hsb}.
         * @public
         * @function
         * @memberof Hsb
         * @param {number} [componentValue] Desirable ([0..1]) value for saturation component of {@link Hsb}.
         * If componentValue isn't defined then method works as getter, otherwise it works as setter.
         *
         * @returns {number|Hsb} Returns value of saturation component (if method works as getter),
         * or returns current {@link Hsb} instance (if method works as setter).
         *
         * @example
         * var softBlueHsl = SDV.Color.Model.Hsb.create({
         *      hue: 0.61,
         *      saturation: 0.75,
         *      brightness: 0.5
         * });
         *
         * // It will return 0.75.
         * softBlueHsl.saturation();
         *
         * // It will set saturation component to 0.76.
         * softBlueHsl.saturation(0.76);
         *
         * // Now it will return 0.76.
         * softBlueHsl.saturation();
         */
        hsb.saturation = function(componentValue) {
            return getOrSetComponentValue(this, 'saturation', componentValue);
        };
    
        /**
         * Gets or sets value for brightness component of {@link Hsb}.
         * @public
         * @function
         * @memberof Hsb
         * @param {number} [componentValue] Desirable ([0..1]) value for brightness component of {@link Hsb}.
         * If componentValue isn't defined then method works as getter, otherwise it works as setter.
         *
         * @returns {number|Hsb} Returns value of brightness component (if method works as getter),
         * or returns current {@link Hsb} instance (if method works as setter).
         *
         * @example
         * var softBlueHsl = SDV.Color.Model.Hsb.create({
         *      hue: 0.61,
         *      saturation: 0.75,
         *      brightness: 0.5
         * });
         *
         * // It will return 0.5.
         * softBlueHsl.brightness();
         *
         * // It will set brightness component to 0.56.
         * softBlueHsl.brightness(0.56);
         *
         * // Now it will return 0.56.
         * softBlueHsl.brightness();
         */
        hsb.brightness = function(componentValue) {
            return getOrSetComponentValue(this, 'brightness', componentValue);
        };
    
        /**
         * Gets distance between HSB color representation and another HSB color representation.
         * @public
         * @function
         * @memberof Hsb
         *
         * @param {Hsb} anotherHsb Another HSB color representation, distance to which we need to know.
         * @returns {number|null} Returns distance (from 0.0 till 1.0),
         * or null if given parameter is not an instance of @see{Hsb}.
         *
         * @example
         * var blackColorHsb = SDV.Color.Model.Hsb.create('#000000');
         * var redColorHsb = SDV.Color.Model.Hsb.create('#ff0000');
         *
         * // It will return 1;
         * blackColorHsb.distanceTo(redColorHsb);
         */
        hsb.distanceTo = function(anotherHsb) {
            if (!SDV.Color.Model.Hsb.isHsb(anotherHsb)) {
                return null;
            }
    
            var h = anotherHsb._hue - this._hue;
            var s = anotherHsb._saturation - this._saturation;
            var b = anotherHsb._brightness - this._brightness;
    
            // Math.sqrt(3) is max possible distance.
            return Math.sqrt(h*h + s*s + b*b) / Math.sqrt(3);
        };
    
        /**
         * Transforms {@link Hsb} (Hue Saturation Brightness) color to its stringed 6-character hex-code.
         * @public
         * @function
         * @memberof Hsb
         * @returns {string} Returns 6-character color hex-code.
         *
         * @example
         * var whiteHsb = SDV.Color.Model.Hsb.create({
         *      hue: 0,
         *      saturation: 0,
         *      brightness: 1
         * });
         *
         * // It will return '#ffffff'.
         * var whiteHex = whiteHsb.toHex();
         */
        hsb.toHex = function() {
            return this.toRgb().toHex();
        };
    
        /**
         * Transforms {@link Hsb} (Hue Saturation Brightness) color representation to its {@link Rgb} representation.
         * @public
         * @function
         * @memberof Hsb
         * @returns {Rgb} Returns new instance of {@link Rgb} color representation.
         *
         * @example
         * var whiteHsb = SDV.Color.Model.Hsb.create({
         *      hue: 0,
         *      saturation: 0,
         *      brightness: 1
         * });
         *
         * // It will return new instance of RGB color representation with red = 255, green = 255, blue = 255.
         * var whiteRgb = whiteHsb.toRgb();
         */
        hsb.toRgb = function() {
            var step = this._hue / (1.0 / 6.0);
    
            // The hue position within the current step.
            var pos = step - Math.floor(step);
    
            // Mix color value adjusted to the brightness.
            var m = (Math.floor(step) % 2)
                ? (1.0 - pos) * this._brightness
                : pos * this._brightness;
    
            var max = 1.0 * this._brightness;
            var min = (1 - this._saturation) * this._brightness;
            var med = m + ((1 - this._saturation) * (this._brightness - m));
            var r, g, b;
    
            if (step >= 6) {
                step = 5.99;
            }
    
            switch (Math.floor(step))
            {
                case 0:
                    r = max;
                    g = med;
                    b = min;
                    break;
                case 1:
                    r = med;
                    g = max;
                    b = min;
                    break;
                case 2:
                    r = min;
                    g = max;
                    b = med;
                    break;
                case 3:
                    r = min;
                    g = med;
                    b = max;
                    break;
                case 4:
                    r = med;
                    g = min;
                    b = max;
                    break;
                case 5:
                    r = max;
                    g = min;
                    b = med;
                    break;
            }
    
            return SDV.Color.Model.Rgb.create({
                red: Math.round(r * 255.0),
                green: Math.round(g * 255.0),
                blue: Math.round(b * 255.0)
            });
        };
    
        /**
         * Transforms {@link Hsb} (Hue Saturation Brightness) color representation
         * to its {@link Hsl} (Hue Saturation Lightness) color representation.
         * @public
         * @function
         * @memberof Hsb
         * @returns {Hsl} Returns new instance of {@link Hsl} (Hue Saturation Lightness) color representation.
         *
         * @example
         * var whiteHsb = SDV.Color.Model.Hsb.create({
         *      hue: 0,
         *      saturation: 0,
         *      brightness: 1
         * });
         *
         * // It will return new instance of HSL color representation with hue = 0, saturation = 0, lightness = 1.
         * var whiteHsl = whiteHsb.toHsl();
         */
        hsb.toHsl = function() {
            return this.toRgb().toHsl();
        };
    
        /**
         * Creates new {@link Hsb} instance with same HSB-components values.
         * @public
         * @function
         * @memberof Hsb
         * @returns {Hsb} Returns new {@link Hsb} instance with same HSB-components values.
         *
         * @example
         * var whiteHsb = SDV.Color.Model.Hsb.create({
         *      hue: 0,
         *      saturation: 0,
         *      lightness: 1
         * });
         *
         * // It will return new instance of HSB color representation with same components values:
         * // hue = 0, saturation = 0, brightness = 1.
         * var whiteHsbClone = whiteHsb.clone();
         */
        hsb.clone = function() {
            return SDV.Color.Model.Hsb.create({
                hue: this._hue,
                saturation: this._saturation,
                brightness: this._brightness
            });
        };
    
        /**
         * Checks if given object is equals to {@link Hsb} instance.
         * @public
         * @function
         * @memberof Hsb
         * @param {object} obj Another HSB color representation, for equality comparison.
         * @param {number} eps Permissible comparison inaccuracy (from 0 to 1).
         *
         * @returns {boolean} Returns true if given object is {@link Hsb} instance with same HSB-channels values, otherwise returns false.
         *
         * @example
         * var whiteHsb = SDV.Color.Model.Hsb.create({
         *      hue: 0,
         *      saturation: 0,
         *      brightness: 1
         * });
         *
         * var anotherWhiteHsb = whiteHsb.clone();
         *
         * var blackHsb = SDV.Color.Model.Hsb.create({
         *      hue: 0,
         *      saturation: 0,
         *      brightness: 0
         * });
         *
         * var darkGrayHsb = SDV.Color.Model.Hsb.create('darkgray');
         *
         * whiteHsb.equals(); // false.
         * whiteHsb.equals('#ffffff'); // false.
         * whiteHsb.equals('white'); // false.
         * whiteHsb.equals({ hue: 0, saturation: 0, brightness: 1 }); // false.
         * whiteHsb.equals(blackHsb); // false.
         * whiteHsb.equals(anotherWhiteHsb); // true.
         * blackHsb.equals(darkGrayHsb); // false.
         * blackHsb.equals(darkGrayHsb, 0.5); // true.
         */
        hsb.equals = function(obj, eps) {
            if (!SDV.Color.Model.Hsb.isHsb(obj)) {
                return false;
            }
    
            if (!SDV.Util.Number.isNumber(eps) || eps < 0) {
                eps = 0;
            }
    
            if (eps > 1) {
                eps = 1;
            }
    
            var result = false;
    
            if (eps == 0) {
                result = this._hue === obj._hue
                && this._saturation === obj._saturation
                && this._brightness === obj._brightness;
            } else {
                result = !(this.distanceTo(obj) > eps);
            }
    
            return result;
        };
    })();

    /**
     * Base namespace for SDV.js library spatial data analysis tools.
     * All supporting analysis tools are accessible through it.
     * @namespace SDV.Tool
     * @memberof SDV
     */
    SDV.Tool = {
    };

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

    /**
     * SDV.Tool.choropleth random mode.
     * Assigns random category with random color to each feature in GeoJSON object.
     * @memberof SDV.Tool.choropleth
     */
    SDV.Tool.choropleth.Mode.extend({
        name: 'random',
        method: function(featuresArray, modeOptions) {
            modeOptions = modeOptions || {};
            var defaults = {
                categoryProperty: undefined,
                colors: {
                    count: undefined,
                    hue: 'random',
                    saturation: 'rich',
                    brightness: 'bright'
                },
                style: {
                    fill: {
                        opacity: 0.75
                    },
                    stroke: {
                        weight: 2,
                        opacity: 0.85
                    }
                }
            };
    
            var validationResult = SDV.Util.Validation.validateOptions([{
                optionName: 'categoryProperty',
                optionFullName: 'modeOptions.categoryProperty',
                isRequired: false,
                allowedTypes: ['String']
            }, {
                optionName: 'style',
                optionFullName: 'modeOptions.style',
                isRequired: false,
                allowedTypes: ['Object'],
                replaceWithDefaultIfUndefined: true
            }, {
                optionName: 'colors',
                optionFullName: 'modeOptions.colors',
                isRequired: false,
                allowedTypes: ['Object'],
                replaceWithDefaultIfUndefined: true
            }], modeOptions, defaults);
    
            if (!validationResult.isValid) {
                throw new Error(validationResult.message);
            }
    
            modeOptions = SDV.Util.Object.extend(defaults, modeOptions, true);
            modeOptions.colors.count = featuresArray.length;
    
            var categoryPropertyIsDefined = typeof modeOptions.categoryProperty !== 'undefined';
    
            var colors = SDV.Color.random(modeOptions.colors);
    
            var fillStyle = modeOptions.style.fill;
            var strokeStyle = modeOptions.style.stroke;
    
            return SDV.Enumerable
                .create(featuresArray)
                .select(function(feature, featureIndex) {
                    var randomColor = colors[featureIndex];
                    var categoryName = categoryPropertyIsDefined
                        ? SDV.Util.Json.stringify(SDV.Util.Object.getPropertyValue({
                        srcObject: feature.properties,
                        propertyName: modeOptions.categoryProperty
                    }))
                        : 'Category №' + featureIndex + 1;
    
                    return {
                        category: categoryName,
                        style: {
                            fill: {
                                color: randomColor,
                                opacity: fillStyle.opacity
                            },
                            stroke: {
                                color: randomColor,
                                weight: strokeStyle.weight,
                                opacity: strokeStyle.opacity
                            }
                        }
                    };
                })
                .toArray();
        }
    });
})(window, document);