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