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