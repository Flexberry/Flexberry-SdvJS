/**
 * Base namespace for SDV.js library object utils.
 * All supporting object utils are accessible through it.
 * @namespace SDV.Util.Object
 * @memberof SDV.Util
 */
SDV.Util.Object = {
    /**
     * Checks whether a given parameter is an object.
     * @memberof SDV.Util.Object
     * @public
     * @function
     * @param {object} obj Inspected parameter.
     * @param {boolean} [nullIsAllowed=false] Flag: allows to return true if inspected parameter is null.
     * @returns {boolean} Returns true if inspected parameter is an object, otherwise returns false.
     *
     * @example
     * SDV.Util.Object.isObject(); // false.
     * SDV.Util.Object.isObject(null); // false.
     * SDV.Util.Object.isObject('This is a string'); // false.
     * SDV.Util.Object.isObject(1); // false.
     * SDV.Util.Object.isObject([1]); // false.
     * SDV.Util.Object.isObject(function(){return 1;}); // false.
     * SDV.Util.Object.isObject({one: 1}); // true.
     * SDV.Util.Object.isObject({}); // true.
     *
     * var allowNull = true;
     * SDV.Util.Object.isObject(null, allowNull); // true.
     */
    isObject: function (obj, nullIsAllowed) {
        var objectType = Object.prototype.toString.call(obj);
        var result = objectType === '[object Object]';

        if (!result && nullIsAllowed) {
            result = obj === null;
        }

        return result;
    },

    /**
     * Creates a new object with the specified prototype.
     * @memberof SDV.Util.Object
     * @public
     * @function
     * @throws {TypeError} Will throw an error if the given parameter is not an object.
     *
     * @param {object} Desirable prototype object.
     * @returns {object} New object with the specified prototype.
     *
     * @example
     * var prototypeObject = {
     *     printMyName: function() {
     *         console.log('My name is ' + this.name + '.');
     *     }
     * };
     * var newObject = SDV.Util.Object.create(prototypeObject);
     * newObject.name = 'John';
     * newObject.printMyName(); // It will log 'My name is John.' to console.
     */
    create: Object.create || (function () {
        var tmp = function () { };

        var polyfillForCreate = function (prototype) {
            if (typeof prototype != 'object') {
                throw new TypeError(SDV.Localization.getResource('wrongParameterTypeError')({
                    parameterName: 'prototype',
                    actualValue: prototype,
                    expectedType: '[object Object]'
                }));
            }

            tmp.prototype = prototype;
            var result = new tmp();
            tmp.prototype = null;

            return result;
        };

        return polyfillForCreate;
    })(),

    /** Extends an object with properties of one or more other objects.
     * @memberof SDV.Util.Object
     * @public
     * @function
     * @throws {TypeError} Will throw an error if the given parameter is not an object.
     *
     * @param {object} dest An object in which to accumulate properties of other given objects.
     * @param {object} src Properties source object.
     * @param {boolean} recursive Flag: indicates whether inner objects-properties must be extended too.
     * @returns {Object} An object in which accumulated properties of other given objects.
     *
     * @example
     * var dest = {one: 1, two: 2};
     * SDV.Util.Object.extend(dest, {a: 'a', two: '1+1'}); // {one: 1, two: '1+1', a: 'a'}.
     *
     * var dest = {one: 1, two: {value: 2, caption: 'Two'}};
     *
     * // {one: 1, two: {value: 2, caption: 'THIS IS TWO!!!', binary: '10'}, a: 'a'}.
     * SDV.Util.Object.extend(dest, {two: {caption: 'THIS IS TWO!!!', binary: '10'}, a: 'a'});
     */
    extend: function(dest, src, recursive) {
        if (SDV.Util.Object.isObject(dest) && SDV.Util.Object.isObject(src)) {
            for (var i in src) {
                var destProperty = dest[i];
                var srcProperty = src[i];

                if (recursive === true && SDV.Util.Object.isObject(destProperty) && SDV.Util.Object.isObject(srcProperty)) {
                    SDV.Util.Object.extend(destProperty, srcProperty, recursive);
                } else {
                    dest[i] = srcProperty;
                }
            }
        }

        return dest;
    },

    /**
     * Gets array of names of given object properties.
     * @memberof SDV.Util.Object
     * @public
     * @function
     * @param {object} obj Object of interest.
     * @param {boolean} [allowPrototypeProperties = false] Flag: allows to include properties of object prototype.
     * If false, then names only of own properties will be included to result.
     *
     * @returns {string[]} Returns array of names of given object properties.
     *
     * @example
     * SDV.Util.Object.getPropertiesNames(); // [].
     * SDV.Util.Object.getPropertiesNames(null); // [].
     * SDV.Util.Object.getPropertiesNames('This is a string'); // [].
     * SDV.Util.Object.getPropertiesNames(1); // [].
     * SDV.Util.Object.getPropertiesNames([1]); // [].
     * SDV.Util.Object.getPropertiesNames(function(){ return 1; }); // [].
     * SDV.Util.Object.getPropertiesNames({}); // [].
     * SDV.Util.Object.getPropertiesNames({ one: 1, two: 2 }); // ['one', 'two'].
     *
     * var MyClass = function() { this.one = 1; this.two = 2; };
     * var proto = { three: 3 };
     * MyClass.prototype = proto;
     * var obj = new MyClass();
     *
     * SDV.Util.Object.getPropertiesNames(obj); // ['one', 'two'].
     * SDV.Util.Object.getPropertiesNames(obj, true); // ['one', 'two', 'three'].
     */
    getPropertiesNames: function(obj, allowPrototypeProperties) {
        var result = [];

        if (SDV.Util.Object.isObject(obj)) {
            for(var propertyName in obj) {
                if (allowPrototypeProperties || (!allowPrototypeProperties && obj.hasOwnProperty(propertyName))) {
                    result.push(propertyName);
                }
            }
        }

        return result;
    },

    /**
     * Gets value of object property with given name.
     * @memberof SDV.Util.Object
     * @public
     * @function
     * @param {object} options Method options.
     * @param {object} options.srcObject Object of interest.
     * @param {string} options.propertyName Name of object property (all string values allowed, but be careful with dots in names).
     *
     * @returns {*} Returns value of given property, or undefined, if property doesn't exist.
     *
     * @example
     * SDV.Util.Object.getPropertyValue(); // undefined.
     * SDV.Util.Object.getPropertyValue({ one: 1, two: 2 }); // undefined.
     * SDV.Util.Object.getPropertyValue({ one: 1, two: '1+1' }, 'one'); // 1.
     * SDV.Util.Object.getPropertyValue({ one: 1, two: '1+1' }, 'two'); // '1+1'.
     * SDV.Util.Object.getPropertyValue({ one: 1, two: '1+1' }, 'two.length'); // 3 (length of '1+1' string).
     * SDV.Util.Object.getPropertyValue({ a: 'a', b: {value: 'b'}}, 'b.value'); // 'b'.
     * SDV.Util.Object.getPropertyValue({ a: 'a', b: {value: 'b'}}, 'b.value.length'); // '1'.
     * SDV.Util.Object.getPropertyValue({ a: 'a', 'a.b': 'ab', 'a.b.c': {value: 'abc'}}, 'a.b.c.value'); // 'abc'.
     * SDV.Util.Object.getPropertyValue({ a: 'a', 'a.b': 'ab', 'a.b.c': {value: 'abc'}}, 'a.b'); // 'ab'.
     */
    getPropertyValue: function(options) {
        options = options || {};
        var srcObject = options.srcObject;
        var propertyName = options.propertyName;

        if (typeof srcObject !== 'undefined' && srcObject !== null && SDV.Util.String.isString(propertyName)) {
            var subProperties = propertyName.split('.');
            var subPropertiesCount = subProperties.length;

            for (var i = subPropertiesCount; i >= 0; i--) {
                var property = subProperties.slice(0, i).join('.');
                var propertyValue = srcObject[property];

                if (typeof propertyValue !== 'undefined') {
                    if (i < subPropertiesCount) {
                        var propertyTail = subProperties.slice(i, subPropertiesCount).join('.');

                        return SDV.Util.Object.getPropertyValue({
                            srcObject: propertyValue,
                            propertyName: propertyTail
                        });
                    } else {
                        return propertyValue
                    }
                }
            }
        }
    }
};

// Using closure to define SDV.Util.Object.uniqueId function (to hide lastUsedId variable).
(function(lastId) {
    /**
     * Assigns integer unique ID to an object (unique ID is greater or equal to 0 integer number).
     * @memberof SDV.Util.Object
     * @public
     * @function
     *
     * @param {object} obj An object which need to be marked with unique ID.
     * @param {string} [idProperty = 'uniqueId'] Name of unique ID property.
     * @returns {number|null} New integer unique ID, or existing ID, or null if given obj properties are not assignable.
     *
     * @example
     * var obj = {};
     * SDV.Util.Object.uniqueId(obj); // Returns 0. And  obj now has a property obj.uniqueId == 0.
     *
     * var obj2 = {};
     * SDV.Util.Object.uniqueId(obj2); // Returns 1. And  obj2 now has a property obj2.uniqueId == 1.
     *
     * SDV.Util.Object.uniqueId(obj); // Returns 0, because obj already has a property obj.uniqueId == 0.
     *
     * var obj3 = {};
     * SDV.Util.Object.uniqueId(obj3, 'ID'); // Returns 2. And  obj3 now has a property obj3.ID == 3.
     * SDV.Util.Object.uniqueId(obj3, 'ID'); // Returns 2, because obj3 already has a property obj.ID == 3.
     *
     * // Returns 4, because obj3 idProperty is not defined and obj3 doesn't have a property obj.uniqueId.
     * SDV.Util.Object.uniqueId(obj3);
     */
    SDV.Util.Object.uniqueId = function (obj, idProperty) {
        if (!SDV.Util.String.isString(idProperty) || SDV.Util.String.trim(idProperty) === '') {
            idProperty = 'uniqueId';
        }

        if (typeof obj === 'undefined' && obj === null) {
            return null;
        }

        if (!SDV.Util.Number.isNumber(obj[idProperty])) {
            try {
                obj[idProperty] = ++lastId;
            }
            catch (ex) {
                lastId--;

                return null;
            }
        }

        return obj[idProperty];
    }
})(0);