/**
 * Base namespace for SDV.js library LINQ-like enumerable facilities.
 * All supporting LINQ-like enumerable facilities are accessible through it.
 * @namespace SDV.Enumerable
 * @memberof SDV
 */
SDV.Enumerable = {
};

// Using closure for SDV.Enumerable methods assigning, to hide some private members.
(function() {
    /**
     * Constructs new instance of enumerable, which wraps given items array,
     * and provides a methods for selecting and filtering its items.
     * Constructor is private, so use factory-method {@link SDV.Enumerable.create} to create an instance.
     * @public
     * @class Enumerable
     * @param {Array} items Array, which need to be transformed into enumerable.
     */
    var Enumerable = function (items) {
        this._items = items;
    };

    /**
     * {@link Enumerable} factory-method. It is an entry point to library LINQ-like enumerable facilities.
     * @static
     * @function
     * @memberof SDV.Enumerable
     * @param {Array} items Array, which need to be transformed into {@link Enumerable}.
     * @returns {Enumerable} Returns new instance of {@link Enumerable} if given items-parameter is array, otherwise returns null.
     */
    SDV.Enumerable.create = function(items) {
        if (!SDV.Util.Array.isArray(items)) {
            console.error(SDV.Localization.getResource('wrongParameterTypeError')({
                parameterName: 'items',
                expectedType: '[object Array]',
                actualValue: items
            }));

            return null;
        }

        return new Enumerable(items);
    };

    /**
     * Checks if given object is instance of {@link Enumerable}.
     * @static
     * @function
     * @memberof SDV.Enumerable
     * @param {*} obj Inspected object.
     * @returns {boolean} Returns true if given object is instance of {@link Enumerable}, otherwise returns false.
     *
     * @example
     * var integersEnumerable = SDV.Enumerable.create([1, 2, 3,4 , 5]);
     *
     * SDV.Enumerable.isEnumerable(); // false.
     * SDV.Enumerable.isEnumerable(null); // false.
     * SDV.Enumerable.isEnumerable('enumerable'); // false.
     * SDV.Enumerable.isEnumerable({}); // false.
     * SDV.Enumerable.isEnumerable([1, 2, 3, 4, 5]); // false.
     * SDV.Enumerable.isEnumerable(integersEnumerable); // true.
     */
    SDV.Enumerable.isEnumerable = function(obj) {
        return obj instanceof Enumerable;
    };

    // Prototype shortcut.
    var enumerable = SDV.Enumerable.prototype = Enumerable.prototype = {};

    /**
     * Adds given element to items array.
     * @public
     * @function
     * @memberof Enumerable
     * @returns {Array} Returns new length of items array.
     *
     * @example
     * var items = ['Bill', 'John', 'Jack'];
     * ];
     *
     * var names = SDV.Enumerable.create(items);
     *
     * // ['Bill', 'John', 'Jack'].
     * console.log(names);
     *
     * // New length is 4.
     * var removedName = names.push('Susan');
     *
     * // ['Bill', 'John', 'Jack', 'Susan'].
     * console.log(names);
     */
    enumerable.push = function(obj) {
        return this._items.push(obj);
    };

    /**
     * Removes the last element in items array.
     * @public
     * @function
     * @memberof Enumerable
     * @returns {Array} Returns removed item.
     *
     * @example
     * var items = ['Bill', 'John', 'Jack', 'Susan'];
     * ];
     *
     * var names = SDV.Enumerable.create(items);
     *
     * // ['Bill', 'John', 'Jack', 'Susan'].
     * console.log(names);
     *
     * // 'Susan'.
     * var removedName = names.pop();
     *
     * // ['Bill', 'John', 'Jack'].
     * console.log(names);
     */
    enumerable.pop = function(obj) {
        return this._items.pop(obj);
    };

    /**
     * Transforms {@link Enumerable} to array.
     * @public
     * @function
     * @memberof Enumerable
     * @returns {Array} Returns array of items wrapped in used {@link Enumerable} instance.
     *
     * @example
     * var items = [
     *      {id: 1, name: 'Bill', age: 20},
     *      {id: 2, name: 'John', age: 13},
     *      {id: 3, name: 'Jack', age: 17},
     *      {id: 3, name: 'Susan', age: 7}
     * ];
     *
     * // It will return array equals to ['John', 'Jack'].
     * var teenagersNames = SDV.Enumerable.create(items)
     *      .where(function(x) { return x.age >= 13 && x.age <= 19; })
     *      .select(function(x){ return x.name; })
     *      .toArray();
     */
    enumerable.toArray = function () {
        return this._items;
    };

    /**
     * Provides a way to make a new selection be each of {@link Enumerable} items.
     * @public
     * @function
     * @memberof Enumerable
     * @param {function} selectionMethod Method which applies item of used {@link Enumerable}, and returns item of new selection.
     * Something like: function(item) { return someValue(item); }.
     * @returns {Enumerable} Returns new {@link Enumerable} instance, contains selected items.
     *
     * @example
     * var items = [
     *      {id: 1, name: 'Bill', age: 20},
     *      {id: 2, name: 'John', age: 13},
     *      {id: 3, name: 'Jack', age: 17},
     *      {id: 3, name: 'Susan', age: 7}
     * ];
     *
     * // It will return array equals to ['1) Bill', '2) John', '3) Jack', '4) Susan'].
     * var names = SDV.Enumerable.create(items)
     *      .select(function(x){ return x.id + ') ' + x.name; })
     *      .toArray();
     */
    enumerable.select = function(selectionMethod) {
        var currentItem;
        var selectedItems = [];

        if (SDV.Util.Function.isFunction(selectionMethod)) {
            for (var i = 0, len = this._items.length; i < this._items.length; i++) {
                currentItem = this._items[i];

                // Given selectionMethod must return some value, which must be pushed to result array.
                selectedItems.push(selectionMethod(currentItem, i));
            }
        }

        return new Enumerable(selectedItems);
    };

    /**
     * Provides a way to filter {@link Enumerable} items, and get new filtered selection.
     * @public
     * @function
     * @memberof Enumerable
     * @param {function} clauseMethod Method which applies item of used {@link Enumerable}, optionally applies its index,
     * and returns true if some given condition is satisfied, otherwise returns false.
     * Something like: function(item, itemIndex) { return isSomeConditionSatisfied(item, itemIndex); }.
     * @returns {Enumerable} Returns new {@link Enumerable} instance, contains filtered items, which satisfies given condition.
     *
     * @example
     * var items = [
     *      {id: 1, name: 'Bill', age: 20},
     *      {id: 2, name: 'John', age: 13},
     *      {id: 3, name: 'Jack', age: 17},
     *      {id: 3, name: 'Susan', age: 7}
     * ];
     *
     * // It will return array equals to [{id: 2, name: 'John', age: 13},{id: 3, name: 'Jack', age: 17}].
     * var teenagers = SDV.Enumerable.create(items)
     *      .where(function(x) { return x.age >= 13 && x.age <= 19; })
     *      .toArray();
     */
    enumerable.where = function(clauseMethod) {
        var currentItem;
        var matchingItems = [];

        if (SDV.Util.Function.isFunction(clauseMethod)) {
            for (var i = 0, len = this._items.length; i < this._items.length; i++) {
                currentItem = this._items[i];

                // Given clauseMethod must return boolean value.
                if (clauseMethod(currentItem, i) === true) {
                    matchingItems.push(currentItem);
                }
            }
        }

        return new Enumerable(matchingItems);
    };

    /**
     * Checks if any of {@link Enumerable} items, satisfies some given condition.
     * @public
     * @function
     * @memberof Enumerable
     * @param {function} clauseMethod Method which applies item of used {@link Enumerable}, optionally applies its index,
     * and returns true if some given condition is satisfied, otherwise returns false.
     * Something like: function(item, itemIndex) { return isSomeConditionSatisfied(item, itemIndex); }.
     * @returns {boolean} Returns true if at least one item satisfies given condition, otherwise returns false.
     *
     * @example
     * var items = [
     *      {id: 1, name: 'Bill', age: 20},
     *      {id: 2, name: 'John', age: 13},
     *      {id: 3, name: 'Jack', age: 17},
     *      {id: 3, name: 'Susan', age: 7}
     * ];
     *
     * // It will return true.
     * var olderThenTenExists = SDV.Enumerable.create(items)
     *      .any(function(x) { return x.age > 10; });
     *
     * // It will return false.
     * var youngerThenFiveExists = SDV.Enumerable.create(items)
     *      .any(function(x) { return x.age < 5; });
     */
    enumerable.any = function(clauseMethod) {
        var currentItem;

        if (SDV.Util.Function.isFunction(clauseMethod)) {
            for (var i = 0, len = this._items.length; i < this._items.length; i++) {
                currentItem = this._items[i];

                // Given clauseMethod must return boolean value.
                if (clauseMethod(currentItem, i)) {
                    return true;
                }
            }
        }

        return false;
    };

    /**
     * Checks if all items in {@link Enumerable}, satisfies some given condition.
     * @public
     * @function
     * @memberof Enumerable
     * @param {function} clauseMethod Method which applies item of used {@link Enumerable}, optionally applies its index,
     * and returns true if some given condition is satisfied, otherwise returns false.
     * Something like: function(item, itemIndex) { return isSomeConditionSatisfied(item, itemIndex); }.
     * @returns {boolean} Returns true if all items satisfies given condition, otherwise returns false.
     *
     * @example
     * var items = [
     *      {id: 1, name: 'Bill', age: 20},
     *      {id: 2, name: 'John', age: 13},
     *      {id: 3, name: 'Jack', age: 17},
     *      {id: 3, name: 'Susan', age: 7}
     * ];
     *
     * // It will return true.
     * var allAreOlderThenFive = SDV.Enumerable.create(items)
     *      .all(function(x) { return x.age > 5; });
     *
     * // It will return false.
     * var allAreYoungerThenEighteen = SDV.Enumerable.create(items)
     *      .all(function(x) { return x.age < 18; });
     */
    enumerable.all = function(clauseMethod) {
        var currentItem;

        if (SDV.Util.Function.isFunction(clauseMethod)) {
            for (var i = 0, len = this._items.length; i < this._items.length; i++) {
                currentItem = this._items[i];

                // Given clauseMethod must return boolean value.
                if (!clauseMethod(currentItem, i)) {
                    return false;
                }
            }
        }

        return true;
    };

    /**
     * Provides a way to filter {@link Enumerable} items, and get the first item, which satisfies given filter (if filter defined),
     * or simply the first item in used {@link Enumerable} (if filter is undefined).
     * @public
     * @function
     * @memberof Enumerable
     * @param {function} [clauseMethod] Method which applies item of used {@link Enumerable}, optionally applies its index,
     * and returns true if some given condition is satisfied, otherwise returns false.
     * Something like: function(item, itemIndex) { return isSomeConditionSatisfied(item, itemIndex); }.
     * @returns {*} Returns first item, which satisfies given condition.
     *
     * @example
     * var items = [
     *      {id: 1, name: 'Bill', age: 20},
     *      {id: 2, name: 'John', age: 13},
     *      {id: 3, name: 'Jack', age: 17},
     *      {id: 3, name: 'Susan', age: 7}
     * ];
     *
     * // It will return {id: 1, name: 'Bill', age: 20}.
     * var first = SDV.Enumerable.create(items)
     *      .first();
     *
     * // It will return {id: 2, name: 'John', age: 13}.
     * var firstYoungerThenFifteen = SDV.Enumerable.create(items)
     *      .first(function(x) { return x.age < 15; });
     *
     * // It will return undefined.
     * var firstYoungerThenFive = SDV.Enumerable.create(items)
     *      .first(function(x) { return x.age < 5; });
     */
    enumerable.first = function(clauseMethod) {
        var currentItem;

        if (SDV.Util.Function.isFunction(clauseMethod)) {
            for (var i = 0, len = this._items.length; i < this._items.length; i++) {
                currentItem = this._items[i];

                // Given clauseMethod must return boolean value.
                if (clauseMethod(currentItem, i)) {
                    return currentItem;
                }
            }
        } else {
            // Method 'first' called without parameter, or parameter is not a function.

            if (this._items.length > 0)
                return this._items[0];
            else
                return null;
        }
    };

    /**
     * Provides a way to filter {@link Enumerable} items, and get the first item, which satisfies given filter (if filter defined),
     * or simply the first item in used {@link Enumerable} (if filter is undefined),
     * or default value if none of the items do not satisfy the given filter.
     * @public
     * @function
     * @memberof Enumerable
     * @param {function} [clauseMethod] Method which applies item of used {@link Enumerable}, optionally applies its index,
     * and returns true if some given condition is satisfied, otherwise returns false.
     * Something like: function(item, itemIndex) { return isSomeConditionSatisfied(item, itemIndex); }.
     *
     * @param {*} [defaultValue] The value to be returned if none of the items do not satisfy the given filter.
     * @returns {*} Returns first item, which satisfies given condition or given default value.
     *
     * @example
     * var items = [
     *      {id: 1, name: 'Bill', age: 20},
     *      {id: 2, name: 'John', age: 13},
     *      {id: 3, name: 'Jack', age: 17},
     *      {id: 3, name: 'Susan', age: 7}
     * ];
     *
     * // It will return {id: 1, name: 'Bill', age: 20}.
     * var first = SDV.Enumerable.create(items)
     *      .firstOrDefault();
     *
     * // It will return {id: 2, name: 'John', age: 13}.
     * var firstYoungerThenFifteen = SDV.Enumerable.create(items)
     *      .firstOrDefault(function(x) { return x.age < 15; });
     *
     * // It will return default value {id: 0, name: '', age: 0}.
     * var firstYoungerThenFive = SDV.Enumerable.create(items)
     *      .firstOrDefault(function(x) { return x.age < 5; }, {id: 0, name: '', age: 0});
     */
    enumerable.firstOrDefault = function(clauseMethod, defaultValue) {
        return this.first(clauseMethod) || defaultValue;
    };

    /**
     * Provides a way to filter {@link Enumerable} items, and get the last item, which satisfies given filter (if filter defined),
     * or simply the last item in used {@link Enumerable} (if filter is undefined).
     * @public
     * @function
     * @memberof Enumerable
     * @param {function} [clauseMethod] Method which applies item of used {@link Enumerable}, optionally applies its index,
     * and returns true if some given condition is satisfied, otherwise returns false.
     * Something like: function(item, itemIndex) { return isSomeConditionSatisfied(item, itemIndex); }.
     * @returns {*} Returns last item, which satisfies given condition.
     *
     * @example
     * var items = [
     *      {id: 1, name: 'Bill', age: 20},
     *      {id: 2, name: 'John', age: 13},
     *      {id: 3, name: 'Jack', age: 17},
     *      {id: 3, name: 'Susan', age: 7}
     * ];
     *
     * // It will return {id: 3, name: 'Susan', age: 7}.
     * var last = SDV.Enumerable.create(items)
     *      .last();
     *
     * // It will return {id: 3, name: 'Jack', age: 17}.
     * var lastOlderThenTen = SDV.Enumerable.create(items)
     *      .first(function(x) { return x.age > 10; });
     *
     * // It will return undefined.
     * var lastYoungerThenFive = SDV.Enumerable.create(items)
     *      .first(function(x) { return x.age < 5; });
     */
    enumerable.last = function(clauseMethod) {
        var currentItem;

        if (SDV.Util.Function.isFunction(clauseMethod)) {
            for (var i = this._items.length - 1; i >= 0; i--) {
                currentItem = this._items[i];

                // Given clauseMethod must return boolean value.
                if (clauseMethod(currentItem, i)) {
                    return currentItem;
                }
            }
        } else {
            // Method 'last' called without parameter, or parameter is not a function.

            if (this._items.length > 0)
                return this._items[this._items.length - 1];
            else
                return null;
        }
    };

    /**
     * Provides a way to filter {@link Enumerable} items, and get the last item, which satisfies given filter (if filter defined),
     * or simply the last item in used {@link Enumerable} (if filter is undefined),
     * or default value if none of the items do not satisfy the given filter.
     * @public
     * @function
     * @memberof Enumerable
     * @param {function} [clauseMethod] Method which applies item of used {@link Enumerable}, optionally applies its index,
     * and returns true if some given condition is satisfied, otherwise returns false.
     * Something like: function(item, itemIndex) { return isSomeConditionSatisfied(item, itemIndex); }.
     *
     * @param {*} [defaultValue] The value to be returned if none of the items do not satisfy the given filter.
     * @returns {*} Returns last item, which satisfies given condition or given default value.
     *
     * @example
     * var items = [
     *      {id: 1, name: 'Bill', age: 20},
     *      {id: 2, name: 'John', age: 13},
     *      {id: 3, name: 'Jack', age: 17},
     *      {id: 3, name: 'Susan', age: 7}
     * ];
     *
     * // It will return {id: 3, name: 'Susan', age: 7}.
     * var last = SDV.Enumerable.create(items)
     *      .lastOrDefault();
     *
     * // It will return {id: 3, name: 'Jack', age: 17}.
     * var lastOlderThenTen = SDV.Enumerable.create(items)
     *      .lastOrDefault(function(x) { return x.age > 10; });
     *
     * // It will return default value {id: 0, name: '', age: 0}.
     * var lastYoungerThenFive = SDV.Enumerable.create(items)
     *      .lastOrDefault(function(x) { return x.age < 5; }, {id: 0, name: '', age: 0});
     */
    enumerable.lastOrDefault = function(clauseMethod, defaultValue) {
        return this.last(clauseMethod) || defaultValue;
    };

    /**
     * Provides a way to get one of  the {@link Enumerable} items, by its index.
     * @public
     * @function
     * @memberof Enumerable
     * @param {number} index Index of desirable item.
     * @returns {*} Returns desirable item or undefined (if there is no item with index as given).
     *
     * @example
     * var items = [
     *      {id: 1, name: 'Bill', age: 20},
     *      {id: 2, name: 'John', age: 13},
     *      {id: 3, name: 'Jack', age: 17},
     *      {id: 3, name: 'Susan', age: 7}
     * ];
     *
     * // It will return {id: 2, name: 'John', age: 13}.
     * var item1 = SDV.Enumerable.create(items)
     *      .elementAt(1);
     *
     * // It will return undefined.
     * var item5 = SDV.Enumerable.create(items)
     *      .elementAt(5);
     */
    enumerable.elementAt = function(index) {
        return this._items[index];
    };

    /**
     * Provides a way to get one of  the {@link Enumerable} items, by its index.
     * @public
     * @function
     * @memberof Enumerable
     * @param {number} index Index of desirable item.
     * @param {*} [defaultValue] The value to be returned if there is no item with index as given.
     * @returns {*} Returns desirable item or given default value (if there is no item with index as given).
     *
     * @example
     * var items = [
     *      {id: 1, name: 'Bill', age: 20},
     *      {id: 2, name: 'John', age: 13},
     *      {id: 3, name: 'Jack', age: 17},
     *      {id: 3, name: 'Susan', age: 7}
     * ];
     *
     * // It will return {id: 2, name: 'John', age: 13}.
     * var item1 = SDV.Enumerable.create(items)
     *      .elementAtOrDefault(1);
     *
     * // It will return default value {id: 0, name: '', age: 0}.
     * var item5 = SDV.Enumerable.create(items)
     *      .elementAtOrDefault(5, {id: 0, name: '', age: 0});
     */
    enumerable.elementAtOrDefault = function(index, defaultValue) {
        return this.elementAt(index) || defaultValue;
    };

    /**
     * Gets count of {@link Enumerable} items, satisfies some given condition (if condition is defined),
     * or count of all wrapped items (if condition is undefined).
     * @public
     * @function
     * @memberof Enumerable
     * @param {function} clauseMethod Method which applies item of used {@link Enumerable}, optionally applies its index,
     * and returns true if some given condition is satisfied, otherwise returns false.
     * Something like: function(item, itemIndex) { return isSomeConditionSatisfied(item, itemIndex); }.
     * @returns {number} Returns count of {@link Enumerable} items, satisfies some given condition.
     *
     * @example
     * var items = [
     *      {id: 1, name: 'Bill', age: 20},
     *      {id: 2, name: 'John', age: 13},
     *      {id: 3, name: 'Jack', age: 17},
     *      {id: 3, name: 'Susan', age: 7}
     * ];
     *
     * // It will return 4.
     * var allItemsCount = SDV.Enumerable.create(items)
     *      .count();
     *
     * // It will return 3.
     * var olderThenTenCount = SDV.Enumerable.create(items)
     *      .count(function(x) { return x.age > 10; });
     *
     * // It will return 0.
     * var youngerThenFiveCount = SDV.Enumerable.create(items)
     *      .count(function(x) { return x.age < 5; });
     */
    enumerable.count = function(clauseMethod) {
        if (SDV.Util.Function.isFunction(clauseMethod)) {
            // Given clauseMethod must return boolean value.
            return this.where(clauseMethod).items.length;
        } else {
            // Method 'count' called without parameter, or parameter is not a function.
            return this._items.length;
        }
    };

    /**
     * Creates new {@link Enumerable} instance, contains concatenated set of items
     * (items of current {@link Enumerable} and items of array or {@link Enumerable} given as method parameter).
     * @param {Array|Enumerable} enumerableObject Array or {@link Enumerable} instance
     * to be concatenated with current {@link Enumerable}.
     * @returns {Enumerable} Returns new {@link Enumerable} instance, contains concatenated set of items.
     *
     * @example
     * var items = [
     *      {id: 1, name: 'Bill', age: 20},
     *      {id: 2, name: 'John', age: 13}
     * ];
     *
     * var items2 = [
     *      {id: 3, name: 'Jack', age: 17},
     *      {id: 3, name: 'Susan', age: 7}
     * ];
     *
     * // It will return [{id: 2, name: 'John', age: 13},  {id: 3, name: 'Susan', age: 7}].
     * var youngerThenFifteen = SDV.Enumerable.create(items)
     *      .concat(items2)
     *      .where(function(x) { return x.age < 15; })
     *      .toArray();
     *
     * // It will return same result [{id: 2, name: 'John', age: 13},  {id: 3, name: 'Susan', age: 7}].
     * var youngerThenFifteen2 =
     *      SDV.Enumerable.create(items).where(function(x) { return x.age < 15; })
     *      .concat(SDV.Enumerable.create(items2).where(function(x) { return x.age < 15; }))
     *      .toArray();
     */
    enumerable.concat = function(enumerableObject) {
        var givenItems = [];
        if (enumerableObject instanceof Enumerable) {
            givenItems = enumerableObject.items;
        } else if (SDV.Util.Array.isArray(enumerableObject)) {
            givenItems = enumerableObject;
        }

        return new Enumerable(this._items.concat(givenItems));
    };

    /**
     * Provides a way to order {@link Enumerable} items in ascending order by some selected property.
     * @public
     * @function
     * @memberof Enumerable
     * @param {function} selectionMethod Method which applies item of current {@link Enumerable}, and returns item of new selection.
     * Something like: function(item) { return someValue(item); }.
     * @returns {Enumerable} Returns new {@link Enumerable} instance, contains original items, but ordered in ascending order
     * by result values of given selectionMethod.
     *
     * @example
     * var items = [
     *      {id: 1, name: 'Bill', age: 20},
     *      {id: 2, name: 'John', age: 13},
     *      {id: 3, name: 'Jack', age: 17},
     *      {id: 3, name: 'Susan', age: 7}
     * ];
     *
     * // It will return array ordered in ascending order by 'age': [
     * //     {id: 3, name: 'Susan', age: 7},
     * //     {id: 2, name: 'John', age: 13},
     * //     {id: 3, name: 'Jack', age: 17},
     * //     {id: 1, name: 'Bill', age: 20}
     * // ].
     * var names = SDV.Enumerable.create(items)
     *      .orderBy(function(x){ x.age; })
     *      .toArray();
     */
    enumerable.orderBy = function(selectionMethod) {
        var tmpArray = [].concat(this._items);

        return new Enumerable(
            SDV.Util.Function.isFunction(selectionMethod)
                ? tmpArray.sort(function(a, b) {
                var x = selectionMethod(a);
                var y = selectionMethod(b);
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            })
                : tmpArray
        );
    };

    /**
     * Provides a way to order {@link Enumerable} items in descending order by some selected property.
     * @public
     * @function
     * @memberof Enumerable
     * @param {function} selectionMethod Method which applies item of current {@link Enumerable}, and returns item of new selection.
     * Something like: function(item) { return someValue(item); }.
     * @returns {Enumerable} Returns new {@link Enumerable} instance, contains original items, but ordered in descending order
     * by result values of given selectionMethod.
     *
     * @example
     * var items = [
     *      {id: 1, name: 'Bill', age: 20},
     *      {id: 2, name: 'John', age: 13},
     *      {id: 3, name: 'Jack', age: 17},
     *      {id: 3, name: 'Susan', age: 7}
     * ];
     *
     * // It will return array ordered in descending order by 'age': [
     * //     {id: 1, name: 'Bill', age: 20},
     * //     {id: 3, name: 'Jack', age: 17},
     * //     {id: 2, name: 'John', age: 13},
     * //     {id: 3, name: 'Susan', age: 7}
     * // ].
     * var names = SDV.Enumerable.create(items)
     *      .orderBy(function(x){ x.age; })
     *      .toArray();
     */
    enumerable.orderByDescending = function(selectionMethod) {
        var tmpArray = [].concat(this._items);

        return new Enumerable(
            SDV.Util.Function.isFunction(selectionMethod)
                ? tmpArray.sort(function(a, b) {
                    var x = selectionMethod(b);
                    var y = selectionMethod(a);
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                })
                : tmpArray
        );
    };
})();