/**
 * Base namespace for SDV.js library.
 * All library facilities are accessible through it.
 * @global
 * @namespace
 */
var SDV = {
    /**
     * Current library version.
     * @member {string}
     */
    version: '0.1.0',

    /**
     * Library name.
     * @member {string}
     */
    name: 'SDV.js'
};

/**
 * Defines spatial data visualization namespace object (SDV) globally, and stores previously existing SDV object.
 * @memberof SDV
 * @public
 * @function
 */
SDV.defineSdv = function() {
    var existingSdv = window.SDV;

    /**
     * Returns spatial data visualization namespace object (SDV) locally, and assigns stored,
     * previously existing SDV object to window.SDV.
     * Allows to use spatial data visualization library without conflicts with another libraries
     * having the same global namespace.
     * @memberof SDV
     * @public
     * @function
     * @returns {object} Object which points to spatial data visualization namespace.
     *
     * @example
     * // If you use other library which points to SDV as its global namespace, you can avoid such problem.
     * // Before usage of SDV.js facilities you can assign its global namespace to a local variable as follows:
     * var sdvjs = SDV.noConflict();
     *
     * // Now sdvjs variable points to SDV.js library global namespace, and SDV points to that other library namespace.
     * // So you can use SDV.js facilities through a local variable as follows:
     * console.log('Current SDV.js version is ' + sdvjs.version);
     */
    SDV.noConflict = function () {
        window.SDV = existingSdv;
        return this;
    };

    window.SDV = SDV;
};

// Defines SDV as a global variable, storing the already existing SDV-object in order
// to be able to restore it later if needed.
if (window !== undefined) {
    SDV.defineSdv();
}

