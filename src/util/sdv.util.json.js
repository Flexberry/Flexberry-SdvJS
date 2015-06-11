/**
 * Base namespace for SDV.js library JSON utils.
 * All supporting JSON utils are accessible through it.
 * @namespace SDV.Util.Json
 * @memberof SDV.Util
 */
SDV.Util.Json = {
    /**
     * Transforms given string into JSON object.
     * @memberof SDV.Util.Json
     * @public
     * @function
     * @throws {SyntaxError} Throws a SyntaxError exception if the given string contains invalid JSON.
     * @param {string} jsonString String, contains stringed JSON-information.
     * @returns {object} Returns JSON-object, if given string contains valid stringed JSON.
     *
     * @example
     * SDV.Util.Json.parse(); // Will throw SyntaxError.
     * SDV.Util.Json.parse(''); // Will throw SyntaxError.
     *
     * // Will throw SyntaxError, because in valid stringed JSON properties names must be enclosed in double quotes.
     * SDV.Util.Json.parse('{ property1: 1 }');
     *
     * SDV.Util.Json.parse('{ \"property1\": 1 }'); // Will return following JSON-object: { property1: 1 }.
     */
    parse: window.JSON ? window.JSON.parse : function (jsonString) {
        return eval('(' + jsonString + ')');
    },

    /**
     * Transforms given JSON-object into string, contains stringed representation of given object.
     * Note, that all symbol-keyed properties will be completely ignored.
     * @memberof SDV.Util.Json
     * @public
     * @function
     * @param {object} value JSON-object being converted to a string.
     * @returns {string} Returns string, contains stringed representation of given JSON-object.
     *
     * @example
     * SDV.Util.Json.stringify({});                  // '{}'
     * SDV.Util.Json.stringify(true);                // 'true'
     * SDV.Util.Json.stringify('foo');               // '"foo"'
     * SDV.Util.Json.stringify([1, 'false', false]); // '[1,"false",false]'
     * SDV.Util.Json.stringify({ x: 5 });            // '{"x":5}'
     * SDV.Util.Json.stringify({ x: 5, y: 6 });      // '{"x":5,"y":6}' or '{"y":6,"x":5}'
     *
     * // Symbol-keyed properties will be completely ignored:
     * SDV.Util.Json.stringify({ x: undefined, y: Object, z: Symbol('') }); // '{}'
     */
    stringify: window.JSON ? window.JSON.stringify : (function () {
        var toString = window.Object.prototype.toString;
        var isArray = SDV.Util.Array.isArray;
        var escMap = {'"': '\\"', '\\': '\\\\', '\b': '\\b', '\f': '\\f', '\n': '\\n', '\r': '\\r', '\t': '\\t'};
        var escFunc = function (m) {
            return escMap[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1);
        };
        var escRE = /[\\"\u0000-\u001F\u2028\u2029]/g;
        return function stringify(value) {
            if (value == null) {
                return 'null';
            } else if (typeof value === 'number') {
                return window.isFinite(value) ? value.toString() : 'null';
            } else if (typeof value === 'boolean') {
                return value.toString();
            } else if (typeof value === 'object') {
                if (typeof value.toJSON === 'function') {
                    return stringify(value.toJSON());
                } else if (isArray(value)) {
                    var res = '[';
                    for (var i = 0; i < value.length; i++)
                        res += (i ? ', ' : '') + stringify(value[i]);
                    return res + ']';
                } else if (toString.call(value) === '[object Object]') {
                    var tmp = [];
                    for (var k in value) {
                        if (value.hasOwnProperty(k))
                            tmp.push(stringify(k) + ': ' + stringify(value[k]));
                    }
                    return '{' + tmp.join(', ') + '}';
                }
            }
            return '"' + value.toString().replace(escRE, escFunc) + '"';
        };
    })(),

    /**
     * Makes a GET-request to address specified in 'filePath'-option, and receives JSON-object (in a case of success).
     * In case of invalid data in file, data will be received as string instead of JSON-object.
     * @memberof SDV.Util.Json
     * @public
     * @function
     * @param {object} options Request options.
     * @param {string} options.filePath Path to target JSON-file (for most browsers it could be even cross domain URL).
     * @param {boolean} [options.async = true] Flag: represents if request should be asynchronous or not.
     * @param {number} [options.timeout = 0] Request timeout (Non negative integer value).
     * @param {function} options.onSuccess Callback-function that handles successful request completion.
     * @param {function} [options.onError = function(error, xhr) { console.error(error.message); }]
     * Callback-function that handles failed request.
     *
     * @returns {object} Returns XMLHttpRequest-object, or ActiveXObject (for old IE versions),
     * or XDomainRequest-object (for IE8/IE9 if given file path is cross domain URL).
     *
     * @example
     * // If server contains file 'myJsonFile.json' in the same path as the current page, and that file contains following data:
     * // { "property1": 1 }, then onSuccess callback-function will receive that data and log it to console.
     * // In the case of fail, error message will be logged to browser console.
     * SDV.Util.Json.getFromFile({ filePath: 'myJsonFile.json', onSuccess: function(data, xhr) { console.log(data); } });
     */
    getFromFile: function(options) {
        return SDV.Util.Ajax.makeRequest({
            url: options.filePath,
            method: 'GET',
            async: options.async,
            timeout: options.timeout,
            responseContentType: 'json',
            onSuccess: options.onSuccess,
            onError: options.onError
        });
    }
};
