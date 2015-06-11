/**
 * Base namespace for SDV.js library array utils.
 * All supporting array utils are accessible through it.
 * @namespace SDV.Util.Array
 * @memberof SDV.Util
 */
SDV.Util.Array = {
    /**
     * Checks whether a given object is an array.
     * @memberof SDV.Util.Array
     * @public
     * @function
     * @param {object} obj Inspected object.
     * @returns {boolean} Returns true if inspected object is an array, otherwise returns false.
     *
     * @example
     * SDV.Util.Array.isArray(); // false.
     * SDV.Util.Array.isArray(null); // false.
     * SDV.Util.Array.isArray({one: 1}); // false.
     * SDV.Util.Array.isArray(function(){return 1;}); // false.
     * SDV.Util.Array.isArray('This is a string'); // false.
     * SDV.Util.Array.isArray(1); // false.
     * SDV.Util.Array.isArray([1]); // true.
     * SDV.Util.Array.isArray([]); // true.
     */
    isArray: window.Array.isArray || function(obj) {
        return (Object.prototype.toString.call(obj) === '[object Array]');
    },

    /**
     * Returns the first index at which a given element can be found in the given array.
     * @memberof SDV.Util.Array
     * @public
     * @function
     * @param {object[]} array An array in which to search a given element.
     * @param {object} searchElement Element to locate in the given array.
     * @param {int} fromIndex The index to start the search at.
     * @returns {int} Returns First index at which a given element can be found in the given array, or -1 if it is not present.
     *
     * @throws {TypeError} The first argument is required and must be type of [object Array].
     *
     * @example
     * SDV.Util.Array.indexOf(); // Will throw TypeError.
     * SDV.Util.Array.isArray([1,2,3,1]); // -1. Search element is not defined.
     * SDV.Util.Array.isArray([1,2,3,1], 4); // -1. Search element is not present.
     * SDV.Util.Array.isArray([1,2,3,1], 1); // 0. Search element is the first element in a given array.
     * SDV.Util.Array.isArray([1,2,3,1], 1, 1); // 3. Search element is also the 4th element in a given array.
     * SDV.Util.Array.isArray([1,2,3,1], 1, -1); // -1. Stat index if less then 0;
     * SDV.Util.Array.isArray([1,2,3,1], 1, 4); // -1. Stat index if greater then a given array length;
     */
    indexOf: function(array, searchElement, fromIndex) {
        if (!SDV.Util.Array.isArray(array)) {
            throw new TypeError(
                SDV.Localization.getResource('wrongParameterTypeError', {
                    parameterName: 'array',
                    actualValue: array,
                    expectedType: '[object Array]'
                })
            );
        }

        if (window.Array.prototype.indexOf) {
            return array.indexOf(searchElement, fromIndex);
        }

        // Array.indexOf polyfill from MDN:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Polyfill.
        var k;
        var arrayObject = Object(array);
        var length = arrayObject.length >>> 0;

        if (length === 0) {
            return -1;
        }

        var n = +fromIndex || 0;

        if (Math.abs(n) === Infinity) {
            n = 0;
        }

        if (n >= length) {
            return -1;
        }

        k = Math.max(n >= 0 ? n : length - Math.abs(n), 0);
        while (k < length) {
            if (k in arrayObject && arrayObject[k] === searchElement) {
                return k;
            }

            k++;
        }

        return -1;
    },

    /**
     * Returns a flag indicating whether there is a given element in the given array.
     * @memberof SDV.Util.Array
     * @public
     * @function
     * @param {object[]} array An array in which to search a given element.
     * @param {object} searchElement Element to locate in the array.
     * @returns {boolean} Returns true if a given element can be found in the array, or false if it is not present.
     *
     * @throws {TypeError} The first argument is required and must be type of [object Array].
     *
     * @example
     * SDV.Util.Array.contains(); // Will throw TypeError.
     * SDV.Util.Array.contains([1,2,3,1]); // false. Search element is not defined.
     * SDV.Util.Array.contains([1,2,3,1], 4); // false. Search element is not present.
     * SDV.Util.Array.contains([1,2,3,1], 1); // true. Search element is the first and the 4th element in a given array.
     */
    contains: function(array, searchElement) {
        return SDV.Util.Array.indexOf(array, searchElement) > -1;
    },

    /**
     * Iterates over the given array elements.
     * @memberof SDV.Util.Array
     * @public
     * @function
     * @param {array} array The array to iterate over.
     * @param {function} callback The function that will be executed on every object, method applies three arguments:
     * element (current element of the array),
     * elementIndex (index of current element in whole elements array),
     * elementsArray (array of all elements).
     * To break iteration over array elements callback method must return exactly false value.
     *
     * @throws {Error} Throws an error if parameters types are wrong, or if parameters are undefined.
     *
     * @example
     * // It will log following strings:
     * // 1: first
     * // 2: second
     * // 3: third
     * SDV.Util.Array.each(['first', 'second', 'third'], function(element, elementIndex, elementsArray) {
     *      console.log(elementIndex + ': ' + element);
     * });
     */
    each: function(array, callback) {
        var validationResult = SDV.Util.Validation.validateOptions([{
            optionName: 'array',
            isRequired: true,
            allowedTypes: ['Array']
        }, {
            optionName: 'callback',
            isRequired: true,
            allowedTypes: ['Function']
        }], {
            array: array,
            callback: callback
        });

        if (!validationResult.isValid) {
            throw new Error(validationResult.message);
        }

        for (var i = 0, len = array.length; i < len; i++) {
            var breakEnumeration = callback(array[i], i, array) === false;

            if (breakEnumeration) {
                break;
            }
        }
    }
};