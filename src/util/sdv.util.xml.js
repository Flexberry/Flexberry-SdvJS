/**
 * Base namespace for SDV.js library XML utils.
 * All supporting XML utils are accessible through it.
 * @namespace SDV.Util.Xml
 * @memberof SDV.Util
 */
SDV.Util.Xml = {
    /**
     * Checks whether a given object is an XML-document.
     * @memberof SDV.Util.Xml
     * @public
     * @function
     * @param {object} xmlObject Inspected object.
     * @returns {boolean} Returns true if inspected object is an XML-document, otherwise returns false.
     *
     * @example
     * SDV.Util.Xml.isXml(); // false.
     * SDV.Util.Xml.isXml(null); // false.
     * SDV.Util.Xml.isXml('This is a string'); // false.
     * SDV.Util.Xml.isXml(1); // false.
     * SDV.Util.Xml.isXml([1]); // false.
     * SDV.Util.Xml.isXml(function(){return 1;}); // false.
     * SDV.Util.Xml.isXml({one: 1}); // true.
     * SDV.Util.Xml.isXml(SDV.Util.Xml.parse('<node1>1</node1>')); // true.
     */
    isXml: function(xmlObject) {
        var givenType = Object.prototype.toString.call(xmlObject);
        return (givenType === '[object XMLDocument]'
            || (givenType === '[object Document]' && SDV.Util.String.isString(xmlObject.xmlVersion))
            || (givenType === '[object Object]'
                && window.ActiveXObject
                && SDV.Util.String.isString(xmlObject.xml)
                && typeof xmlObject.getElementsByTagName !== 'undefined'));
    },

    /**
     * Transforms given string into XML-document.
     * @memberof SDV.Util.Xml
     * @public
     * @function
     * @throws {SyntaxError} Throws a SyntaxError exception if the given string contains invalid XML.
     * @param {string} xmlString String, contains stringed XML-information.
     * @returns {object} A {@link https://developer.mozilla.org/en-US/docs/Web/API/XMLDocument|XMLDocument}
     * or common {@link https://developer.mozilla.org/en-US/docs/Web/API/Document|Document}
     * that represents the DOM tree of the XML source.
     *
     * @example
     * SDV.Util.Xml.parse(); // Will throw SyntaxError.
     * SDV.Util.Xml.parse(''); // Will throw SyntaxError.
     * SDV.Util.Xml.parse('{ property1: 1 }'); // Will throw SyntaxError.
     * SDV.Util.Xml.parse('<node1>1</node1>'); // Will return document, contains parsed XML: <root><node1>1</node1></root>.
     */
    parse: function(xmlString) {
        var xml, tmp;

        try {
            if (window.DOMParser) {
                tmp = new window.DOMParser();
                xml = tmp.parseFromString(xmlString , 'text/xml');
            } else if (window.ActiveXObject){
                xml = new window.ActiveXObject('Microsoft.XMLDOM');
                xml.async = 'false';
                xml.loadXML(xmlString);
            }
        } catch(e) {
            xml = null;
        }

        if (!xml || !xml.documentElement || xml.getElementsByTagName('parsererror').length) {
            throw new SyntaxError(SDV.Localization.getResource('wrongParameterFormatError')({
                parameterName: 'xmlString',
                actualValue: xmlString,
                expectedFormat: 'XML'
            }));
        }

        return xml;
    },

    /**
     * Transforms given XML-document into string, contains stringed representation of given XML.
     * @memberof SDV.Util.Xml
     * @public
     * @function
     * @throws {TypeError} Throws a TypeError exception if given object is not a document at all,
     * if it is, for example, a number, or a string.
     * @throws {SyntaxError} Throws a SyntaxError exception if the given object is not valid XML-document.
     * @throws {Error} Throws common Error exception if browser don't support any XML-serialization facilities.
     *
     * @param {document} xmlObject XML-document being converted to a string.
     * @returns {string} Returns string, contains stringed representation of given XML-document.
     *
     * @example
     * SDV.Util.Xml.stringify();                  // It will throw TypeError.
     * SDV.Util.Xml.stringify(true);                // It will throw TypeError.
     * SDV.Util.Xml.stringify('foo');               // It will throw TypeError.
     * SDV.Util.Xml.stringify([1, 'false', false]); // It will throw TypeError.
     * SDV.Util.Xml.stringify({ x: 5 });            // It will throw TypeError.
     *
     * // It will throw SyntaxError, because '<node1>' isn't closed.
     * SDV.Util.Xml.stringify(SDV.Util.Xml.parse('<node1>1</blahblah>'));
     *
     * // It will return '<node1>1</node1>'.
     * SDV.Util.Xml.stringify(SDV.Util.Xml.parse('<node1>1</node1>'));
     */
    stringify: function(xmlObject) {
        if (!SDV.Util.Xml.isXml(xmlObject)) {
            throw new TypeError(SDV.Localization.getResource('wrongParameterTypeError')({
                parameterName: 'xmlObject',
                actualValue: xmlObject,
                expectedType: '[object XMLDocument]'
            }));
        }

        var xmlString = null;

        try {
            if (window.XMLSerializer) {
                xmlString = (new window.XMLSerializer()).serializeToString(xmlObject);
            } else if (window.ActiveXObject
                && typeof xmlObject.getElementsByTagName !== 'undefined'
                && SDV.Util.String.isString(xmlObject.xml)) {
                xmlString = xmlObject.xml;
            }
        }
        catch(e) {
            throw new SyntaxError(SDV.Localization.getResource('wrongParameterFormatError')({
                parameterName: 'xmlObject',
                actualValue: xmlObject,
                expectedFormat: 'XML'
            }));
        }

        if (xmlString === null) {
            throw new Error(SDV.Localization.getResource('unsupportedFacilityError')([
                'XMLSerializer',
                'ActiveXObject(\'Microsoft.XMLDOM\')'
            ]));
        }

        return xmlString;
    },

    /**
     * Makes a GET-request to address specified in 'filePath'-option, and receives XML-document (in a case of success).
     * In case of invalid data in file, data will be received as string instead of XML-document.
     * @memberof SDV.Util.Xml
     * @public
     * @function
     * @param {object} options Request options.
     * @param {string} options.filePath Path to target XML-document (for most browsers it could be even cross domain URL).
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
     * // If server contains file 'myXmlFile.xml' in the same path as the current page, and that file contains following data:
     * // <node1>1</node1>, then onSuccess callback-function will receive that data and log it to console.
     * // In the case of fail, error message will be logged to browser console.
     * SDV.Util.Xml.getFromFile({ filePath: 'myXmlFile.xml', onSuccess: function(data, xhr) { console.log(data); } });
     */
    getFromFile: function(options) {
        return SDV.Util.Ajax.makeRequest({
            url: options.filePath,
            method: 'GET',
            async: options.async,
            timeout: options.timeout,
            responseContentType: 'document',
            onSuccess: options.onSuccess,
            onError: options.onError
        });
    }
};
