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