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