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