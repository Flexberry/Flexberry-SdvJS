/**
 * Base namespace for SDV.js library function utils.
 * All supporting function utils are accessible through it.
 * @namespace SDV.Util.Function
 * @memberof SDV.Util
 */
SDV.Util.Function = {

    /**
     * Checks whether a given object is a function.
     * @memberof SDV.Util.Function
     * @public
     * @function
     * @param {object} obj Inspected object.
     * @returns {boolean} Returns true if inspected object is a function, otherwise returns false.
     *
     * @example
     * SDV.Util.Function.isFunction(); // false.
     * SDV.Util.Function.isFunction(null); // false.
     * SDV.Util.Function.isFunction({one: 1}); // false.
     * SDV.Util.Function.isFunction('This is a string'); // false.
     * SDV.Util.Function.isFunction(1); // false.
     * SDV.Util.Function.isFunction([1]); // false.
     * SDV.Util.Function.isFunction(function(){return 1;}); // true.
     */
    isFunction: function(obj) {
        return (Object.prototype.toString.call(obj) === '[object Function]');
    },

    /** Binds a function to be called with a given context.
     * @memberof SDV.Util.Function
     * @public
     * @function
     *
     * @param {function} fn A function which must be called.
     * @param {object} desiredContext Desired context of the call.
     * @returns {function} A given function binded to be called with a given context.
     *
     * @example
     * var printMyName = function(greeting) {
     *     console.log((greeting || '') + 'My name is ' + this.name + '.');
     * };
     * SDV.Util.Function.bind(printMyName, {name: 'Jack'})(); // It will log 'My name is Jack.' to console.
     * SDV.Util.Function.bind(printMyName, {name: 'John'})(); // It will log 'My name is John.' to console.
     * SDV.Util.Function.bind(printMyName, {name: 'Jerry'})('Hello!'); // It will log 'Hello! My name is John.' to console.
     */
    bind: function(fn, desiredContext) {
        var slice = Array.prototype.slice;

        if (fn.bind) {
            return fn.bind.apply(fn, slice.call(arguments, 1));
        }

        var args = slice.call(arguments, 2);

        return function() {
            return fn.apply(desiredContext, args.length ? args.concat(slice.call(arguments)) : arguments);
        };
    }
};