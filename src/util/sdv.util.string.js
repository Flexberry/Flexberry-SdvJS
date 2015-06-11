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