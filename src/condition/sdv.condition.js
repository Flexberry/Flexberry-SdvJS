/**
 * Base namespace for SDV.js library templated conditions utils.
 * All supporting templated conditions utils are accessible through it.
 * @namespace SDV.Condition
 * @memberof SDV
 */
SDV.Condition = {
    /**
     * Parsed template.
     * @memberof SDV.Condition
     * @typedef {object} parsedTemplate
     * @property {number} start Template start index in condition string.
     * @property {number} end Template end index in condition string.
     * @property {string} propertyName propertyName contained inside the template.
     *
     * @example
     * // For condition '{{a.b}} > 5' it will be next object.
     * { start: 0, end: 6, propertyName: 'a.b' };
     */

    /**
     * Condition parse result.
     * @memberof SDV.Condition
     * @typedef {object} conditionParseResult
     * @property {boolean} isValid Flag: represents if parsed condition is valid.
     * @property {string} message Message with error information if condition is invalid, otherwise it will be an empty string.
     * @property {parsedTemplate[]} templates Array of parsed templates,
     *
     * @example
     * // For condition '{{a.b}} > 5 || {{c.d}} < 10' it will be next array.
     * [{ start: 0, end: 6, propertyName: 'a.b' }, { start: 15, end: 21, propertyName: 'c.d' }];
     */

    /**
     * Checks whether a given object is a valid templated condition.
     * @memberof SDV.Condition
     * @public
     * @function
     * @param {string} condition Templated condition to parse.
     * @returns {conditionParseResult} Returns object contains validation results.
     *
     * @example
     * // It will return { isValid: false, message: 'Error. Required parameter 'condition' is undefined.', templates: null }.
     * SDV.Condition.parse();
     *
     * // It will return {
     * //   isValid: false,
     * //   message: 'Error. Parameter 'condition' must be of type 'String', but not of type '[object Null]'.',
     * //   templates: null
     * // }.
     * SDV.Condition.parse(null); // Same logic for all types except string.
     *
     * // It will return {
     * //   isValid: true,
     * //   message: '',
     * //   templates: []
     * // }.
     * SDV.Condition.parse('');
     *
     * // It will return {
     * //   isValid: true,
     * //   message: '',
     * //   templates: [{ start: 0, end: 6, propertyName: 'a.b' }]
     * // }.
     * SDV.Condition.parse('{{a.b}} > 5');
     */
    parse: function(condition) {
        var result = {
            isValid: true,
            message: '',
            templates: null
        };

        var validationResult = SDV.Util.Validation.validateOption({
            optionName: 'condition',
            isRequired: true,
            allowedTypes: ['String']
        }, condition);

        result.isValid = validationResult.isValid;
        result.message = validationResult.message;

        if (!result.isValid) {
            return result;
        }

        var conditionLength = condition.length;
        var templates = [];

        // We should replace all strings (for a while) to avoid such situations
        // (when template-like constructions could exist inside condition inner strings):
        // condition = '{{myProperty}} + \'{{myProperty}}\' === \'blahBlah{{myProperty}}\''.
        var conditionWithoutInnerStrings = condition.replace(/'(.*?)'|"(.*?)"/g, function(subStr, subStrPosition, originalStr) {
            return '\'' + new Array(subStr.length - 1).join('_') + '\'';
        });

        // Start positions of substrings which starts with '{{'.
        var templatesStartPositions = [];
        conditionWithoutInnerStrings.replace(/{{/g, function(subStr, subStrPosition, originalStr) {
            templatesStartPositions.push(subStrPosition);

            return subStr;
        });

        var templateStart = -1;
        var templateEnd = -1;
        var templateLength = 0;
        var template = '';

        // Each substring which starts with '{{' must contain some property name ('myProperty')
        // or properties chain (myProperty1.myProperty2...),
        // and must be finished with '}}'.
        // Remember that in JS objects could contain any strings as properties names, even an empty string.
        var fullTemplateRegex = /^{{(.*?)}}$/g;
        for (var i = 0, len = templatesStartPositions.length; i < len; i++) {
            templateStart = templatesStartPositions[i];

            templateEnd = conditionWithoutInnerStrings.indexOf('}}', templateStart + 1);
            templateEnd = templateEnd > 0 ? templateEnd + 1 : conditionWithoutInnerStrings.indexOf('{{', templateStart + 1) + 1;
            templateEnd = templateEnd > 0 ? templateEnd : conditionLength - 1;

            templateLength = templateEnd - templateStart + 1;

            template = condition.substr(templateStart, templateLength);

            if (!template.match(fullTemplateRegex)) {
                result.isValid = false;
                result.message = SDV.Localization.getResource('syntaxError')({
                    originalString: condition,
                    allowedConstructions: ['{{propertyName}}', '{{propertyName1.propertyName2...}}'],
                    actualConstruction: template,
                    errorPosition: templateStart
                });

                return result;
            }

            templates.push({
                start: templateStart,
                end: templateEnd,
                propertyName: template.substr(2, templateLength - 4)
            });
        }

        // Additionally we need to check for unstarted templates.
        // Substrings which ends with '}}'.
        var templatesEndPositions = [];
        conditionWithoutInnerStrings.replace(/}}/g, function(subStr, subStrPosition, originalStr) {
            templatesEndPositions.push(subStrPosition);

            return subStr;
        });

        // Each substring finished with '}}' must contain some property name ('myProperty')
        // or properties chain (myProperty1.myProperty2...),
        // and must be started with '{{'.
        for (i = 0, len = templatesEndPositions.length; i < len; i++) {
            templateEnd = templatesEndPositions[i] + 1;

            template = conditionWithoutInnerStrings.substr(0, templateEnd + 1);

            templateStart = template.lastIndexOf('{{');
            templateStart = templateStart >= 0 ? templateStart : template.substr(0, template.length - 2).lastIndexOf('}}');
            templateStart = templateStart >= 0 ? templateStart : 0;

            templateLength = templateEnd - templateStart + 1;

            template = condition.substr(templateStart, templateLength);

            if (!template.match(fullTemplateRegex)) {
                result.isValid = false;
                result.message = SDV.Localization.getResource('syntaxError')({
                    originalString: condition,
                    allowedConstructions: ['{{propertyName}}', '{{propertyName1.propertyName2...}}'],
                    actualConstruction: template,
                    errorPosition: templateStart
                });

                return result;
            }
        }

        result.templates = templates;

        return result;
    }
};

// Using closure for SDV.Condition methods assigning, to hide some private members.
(function() {
    /**
     * Constructs new instance of templated condition.
     * Constructor is private, so use factory-method {@link SDV.Condition.create} to create an instance.
     * @public
     * @class Condition
     * @param {string} condition Templated condition.
     * @param {parsedTemplate[]} conditionTemplates Array of parsed templates contained inside condition.
     */
    var Condition = function(condition, conditionTemplates) {
        this._condition = condition;
        this._templates = conditionTemplates;
    };

    /**
     * {@link Condition} factory-method. It is an entry point to library templated conditions facilities.
     * @static
     * @function
     * @memberof SDV.Condition
     * @param {string} condition Templated condition.
     * @returns {Condition|null} Returns new instance of {@link Condition} if given condition is valid, otherwise returns null.
     *
     * @example
     * // null.
     * var conditionInstance = SDV.Condition.create();
     *
     * // null
     * var conditionInstance = SDV.Condition.create(null);
     *
     * // Creates white color RGB representation from its stringed name.
     * var conditionInstance = SDV.Condition.create('{{properties.area}} >= 100 && {{properties.area}} <= 200');
     */
    SDV.Condition.create = function(condition) {
        var parsedCondition = null;

        var validationResult = SDV.Util.Validation.validateOption({
            optionName: 'condition',
            isRequired: true,
            allowedTypes: ['String'],
            postValidationMethod: function() {
                parsedCondition = SDV.Condition.parse(condition);

                return parsedCondition;
            }
        }, condition);

        if (!validationResult.isValid) {
            console.error(validationResult.message);

            return null;
        }

        if (parsedCondition && parsedCondition.templates) {
            return new Condition(condition, parsedCondition.templates);
        }

        return null;
    };

    /**
     * Checks whether a given object is a valid templated condition.
     * @memberof SDV.Condition
     * @public
     * @function
     * @param {*} obj Inspected object.
     * @param {boolean} allowString Flag: indicates whether unparsed condition string is allowed.
     * @returns {boolean} Returns true if inspected object is a valid templated condition, otherwise returns false.
     *
     * @example
     * SDV.Condition.isCondition(); // false.
     * SDV.Condition.isCondition(null); // false.
     * SDV.Condition.isCondition('2 > 1'); // false.
     * SDV.Condition.isCondition('2 > 1', true); // true.
     * SDV.Condition.isCondition('{{myOption}} > 1', true); // true.
     * SDV.Condition.isCondition('{{myOption1}} > 1 && {{myOption2}, true} < 2'); // true.
     * SDV.Condition.isCondition('({{myOption1}} + {{myOption2}}) < 2', true); // true.
     * SDV.Condition.isCondition('Math.Max({{myOption1}}, {{myOption2}}, true) == {{myOption1}}'); // true.
     * SDV.Condition.isCondition('{{myOption.mySubOption}} > 1', true); // true.
     *
     * var conditionInstance = SDV.Condition.create('{{myOption}} > 1');
     * SDV.Condition.isCondition(conditionInstance); // true.
     */
    SDV.Condition.isCondition = function(obj, allowString) {
        return obj instanceof Condition || (allowString === true && SDV.Condition.parse(obj).isValid);
    };

    // Prototype shortcut.
    var condition = SDV.Condition.prototype = Condition.prototype = {};

    /**
     * Gets an array of data objects satisfying to a given templated condition.
     * @memberof Condition
     * @public
     * @function
     * @throws {Error} Will throw an error if given data is not an object or objects array.
     *
     * @param {object|object[]} data Single data object or array of data objects,
     * which needed to be checked for condition satisfaction.
     * @param {boolean} tillFirstSatisfaction Flag: indicates whether to stop checking,
     * if some of data objects already satisfies given condition.
     * @returns {object[]} Returns array of those data objects which satisfies condition.
     *
     * @example
     * var absolutelyTrueCondition = SDV.Condition.create('2 > 1');
     *
     * // It will return [{name: 'first'}, {name: 'second'}, {name: 'third'}],
     * // because '2 > 1' is absolutely true regardless of data objects properties values.
     * absolutelyTrueCondition.getSatisfyingData([{name: 'first'}, {name: 'second'}, {name: 'third'}]);
     *
     * var stStringsCondition = SDV.Condition.create('{{name}}.charAt(0) === \'f\' || {{name}}.charAt(0) === \'t\'');
     *
     * // It will return [{name: 'second'}, {name: 'third'}],
     * stStringsCondition.getSatisfyingData([{name: 'first'}, {name: 'second'}, {name: 'third'}]);
     *
     * var absolutelyFalseCondition = SDV.Condition.create('2 < 1');
     *
     * // It will return [],
     * absolutelyFalseCondition.getSatisfyingData([{name: 'first'}, {name: 'second'}, {name: 'third'}]);
     */
    condition.getSatisfyingData = function(data, tillFirstSatisfaction) {
        var dataValidationResult = SDV.Util.Validation.validateOption({
            optionName: 'data',
            isRequired: true,
            allowedTypes: ['Object', 'ObjectArray']
        }, data);

        if (!dataValidationResult.isValid) {
            throw new Error(dataValidationResult.message);
        }

        tillFirstSatisfaction = tillFirstSatisfaction === true;

        var satisfyingDataObjects = [];
        var templates = this._templates;
        var templatesDataObjects = SDV.Util.Array.isArray(data) ? data : [data];

        for (var i = 0, templatesDataObjectsCount = templatesDataObjects.length; i < templatesDataObjectsCount; i++) {
            var templateOffset = 0;
            var currentCondition = this._condition;

            for (var j = 0, templatesCount = templates.length; j < templatesCount; j++) {
                var template = templates[j];
                var templateDataObject = templatesDataObjects[i];
                var templatePropertyName = template.propertyName;
                var templatePropertyValue = SDV.Util.Object.getPropertyValue({
                    srcObject: templateDataObject,
                    propertyName: templatePropertyName
                });

                templatePropertyValue = typeof templatePropertyValue !== 'undefined'
                    ? SDV.Util.Json.stringify(templatePropertyValue)
                    : 'undefined';

                currentCondition = SDV.Util.String.insert(
                    currentCondition,
                    templatePropertyValue,
                    template.start + templateOffset,
                    template.end + templateOffset);

                templateOffset += templatePropertyValue.length - (template.end - template.start + 1);
            }

            if (eval(currentCondition) === true) {
                satisfyingDataObjects.push(templatesDataObjects[i]);

                if (tillFirstSatisfaction) {
                    break;
                }
            }
        }

        return satisfyingDataObjects;
    };

    /**
     * Checks if given data satisfies condition.
     * @memberof Condition
     * @public
     * @function
     * @throws {Error} Will throw an error if given data is not an object or objects array.
     *
     * @param {object|object[]} data Single data object or array of data objects,
     * which needed to be checked for condition satisfaction.
     * @returns {boolean} Returns true if some (even one) of given data objects satisfies given condition, otherwise returns false.
     *
     * @example
     * // It will return true,
     * // because '2 > 1' is absolutely true regardless of data objects properties values.
     * SDV.Condition.create('2 > 1').isSatisfiedBy([{name: 'first'}, {name: 'second'}, {name: 'third'}]);
     *
     * // It will return true, because second object satisfies given condition,
     * SDV.Condition.create('{{name}}.charAt(0) === \'f\' || {{name}}.charAt(0) === \'t\'')
     *              .isSatisfiedBy([{name: 'first'}, {name: 'second'}, {name: 'third'}]);
     *
     * // It will return false, because names lengths of all given objects are greater or equals to 5, but not less then 5.
     * SDV.Condition.create('{{name}}.length < 5').isSatisfiedBy([{name: 'first'}, {name: 'second'}, {name: 'third'}]);
     */
    condition.isSatisfiedBy = function(data) {
        return  this.getSatisfyingData(data, true).length > 0;
    }
})();