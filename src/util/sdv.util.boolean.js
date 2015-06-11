/**
 * Base namespace for SDV.js library boolean utils.
 * All supporting boolean utils are accessible through it.
 * @namespace SDV.Util.Boolean
 * @memberof SDV.Util
 */
SDV.Util.Boolean = {

    /**
     * Checks whether a given object has boolean type.
     * @memberof SDV.Util.Boolean
     * @public
     * @function
     * @param {object} obj Inspected object.
     * @returns {boolean} Returns true if inspected object has boolean type, otherwise returns false.
     *
     * @example
     * SDV.Util.Boolean.isBoolean(); // false.
     * SDV.Util.Boolean.isBoolean(null); // false.
     * SDV.Util.Boolean.isBoolean(1); // false.
     * SDV.Util.Boolean.isBoolean([1]); // false.
     * SDV.Util.Boolean.isBoolean({one: 1}); // false.
     * SDV.Util.Boolean.isBoolean(function(){return 1;}); // false.
     * SDV.Util.Boolean.isBoolean('This is a string'); // true.
     * SDV.Util.Boolean.isBoolean(true); // true.
     * SDV.Util.Boolean.isBoolean(false); // true.
     * SDV.Util.Boolean.isBoolean(1>0); // true.
     */
    isBoolean: function (obj) {
        return (Object.prototype.toString.call(obj) === '[object Boolean]');
    }
};
