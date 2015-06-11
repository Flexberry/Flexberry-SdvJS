/**
 * Base namespace for SDV.js library AJAX utils.
 * All supporting AJAX utils are accessible through it.
 * @namespace SDV.Util.Ajax
 * @memberof SDV.Util
 */
SDV.Util.Ajax = {
};

// Using closure for SDV.Util.Ajax methods assigning, to hide some private members.
(function() {
    // Request allowed HTTP methods.
    var makeRequestAllowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];

    // Request default options.
    var makeRequestDefaultOptions = {
        url: '',
        method: 'GET',
        timeout: 0,
        async: true,
        user: '',
        password: '',
        headers: {
        },
        requestContent: null,
        requestContentType: 'application/x-www-form-urlencoded',
        responseContentType: '',
        onSuccess: function(data, xhr) {
            console.log(xhr.responseText);
        },
        onError: function(error, xhr) {
            console.error(error.message);
        }
    };

    // Validates request options.
    var makeRequestValidateOptions = function(options) {
        var onErrorValidationOptions = {
            optionName: 'onError',
            allowedTypes: ['Function'],
            replaceWithDefaultIfUndefined: true,
            replaceWithDefaultIfInvalid: true
        };
        var onSuccessValidationOptions = {
            optionName: 'onSuccess',
            isRequired: true,
            allowedTypes: ['Function']
        };
        var urlValidationOptions = {
            optionName: 'url',
            isRequired: true,
            allowedTypes: ['String']
        };
        var methodValidationOptions = {
            optionName: 'method',
            allowedTypes: ['String'],
            allowedValues: makeRequestAllowedMethods,
            replaceWithDefaultIfUndefined: true
        };
        var userValidationOptions = {
            optionName: 'user',
            allowedTypes: ['String'],
            replaceWithDefaultIfUndefined: true
        };
        var passwordValidationOptions = {
            optionName: 'password',
            allowedTypes: ['String'],
            replaceWithDefaultIfUndefined: true
        };
        var timeoutValidationOptions = {
            optionName: 'timeout',
            allowedTypes: ['Integer'],
            minValue: 0,
            minValueEqualityAllowed: true,
            replaceWithDefaultIfUndefined: true
        };
        var asyncValidationOptions = {
            optionName: 'async',
            allowedTypes: ['Boolean'],
            replaceWithDefaultIfUndefined: true
        };
        var requestContentValidationOptions = {
            optionName: 'requestContent',
            replaceWithDefaultIfUndefined: true
        };
        var headersValidationOptions = {
            optionName: 'headers',
            allowedTypes: ['Object'],
            replaceWithDefaultIfUndefined: true
        };
        var requestContentTypeValidationOptions = {
            optionName: 'requestContentType',
            allowedTypes: ['String'],
            replaceWithDefaultIfUndefined: true
        };
        var responseContentTypeValidationOptions = {
            optionName: 'responseContentType',
            allowedTypes: ['String'],
            replaceWithDefaultIfUndefined: true
        };

        var validationResult = SDV.Util.Validation.validateOptions([
                onErrorValidationOptions,
                onSuccessValidationOptions,
                urlValidationOptions,
                methodValidationOptions,
                userValidationOptions,
                passwordValidationOptions,
                timeoutValidationOptions,
                asyncValidationOptions,
                requestContentValidationOptions,
                headersValidationOptions,
                requestContentTypeValidationOptions,
                responseContentTypeValidationOptions
            ],
            options,
            makeRequestDefaultOptions);

        return validationResult;
    };

    /**
     * Checks if given url is cross domain.
     * @memberof SDV.Util.Ajax
     * @public
     * @function
     * @param {string} url Inspected url.
     * @returns {boolean} Returns true if inspected url is cross domain, otherwise returns false.
     *
     * @example
     * // Suppose that the current page has following address: http://localhost:63342/SpatialDataVisualization/pagesDist/examples.html
     * SDV.Util.Ajax.isUrlCrossDomain(); // false, because url is undefined.
     * SDV.Util.Ajax.isUrlCrossDomain(null); // false, because url is not a string.
     *
     * // It will return false, because given url is a relative path to a file on the same domain.
     * SDV.Util.Ajax.isUrlCrossDomain('data/myXmlFile.xml');
     *
     * // It will return true, because protocols are different.
     * SDV.Util.Ajax.isUrlCrossDomain('https://localhost:63342/SpatialDataVisualization/pagesDist/examples.html');
     *
     * // It will return true, because domains are different.
     * SDV.Util.Ajax.isUrlCrossDomain('http://anotherhost:63342/SpatialDataVisualization/pagesDist/examples.html');
     *
     * // It will return true, because ports are different.
     * SDV.Util.Ajax.isUrlCrossDomain('http://localhost:8080/SpatialDataVisualization/pagesDist/examples.html');
     */
    var isUrlCrossDomain = function(url) {

        if (SDV.Util.String.isString(url)) {
            var currentLocation = window.location;
            var givenUrl = document.createElement('a');
            givenUrl.href = url;

            if (givenUrl.protocol !== '' && currentLocation.protocol !== givenUrl.protocol) {
                return true;
            }

            if (givenUrl.hostname !== '' && currentLocation.hostname !== givenUrl.hostname) {
                return true;
            }

            if (givenUrl.port !== '' && currentLocation.port !== givenUrl.port) {
                return true;
            }
        }

        return false;
    };

    // Creates new xhr object.
    var getXhr = function(){
        var xhr = null;

        // IE7 has XMLHttpRequest, but it can't request to local files,
        // also in IE7/IE8 XMLHttpRequest can be disabled, so we need an ActiveXObject instead of XMLHttpRequest.
        var ie8OrLower =  !document.addEventListener || !document.querySelector;

        if (window.ActiveXObject && (!window.XMLHttpRequest || ie8OrLower)) {
            var activexRealizations = [
                'Msxml2.XMLHTTP.6.0',
                'Msxml2.XMLHTTP.3.0',
                'Msxml2.XMLHTTP',
                'Microsoft.XMLHTTP'
            ];

            for (var i=0, len=activexRealizations.length; i<len; i++) {
                try {
                    xhr = new window.ActiveXObject(activexRealizations[i]);
                }
                catch(e) {}
            }
        } else if (window.XMLHttpRequest) {
            xhr = new window.XMLHttpRequest();
        }

        return xhr;
    };

    /**
     * Makes AJAX request.
     * @memberof SDV.Util.Ajax
     * @public
     * @function
     * @param {object} options Request options.
     * @param {string} options.url Request URL (cross domain urls are supported even in IE8/IE9).
     * @param {string} [options.method = 'GET'] Desirable HTTP-method for request
     * (should be one of the followings: 'GET', 'POST', 'PUT', 'DELETE').
     *
     * @param {number} [options.timeout = 0] Request timeout (should be non-negative integer number).
     * @param {boolean} [options.async = true] Flag: represents if request should be asynchronous or not.
     * @param {string} [options.user = ''] User on whose behalf the request is made.
     * @param {string} [options.password = ''] Password of those user on whose behalf the request is made
     * @param {object} [options.headers] Object with request headers
     * (for example { "MyHeader1": 'blah blah1', "MyHeader2": 'blah blah2' }).
     *
     * @param {*} [options.requestContent = null] Data that will be transferred to the given URL-address
     * (for requests such as POST, PATH, or DELETE),
     * or will be translated to string and object's properties will be added to the URL query parameters (for GET-request).
     *
     * @param {string} [options.requestContentType = 'application/x-www-form-urlencoded']
     * Type of outgoing data (of RequestContent).
     * See supported types {@link http://en.wikipedia.org/wiki/Internet_media_type#List_of_common_media_types|here}.
     *
     * @param {string} [options.responseContentType = ''] Desirable type of incoming data (for example, 'json', or 'document' for xml).
     * @param {function} options.onSuccess Callback-function to handle successful request completion
     * (Something like this: function(data, xhr) { console.log('Successful request! Received data: '); console.log(data); }).
     *
     * @param {function}[options.onError = function(error, xhr) { console.error(error.message); }]
     * Callback-function to handle failed request.
     *
     * @returns {object} Returns XMLHttpRequest-object, or ActiveXObject (for old IE versions),
     * or XDomainRequest-object (for IE8/IE9 if given file path is cross domain URL).
     *
     * @example
     * // If server contains file 'myJsonFile.json' in the same path as the current page, and that file contains following data:
     * // { "property1": 1 }, then onSuccess callback-function will receive that data and log it to console.
     * // In the case of fail, error message will be logged to browser console.
     * SDV.Util.Ajax.makeRequest({
     *      url: 'myJsonFile.json',
     *      method: 'GET',
     *      onSuccess: function(data, xhr) { console.log(data); },
     *      responseContentType: 'json'
     * });
     */
    var makeRequest = function(options) {
        // Preprocess string request options.
        if (SDV.Util.String.isString(options.method)) {
            options.method = SDV.Util.String.trim(options.method).toUpperCase();
        }

        if (SDV.Util.String.isString(options.requestContentType)) {
            options.requestContentType = SDV.Util.String.trim(options.requestContentType).toLowerCase();
        }

        if (SDV.Util.String.isString(options.responseContentType)) {
            options.responseContentType = SDV.Util.String.trim(options.responseContentType).toLowerCase();
        }

        // Validate request options.
        var validationResult = makeRequestValidateOptions(options);
        if (!validationResult.isValid) {
            options.onError({
                name: 'AjaxOptionsError',
                message: validationResult.message
            });

            return null;
        }

        // Define xhr.
        var xhr = getXhr();
        if (!xhr) {
            options.onError({
                name: 'AjaxOptionsError',
                message: SDV.Localization.getResource('unsupportedFacilityError')([
                    'XMLHttpRequest',
                    'ActiveXObject(\'Msxml2.XMLHTTP\')',
                    'ActiveXObject(\'Microsoft.XMLHTTP\')'
                ])
            });

            return null;
        }

        // Additional checks are needed for cross domain requests.
        var xhrSupportCrossDomain = typeof xhr.withCredentials !== 'undefined';
        var xdr = null;

        if (isUrlCrossDomain(options.url) && !xhrSupportCrossDomain) {
            // In IE8/IE9 XMLHttpRequest doesn't support cross domain requests,
            // but we can use special XDomainRequest object.
            if (window.XDomainRequest) {
                xdr = new window.XDomainRequest();
            } else {
                options.onError({
                    name: 'AjaxOptionsError',
                    message: SDV.Localization.getResource('unsupportedFacilityError')('XDomainRequest')
                });

                return null;
            }
        }

        var requestObject = xdr || xhr;
        var requestTimeout;
        var errorUnhandled = true;
        var requestFinished = false;

        // Method to stop timer if needed.
        var stopTimer = function() {
            if (requestTimeout) {
                clearTimeout(requestTimeout);
                requestTimeout = null;

                if (!requestFinished) {
                    requestFinished = true;
                    requestObject.abort();
                }
            }
        };

        // Request timeout handler.
        var handleTimeOut = function() {
            errorUnhandled = false;
            stopTimer();
            options.onError({
                name: 'RequestTimeOut',
                message: 'Request is timed out (' + options.timeout + 'ms).'
            }, requestObject);
        };

        // Request error handler.
        var handleError = function(error) {
            requestFinished = true;
            stopTimer();

            if (errorUnhandled) {
                if (typeof error !== 'undefined') {
                    options.onError({
                        name: error.name || 'RequestError',
                        message: error.message || error
                    }, requestObject);
                } else {
                    options.onError({
                        name: requestObject.statusText || 'RequestError',
                        message: (requestObject.status
                            ? 'Error ' + (requestObject.status == 1223 ? 204 : requestObject.status) + ' '
                            : 'Error. ') +
                        (requestObject.statusText
                            ? '(' + requestObject.statusText + '). '
                            : '') +
                        (requestObject.responseText
                            ? requestObject.responseText
                            : '')
                    }, requestObject);
                }
            }
        };

        // Request success handler.
        var handleSuccess = function() {
            requestFinished = true;
            stopTimer();

            var data = null;

            try {
                if (options.responseContentType === 'json') {
                    data = SDV.Util.Json.parse(requestObject.responseText);
                } else if (options.responseContentType === 'document') {
                    data = SDV.Util.Xml.parse(requestObject.responseText);
                } else {
                    data = requestObject.responseText;
                }
            }
            catch(e) {
                data = requestObject.responseText;
            }

            options.onSuccess(data, requestObject);
        };

        // Request onreadystatechange handler.
        var handleStateChange = function () {
            var requestStatus = 0;
            var requestError;

            // In IE9, reads to any property (e.g. status) off of an aborted XHR will
            // result in the error 'Could not complete the operation due to error c00c023f'.
            // That's why we need try-catch here.
            try {
                if (xhr.readyState !== 4) {
                    return;
                }

                requestFinished = true;
                requestStatus = xhr.status;
            }
            catch(e) {
                requestStatus = 0;
                requestError = e;
            }

            if (requestStatus === 200) {
                handleSuccess();
            } else {
                handleError(requestError);
            }
        };

        // Add requestContent to url of GET request.
        if (SDV.Util.Object.isObject(options.requestContent) && options.method === 'GET') {
            if (options.url.indexOf('?') == -1) {
                options.url = options.url + '?';
            }

            var isNotFirstParameter = false;
            for (var parameter in options.requestContent) {
                if (options.requestContent.hasOwnProperty(parameter)) {
                    if (isNotFirstParameter) {
                        options.url = options.url + '&';
                    }

                    options.url = options.url + parameter + '=' + options.requestContent[parameter];
                    isNotFirstParameter = true;
                }
            }
        }

        // Set timeout if needed.
        if (options.timeout > 0) {
            // Even if xhr.timeout property exists,
            // xhr.onreadystatechange occurs before xhr.ontimeout, so timeout error handles twice.
            // That's why we use manual SetTimeout/ClearTimeout instead of xhr.timeout.
            requestTimeout = setTimeout(handleTimeOut, options.timeout);
        }

        if (requestObject === xhr) {
            // Here we use XMLHttpRequest object.

            // XMLHttpRequest.onreadystatechange should not be used with synchronous requests.
            if (options.async) {
                xhr.onreadystatechange = handleStateChange;
            }

            // Prepare request.
            xhr.open(options.method, options.url, options.async, options.user, options.password);

            // Set request headers.
            for (var headerName in options.headers) {
                if (options.headers.hasOwnProperty(headerName)) {
                    xhr.setRequestHeader(headerName, options.headers[headerName]);
                }
            }

            // Finally send request.
            if(options.method === 'GET') {
                xhr.send(null);
            } else {
                xhr.setRequestHeader('Content-type', options.requestContentType);
                xhr.send(options.requestContent)
            }

            // Handle results of synchronous request after call to XMLHttpRequest.send(...).
            if (!options.async) {
                handleStateChange();
            }
        } else {
            // Here we use XDomainRequest object.
            // Note that requests through XDomainRequest are always asynchronous.
            xdr.open(options.method, options.url);
            xdr.onload = handleSuccess;
            xdr.onerror = handleError;

            if(options.method === 'GET') {
                xdr.send(null);
            } else {
                xdr.send(options.requestContent)
            }
        }

        return requestObject;
    };

    // Assign public methods to SDV.Util.Ajax namespace.
    SDV.Util.Ajax.makeRequest = makeRequest;
    SDV.Util.Ajax.isUrlCrossDomain = isUrlCrossDomain;
})();