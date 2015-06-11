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
