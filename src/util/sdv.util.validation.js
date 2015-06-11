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
