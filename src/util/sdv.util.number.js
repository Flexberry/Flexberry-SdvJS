/**
 * Base namespace for SDV.js library number utils.
 * All supporting number utils are accessible through it.
 * @namespace SDV.Util.Number
 * @memberof SDV.Util
 */
SDV.Util.Number = {

    /**
     * Checks whether a given object is a number.
     * @memberof SDV.Util.Number
     * @public
     * @function
     * @param {object} obj Inspected object.
     * @returns {boolean} Returns true if inspected object is a number, otherwise returns false.
     *
     * @example
     * SDV.Util.Number.isNumber(); // false.
     * SDV.Util.Number.isNumber(null); // false.
     * SDV.Util.Number.isNumber([1]); // false.
     * SDV.Util.Number.isNumber({one: 1}); // false.
     * SDV.Util.Number.isNumber(function(){return 1;}); // false.
     * SDV.Util.Number.isNumber('This is a string'); // false.
     * SDV.Util.Number.isNumber(1); // true.
     * SDV.Util.Number.isNumber(0.12345); // true.
     * SDV.Util.Number.isNumber(1.2345e+10); // true.
     */
    isNumber: function(obj) {
        return (Object.prototype.toString.call(obj) === '[object Number]');
    },

    /**
     * Checks whether a given object is an integer number.
     * @memberof SDV.Util.Number
     * @public
     * @function
     * @param {object} obj Inspected object.
     * @returns {boolean} Returns true if inspected object is an integer number, otherwise returns false.
     *
     * @example
     * SDV.Util.Number.isInteger(); // false.
     * SDV.Util.Number.isInteger(null); // false.
     * SDV.Util.Number.isInteger([1]); // false.
     * SDV.Util.Number.isInteger({one: 1}); // false.
     * SDV.Util.Number.isInteger(function(){return 1;}); // false.
     * SDV.Util.Number.isInteger('This is a string'); // false.
     * SDV.Util.Number.isInteger(1); // true.
     * SDV.Util.Number.isInteger(-1); // true.
     * SDV.Util.Number.isInteger(0.12345); // false.
     * SDV.Util.Number.isInteger(1.2345e+10); // false.
     */
    isInteger: window.Number.isInteger || function(obj) {
        return SDV.Util.Number.isNumber(obj) && isFinite(obj) && Math.floor(obj) === obj;
    },

    /**
     * Checks if given number is even.
     * @memberof SDV.Util.Number
     * @param {number} n inspected number.
     * @returns {boolean} Returns true if inspected number is number and it is even, otherwise returns false.
     *
     * @example
     * SDV.Util.Number.isEven();   // false.
     * SDV.Util.Number.isEven({}); // false.
     * SDV.Util.Number.isEven(5);  // false.
     * SDV.Util.Number.isEven(4);  // true.
     */
    isEven: function (n) {
        return SDV.Util.Number.isNumber(n) && (n % 2 == 0);
    },

    /**
     * Checks if given number is odd.
     * @memberof SDV.Util.Number
     * @param {number} n inspected number.
     * @returns {boolean} Returns true if inspected number is number and it is odd, otherwise returns false.
     *
     * @example
     * SDV.Util.Number.isOdd();   // false.
     * SDV.Util.Number.isOdd({}); // false.
     * SDV.Util.Number.isOdd(4);  // false.
     * SDV.Util.Number.isOdd(5);  // true.
     */
    isOdd: function(n) {
        return SDV.Util.Number.isNumber(n) && (Math.abs(n) % 2 == 1);
    }
};