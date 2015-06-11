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