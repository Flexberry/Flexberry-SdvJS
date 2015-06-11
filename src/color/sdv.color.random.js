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
