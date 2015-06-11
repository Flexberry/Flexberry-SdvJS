# Classes
<dl>
<dt><a href="#Enumerable">Enumerable</a></dt>
<dd></dd>
<dt><a href="#Condition">Condition</a></dt>
<dd></dd>
<dt><a href="#Color">Color</a></dt>
<dd></dd>
<dt><a href="#Rgb">Rgb</a></dt>
<dd></dd>
<dt><a href="#Hsl">Hsl</a></dt>
<dd></dd>
<dt><a href="#Hsb">Hsb</a></dt>
<dd></dd>
</dl>
# Objects
<dl>
<dt><a href="#SDV">SDV</a> : <code>object</code></dt>
<dd><p>Base namespace for SDV.js library.
All library facilities are accessible through it.</p>
</dd>
</dl>
<a name="Enumerable"></a>
# Enumerable
**Kind**: global class  
**Access:** public  

* [Enumerable](#Enumerable)
  * [new Enumerable(items)](#new_Enumerable_new)
  * [.enumerable.push()](#Enumerable.enumerable.push) ⇒ <code>Array</code>
  * [.enumerable.pop()](#Enumerable.enumerable.pop) ⇒ <code>Array</code>
  * [.enumerable.toArray()](#Enumerable.enumerable.toArray) ⇒ <code>Array</code>
  * [.enumerable.select(selectionMethod)](#Enumerable.enumerable.select) ⇒ <code>[Enumerable](#Enumerable)</code>
  * [.enumerable.where(clauseMethod)](#Enumerable.enumerable.where) ⇒ <code>[Enumerable](#Enumerable)</code>
  * [.enumerable.any(clauseMethod)](#Enumerable.enumerable.any) ⇒ <code>boolean</code>
  * [.enumerable.all(clauseMethod)](#Enumerable.enumerable.all) ⇒ <code>boolean</code>
  * [.enumerable.first([clauseMethod])](#Enumerable.enumerable.first) ⇒ <code>\*</code>
  * [.enumerable.firstOrDefault([clauseMethod], [defaultValue])](#Enumerable.enumerable.firstOrDefault) ⇒ <code>\*</code>
  * [.enumerable.last([clauseMethod])](#Enumerable.enumerable.last) ⇒ <code>\*</code>
  * [.enumerable.lastOrDefault([clauseMethod], [defaultValue])](#Enumerable.enumerable.lastOrDefault) ⇒ <code>\*</code>
  * [.enumerable.elementAt(index)](#Enumerable.enumerable.elementAt) ⇒ <code>\*</code>
  * [.enumerable.elementAtOrDefault(index, [defaultValue])](#Enumerable.enumerable.elementAtOrDefault) ⇒ <code>\*</code>
  * [.enumerable.count(clauseMethod)](#Enumerable.enumerable.count) ⇒ <code>number</code>
  * [.enumerable.orderBy(selectionMethod)](#Enumerable.enumerable.orderBy) ⇒ <code>[Enumerable](#Enumerable)</code>
  * [.enumerable.orderByDescending(selectionMethod)](#Enumerable.enumerable.orderByDescending) ⇒ <code>[Enumerable](#Enumerable)</code>

<a name="new_Enumerable_new"></a>
## new Enumerable(items)
Constructs new instance of enumerable, which wraps given items array,and provides a methods for selecting and filtering its items.Constructor is private, so use factory-method [create](#SDV.Enumerable.create) to create an instance.


| Param | Type | Description |
| --- | --- | --- |
| items | <code>Array</code> | Array, which need to be transformed into enumerable. |

<a name="Enumerable.enumerable.push"></a>
## Enumerable.enumerable.push() ⇒ <code>Array</code>
Adds given element to items array.

**Kind**: static method of <code>[Enumerable](#Enumerable)</code>  
**Returns**: <code>Array</code> - Returns new length of items array.  
**Access:** public  
**Example**  
```javascript
var items = ['Bill', 'John', 'Jack'];];var names = SDV.Enumerable.create(items);// ['Bill', 'John', 'Jack'].console.log(names);// New length is 4.var removedName = names.push('Susan');// ['Bill', 'John', 'Jack', 'Susan'].console.log(names);
```
<a name="Enumerable.enumerable.pop"></a>
## Enumerable.enumerable.pop() ⇒ <code>Array</code>
Removes the last element in items array.

**Kind**: static method of <code>[Enumerable](#Enumerable)</code>  
**Returns**: <code>Array</code> - Returns removed item.  
**Access:** public  
**Example**  
```javascript
var items = ['Bill', 'John', 'Jack', 'Susan'];];var names = SDV.Enumerable.create(items);// ['Bill', 'John', 'Jack', 'Susan'].console.log(names);// 'Susan'.var removedName = names.pop();// ['Bill', 'John', 'Jack'].console.log(names);
```
<a name="Enumerable.enumerable.toArray"></a>
## Enumerable.enumerable.toArray() ⇒ <code>Array</code>
Transforms [Enumerable](#Enumerable) to array.

**Kind**: static method of <code>[Enumerable](#Enumerable)</code>  
**Returns**: <code>Array</code> - Returns array of items wrapped in used [Enumerable](#Enumerable) instance.  
**Access:** public  
**Example**  
```javascript
var items = [     {id: 1, name: 'Bill', age: 20},     {id: 2, name: 'John', age: 13},     {id: 3, name: 'Jack', age: 17},     {id: 3, name: 'Susan', age: 7}];// It will return array equals to ['John', 'Jack'].var teenagersNames = SDV.Enumerable.create(items)     .where(function(x) { return x.age >= 13 && x.age <= 19; })     .select(function(x){ return x.name; })     .toArray();
```
<a name="Enumerable.enumerable.select"></a>
## Enumerable.enumerable.select(selectionMethod) ⇒ <code>[Enumerable](#Enumerable)</code>
Provides a way to make a new selection be each of [Enumerable](#Enumerable) items.

**Kind**: static method of <code>[Enumerable](#Enumerable)</code>  
**Returns**: <code>[Enumerable](#Enumerable)</code> - Returns new [Enumerable](#Enumerable) instance, contains selected items.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| selectionMethod | <code>function</code> | Method which applies item of used [Enumerable](#Enumerable), and returns item of new selection. Something like: function(item) { return someValue(item); }. |

**Example**  
```javascript
var items = [     {id: 1, name: 'Bill', age: 20},     {id: 2, name: 'John', age: 13},     {id: 3, name: 'Jack', age: 17},     {id: 3, name: 'Susan', age: 7}];// It will return array equals to ['1) Bill', '2) John', '3) Jack', '4) Susan'].var names = SDV.Enumerable.create(items)     .select(function(x){ return x.id + ') ' + x.name; })     .toArray();
```
<a name="Enumerable.enumerable.where"></a>
## Enumerable.enumerable.where(clauseMethod) ⇒ <code>[Enumerable](#Enumerable)</code>
Provides a way to filter [Enumerable](#Enumerable) items, and get new filtered selection.

**Kind**: static method of <code>[Enumerable](#Enumerable)</code>  
**Returns**: <code>[Enumerable](#Enumerable)</code> - Returns new [Enumerable](#Enumerable) instance, contains filtered items, which satisfies given condition.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| clauseMethod | <code>function</code> | Method which applies item of used [Enumerable](#Enumerable), optionally applies its index, and returns true if some given condition is satisfied, otherwise returns false. Something like: function(item, itemIndex) { return isSomeConditionSatisfied(item, itemIndex); }. |

**Example**  
```javascript
var items = [     {id: 1, name: 'Bill', age: 20},     {id: 2, name: 'John', age: 13},     {id: 3, name: 'Jack', age: 17},     {id: 3, name: 'Susan', age: 7}];// It will return array equals to [{id: 2, name: 'John', age: 13},{id: 3, name: 'Jack', age: 17}].var teenagers = SDV.Enumerable.create(items)     .where(function(x) { return x.age >= 13 && x.age <= 19; })     .toArray();
```
<a name="Enumerable.enumerable.any"></a>
## Enumerable.enumerable.any(clauseMethod) ⇒ <code>boolean</code>
Checks if any of [Enumerable](#Enumerable) items, satisfies some given condition.

**Kind**: static method of <code>[Enumerable](#Enumerable)</code>  
**Returns**: <code>boolean</code> - Returns true if at least one item satisfies given condition, otherwise returns false.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| clauseMethod | <code>function</code> | Method which applies item of used [Enumerable](#Enumerable), optionally applies its index, and returns true if some given condition is satisfied, otherwise returns false. Something like: function(item, itemIndex) { return isSomeConditionSatisfied(item, itemIndex); }. |

**Example**  
```javascript
var items = [     {id: 1, name: 'Bill', age: 20},     {id: 2, name: 'John', age: 13},     {id: 3, name: 'Jack', age: 17},     {id: 3, name: 'Susan', age: 7}];// It will return true.var olderThenTenExists = SDV.Enumerable.create(items)     .any(function(x) { return x.age > 10; });// It will return false.var youngerThenFiveExists = SDV.Enumerable.create(items)     .any(function(x) { return x.age < 5; });
```
<a name="Enumerable.enumerable.all"></a>
## Enumerable.enumerable.all(clauseMethod) ⇒ <code>boolean</code>
Checks if all items in [Enumerable](#Enumerable), satisfies some given condition.

**Kind**: static method of <code>[Enumerable](#Enumerable)</code>  
**Returns**: <code>boolean</code> - Returns true if all items satisfies given condition, otherwise returns false.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| clauseMethod | <code>function</code> | Method which applies item of used [Enumerable](#Enumerable), optionally applies its index, and returns true if some given condition is satisfied, otherwise returns false. Something like: function(item, itemIndex) { return isSomeConditionSatisfied(item, itemIndex); }. |

**Example**  
```javascript
var items = [     {id: 1, name: 'Bill', age: 20},     {id: 2, name: 'John', age: 13},     {id: 3, name: 'Jack', age: 17},     {id: 3, name: 'Susan', age: 7}];// It will return true.var allAreOlderThenFive = SDV.Enumerable.create(items)     .all(function(x) { return x.age > 5; });// It will return false.var allAreYoungerThenEighteen = SDV.Enumerable.create(items)     .all(function(x) { return x.age < 18; });
```
<a name="Enumerable.enumerable.first"></a>
## Enumerable.enumerable.first([clauseMethod]) ⇒ <code>\*</code>
Provides a way to filter [Enumerable](#Enumerable) items, and get the first item, which satisfies given filter (if filter defined),or simply the first item in used [Enumerable](#Enumerable) (if filter is undefined).

**Kind**: static method of <code>[Enumerable](#Enumerable)</code>  
**Returns**: <code>\*</code> - Returns first item, which satisfies given condition.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| [clauseMethod] | <code>function</code> | Method which applies item of used [Enumerable](#Enumerable), optionally applies its index, and returns true if some given condition is satisfied, otherwise returns false. Something like: function(item, itemIndex) { return isSomeConditionSatisfied(item, itemIndex); }. |

**Example**  
```javascript
var items = [     {id: 1, name: 'Bill', age: 20},     {id: 2, name: 'John', age: 13},     {id: 3, name: 'Jack', age: 17},     {id: 3, name: 'Susan', age: 7}];// It will return {id: 1, name: 'Bill', age: 20}.var first = SDV.Enumerable.create(items)     .first();// It will return {id: 2, name: 'John', age: 13}.var firstYoungerThenFifteen = SDV.Enumerable.create(items)     .first(function(x) { return x.age < 15; });// It will return undefined.var firstYoungerThenFive = SDV.Enumerable.create(items)     .first(function(x) { return x.age < 5; });
```
<a name="Enumerable.enumerable.firstOrDefault"></a>
## Enumerable.enumerable.firstOrDefault([clauseMethod], [defaultValue]) ⇒ <code>\*</code>
Provides a way to filter [Enumerable](#Enumerable) items, and get the first item, which satisfies given filter (if filter defined),or simply the first item in used [Enumerable](#Enumerable) (if filter is undefined),or default value if none of the items do not satisfy the given filter.

**Kind**: static method of <code>[Enumerable](#Enumerable)</code>  
**Returns**: <code>\*</code> - Returns first item, which satisfies given condition or given default value.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| [clauseMethod] | <code>function</code> | Method which applies item of used [Enumerable](#Enumerable), optionally applies its index, and returns true if some given condition is satisfied, otherwise returns false. Something like: function(item, itemIndex) { return isSomeConditionSatisfied(item, itemIndex); }. |
| [defaultValue] | <code>\*</code> | The value to be returned if none of the items do not satisfy the given filter. |

**Example**  
```javascript
var items = [     {id: 1, name: 'Bill', age: 20},     {id: 2, name: 'John', age: 13},     {id: 3, name: 'Jack', age: 17},     {id: 3, name: 'Susan', age: 7}];// It will return {id: 1, name: 'Bill', age: 20}.var first = SDV.Enumerable.create(items)     .firstOrDefault();// It will return {id: 2, name: 'John', age: 13}.var firstYoungerThenFifteen = SDV.Enumerable.create(items)     .firstOrDefault(function(x) { return x.age < 15; });// It will return default value {id: 0, name: '', age: 0}.var firstYoungerThenFive = SDV.Enumerable.create(items)     .firstOrDefault(function(x) { return x.age < 5; }, {id: 0, name: '', age: 0});
```
<a name="Enumerable.enumerable.last"></a>
## Enumerable.enumerable.last([clauseMethod]) ⇒ <code>\*</code>
Provides a way to filter [Enumerable](#Enumerable) items, and get the last item, which satisfies given filter (if filter defined),or simply the last item in used [Enumerable](#Enumerable) (if filter is undefined).

**Kind**: static method of <code>[Enumerable](#Enumerable)</code>  
**Returns**: <code>\*</code> - Returns last item, which satisfies given condition.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| [clauseMethod] | <code>function</code> | Method which applies item of used [Enumerable](#Enumerable), optionally applies its index, and returns true if some given condition is satisfied, otherwise returns false. Something like: function(item, itemIndex) { return isSomeConditionSatisfied(item, itemIndex); }. |

**Example**  
```javascript
var items = [     {id: 1, name: 'Bill', age: 20},     {id: 2, name: 'John', age: 13},     {id: 3, name: 'Jack', age: 17},     {id: 3, name: 'Susan', age: 7}];// It will return {id: 3, name: 'Susan', age: 7}.var last = SDV.Enumerable.create(items)     .last();// It will return {id: 3, name: 'Jack', age: 17}.var lastOlderThenTen = SDV.Enumerable.create(items)     .first(function(x) { return x.age > 10; });// It will return undefined.var lastYoungerThenFive = SDV.Enumerable.create(items)     .first(function(x) { return x.age < 5; });
```
<a name="Enumerable.enumerable.lastOrDefault"></a>
## Enumerable.enumerable.lastOrDefault([clauseMethod], [defaultValue]) ⇒ <code>\*</code>
Provides a way to filter [Enumerable](#Enumerable) items, and get the last item, which satisfies given filter (if filter defined),or simply the last item in used [Enumerable](#Enumerable) (if filter is undefined),or default value if none of the items do not satisfy the given filter.

**Kind**: static method of <code>[Enumerable](#Enumerable)</code>  
**Returns**: <code>\*</code> - Returns last item, which satisfies given condition or given default value.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| [clauseMethod] | <code>function</code> | Method which applies item of used [Enumerable](#Enumerable), optionally applies its index, and returns true if some given condition is satisfied, otherwise returns false. Something like: function(item, itemIndex) { return isSomeConditionSatisfied(item, itemIndex); }. |
| [defaultValue] | <code>\*</code> | The value to be returned if none of the items do not satisfy the given filter. |

**Example**  
```javascript
var items = [     {id: 1, name: 'Bill', age: 20},     {id: 2, name: 'John', age: 13},     {id: 3, name: 'Jack', age: 17},     {id: 3, name: 'Susan', age: 7}];// It will return {id: 3, name: 'Susan', age: 7}.var last = SDV.Enumerable.create(items)     .lastOrDefault();// It will return {id: 3, name: 'Jack', age: 17}.var lastOlderThenTen = SDV.Enumerable.create(items)     .lastOrDefault(function(x) { return x.age > 10; });// It will return default value {id: 0, name: '', age: 0}.var lastYoungerThenFive = SDV.Enumerable.create(items)     .lastOrDefault(function(x) { return x.age < 5; }, {id: 0, name: '', age: 0});
```
<a name="Enumerable.enumerable.elementAt"></a>
## Enumerable.enumerable.elementAt(index) ⇒ <code>\*</code>
Provides a way to get one of  the [Enumerable](#Enumerable) items, by its index.

**Kind**: static method of <code>[Enumerable](#Enumerable)</code>  
**Returns**: <code>\*</code> - Returns desirable item or undefined (if there is no item with index as given).  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Index of desirable item. |

**Example**  
```javascript
var items = [     {id: 1, name: 'Bill', age: 20},     {id: 2, name: 'John', age: 13},     {id: 3, name: 'Jack', age: 17},     {id: 3, name: 'Susan', age: 7}];// It will return {id: 2, name: 'John', age: 13}.var item1 = SDV.Enumerable.create(items)     .elementAt(1);// It will return undefined.var item5 = SDV.Enumerable.create(items)     .elementAt(5);
```
<a name="Enumerable.enumerable.elementAtOrDefault"></a>
## Enumerable.enumerable.elementAtOrDefault(index, [defaultValue]) ⇒ <code>\*</code>
Provides a way to get one of  the [Enumerable](#Enumerable) items, by its index.

**Kind**: static method of <code>[Enumerable](#Enumerable)</code>  
**Returns**: <code>\*</code> - Returns desirable item or given default value (if there is no item with index as given).  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Index of desirable item. |
| [defaultValue] | <code>\*</code> | The value to be returned if there is no item with index as given. |

**Example**  
```javascript
var items = [     {id: 1, name: 'Bill', age: 20},     {id: 2, name: 'John', age: 13},     {id: 3, name: 'Jack', age: 17},     {id: 3, name: 'Susan', age: 7}];// It will return {id: 2, name: 'John', age: 13}.var item1 = SDV.Enumerable.create(items)     .elementAtOrDefault(1);// It will return default value {id: 0, name: '', age: 0}.var item5 = SDV.Enumerable.create(items)     .elementAtOrDefault(5, {id: 0, name: '', age: 0});
```
<a name="Enumerable.enumerable.count"></a>
## Enumerable.enumerable.count(clauseMethod) ⇒ <code>number</code>
Gets count of [Enumerable](#Enumerable) items, satisfies some given condition (if condition is defined),or count of all wrapped items (if condition is undefined).

**Kind**: static method of <code>[Enumerable](#Enumerable)</code>  
**Returns**: <code>number</code> - Returns count of [Enumerable](#Enumerable) items, satisfies some given condition.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| clauseMethod | <code>function</code> | Method which applies item of used [Enumerable](#Enumerable), optionally applies its index, and returns true if some given condition is satisfied, otherwise returns false. Something like: function(item, itemIndex) { return isSomeConditionSatisfied(item, itemIndex); }. |

**Example**  
```javascript
var items = [     {id: 1, name: 'Bill', age: 20},     {id: 2, name: 'John', age: 13},     {id: 3, name: 'Jack', age: 17},     {id: 3, name: 'Susan', age: 7}];// It will return 4.var allItemsCount = SDV.Enumerable.create(items)     .count();// It will return 3.var olderThenTenCount = SDV.Enumerable.create(items)     .count(function(x) { return x.age > 10; });// It will return 0.var youngerThenFiveCount = SDV.Enumerable.create(items)     .count(function(x) { return x.age < 5; });
```
<a name="Enumerable.enumerable.orderBy"></a>
## Enumerable.enumerable.orderBy(selectionMethod) ⇒ <code>[Enumerable](#Enumerable)</code>
Provides a way to order [Enumerable](#Enumerable) items in ascending order by some selected property.

**Kind**: static method of <code>[Enumerable](#Enumerable)</code>  
**Returns**: <code>[Enumerable](#Enumerable)</code> - Returns new [Enumerable](#Enumerable) instance, contains original items, but ordered in ascending orderby result values of given selectionMethod.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| selectionMethod | <code>function</code> | Method which applies item of current [Enumerable](#Enumerable), and returns item of new selection. Something like: function(item) { return someValue(item); }. |

**Example**  
```javascript
var items = [     {id: 1, name: 'Bill', age: 20},     {id: 2, name: 'John', age: 13},     {id: 3, name: 'Jack', age: 17},     {id: 3, name: 'Susan', age: 7}];// It will return array ordered in ascending order by 'age': [//     {id: 3, name: 'Susan', age: 7},//     {id: 2, name: 'John', age: 13},//     {id: 3, name: 'Jack', age: 17},//     {id: 1, name: 'Bill', age: 20}// ].var names = SDV.Enumerable.create(items)     .orderBy(function(x){ x.age; })     .toArray();
```
<a name="Enumerable.enumerable.orderByDescending"></a>
## Enumerable.enumerable.orderByDescending(selectionMethod) ⇒ <code>[Enumerable](#Enumerable)</code>
Provides a way to order [Enumerable](#Enumerable) items in descending order by some selected property.

**Kind**: static method of <code>[Enumerable](#Enumerable)</code>  
**Returns**: <code>[Enumerable](#Enumerable)</code> - Returns new [Enumerable](#Enumerable) instance, contains original items, but ordered in descending orderby result values of given selectionMethod.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| selectionMethod | <code>function</code> | Method which applies item of current [Enumerable](#Enumerable), and returns item of new selection. Something like: function(item) { return someValue(item); }. |

**Example**  
```javascript
var items = [     {id: 1, name: 'Bill', age: 20},     {id: 2, name: 'John', age: 13},     {id: 3, name: 'Jack', age: 17},     {id: 3, name: 'Susan', age: 7}];// It will return array ordered in descending order by 'age': [//     {id: 1, name: 'Bill', age: 20},//     {id: 3, name: 'Jack', age: 17},//     {id: 2, name: 'John', age: 13},//     {id: 3, name: 'Susan', age: 7}// ].var names = SDV.Enumerable.create(items)     .orderBy(function(x){ x.age; })     .toArray();
```
<a name="Condition"></a>
# Condition
**Kind**: global class  
**Access:** public  

* [Condition](#Condition)
  * [new Condition(condition, conditionTemplates)](#new_Condition_new)
  * [.condition.getSatisfyingData(data, tillFirstSatisfaction)](#Condition.condition.getSatisfyingData) ⇒ <code>Array.&lt;object&gt;</code>
  * [.condition.isSatisfiedBy(data)](#Condition.condition.isSatisfiedBy) ⇒ <code>boolean</code>

<a name="new_Condition_new"></a>
## new Condition(condition, conditionTemplates)
Constructs new instance of templated condition.Constructor is private, so use factory-method [create](#SDV.Condition.create) to create an instance.


| Param | Type | Description |
| --- | --- | --- |
| condition | <code>string</code> | Templated condition. |
| conditionTemplates | <code>Array.&lt;parsedTemplate&gt;</code> | Array of parsed templates contained inside condition. |

<a name="Condition.condition.getSatisfyingData"></a>
## Condition.condition.getSatisfyingData(data, tillFirstSatisfaction) ⇒ <code>Array.&lt;object&gt;</code>
Gets an array of data objects satisfying to a given templated condition.

**Kind**: static method of <code>[Condition](#Condition)</code>  
**Returns**: <code>Array.&lt;object&gt;</code> - Returns array of those data objects which satisfies condition.  
**Throws**:

- <code>Error</code> Will throw an error if given data is not an object or objects array.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> &#124; <code>Array.&lt;object&gt;</code> | Single data object or array of data objects, which needed to be checked for condition satisfaction. |
| tillFirstSatisfaction | <code>boolean</code> | Flag: indicates whether to stop checking, if some of data objects already satisfies given condition. |

**Example**  
```javascript
var absolutelyTrueCondition = SDV.Condition.create('2 > 1');// It will return [{name: 'first'}, {name: 'second'}, {name: 'third'}],// because '2 > 1' is absolutely true regardless of data objects properties values.absolutelyTrueCondition.getSatisfyingData([{name: 'first'}, {name: 'second'}, {name: 'third'}]);var stStringsCondition = SDV.Condition.create('{{name}}.charAt(0) === \'f\' || {{name}}.charAt(0) === \'t\'');// It will return [{name: 'second'}, {name: 'third'}],stStringsCondition.getSatisfyingData([{name: 'first'}, {name: 'second'}, {name: 'third'}]);var absolutelyFalseCondition = SDV.Condition.create('2 < 1');// It will return [],absolutelyFalseCondition.getSatisfyingData([{name: 'first'}, {name: 'second'}, {name: 'third'}]);
```
<a name="Condition.condition.isSatisfiedBy"></a>
## Condition.condition.isSatisfiedBy(data) ⇒ <code>boolean</code>
Checks if given data satisfies condition.

**Kind**: static method of <code>[Condition](#Condition)</code>  
**Returns**: <code>boolean</code> - Returns true if some (even one) of given data objects satisfies given condition, otherwise returns false.  
**Throws**:

- <code>Error</code> Will throw an error if given data is not an object or objects array.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> &#124; <code>Array.&lt;object&gt;</code> | Single data object or array of data objects, which needed to be checked for condition satisfaction. |

**Example**  
```javascript
// It will return true,// because '2 > 1' is absolutely true regardless of data objects properties values.SDV.Condition.create('2 > 1').isSatisfiedBy([{name: 'first'}, {name: 'second'}, {name: 'third'}]);// It will return true, because second object satisfies given condition,SDV.Condition.create('{{name}}.charAt(0) === \'f\' || {{name}}.charAt(0) === \'t\'')             .isSatisfiedBy([{name: 'first'}, {name: 'second'}, {name: 'third'}]);// It will return false, because names lengths of all given objects are greater or equals to 5, but not less then 5.SDV.Condition.create('{{name}}.length < 5').isSatisfiedBy([{name: 'first'}, {name: 'second'}, {name: 'third'}]);
```
<a name="Color"></a>
# Color
**Kind**: global class  
**Access:** public  

* [Color](#Color)
  * [new Color(colorDefinition)](#new_Color_new)
  * [.color.red([channelValue])](#Color.color.red) ⇒ <code>number</code> &#124; <code>[Color](#Color)</code>
  * [.color.green([channelValue])](#Color.color.green) ⇒ <code>number</code> &#124; <code>[Color](#Color)</code>
  * [.color.blue([channelValue])](#Color.color.blue) ⇒ <code>number</code> &#124; <code>[Color](#Color)</code>
  * [.color.hue([componentValue])](#Color.color.hue) ⇒ <code>number</code> &#124; <code>[Color](#Color)</code>
  * [.color.saturation([componentValue])](#Color.color.saturation) ⇒ <code>number</code> &#124; <code>[Color](#Color)</code>
  * [.color.brightness([componentValue])](#Color.color.brightness) ⇒ <code>number</code> &#124; <code>[Color](#Color)</code>
  * [.color.lightness([componentValue])](#Color.color.lightness) ⇒ <code>number</code> &#124; <code>[Color](#Color)</code>
  * [.color.allComponents()](#Color.color.allComponents) ⇒ <code>object</code>
  * [.color.distanceTo(anotherColor)](#Color.color.distanceTo) ⇒ <code>number</code> &#124; <code>null</code>
  * [.color.toHex()](#Color.color.toHex) ⇒ <code>string</code>
  * [.color.toRgb()](#Color.color.toRgb) ⇒ <code>[Rgb](#Rgb)</code>
  * [.color.toHsl()](#Color.color.toHsl) ⇒ <code>[Hsl](#Hsl)</code>
  * [.color.toHsb()](#Color.color.toHsb) ⇒ <code>[Hsb](#Hsb)</code>
  * [.color.clone()](#Color.color.clone) ⇒ <code>[Color](#Color)</code>
  * [.color.equals(obj, eps)](#Color.color.equals) ⇒ <code>boolean</code>

<a name="new_Color_new"></a>
## new Color(colorDefinition)
Constructs new color instance.Constructor is private, so use factory-method [create](#SDV.Color.create) to create an instance.


| Param | Type | Description |
| --- | --- | --- |
| colorDefinition | <code>string</code> | Color represented as string (3/6-character hex code or color-name). |

<a name="Color.color.red"></a>
## Color.color.red([channelValue]) ⇒ <code>number</code> &#124; <code>[Color](#Color)</code>
Gets or sets red channel value for color [Rgb](#Rgb) representation.

**Kind**: static method of <code>[Color](#Color)</code>  
**Returns**: <code>number</code> &#124; <code>[Color](#Color)</code> - Returns value of red channel (if method works as getter),or returns current [Color](#Color) instance (if method works as setter).  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| [channelValue] | <code>number</code> | Desirable integer ([0..255]) value for red channel of color [Rgb](#Rgb) representation. If channelValue isn't defined then method works as getter, otherwise it works as setter. |

**Example**  
```javascript
var softBlueColor = SDV.Color.create('#204080');// It will return 32.softBlueColor.red();// It will set red channel to 36.softBlueColor.red(36);// Now it will return 36.softBlueColor.red();
```
<a name="Color.color.green"></a>
## Color.color.green([channelValue]) ⇒ <code>number</code> &#124; <code>[Color](#Color)</code>
Gets or sets green channel value for color [Rgb](#Rgb) representation.

**Kind**: static method of <code>[Color](#Color)</code>  
**Returns**: <code>number</code> &#124; <code>[Color](#Color)</code> - Returns value of green channel (if method works as getter),or returns current [Color](#Color) instance (if method works as setter).  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| [channelValue] | <code>number</code> | Desirable integer ([0..255]) value for green channel of color [Rgb](#Rgb) representation. If channelValue isn't defined then method works as getter, otherwise it works as setter. |

**Example**  
```javascript
var softBlueColor = SDV.Color.create('#204080');// It will return 64.softBlueColor.green();// It will set green channel to 66.softBlueColor.green(66);// Now it will return 66.softBlueColor.green();
```
<a name="Color.color.blue"></a>
## Color.color.blue([channelValue]) ⇒ <code>number</code> &#124; <code>[Color](#Color)</code>
Gets or sets blue channel value for color [Rgb](#Rgb) representation.

**Kind**: static method of <code>[Color](#Color)</code>  
**Returns**: <code>number</code> &#124; <code>[Color](#Color)</code> - Returns value of blue channel (if method works as getter),or returns current [Color](#Color) instance (if method works as setter).  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| [channelValue] | <code>number</code> | Desirable integer ([0..255]) value for blue channel of color [Rgb](#Rgb) representation. If channelValue isn't defined then method works as getter, otherwise it works as setter. |

**Example**  
```javascript
var softBlueColor = SDV.Color.create('#204080');// It will return 128.softBlueColor.blue();// It will set blue channel to 126.softBlueColor.blue(126);// Now it will return 126.softBlueColor.blue();
```
<a name="Color.color.hue"></a>
## Color.color.hue([componentValue]) ⇒ <code>number</code> &#124; <code>[Color](#Color)</code>
Gets or sets value for hue component of [Hsb](#Hsb) color representation.

**Kind**: static method of <code>[Color](#Color)</code>  
**Returns**: <code>number</code> &#124; <code>[Color](#Color)</code> - Returns value of hue component (if method works as getter),or returns current [Color](#Color) instance (if method works as setter).  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| [componentValue] | <code>number</code> | Desirable ([0..1]) value for hue component of [Hsb](#Hsb) color representation. If componentValue isn't defined then method works as getter, otherwise it works as setter. |

**Example**  
```javascript
var softBlueColor = SDV.Color.create('#204080');// It will return nearly 0.61.softBlueColor.hue();// It will set hue component to 0.59.softBlueColor.hue(0.59);// Now it will return 0.59.softBlueColor.hue();
```
<a name="Color.color.saturation"></a>
## Color.color.saturation([componentValue]) ⇒ <code>number</code> &#124; <code>[Color](#Color)</code>
Gets or sets value for saturation component of [Hsb](#Hsb) color representation.

**Kind**: static method of <code>[Color](#Color)</code>  
**Returns**: <code>number</code> &#124; <code>[Color](#Color)</code> - Returns value of saturation component (if method works as getter),or returns current [Color](#Color) instance (if method works as setter).  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| [componentValue] | <code>number</code> | Desirable ([0..1]) value for saturation component of [Hsb](#Hsb) color representation. If componentValue isn't defined then method works as getter, otherwise it works as setter. |

**Example**  
```javascript
var softBlueColor = SDV.Color.create('#204080');// It will return nearly 0.75.softBlueColor.saturation();// It will set saturation component to 0.76.softBlueColor.saturation(0.76);// Now it will return 0.76.softBlueColor.saturation();
```
<a name="Color.color.brightness"></a>
## Color.color.brightness([componentValue]) ⇒ <code>number</code> &#124; <code>[Color](#Color)</code>
Gets or sets value for brightness component of [Hsb](#Hsb) color representation.

**Kind**: static method of <code>[Color](#Color)</code>  
**Returns**: <code>number</code> &#124; <code>[Color](#Color)</code> - Returns value of brightness component (if method works as getter),or returns current [Color](#Color) instance (if method works as setter).  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| [componentValue] | <code>number</code> | Desirable ([0..1]) value for brightness component of [Hsb](#Hsb) color representation. If componentValue isn't defined then method works as getter, otherwise it works as setter. |

**Example**  
```javascript
var softBlueColor = SDV.Color.create('#204080');// It will return nearly 0.5.softBlueColor.brightness();// It will set brightness component to 0.56.softBlueColor.brightness(0.56);// Now it will return 0.56.softBlueColor.brightness();
```
<a name="Color.color.lightness"></a>
## Color.color.lightness([componentValue]) ⇒ <code>number</code> &#124; <code>[Color](#Color)</code>
Gets or sets value for lightness component of [Hsl](#Hsl) color representation.

**Kind**: static method of <code>[Color](#Color)</code>  
**Returns**: <code>number</code> &#124; <code>[Color](#Color)</code> - Returns value of lightness component (if method works as getter),or returns current [Color](#Color) instance (if method works as setter).  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| [componentValue] | <code>number</code> | Desirable ([0..1]) value for lightness component of [Hsl](#Hsl) color representation. If componentValue isn't defined then method works as getter, otherwise it works as setter. |

**Example**  
```javascript
var softBlueColor = SDV.Color.create('#204080');// It will return nearly 0.3.softBlueColor.lightness();// It will set lightness component to 0.36.softBlueColor.lightness(0.36);// Now it will return 0.36.softBlueColor.lightness();
```
<a name="Color.color.allComponents"></a>
## Color.color.allComponents() ⇒ <code>object</code>
Gets object contains values of all color components in different representations.

**Kind**: static method of <code>[Color](#Color)</code>  
**Returns**: <code>object</code> - Returns object contains values of all color components in different representations.  
**Access:** public  
**Example**  
```javascript
var softBlueColor = SDV.Color.create('#204080');// It will return {//    red: 32,//    green: 64,//    blue: 128,//    hue: 0.61,//    saturation: 0.75,//    brightness: 0.5,//    lightness: 0.3// }.softBlueColor.allComponents();
```
<a name="Color.color.distanceTo"></a>
## Color.color.distanceTo(anotherColor) ⇒ <code>number</code> &#124; <code>null</code>
Gets distance between color and another color.

**Kind**: static method of <code>[Color](#Color)</code>  
**Returns**: <code>number</code> &#124; <code>null</code> - Returns distance between color and another color (from 0.0 till 1.0),or null if given parameter is not an instance of @see{Color}.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| anotherColor | <code>number</code> | Another color, distance to which we need to know. |

**Example**  
```javascript
var blackColor = SDV.Color.create('#000000');var redColor = SDV.Color.create('#ff0000');// It will return 1;blackColor.distanceTo(redColor);
```
<a name="Color.color.toHex"></a>
## Color.color.toHex() ⇒ <code>string</code>
Transforms [Color](#Color) instance to its stringed 6-character hex-code.

**Kind**: static method of <code>[Color](#Color)</code>  
**Returns**: <code>string</code> - Returns 6-character color hex-code.  
**Access:** public  
**Example**  
```javascript
var whiteColor = SDV.Color.create('white');// It will return '#ffffff'.var whiteHex = whiteColor.toHex();
```
<a name="Color.color.toRgb"></a>
## Color.color.toRgb() ⇒ <code>[Rgb](#Rgb)</code>
Transforms [Color](#Color) instance to its [Rgb](#Rgb) representation.

**Kind**: static method of <code>[Color](#Color)</code>  
**Returns**: <code>[Rgb](#Rgb)</code> - Returns new instance of [Rgb](#Rgb) color representation.  
**Access:** public  
**Example**  
```javascript
var whiteColor = SDV.Color.create('white');// It will return new instance of RGB color representation with red = 255, green = 255, blue = 255.var whiteRgb = whiteColor.toRgb();
```
<a name="Color.color.toHsl"></a>
## Color.color.toHsl() ⇒ <code>[Hsl](#Hsl)</code>
Transforms [Color](#Color) instance to its [Hsl](#Hsl) (Hue Saturation Lightness) representation.

**Kind**: static method of <code>[Color](#Color)</code>  
**Returns**: <code>[Hsl](#Hsl)</code> - Returns new instance of [Hsl](#Hsl) (Hue Saturation Lightness) color representation.  
**Access:** public  
**Example**  
```javascript
var whiteColor = SDV.Color.create('white');// It will return new instance of HSL color representation with hue = 0, saturation = 0, lightness = 1.var whiteHsl = whiteColor.toHsl();
```
<a name="Color.color.toHsb"></a>
## Color.color.toHsb() ⇒ <code>[Hsb](#Hsb)</code>
Transforms [Color](#Color) instance to its [Hsb](#Hsb) (Hue Saturation Brightness) representation.

**Kind**: static method of <code>[Color](#Color)</code>  
**Returns**: <code>[Hsb](#Hsb)</code> - Returns new instance of [Hsb](#Hsb) (Hue Saturation Brightness) color representation.  
**Access:** public  
**Example**  
```javascript
var whiteColor = SDV.Color.create('white');// It will return new instance of HSB color representation with hue = 0, saturation = 0, brightness = 1.var whiteHsb = whiteColor.toHsb();
```
<a name="Color.color.clone"></a>
## Color.color.clone() ⇒ <code>[Color](#Color)</code>
Creates new [Color](#Color) instance with same specification.

**Kind**: static method of <code>[Color](#Color)</code>  
**Returns**: <code>[Color](#Color)</code> - Returns new [Color](#Color) instance with same specification.  
**Access:** public  
**Example**  
```javascript
var whiteColor = SDV.Color.create('white');// It will return new color instance of RGB color representation with same specification.var whiteColorClone = whiteColor.clone();// So it will return '#ffffff'.whiteColor.toHex();// And it will return the same '#ffffff'.whiteColorClone.toHex();
```
<a name="Color.color.equals"></a>
## Color.color.equals(obj, eps) ⇒ <code>boolean</code>
Checks if given object is equals to [Color](#Color) instance.

**Kind**: static method of <code>[Color](#Color)</code>  
**Returns**: <code>boolean</code> - Returns true if given object is [Color](#Color) instance with same specification, otherwise returns false.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | Another color, for equality comparison. |
| eps | <code>number</code> | Permissible comparison inaccuracy (from 0 to 1). |

**Example**  
```javascript
var whiteColor = SDV.Color.create('white');var anotherWhiteColor = whiteColor.clone();var blackColor = SDV.Color.create('black');var darkGrayColor = SDV.Color.create('darkgray');whiteColor.equals(); // false.whiteColor.equals('#ffffff'); // false.whiteColor.equals('white'); // false.whiteColor.equals(blackColor); // false.whiteColor.equals(anotherWhiteColor); // true.blackColor.equals(darkGrayColor); // false.blackColor.equals(darkGrayColor, 0.5); // true.
```
<a name="Rgb"></a>
# Rgb
**Kind**: global class  
**Access:** public  

* [Rgb](#Rgb)
  * [new Rgb(colorDefinition)](#new_Rgb_new)
  * [.rgb.red([channelValue])](#Rgb.rgb.red) ⇒ <code>number</code> &#124; <code>[Rgb](#Rgb)</code>
  * [.rgb.green([channelValue])](#Rgb.rgb.green) ⇒ <code>number</code> &#124; <code>[Rgb](#Rgb)</code>
  * [.rgb.blue([channelValue])](#Rgb.rgb.blue) ⇒ <code>number</code> &#124; <code>[Rgb](#Rgb)</code>
  * [.rgb.distanceTo(anotherRgb)](#Rgb.rgb.distanceTo) ⇒ <code>number</code> &#124; <code>null</code>
  * [.rgb.toHex()](#Rgb.rgb.toHex) ⇒ <code>string</code>
  * [.rgb.toHsl()](#Rgb.rgb.toHsl) ⇒ <code>[Hsl](#Hsl)</code>
  * [.rgb.toHsb()](#Rgb.rgb.toHsb) ⇒ <code>[Hsb](#Hsb)</code>
  * [.rgb.clone()](#Rgb.rgb.clone) ⇒ <code>[Rgb](#Rgb)</code>
  * [.rgb.equals(obj, eps)](#Rgb.rgb.equals) ⇒ <code>boolean</code>

<a name="new_Rgb_new"></a>
## new Rgb(colorDefinition)
Constructs new instance of RGB-represented color.Constructor is private, so use factory-method [create](#SDV.Color.Model.Rgb.create) to create an instance.


| Param | Type | Description |
| --- | --- | --- |
| colorDefinition | <code>object</code> | Color definition represented as object, containing values for reg, green and blue channels, for example { red: 255, green: 255, blue: 255 }. |

<a name="Rgb.rgb.red"></a>
## Rgb.rgb.red([channelValue]) ⇒ <code>number</code> &#124; <code>[Rgb](#Rgb)</code>
Gets or sets red channel value for [Rgb](#Rgb).

**Kind**: static method of <code>[Rgb](#Rgb)</code>  
**Returns**: <code>number</code> &#124; <code>[Rgb](#Rgb)</code> - Returns value of red channel (if method works as getter),or returns current [Rgb](#Rgb) instance (if method works as setter).  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| [channelValue] | <code>number</code> | Desirable integer ([0..255]) value for red channel of [Rgb](#Rgb). If channelValue isn't defined then method works as getter, otherwise it works as setter. |

**Example**  
```javascript
var softBlueRgb = SDV.Color.Model.Rgb.create({     red: 32,     green: 64,     blue: 128});// It will return 32.softBlueRgb.red();// It will set red channel to 36.softBlueRgb.red(36);// Now it will return 36.softBlueRgb.red();
```
<a name="Rgb.rgb.green"></a>
## Rgb.rgb.green([channelValue]) ⇒ <code>number</code> &#124; <code>[Rgb](#Rgb)</code>
Gets or sets green channel value for [Rgb](#Rgb).

**Kind**: static method of <code>[Rgb](#Rgb)</code>  
**Returns**: <code>number</code> &#124; <code>[Rgb](#Rgb)</code> - Returns value of green channel (if method works as getter),or returns current [Rgb](#Rgb) instance (if method works as setter).  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| [channelValue] | <code>number</code> | Desirable integer ([0..255]) value for green channel of [Rgb](#Rgb). If channelValue isn't defined then method works as getter, otherwise it works as setter. |

**Example**  
```javascript
var softBlueRgb = SDV.Color.Model.Rgb.create({     red: 32,     green: 64,     blue: 128});// It will return 64.softBlueRgb.green();// It will set green channel to 66.softBlueRgb.green(66);// Now it will return 66.softBlueRgb.green();
```
<a name="Rgb.rgb.blue"></a>
## Rgb.rgb.blue([channelValue]) ⇒ <code>number</code> &#124; <code>[Rgb](#Rgb)</code>
Gets or sets blue channel value for [Rgb](#Rgb).

**Kind**: static method of <code>[Rgb](#Rgb)</code>  
**Returns**: <code>number</code> &#124; <code>[Rgb](#Rgb)</code> - Returns value of blue channel (if method works as getter),or returns current [Rgb](#Rgb) instance (if method works as setter).  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| [channelValue] | <code>number</code> | Desirable integer ([0..255]) value for blue channel of [Rgb](#Rgb). If channelValue isn't defined then method works as getter, otherwise it works as setter. |

**Example**  
```javascript
var softBlueRgb = SDV.Color.Model.Rgb.create({     red: 32,     green: 64,     blue: 128});// It will return 128.softBlueRgb.blue();// It will set blue channel to 126.softBlueRgb.blue(126);// Now it will return 126.softBlueRgb.blue();
```
<a name="Rgb.rgb.distanceTo"></a>
## Rgb.rgb.distanceTo(anotherRgb) ⇒ <code>number</code> &#124; <code>null</code>
Gets distance between RGB color representation and another RGB color representation.

**Kind**: static method of <code>[Rgb](#Rgb)</code>  
**Returns**: <code>number</code> &#124; <code>null</code> - Returns distance (from 0.0 till 1.0),or null if given parameter is not an instance of @see{Hsb}.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| anotherRgb | <code>[Rgb](#Rgb)</code> | Another RGB color representation, distance to which we need to know. |

**Example**  
```javascript
var blackColorRgb = SDV.Color.Model.Rgb.create('#000000');var redColorRgb = SDV.Color.Model.Rgb.create('#ff0000');// It will return 1;blackColorRgb.distanceTo(redColorRgb);
```
<a name="Rgb.rgb.toHex"></a>
## Rgb.rgb.toHex() ⇒ <code>string</code>
Transforms [Rgb](#Rgb) color to its stringed 6-character hex-code.

**Kind**: static method of <code>[Rgb](#Rgb)</code>  
**Returns**: <code>string</code> - Returns 6-character color hex-code.  
**Access:** public  
**Example**  
```javascript
var whiteRgb = SDV.Color.Model.Rgb.create({     red: 255,     green: 255,     blue: 255});// It will return '#ffffff'.var whiteHex = whiteRgb.toHex();
```
<a name="Rgb.rgb.toHsl"></a>
## Rgb.rgb.toHsl() ⇒ <code>[Hsl](#Hsl)</code>
Transforms [Rgb](#Rgb) color to its [Hsl](#Hsl) (Hue Saturation Lightness) color representation.

**Kind**: static method of <code>[Rgb](#Rgb)</code>  
**Returns**: <code>[Hsl](#Hsl)</code> - Returns new instance of [Hsl](#Hsl) (Hue Saturation Lightness) color representation.  
**Access:** public  
**Example**  
```javascript
var whiteRgb = SDV.Color.Model.Rgb.create({     red: 255,     green: 255,     blue: 255});// It will return new instance of HSL color representation with hue = 0, saturation = 0, lightness = 1.var whiteHsl = whiteRgb.toHsl();
```
<a name="Rgb.rgb.toHsb"></a>
## Rgb.rgb.toHsb() ⇒ <code>[Hsb](#Hsb)</code>
Transforms [Rgb](#Rgb) color to its [Hsb](#Hsb) (Hue Saturation Brightness) color representation.

**Kind**: static method of <code>[Rgb](#Rgb)</code>  
**Returns**: <code>[Hsb](#Hsb)</code> - Returns new instance of [Hsb](#Hsb) (Hue Saturation Brightness) color representation.  
**Access:** public  
**Example**  
```javascript
var whiteRgb = SDV.Color.Model.Rgb.create({     red: 255,     green: 255,     blue: 255});// It will return new instance of HSB color representation with hue = 0, saturation = 0, brightness = 1.var whiteHsb = whiteRgb.toHsb();
```
<a name="Rgb.rgb.clone"></a>
## Rgb.rgb.clone() ⇒ <code>[Rgb](#Rgb)</code>
Creates new [Rgb](#Rgb) instance with same RGB-channels values.

**Kind**: static method of <code>[Rgb](#Rgb)</code>  
**Returns**: <code>[Rgb](#Rgb)</code> - Returns new [Rgb](#Rgb) instance with same RGB-channels values.  
**Access:** public  
**Example**  
```javascript
var whiteRgb = SDV.Color.Model.Rgb.create({     red: 255,     green: 255,     blue: 255});// It will return new instance of RGB color representation with same channels values:// red = 255, green = 255, blue = 255.var whiteRgbClone = whiteRgb.clone();
```
<a name="Rgb.rgb.equals"></a>
## Rgb.rgb.equals(obj, eps) ⇒ <code>boolean</code>
Checks if given object is equals to [Rgb](#Rgb) instance.

**Kind**: static method of <code>[Rgb](#Rgb)</code>  
**Returns**: <code>boolean</code> - Returns true if given object is [Rgb](#Rgb) instance with same RGB-channels values, otherwise returns false.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | Another HSB color representation, for equality comparison. |
| eps | <code>number</code> | Permissible comparison inaccuracy (from 0 to 1). |

**Example**  
```javascript
var whiteRgb = SDV.Color.Model.Rgb.create({     red: 255,     green: 255,     blue: 255});var anotherWhiteRgb = whiteRgb.clone();var blackRgb = SDV.Color.Model.Rgb.create({     red: 0,     green: 0,     blue: 0});var darkGrayRgb= SDV.Color.Model.Rgb.create('darkgray');whiteRgb.equals(); // false.whiteRgb.equals('#ffffff'); // false.whiteRgb.equals('white'); // false.whiteRgb.equals({ red: 255, green: 255, blue: 255 }); // false.whiteRgb.equals(blackRgb); // false.whiteRgb.equals(anotherWhiteRgb); // true.blackRgb.equals(darkGrayRgb); // false.blackRgb.equals(darkGrayRgb, 0.5); // true.
```
<a name="Hsl"></a>
# Hsl
**Kind**: global class  
**Access:** public  

* [Hsl](#Hsl)
  * [new Hsl(colorDefinition)](#new_Hsl_new)
  * [.hsl.hue([componentValue])](#Hsl.hsl.hue) ⇒ <code>number</code> &#124; <code>[Hsl](#Hsl)</code>
  * [.hsl.saturation([componentValue])](#Hsl.hsl.saturation) ⇒ <code>number</code> &#124; <code>[Hsl](#Hsl)</code>
  * [.hsl.lightness([componentValue])](#Hsl.hsl.lightness) ⇒ <code>number</code> &#124; <code>[Hsl](#Hsl)</code>
  * [.hsl.distanceTo(anotherHsl)](#Hsl.hsl.distanceTo) ⇒ <code>number</code> &#124; <code>null</code>
  * [.hsl.toHex()](#Hsl.hsl.toHex) ⇒ <code>string</code>
  * [.hsl.toRgb()](#Hsl.hsl.toRgb) ⇒ <code>[Rgb](#Rgb)</code>
  * [.hsl.toHsb()](#Hsl.hsl.toHsb) ⇒ <code>[Hsb](#Hsb)</code>
  * [.hsl.clone()](#Hsl.hsl.clone) ⇒ <code>[Hsl](#Hsl)</code>
  * [.hsl.equals(obj, eps)](#Hsl.hsl.equals) ⇒ <code>boolean</code>

<a name="new_Hsl_new"></a>
## new Hsl(colorDefinition)
Constructs new instance of HSL-represented color.Constructor is private, so use factory-method [create](#SDV.Color.Model.Hsl.create) to create an instance.


| Param | Type | Description |
| --- | --- | --- |
| colorDefinition | <code>object</code> | Color definition represented as object, containing values of hue, saturation and lightness, for example { hue: 0, saturation: 0, lightness: 1 }. |

<a name="Hsl.hsl.hue"></a>
## Hsl.hsl.hue([componentValue]) ⇒ <code>number</code> &#124; <code>[Hsl](#Hsl)</code>
Gets or sets value for hue component of [Hsl](#Hsl).

**Kind**: static method of <code>[Hsl](#Hsl)</code>  
**Returns**: <code>number</code> &#124; <code>[Hsl](#Hsl)</code> - Returns value of hue component (if method works as getter),or returns current [Hsl](#Hsl) instance (if method works as setter).  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| [componentValue] | <code>number</code> | Desirable ([0..1]) value for hue component of [Hsl](#Hsl). If componentValue isn't defined then method works as getter, otherwise it works as setter. |

**Example**  
```javascript
var softBlueHsl = SDV.Color.Model.Hsl.create({     hue: 0.61,     saturation: 0.6,     lightness: 0.3});// It will return 0.61.softBlueHsl.hue();// It will set hue component to 0.59.softBlueHsl.hue(0.59);// Now it will return 0.59.softBlueHsl.hue();
```
<a name="Hsl.hsl.saturation"></a>
## Hsl.hsl.saturation([componentValue]) ⇒ <code>number</code> &#124; <code>[Hsl](#Hsl)</code>
Gets or sets value for saturation component of [Hsl](#Hsl).

**Kind**: static method of <code>[Hsl](#Hsl)</code>  
**Returns**: <code>number</code> &#124; <code>[Hsl](#Hsl)</code> - Returns value of saturation component (if method works as getter),or returns current [Hsl](#Hsl) instance (if method works as setter).  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| [componentValue] | <code>number</code> | Desirable ([0..1]) value for saturation component of [Hsl](#Hsl). If componentValue isn't defined then method works as getter, otherwise it works as setter. |

**Example**  
```javascript
var softBlueHsl = SDV.Color.Model.Hsl.create({     hue: 0.61,     saturation: 0.6,     lightness: 0.3});// It will return 0.6.softBlueHsl.saturation();// It will set saturation component to 0.66.softBlueHsl.saturation(0.66);// Now it will return 0.66.softBlueHsl.saturation();
```
<a name="Hsl.hsl.lightness"></a>
## Hsl.hsl.lightness([componentValue]) ⇒ <code>number</code> &#124; <code>[Hsl](#Hsl)</code>
Gets or sets value for lightness component of [Hsl](#Hsl).

**Kind**: static method of <code>[Hsl](#Hsl)</code>  
**Returns**: <code>number</code> &#124; <code>[Hsl](#Hsl)</code> - Returns value of lightness component (if method works as getter),or returns current [Hsl](#Hsl) instance (if method works as setter).  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| [componentValue] | <code>number</code> | Desirable ([0..1]) value for lightness component of [Hsl](#Hsl). If componentValue isn't defined then method works as getter, otherwise it works as setter. |

**Example**  
```javascript
var softBlueHsl = SDV.Color.Model.Hsl.create({     hue: 0.61,     saturation: 0.6,     lightness: 0.3});// It will return 0.3.softBlueHsl.lightness();// It will set hue component to 0.36.softBlueHsl.lightness(0.36);// Now it will return 0.36.softBlueHsl.lightness();
```
<a name="Hsl.hsl.distanceTo"></a>
## Hsl.hsl.distanceTo(anotherHsl) ⇒ <code>number</code> &#124; <code>null</code>
Gets distance between HSL color representation and another HSL color representation.

**Kind**: static method of <code>[Hsl](#Hsl)</code>  
**Returns**: <code>number</code> &#124; <code>null</code> - Returns distance (from 0.0 till 1.0),or null if given parameter is not an instance of @see{Hsl}.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| anotherHsl | <code>[Hsl](#Hsl)</code> | Another color HSL representation, distance to which we need to know. |

**Example**  
```javascript
var blackColorHsl = SDV.Color.Model.Hsl.create('#000000');var redColorHsl = SDV.Color.Model.Hsl.create('#ff0000');// It will return 1;blackColorHsl.distanceTo(redColorHsl);
```
<a name="Hsl.hsl.toHex"></a>
## Hsl.hsl.toHex() ⇒ <code>string</code>
Transforms [Hsl](#Hsl) (Hue Saturation Lightness) color to its stringed 6-character hex-code.

**Kind**: static method of <code>[Hsl](#Hsl)</code>  
**Returns**: <code>string</code> - Returns 6-character color hex-code.  
**Access:** public  
**Example**  
```javascript
var whiteHsl = SDV.Color.Model.Hsl.create({     hue: 0,     saturation: 0,     lightness: 1});// It will return '#ffffff'.var whiteHex = whiteHsl.toHex();
```
<a name="Hsl.hsl.toRgb"></a>
## Hsl.hsl.toRgb() ⇒ <code>[Rgb](#Rgb)</code>
Transforms [Hsl](#Hsl) (Hue Saturation Lightness) color representation to its [Rgb](#Rgb) representation.

**Kind**: static method of <code>[Hsl](#Hsl)</code>  
**Returns**: <code>[Rgb](#Rgb)</code> - Returns new instance of [Rgb](#Rgb) color representation.  
**Access:** public  
**Example**  
```javascript
var whiteHsl = SDV.Color.Model.Hsl.create({     hue: 0,     saturation: 0,     lightness: 1});// It will return new instance of RGB color representation with red = 255, green = 255, blue = 255.var whiteRgb = whiteHsl.toRgb();
```
<a name="Hsl.hsl.toHsb"></a>
## Hsl.hsl.toHsb() ⇒ <code>[Hsb](#Hsb)</code>
Transforms [Hsl](#Hsl) (Hue Saturation Lightness) color representationto its [Hsb](#Hsb) (Hue Saturation Brightness) color representation.

**Kind**: static method of <code>[Hsl](#Hsl)</code>  
**Returns**: <code>[Hsb](#Hsb)</code> - Returns new instance of [Hsb](#Hsb) (Hue Saturation Brightness) color representation.  
**Access:** public  
**Example**  
```javascript
var whiteHsl = SDV.Color.Model.Hsl.create({     hue: 0,     saturation: 0,     lightness: 1});// It will return new instance of HSB color representation with hue = 0, saturation = 0, brightness = 1.var whiteHsb = whiteHsl.toHsb();
```
<a name="Hsl.hsl.clone"></a>
## Hsl.hsl.clone() ⇒ <code>[Hsl](#Hsl)</code>
Creates new [Hsl](#Hsl) instance with same HSL-components values.

**Kind**: static method of <code>[Hsl](#Hsl)</code>  
**Returns**: <code>[Hsl](#Hsl)</code> - Returns new [Hsl](#Hsl) instance with same HSL-components values.  
**Access:** public  
**Example**  
```javascript
var whiteHsl = SDV.Color.Model.Hsl.create({     hue: 0,     saturation: 0,     lightness: 1});// It will return new instance of HSL color representation with same components values:// hue = 0, saturation = 0, lightness = 1.var whiteHslClone = whiteHsl.clone();
```
<a name="Hsl.hsl.equals"></a>
## Hsl.hsl.equals(obj, eps) ⇒ <code>boolean</code>
Checks if given object is equals to [Hsl](#Hsl) instance.

**Kind**: static method of <code>[Hsl](#Hsl)</code>  
**Returns**: <code>boolean</code> - Returns true if given object is [Hsl](#Hsl) instance with same HSL-channels values, otherwise returns false.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | Another HSL color representation, for equality comparison. |
| eps | <code>number</code> | Permissible comparison inaccuracy (from 0 to 1). |

**Example**  
```javascript
var whiteHsl = SDV.Color.Model.Hsl.create({     hue: 0,     saturation: 0,     lightness: 1});var anotherWhiteHsl = whiteHsl.clone();var blackHsl = SDV.Color.Model.Hsl.create({     hue: 0,     saturation: 0,     lightness: 0});var darkGrayHsl = SDV.Color.Model.Hsl.create('darkgray');whiteHsl.equals(); // false.whiteHsl.equals('#ffffff'); // false.whiteHsl.equals('white'); // false.whiteHsl.equals({ hue: 0, saturation: 0, lightness: 1 }); // false.whiteHsl.equals(blackHsl); // false.whiteHsl.equals(anotherWhiteHsl); // true.blackHsl.equals(darkGrayHsl); // false.blackHsl.equals(darkGrayHsl, 0.5); // true.
```
<a name="Hsb"></a>
# Hsb
**Kind**: global class  
**Access:** public  

* [Hsb](#Hsb)
  * [new Hsb(colorDefinition)](#new_Hsb_new)
  * [.hsb.hue([componentValue])](#Hsb.hsb.hue) ⇒ <code>number</code> &#124; <code>[Hsb](#Hsb)</code>
  * [.hsb.saturation([componentValue])](#Hsb.hsb.saturation) ⇒ <code>number</code> &#124; <code>[Hsb](#Hsb)</code>
  * [.hsb.brightness([componentValue])](#Hsb.hsb.brightness) ⇒ <code>number</code> &#124; <code>[Hsb](#Hsb)</code>
  * [.hsb.distanceTo(anotherHsb)](#Hsb.hsb.distanceTo) ⇒ <code>number</code> &#124; <code>null</code>
  * [.hsb.toHex()](#Hsb.hsb.toHex) ⇒ <code>string</code>
  * [.hsb.toRgb()](#Hsb.hsb.toRgb) ⇒ <code>[Rgb](#Rgb)</code>
  * [.hsb.toHsl()](#Hsb.hsb.toHsl) ⇒ <code>[Hsl](#Hsl)</code>
  * [.hsb.clone()](#Hsb.hsb.clone) ⇒ <code>[Hsb](#Hsb)</code>
  * [.hsb.equals(obj, eps)](#Hsb.hsb.equals) ⇒ <code>boolean</code>

<a name="new_Hsb_new"></a>
## new Hsb(colorDefinition)
Constructs new instance of HSB-represented color.Constructor is private, so use factory-method [create](#SDV.Color.Model.Hsb.create) to create an instance.


| Param | Type | Description |
| --- | --- | --- |
| colorDefinition | <code>object</code> | Color definition represented as object, containing values of hue, saturation and brightness, for example { hue: 0, saturation: 0, brightness: 1 }. |

<a name="Hsb.hsb.hue"></a>
## Hsb.hsb.hue([componentValue]) ⇒ <code>number</code> &#124; <code>[Hsb](#Hsb)</code>
Gets or sets value for hue component of [Hsb](#Hsb).

**Kind**: static method of <code>[Hsb](#Hsb)</code>  
**Returns**: <code>number</code> &#124; <code>[Hsb](#Hsb)</code> - Returns value of hue component (if method works as getter),or returns current [Hsb](#Hsb) instance (if method works as setter).  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| [componentValue] | <code>number</code> | Desirable ([0..1]) value for hue component of [Hsb](#Hsb). If componentValue isn't defined then method works as getter, otherwise it works as setter. |

**Example**  
```javascript
var softBlueHsl = SDV.Color.Model.Hsb.create({     hue: 0.61,     saturation: 0.75,     brightness: 0.5});// It will return 0.61.softBlueHsl.hue();// It will set hue component to 0.59.softBlueHsl.hue(0.59);// Now it will return 0.59.softBlueHsl.hue();
```
<a name="Hsb.hsb.saturation"></a>
## Hsb.hsb.saturation([componentValue]) ⇒ <code>number</code> &#124; <code>[Hsb](#Hsb)</code>
Gets or sets value for saturation component of [Hsb](#Hsb).

**Kind**: static method of <code>[Hsb](#Hsb)</code>  
**Returns**: <code>number</code> &#124; <code>[Hsb](#Hsb)</code> - Returns value of saturation component (if method works as getter),or returns current [Hsb](#Hsb) instance (if method works as setter).  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| [componentValue] | <code>number</code> | Desirable ([0..1]) value for saturation component of [Hsb](#Hsb). If componentValue isn't defined then method works as getter, otherwise it works as setter. |

**Example**  
```javascript
var softBlueHsl = SDV.Color.Model.Hsb.create({     hue: 0.61,     saturation: 0.75,     brightness: 0.5});// It will return 0.75.softBlueHsl.saturation();// It will set saturation component to 0.76.softBlueHsl.saturation(0.76);// Now it will return 0.76.softBlueHsl.saturation();
```
<a name="Hsb.hsb.brightness"></a>
## Hsb.hsb.brightness([componentValue]) ⇒ <code>number</code> &#124; <code>[Hsb](#Hsb)</code>
Gets or sets value for brightness component of [Hsb](#Hsb).

**Kind**: static method of <code>[Hsb](#Hsb)</code>  
**Returns**: <code>number</code> &#124; <code>[Hsb](#Hsb)</code> - Returns value of brightness component (if method works as getter),or returns current [Hsb](#Hsb) instance (if method works as setter).  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| [componentValue] | <code>number</code> | Desirable ([0..1]) value for brightness component of [Hsb](#Hsb). If componentValue isn't defined then method works as getter, otherwise it works as setter. |

**Example**  
```javascript
var softBlueHsl = SDV.Color.Model.Hsb.create({     hue: 0.61,     saturation: 0.75,     brightness: 0.5});// It will return 0.5.softBlueHsl.brightness();// It will set brightness component to 0.56.softBlueHsl.brightness(0.56);// Now it will return 0.56.softBlueHsl.brightness();
```
<a name="Hsb.hsb.distanceTo"></a>
## Hsb.hsb.distanceTo(anotherHsb) ⇒ <code>number</code> &#124; <code>null</code>
Gets distance between HSB color representation and another HSB color representation.

**Kind**: static method of <code>[Hsb](#Hsb)</code>  
**Returns**: <code>number</code> &#124; <code>null</code> - Returns distance (from 0.0 till 1.0),or null if given parameter is not an instance of @see{Hsb}.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| anotherHsb | <code>[Hsb](#Hsb)</code> | Another HSB color representation, distance to which we need to know. |

**Example**  
```javascript
var blackColorHsb = SDV.Color.Model.Hsb.create('#000000');var redColorHsb = SDV.Color.Model.Hsb.create('#ff0000');// It will return 1;blackColorHsb.distanceTo(redColorHsb);
```
<a name="Hsb.hsb.toHex"></a>
## Hsb.hsb.toHex() ⇒ <code>string</code>
Transforms [Hsb](#Hsb) (Hue Saturation Brightness) color to its stringed 6-character hex-code.

**Kind**: static method of <code>[Hsb](#Hsb)</code>  
**Returns**: <code>string</code> - Returns 6-character color hex-code.  
**Access:** public  
**Example**  
```javascript
var whiteHsb = SDV.Color.Model.Hsb.create({     hue: 0,     saturation: 0,     brightness: 1});// It will return '#ffffff'.var whiteHex = whiteHsb.toHex();
```
<a name="Hsb.hsb.toRgb"></a>
## Hsb.hsb.toRgb() ⇒ <code>[Rgb](#Rgb)</code>
Transforms [Hsb](#Hsb) (Hue Saturation Brightness) color representation to its [Rgb](#Rgb) representation.

**Kind**: static method of <code>[Hsb](#Hsb)</code>  
**Returns**: <code>[Rgb](#Rgb)</code> - Returns new instance of [Rgb](#Rgb) color representation.  
**Access:** public  
**Example**  
```javascript
var whiteHsb = SDV.Color.Model.Hsb.create({     hue: 0,     saturation: 0,     brightness: 1});// It will return new instance of RGB color representation with red = 255, green = 255, blue = 255.var whiteRgb = whiteHsb.toRgb();
```
<a name="Hsb.hsb.toHsl"></a>
## Hsb.hsb.toHsl() ⇒ <code>[Hsl](#Hsl)</code>
Transforms [Hsb](#Hsb) (Hue Saturation Brightness) color representationto its [Hsl](#Hsl) (Hue Saturation Lightness) color representation.

**Kind**: static method of <code>[Hsb](#Hsb)</code>  
**Returns**: <code>[Hsl](#Hsl)</code> - Returns new instance of [Hsl](#Hsl) (Hue Saturation Lightness) color representation.  
**Access:** public  
**Example**  
```javascript
var whiteHsb = SDV.Color.Model.Hsb.create({     hue: 0,     saturation: 0,     brightness: 1});// It will return new instance of HSL color representation with hue = 0, saturation = 0, lightness = 1.var whiteHsl = whiteHsb.toHsl();
```
<a name="Hsb.hsb.clone"></a>
## Hsb.hsb.clone() ⇒ <code>[Hsb](#Hsb)</code>
Creates new [Hsb](#Hsb) instance with same HSB-components values.

**Kind**: static method of <code>[Hsb](#Hsb)</code>  
**Returns**: <code>[Hsb](#Hsb)</code> - Returns new [Hsb](#Hsb) instance with same HSB-components values.  
**Access:** public  
**Example**  
```javascript
var whiteHsb = SDV.Color.Model.Hsb.create({     hue: 0,     saturation: 0,     lightness: 1});// It will return new instance of HSB color representation with same components values:// hue = 0, saturation = 0, brightness = 1.var whiteHsbClone = whiteHsb.clone();
```
<a name="Hsb.hsb.equals"></a>
## Hsb.hsb.equals(obj, eps) ⇒ <code>boolean</code>
Checks if given object is equals to [Hsb](#Hsb) instance.

**Kind**: static method of <code>[Hsb](#Hsb)</code>  
**Returns**: <code>boolean</code> - Returns true if given object is [Hsb](#Hsb) instance with same HSB-channels values, otherwise returns false.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | Another HSB color representation, for equality comparison. |
| eps | <code>number</code> | Permissible comparison inaccuracy (from 0 to 1). |

**Example**  
```javascript
var whiteHsb = SDV.Color.Model.Hsb.create({     hue: 0,     saturation: 0,     brightness: 1});var anotherWhiteHsb = whiteHsb.clone();var blackHsb = SDV.Color.Model.Hsb.create({     hue: 0,     saturation: 0,     brightness: 0});var darkGrayHsb = SDV.Color.Model.Hsb.create('darkgray');whiteHsb.equals(); // false.whiteHsb.equals('#ffffff'); // false.whiteHsb.equals('white'); // false.whiteHsb.equals({ hue: 0, saturation: 0, brightness: 1 }); // false.whiteHsb.equals(blackHsb); // false.whiteHsb.equals(anotherWhiteHsb); // true.blackHsb.equals(darkGrayHsb); // false.blackHsb.equals(darkGrayHsb, 0.5); // true.
```
<a name="SDV"></a>
# SDV : <code>object</code>
Base namespace for SDV.js library.All library facilities are accessible through it.

**Kind**: global namespace  

* [SDV](#SDV) : <code>object</code>
  * [.version](#SDV.version) : <code>string</code>
  * [.name](#SDV.name) : <code>string</code>
  * [.Util](#SDV.Util) : <code>object</code>
    * [.Validation](#SDV.Util.Validation) : <code>object</code>
      * [.validateOption(validationOptions, optionValue)](#SDV.Util.Validation.validateOption) ⇒ <code>optionValidationResult</code>
      * [.validateOptions(validationOptions, options, defaults)](#SDV.Util.Validation.validateOptions) ⇒ <code>optionsValidationResult</code>
      * [.optionValidationResult](#SDV.Util.Validation.optionValidationResult) : <code>object</code>
      * [.optionsValidationResult](#SDV.Util.Validation.optionsValidationResult) : <code>object</code>
      * [.validationOptions](#SDV.Util.Validation.validationOptions) : <code>object</code>
    * [.Boolean](#SDV.Util.Boolean) : <code>object</code>
      * [.isBoolean(obj)](#SDV.Util.Boolean.isBoolean) ⇒ <code>boolean</code>
    * [.String](#SDV.Util.String) : <code>object</code>
      * [.isString(obj)](#SDV.Util.String.isString) ⇒ <code>boolean</code>
      * [.trim(str)](#SDV.Util.String.trim) ⇒ <code>string</code>
      * [.insert(strDist, strSrc, start, [end])](#SDV.Util.String.insert) ⇒ <code>string</code>
      * [.getWords(str)](#SDV.Util.String.getWords) ⇒ <code>Array.&lt;string&gt;</code>
      * [.transliterateCyrillicToLatin(cyrillicString)](#SDV.Util.String.transliterateCyrillicToLatin) ⇒ <code>string</code>
    * [.Number](#SDV.Util.Number) : <code>object</code>
      * [.isNumber(obj)](#SDV.Util.Number.isNumber) ⇒ <code>boolean</code>
      * [.isInteger(obj)](#SDV.Util.Number.isInteger) ⇒ <code>boolean</code>
      * [.isEven(n)](#SDV.Util.Number.isEven) ⇒ <code>boolean</code>
      * [.isOdd(n)](#SDV.Util.Number.isOdd) ⇒ <code>boolean</code>
    * [.Array](#SDV.Util.Array) : <code>object</code>
      * [.isArray(obj)](#SDV.Util.Array.isArray) ⇒ <code>boolean</code>
      * [.indexOf(array, searchElement, fromIndex)](#SDV.Util.Array.indexOf) ⇒ <code>int</code>
      * [.contains(array, searchElement)](#SDV.Util.Array.contains) ⇒ <code>boolean</code>
      * [.each(array, callback)](#SDV.Util.Array.each)
    * [.Function](#SDV.Util.Function) : <code>object</code>
      * [.isFunction(obj)](#SDV.Util.Function.isFunction) ⇒ <code>boolean</code>
      * [.bind(fn, desiredContext)](#SDV.Util.Function.bind) ⇒ <code>function</code>
    * [.Object](#SDV.Util.Object) : <code>object</code>
      * [.isObject(obj, [nullIsAllowed])](#SDV.Util.Object.isObject) ⇒ <code>boolean</code>
      * [.create(Desirable)](#SDV.Util.Object.create) ⇒ <code>object</code>
      * [.extend(dest, src, recursive)](#SDV.Util.Object.extend) ⇒ <code>Object</code>
      * [.getPropertiesNames(obj, [allowPrototypeProperties])](#SDV.Util.Object.getPropertiesNames) ⇒ <code>Array.&lt;string&gt;</code>
      * [.getPropertyValue(options)](#SDV.Util.Object.getPropertyValue) ⇒ <code>\*</code>
      * [.uniqueId(obj, [idProperty])](#SDV.Util.Object.uniqueId) ⇒ <code>number</code> &#124; <code>null</code>
    * [.Json](#SDV.Util.Json) : <code>object</code>
      * [.parse(jsonString)](#SDV.Util.Json.parse) ⇒ <code>object</code>
      * [.stringify(value)](#SDV.Util.Json.stringify) ⇒ <code>string</code>
      * [.getFromFile(options)](#SDV.Util.Json.getFromFile) ⇒ <code>object</code>
    * [.Xml](#SDV.Util.Xml) : <code>object</code>
      * [.isXml(xmlObject)](#SDV.Util.Xml.isXml) ⇒ <code>boolean</code>
      * [.parse(xmlString)](#SDV.Util.Xml.parse) ⇒ <code>object</code>
      * [.stringify(xmlObject)](#SDV.Util.Xml.stringify) ⇒ <code>string</code>
      * [.getFromFile(options)](#SDV.Util.Xml.getFromFile) ⇒ <code>object</code>
    * [.Ajax](#SDV.Util.Ajax) : <code>object</code>
      * [.isUrlCrossDomain(url)](#SDV.Util.Ajax.isUrlCrossDomain) ⇒ <code>boolean</code>
      * [.makeRequest(options)](#SDV.Util.Ajax.makeRequest) ⇒ <code>object</code>
    * [.Geojson](#SDV.Util.Geojson) : <code>object</code>
      * [.validate(geoJsonObject, [allowedGeoObjectTypes])](#SDV.Util.Geojson.validate) ⇒ <code>optionsValidationResult</code>
      * [.isGeojson(obj)](#SDV.Util.Geojson.isGeojson) ⇒ <code>boolean</code>
      * [.getGeoObjects(geoJsonObject, validationNeeded)](#SDV.Util.Geojson.getGeoObjects) ⇒ <code>boolean</code>
  * [.Localization](#SDV.Localization) : <code>object</code>
    * [.getResource(resourceName, [locale])](#SDV.Localization.getResource) ⇒ <code>\*</code> &#124; <code>undefined</code>
    * [.getCurrentLanguage()](#SDV.Localization.getCurrentLanguage) ⇒ <code>string</code>
    * [.getDefaultLanguage()](#SDV.Localization.getDefaultLanguage) ⇒ <code>string</code>
    * [.setCurrentLanguage(locale)](#SDV.Localization.setCurrentLanguage)
    * [.extend(options)](#SDV.Localization.extend) ⇒ <code>boolean</code>
  * [.Enumerable](#SDV.Enumerable) : <code>object</code>
    * [.create(items)](#SDV.Enumerable.create) ⇒ <code>[Enumerable](#Enumerable)</code>
    * [.isEnumerable(obj)](#SDV.Enumerable.isEnumerable) ⇒ <code>boolean</code>
  * [.Condition](#SDV.Condition) : <code>object</code>
    * [.parse(condition)](#SDV.Condition.parse) ⇒ <code>conditionParseResult</code>
    * [.create(condition)](#SDV.Condition.create) ⇒ <code>[Condition](#Condition)</code> &#124; <code>null</code>
    * [.isCondition(obj, allowString)](#SDV.Condition.isCondition) ⇒ <code>boolean</code>
    * [.parsedTemplate](#SDV.Condition.parsedTemplate) : <code>object</code>
    * [.conditionParseResult](#SDV.Condition.conditionParseResult) : <code>object</code>
  * [.Color](#SDV.Color) : <code>object</code>
    * [.Model](#SDV.Color.Model) : <code>object</code>
      * [.Hex](#SDV.Color.Model.Hex) : <code>object</code>
        * [.Code](#SDV.Color.Model.Hex.Code) : <code>enum</code>
        * [.create(colorDefinition)](#SDV.Color.Model.Hex.create) ⇒ <code>string</code> &#124; <code>null</code>
        * [.isHex(obj)](#SDV.Color.Model.Hex.isHex) ⇒ <code>boolean</code>
      * [.Rgb](#SDV.Color.Model.Rgb) : <code>object</code>
        * [.create(colorDefinition)](#SDV.Color.Model.Rgb.create) ⇒ <code>[Rgb](#Rgb)</code> &#124; <code>null</code>
        * [.isRgb(obj)](#SDV.Color.Model.Rgb.isRgb) ⇒ <code>boolean</code>
      * [.Hsl](#SDV.Color.Model.Hsl) : <code>object</code>
        * [.create(colorDefinition)](#SDV.Color.Model.Hsl.create) ⇒ <code>[Hsl](#Hsl)</code> &#124; <code>null</code>
        * [.isHsl(obj)](#SDV.Color.Model.Hsl.isHsl) ⇒ <code>boolean</code>
      * [.Hsb](#SDV.Color.Model.Hsb) : <code>object</code>
        * [.create(colorDefinition)](#SDV.Color.Model.Hsb.create) ⇒ <code>[Hsb](#Hsb)</code>
        * [.isHsb(obj)](#SDV.Color.Model.Hsb.isHsb) ⇒ <code>boolean</code>
    * [.create(colorDefinition)](#SDV.Color.create) ⇒ <code>[Color](#Color)</code>
    * [.isColor(obj)](#SDV.Color.isColor) ⇒ <code>boolean</code>
    * [.random([options])](#SDV.Color.random) ⇒ <code>string</code> &#124; <code>Array.&lt;string&gt;</code> &#124; <code>null</code>
  * [.Tool](#SDV.Tool) : <code>object</code>
    * [.base](#SDV.Tool.base)
    * [.choropleth(options)](#SDV.Tool.choropleth) ⇒ <code>object</code>
  * [.defineSdv()](#SDV.defineSdv)
  * [.noConflict()](#SDV.noConflict) ⇒ <code>object</code>

<a name="SDV.version"></a>
## SDV.version : <code>string</code>
Current library version.

**Kind**: static property of <code>[SDV](#SDV)</code>  
<a name="SDV.name"></a>
## SDV.name : <code>string</code>
Library name.

**Kind**: static property of <code>[SDV](#SDV)</code>  
<a name="SDV.Util"></a>
## SDV.Util : <code>object</code>
Base namespace for SDV.js library utils.All supporting library utils are accessible through it.

**Kind**: static namespace of <code>[SDV](#SDV)</code>  

* [.Util](#SDV.Util) : <code>object</code>
  * [.Validation](#SDV.Util.Validation) : <code>object</code>
    * [.validateOption(validationOptions, optionValue)](#SDV.Util.Validation.validateOption) ⇒ <code>optionValidationResult</code>
    * [.validateOptions(validationOptions, options, defaults)](#SDV.Util.Validation.validateOptions) ⇒ <code>optionsValidationResult</code>
    * [.optionValidationResult](#SDV.Util.Validation.optionValidationResult) : <code>object</code>
    * [.optionsValidationResult](#SDV.Util.Validation.optionsValidationResult) : <code>object</code>
    * [.validationOptions](#SDV.Util.Validation.validationOptions) : <code>object</code>
  * [.Boolean](#SDV.Util.Boolean) : <code>object</code>
    * [.isBoolean(obj)](#SDV.Util.Boolean.isBoolean) ⇒ <code>boolean</code>
  * [.String](#SDV.Util.String) : <code>object</code>
    * [.isString(obj)](#SDV.Util.String.isString) ⇒ <code>boolean</code>
    * [.trim(str)](#SDV.Util.String.trim) ⇒ <code>string</code>
    * [.insert(strDist, strSrc, start, [end])](#SDV.Util.String.insert) ⇒ <code>string</code>
    * [.getWords(str)](#SDV.Util.String.getWords) ⇒ <code>Array.&lt;string&gt;</code>
    * [.transliterateCyrillicToLatin(cyrillicString)](#SDV.Util.String.transliterateCyrillicToLatin) ⇒ <code>string</code>
  * [.Number](#SDV.Util.Number) : <code>object</code>
    * [.isNumber(obj)](#SDV.Util.Number.isNumber) ⇒ <code>boolean</code>
    * [.isInteger(obj)](#SDV.Util.Number.isInteger) ⇒ <code>boolean</code>
    * [.isEven(n)](#SDV.Util.Number.isEven) ⇒ <code>boolean</code>
    * [.isOdd(n)](#SDV.Util.Number.isOdd) ⇒ <code>boolean</code>
  * [.Array](#SDV.Util.Array) : <code>object</code>
    * [.isArray(obj)](#SDV.Util.Array.isArray) ⇒ <code>boolean</code>
    * [.indexOf(array, searchElement, fromIndex)](#SDV.Util.Array.indexOf) ⇒ <code>int</code>
    * [.contains(array, searchElement)](#SDV.Util.Array.contains) ⇒ <code>boolean</code>
    * [.each(array, callback)](#SDV.Util.Array.each)
  * [.Function](#SDV.Util.Function) : <code>object</code>
    * [.isFunction(obj)](#SDV.Util.Function.isFunction) ⇒ <code>boolean</code>
    * [.bind(fn, desiredContext)](#SDV.Util.Function.bind) ⇒ <code>function</code>
  * [.Object](#SDV.Util.Object) : <code>object</code>
    * [.isObject(obj, [nullIsAllowed])](#SDV.Util.Object.isObject) ⇒ <code>boolean</code>
    * [.create(Desirable)](#SDV.Util.Object.create) ⇒ <code>object</code>
    * [.extend(dest, src, recursive)](#SDV.Util.Object.extend) ⇒ <code>Object</code>
    * [.getPropertiesNames(obj, [allowPrototypeProperties])](#SDV.Util.Object.getPropertiesNames) ⇒ <code>Array.&lt;string&gt;</code>
    * [.getPropertyValue(options)](#SDV.Util.Object.getPropertyValue) ⇒ <code>\*</code>
    * [.uniqueId(obj, [idProperty])](#SDV.Util.Object.uniqueId) ⇒ <code>number</code> &#124; <code>null</code>
  * [.Json](#SDV.Util.Json) : <code>object</code>
    * [.parse(jsonString)](#SDV.Util.Json.parse) ⇒ <code>object</code>
    * [.stringify(value)](#SDV.Util.Json.stringify) ⇒ <code>string</code>
    * [.getFromFile(options)](#SDV.Util.Json.getFromFile) ⇒ <code>object</code>
  * [.Xml](#SDV.Util.Xml) : <code>object</code>
    * [.isXml(xmlObject)](#SDV.Util.Xml.isXml) ⇒ <code>boolean</code>
    * [.parse(xmlString)](#SDV.Util.Xml.parse) ⇒ <code>object</code>
    * [.stringify(xmlObject)](#SDV.Util.Xml.stringify) ⇒ <code>string</code>
    * [.getFromFile(options)](#SDV.Util.Xml.getFromFile) ⇒ <code>object</code>
  * [.Ajax](#SDV.Util.Ajax) : <code>object</code>
    * [.isUrlCrossDomain(url)](#SDV.Util.Ajax.isUrlCrossDomain) ⇒ <code>boolean</code>
    * [.makeRequest(options)](#SDV.Util.Ajax.makeRequest) ⇒ <code>object</code>
  * [.Geojson](#SDV.Util.Geojson) : <code>object</code>
    * [.validate(geoJsonObject, [allowedGeoObjectTypes])](#SDV.Util.Geojson.validate) ⇒ <code>optionsValidationResult</code>
    * [.isGeojson(obj)](#SDV.Util.Geojson.isGeojson) ⇒ <code>boolean</code>
    * [.getGeoObjects(geoJsonObject, validationNeeded)](#SDV.Util.Geojson.getGeoObjects) ⇒ <code>boolean</code>

<a name="SDV.Util.Validation"></a>
### Util.Validation : <code>object</code>
Base namespace for SDV.js library validation utils.All supporting validation utils are accessible through it.

**Kind**: static namespace of <code>[Util](#SDV.Util)</code>  

* [.Validation](#SDV.Util.Validation) : <code>object</code>
  * [.validateOption(validationOptions, optionValue)](#SDV.Util.Validation.validateOption) ⇒ <code>optionValidationResult</code>
  * [.validateOptions(validationOptions, options, defaults)](#SDV.Util.Validation.validateOptions) ⇒ <code>optionsValidationResult</code>
  * [.optionValidationResult](#SDV.Util.Validation.optionValidationResult) : <code>object</code>
  * [.optionsValidationResult](#SDV.Util.Validation.optionsValidationResult) : <code>object</code>
  * [.validationOptions](#SDV.Util.Validation.validationOptions) : <code>object</code>

<a name="SDV.Util.Validation.validateOption"></a>
#### Validation.validateOption(validationOptions, optionValue) ⇒ <code>optionValidationResult</code>
Validates given option with given validation rules.

**Kind**: static method of <code>[Validation](#SDV.Util.Validation)</code>  
**Returns**: <code>optionValidationResult</code> - Object contains validation results.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| validationOptions | <code>validationOptions</code> | Options contains validation rules. |
| optionValue | <code>\*</code> | Value of validating option. |

**Example**  
```javascript
var httpMethodValidationOptions = {     optionName: 'method',     isRequired: true,     allowedTypes: ['String'],     allowedValues: ['GET', 'POST', 'PUT', 'DELETE']};// It will return { isValid: false, isDefined: false, message: 'Error. Required parameter \'method\' is undefined.' }.SDV.Util.Validation.validateOption(httpMethodValidationOptions);// It will return {//    isValid: false,//    isDefined: true,//    message: 'Error. Parameter \'method\' must be of type \'[object String]\', but not of type \'[object Number]\'.'// }.SDV.Util.Validation.validateOption(httpMethodValidationOptions, 12345);// It will return {//    isValid: false,//    isDefined: true,//    message: 'Error. Parameter \'method\' must have one of the following values: ' +//             '\'GET\', \'POST\', \'PUT\', \'DELETE\'. This value is not allowed: \'MyHttpMethod\'.'// }.SDV.Util.Validation.validateOption(httpMethodValidationOptions, 'MyHttpMethod');// It will return { isValid: true, isDefined: true, message: '' }.SDV.Util.Validation.validateOption(httpMethodValidationOptions, 'GET');
```
<a name="SDV.Util.Validation.validateOptions"></a>
#### Validation.validateOptions(validationOptions, options, defaults) ⇒ <code>optionsValidationResult</code>
Validates given options-object with given set (array) of validation rules.Unlike the [validateOption](#SDV.Util.Validation.validateOption) method,this method allows to replace wrong or undefined options with given default values.

**Kind**: static method of <code>[Validation](#SDV.Util.Validation)</code>  
**Returns**: <code>optionsValidationResult</code> - Object contains validation results.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| validationOptions | <code>Array.&lt;validationOptions&gt;</code> | Array contains validation rules for each option. |
| options | <code>object</code> | Validating options. |
| defaults | <code>object</code> | Options default values. |

**Example**  
```javascript
// Option 'method' is required, but 'timeout' is not.var myValidationOptions = [{     optionName: 'method',     isRequired: true,     allowedTypes: ['String'],     allowedValues: ['GET', 'POST', 'PUT', 'DELETE']}, {     optionName: 'timeout',     allowedTypes: ['Integer'],     minValue: 0,     minValueEqualityAllowed = true,     replaceWithDefaultIfUndefined = true}];// It will return { isValid: false, message: 'Error. Required parameter \'method\' is undefined.' }.SDV.Util.Validation.validateOptions(myValidationOptions);// It will return {//    isValid: false,//    message: 'Error. Parameter \'method\' must be of type \'[object String]\', but not of type \'[object Number]\'.'// }.var options = { method: 12345 };SDV.Util.Validation.validateOptions(myValidationOptions, options);// It will return {//    isValid: false,//    message: 'Error. Parameter \'method\' must have one of the following values: ' +//             '\'GET\', \'POST\', \'PUT\', \'DELETE\'. This value is not allowed: \'MyHttpMethod\'.'// }.var options = { method: 'MyHttpMethod' };SDV.Util.Validation.validateOptions(myValidationOptions, options);// It will return { isValid: true, message: '' }. And options will be equal to: { method: 'MyHttpMethod', timeout: 0 }.var options = { method: 'GET' };var defaults = { timeout: 0 };SDV.Util.Validation.validateOptions(myValidationOptions, options, defaults);// It will return {//    isValid: false,//    message: 'Error. Parameter \'timeout\' must be of type \'[object Integer]\', but not of type \'[object Number]\'.'// }.var options = { method: 'GET', timeout: 2.5 };SDV.Util.Validation.validateOptions(myValidationOptions, options);// It will return {//    isValid: false,//    message: 'Error. Parameter \'method\' must have one of the following values: >= 0'. This value is not allowed: -1.'// }.var options = { method: 'GET', timeout: -1 };SDV.Util.Validation.s(myValidationOptions, options);// It will return { isValid: true, message: '' }.var options = { method: 'GET', timeout: 1000 };SDV.Util.Validation.validateOptions(myValidationOptions, options);
```
<a name="SDV.Util.Validation.optionValidationResult"></a>
#### Validation.optionValidationResult : <code>object</code>
Option validation result.

**Kind**: static typedef of <code>[Validation](#SDV.Util.Validation)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| isValid | <code>boolean</code> | Flag: represents if checked option is valid. |
| isDefined | <code>boolean</code> | Flag: represents if checked option is defined. |
| message | <code>string</code> | Message with error information if option is invalid, otherwise it will be an empty string. |

<a name="SDV.Util.Validation.optionsValidationResult"></a>
#### Validation.optionsValidationResult : <code>object</code>
Options validation result.

**Kind**: static typedef of <code>[Validation](#SDV.Util.Validation)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| isValid | <code>boolean</code> | Flag: represents if checked option is valid. |
| message | <code>string</code> | Message with error information if option is invalid, otherwise it will be an empty string. |

<a name="SDV.Util.Validation.validationOptions"></a>
#### Validation.validationOptions : <code>object</code>
Options contains validation rules.

**Kind**: static typedef of <code>[Validation](#SDV.Util.Validation)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| validationOptions.optionName | <code>string</code> |  | Name of validating option. |
| validationOptions.optionFullName | <code>string</code> |  | Full name of validating option (will be used instead of optionName in error message if option is invalid). |
| validationOptions.isRequired | <code>boolean</code> | <code>false</code> | Flag: represents if given option is required. |
| validationOptions.allowedTypes | <code>Array.&lt;string&gt;</code> | <code>[]</code> | Array of type names allowed for given option (allowed values for this option are following: 'String', 'Number', 'Integer', 'Boolean', 'Function', 'Object', 'Null', 'Array', 'StringArray' ,'NumberArray', 'IntegerArray', 'BooleanArray', 'FunctionArray', 'ObjectArray', 'ObjectOrNullArray'). By default all types are allowed. |
| validationOptions.allowedValues | <code>Array.&lt;object&gt;</code> | <code>[]</code> | Array of type values allowed for given option. By default all values are allowed. |
| validationOptions.minValue | <code>number</code> |  | Minimum value allowed for given option (if option is numeric). |
| validationOptions.maxValue | <code>number</code> |  | Maximum value allowed for given option (if option is numeric). |
| validationOptions.minValueEqualityAllowed | <code>boolean</code> | <code>false</code> | Flag: represents if value equals to given minValue is allowed. |
| validationOptions.maxValueEqualityAllowed | <code>boolean</code> | <code>false</code> | Flag: represents if value equals to given maxValue is allowed. |
| validationOptions.replaceWithDefaultIfUndefined | <code>boolean</code> | <code>false</code> | Flag: represents if it is possible to replace undefined option with predefined default value. |
| validationOptions.replaceWithDefaultIfInvalid | <code>boolean</code> | <code>false</code> | Flag: represents if it is possible to replace invalid option with predefined default value. |
| validationOptions.postValidationMethod | <code>function</code> |  | Custom method to be executed at the end of the validation process. It should apply one parameter - value of the validation option, and should return [optionsValidationResult](optionsValidationResult) as its result. |
| validationOptions.postValidationMethodOptions | <code>\*</code> |  | Options for postValidationMethod (method will be called with these options). |

<a name="SDV.Util.Boolean"></a>
### Util.Boolean : <code>object</code>
Base namespace for SDV.js library boolean utils.All supporting boolean utils are accessible through it.

**Kind**: static namespace of <code>[Util](#SDV.Util)</code>  
<a name="SDV.Util.Boolean.isBoolean"></a>
#### Boolean.isBoolean(obj) ⇒ <code>boolean</code>
Checks whether a given object has boolean type.

**Kind**: static method of <code>[Boolean](#SDV.Util.Boolean)</code>  
**Returns**: <code>boolean</code> - Returns true if inspected object has boolean type, otherwise returns false.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | Inspected object. |

**Example**  
```javascript
SDV.Util.Boolean.isBoolean(); // false.SDV.Util.Boolean.isBoolean(null); // false.SDV.Util.Boolean.isBoolean(1); // false.SDV.Util.Boolean.isBoolean([1]); // false.SDV.Util.Boolean.isBoolean({one: 1}); // false.SDV.Util.Boolean.isBoolean(function(){return 1;}); // false.SDV.Util.Boolean.isBoolean('This is a string'); // true.SDV.Util.Boolean.isBoolean(true); // true.SDV.Util.Boolean.isBoolean(false); // true.SDV.Util.Boolean.isBoolean(1>0); // true.
```
<a name="SDV.Util.String"></a>
### Util.String : <code>object</code>
Base namespace for SDV.js library string utils.All supporting string utils are accessible through it.

**Kind**: static namespace of <code>[Util](#SDV.Util)</code>  

* [.String](#SDV.Util.String) : <code>object</code>
  * [.isString(obj)](#SDV.Util.String.isString) ⇒ <code>boolean</code>
  * [.trim(str)](#SDV.Util.String.trim) ⇒ <code>string</code>
  * [.insert(strDist, strSrc, start, [end])](#SDV.Util.String.insert) ⇒ <code>string</code>
  * [.getWords(str)](#SDV.Util.String.getWords) ⇒ <code>Array.&lt;string&gt;</code>
  * [.transliterateCyrillicToLatin(cyrillicString)](#SDV.Util.String.transliterateCyrillicToLatin) ⇒ <code>string</code>

<a name="SDV.Util.String.isString"></a>
#### String.isString(obj) ⇒ <code>boolean</code>
Checks whether a given object is a string.

**Kind**: static method of <code>[String](#SDV.Util.String)</code>  
**Returns**: <code>boolean</code> - Returns true if inspected object is a string, otherwise returns false.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | Inspected object. |

**Example**  
```javascript
SDV.Util.String.isString(); // false.SDV.Util.String.isString(null); // false.SDV.Util.String.isString(1); // false.SDV.Util.String.isString([1]); // false.SDV.Util.String.isString({one: 1}); // false.SDV.Util.String.isString(function(){return 1;}); // false.SDV.Util.String.isString('This is a string'); // true.SDV.Util.String.isString(''); // true.
```
<a name="SDV.Util.String.trim"></a>
#### String.trim(str) ⇒ <code>string</code>
Removes whitespace from both sides of a given string.

**Kind**: static method of <code>[String](#SDV.Util.String)</code>  
**Returns**: <code>string</code> - Same string, but without spaces on both sides of it.  
**Throws**:

- <code>SyntaxError</code> Will throw an error if the given parameter is not a string.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | A string with some undesirable spaces on its sides. |

**Example**  
```javascript
SDV.Util.String.trim('   This is a string   ') // Returns 'This is a string'.
```
<a name="SDV.Util.String.insert"></a>
#### String.insert(strDist, strSrc, start, [end]) ⇒ <code>string</code>
Adds one string to another in given position/

**Kind**: static method of <code>[String](#SDV.Util.String)</code>  
**Returns**: <code>string</code> - New string with strSrc inserted into strDist.  
**Throws**:

- <code>Error</code> Will throw an error if the given strings are not strings, or if given indexes are wrong.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| strDist | <code>string</code> | A string to which ne substring will be added. |
| strSrc | <code>string</code> | A new substring which need to be added in strDist. |
| start | <code>number</code> | Index in strDist where will be the beginning of new substring. |
| [end] | <code>number</code> | Index in strDist where will be the ending of new substring. if this parameter is defined, then symbols of strDist from start to end will be replaced with new substring (strSrc), otherwise strSrc will be simply inserted into strDist without replacing. |

**Example**  
```javascript
SDV.Util.String.insert('ade', 'bc', 1) // Returns 'abcde'.SDV.Util.String.insert('ade', 'bc', 1, 2) // Returns 'abc'.SDV.Util.String.insert('adc', 'b', 1, 1) // Returns 'abc'. End is defined, and symbol 'd' was replaced.SDV.Util.String.insert('ab', 'c', 2) // Returns 'abc'. Symbol 'c' was added to the end of string.
```
<a name="SDV.Util.String.getWords"></a>
#### String.getWords(str) ⇒ <code>Array.&lt;string&gt;</code>
Splits a given string into array of words.

**Kind**: static method of <code>[String](#SDV.Util.String)</code>  
**Returns**: <code>Array.&lt;string&gt;</code> - Array of words.  
**Throws**:

- <code>SyntaxError</code> Will throw an error if the given parameter is not a string.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | A string that contains several words delimited by spaces. |

**Example**  
```javascript
SDV.Util.String.getWords('This is a string'); // Returns ['This', 'is', 'a', 'string'].SDV.Util.String.getWords(''); // Returns [].
```
<a name="SDV.Util.String.transliterateCyrillicToLatin"></a>
#### String.transliterateCyrillicToLatin(cyrillicString) ⇒ <code>string</code>
Produces string transliteration from cyrillic symbols to latin symbols.

**Kind**: static method of <code>[String](#SDV.Util.String)</code>  
**Returns**: <code>string</code> - Transliterated string contains latin symbols instead of cyrillic.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| cyrillicString | <code>string</code> | String with cyrillic symbols. |

**Example**  
```javascript
SDV.Util.String.transliterateCyrillicToLatin('Привет мир!'); // Returns 'Privet mir' (it means 'Hello world!').
```
<a name="SDV.Util.Number"></a>
### Util.Number : <code>object</code>
Base namespace for SDV.js library number utils.All supporting number utils are accessible through it.

**Kind**: static namespace of <code>[Util](#SDV.Util)</code>  

* [.Number](#SDV.Util.Number) : <code>object</code>
  * [.isNumber(obj)](#SDV.Util.Number.isNumber) ⇒ <code>boolean</code>
  * [.isInteger(obj)](#SDV.Util.Number.isInteger) ⇒ <code>boolean</code>
  * [.isEven(n)](#SDV.Util.Number.isEven) ⇒ <code>boolean</code>
  * [.isOdd(n)](#SDV.Util.Number.isOdd) ⇒ <code>boolean</code>

<a name="SDV.Util.Number.isNumber"></a>
#### Number.isNumber(obj) ⇒ <code>boolean</code>
Checks whether a given object is a number.

**Kind**: static method of <code>[Number](#SDV.Util.Number)</code>  
**Returns**: <code>boolean</code> - Returns true if inspected object is a number, otherwise returns false.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | Inspected object. |

**Example**  
```javascript
SDV.Util.Number.isNumber(); // false.SDV.Util.Number.isNumber(null); // false.SDV.Util.Number.isNumber([1]); // false.SDV.Util.Number.isNumber({one: 1}); // false.SDV.Util.Number.isNumber(function(){return 1;}); // false.SDV.Util.Number.isNumber('This is a string'); // false.SDV.Util.Number.isNumber(1); // true.SDV.Util.Number.isNumber(0.12345); // true.SDV.Util.Number.isNumber(1.2345e+10); // true.
```
<a name="SDV.Util.Number.isInteger"></a>
#### Number.isInteger(obj) ⇒ <code>boolean</code>
Checks whether a given object is an integer number.

**Kind**: static method of <code>[Number](#SDV.Util.Number)</code>  
**Returns**: <code>boolean</code> - Returns true if inspected object is an integer number, otherwise returns false.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | Inspected object. |

**Example**  
```javascript
SDV.Util.Number.isInteger(); // false.SDV.Util.Number.isInteger(null); // false.SDV.Util.Number.isInteger([1]); // false.SDV.Util.Number.isInteger({one: 1}); // false.SDV.Util.Number.isInteger(function(){return 1;}); // false.SDV.Util.Number.isInteger('This is a string'); // false.SDV.Util.Number.isInteger(1); // true.SDV.Util.Number.isInteger(-1); // true.SDV.Util.Number.isInteger(0.12345); // false.SDV.Util.Number.isInteger(1.2345e+10); // false.
```
<a name="SDV.Util.Number.isEven"></a>
#### Number.isEven(n) ⇒ <code>boolean</code>
Checks if given number is even.

**Kind**: static method of <code>[Number](#SDV.Util.Number)</code>  
**Returns**: <code>boolean</code> - Returns true if inspected number is number and it is even, otherwise returns false.  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>number</code> | inspected number. |

**Example**  
```javascript
SDV.Util.Number.isEven();   // false.SDV.Util.Number.isEven({}); // false.SDV.Util.Number.isEven(5);  // false.SDV.Util.Number.isEven(4);  // true.
```
<a name="SDV.Util.Number.isOdd"></a>
#### Number.isOdd(n) ⇒ <code>boolean</code>
Checks if given number is odd.

**Kind**: static method of <code>[Number](#SDV.Util.Number)</code>  
**Returns**: <code>boolean</code> - Returns true if inspected number is number and it is odd, otherwise returns false.  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>number</code> | inspected number. |

**Example**  
```javascript
SDV.Util.Number.isOdd();   // false.SDV.Util.Number.isOdd({}); // false.SDV.Util.Number.isOdd(4);  // false.SDV.Util.Number.isOdd(5);  // true.
```
<a name="SDV.Util.Array"></a>
### Util.Array : <code>object</code>
Base namespace for SDV.js library array utils.All supporting array utils are accessible through it.

**Kind**: static namespace of <code>[Util](#SDV.Util)</code>  

* [.Array](#SDV.Util.Array) : <code>object</code>
  * [.isArray(obj)](#SDV.Util.Array.isArray) ⇒ <code>boolean</code>
  * [.indexOf(array, searchElement, fromIndex)](#SDV.Util.Array.indexOf) ⇒ <code>int</code>
  * [.contains(array, searchElement)](#SDV.Util.Array.contains) ⇒ <code>boolean</code>
  * [.each(array, callback)](#SDV.Util.Array.each)

<a name="SDV.Util.Array.isArray"></a>
#### Array.isArray(obj) ⇒ <code>boolean</code>
Checks whether a given object is an array.

**Kind**: static method of <code>[Array](#SDV.Util.Array)</code>  
**Returns**: <code>boolean</code> - Returns true if inspected object is an array, otherwise returns false.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | Inspected object. |

**Example**  
```javascript
SDV.Util.Array.isArray(); // false.SDV.Util.Array.isArray(null); // false.SDV.Util.Array.isArray({one: 1}); // false.SDV.Util.Array.isArray(function(){return 1;}); // false.SDV.Util.Array.isArray('This is a string'); // false.SDV.Util.Array.isArray(1); // false.SDV.Util.Array.isArray([1]); // true.SDV.Util.Array.isArray([]); // true.
```
<a name="SDV.Util.Array.indexOf"></a>
#### Array.indexOf(array, searchElement, fromIndex) ⇒ <code>int</code>
Returns the first index at which a given element can be found in the given array.

**Kind**: static method of <code>[Array](#SDV.Util.Array)</code>  
**Returns**: <code>int</code> - Returns First index at which a given element can be found in the given array, or -1 if it is not present.  
**Throws**:

- <code>TypeError</code> The first argument is required and must be type of [object Array].

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array.&lt;object&gt;</code> | An array in which to search a given element. |
| searchElement | <code>object</code> | Element to locate in the given array. |
| fromIndex | <code>int</code> | The index to start the search at. |

**Example**  
```javascript
SDV.Util.Array.indexOf(); // Will throw TypeError.SDV.Util.Array.isArray([1,2,3,1]); // -1. Search element is not defined.SDV.Util.Array.isArray([1,2,3,1], 4); // -1. Search element is not present.SDV.Util.Array.isArray([1,2,3,1], 1); // 0. Search element is the first element in a given array.SDV.Util.Array.isArray([1,2,3,1], 1, 1); // 3. Search element is also the 4th element in a given array.SDV.Util.Array.isArray([1,2,3,1], 1, -1); // -1. Stat index if less then 0;SDV.Util.Array.isArray([1,2,3,1], 1, 4); // -1. Stat index if greater then a given array length;
```
<a name="SDV.Util.Array.contains"></a>
#### Array.contains(array, searchElement) ⇒ <code>boolean</code>
Returns a flag indicating whether there is a given element in the given array.

**Kind**: static method of <code>[Array](#SDV.Util.Array)</code>  
**Returns**: <code>boolean</code> - Returns true if a given element can be found in the array, or false if it is not present.  
**Throws**:

- <code>TypeError</code> The first argument is required and must be type of [object Array].

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array.&lt;object&gt;</code> | An array in which to search a given element. |
| searchElement | <code>object</code> | Element to locate in the array. |

**Example**  
```javascript
SDV.Util.Array.contains(); // Will throw TypeError.SDV.Util.Array.contains([1,2,3,1]); // false. Search element is not defined.SDV.Util.Array.contains([1,2,3,1], 4); // false. Search element is not present.SDV.Util.Array.contains([1,2,3,1], 1); // true. Search element is the first and the 4th element in a given array.
```
<a name="SDV.Util.Array.each"></a>
#### Array.each(array, callback)
Iterates over the given array elements.

**Kind**: static method of <code>[Array](#SDV.Util.Array)</code>  
**Throws**:

- <code>Error</code> Throws an error if parameters types are wrong, or if parameters are undefined.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>array</code> | The array to iterate over. |
| callback | <code>function</code> | The function that will be executed on every object, method applies three arguments: element (current element of the array), elementIndex (index of current element in whole elements array), elementsArray (array of all elements). To break iteration over array elements callback method must return exactly false value. |

**Example**  
```javascript
// It will log following strings:// 1: first// 2: second// 3: thirdSDV.Util.Array.each(['first', 'second', 'third'], function(element, elementIndex, elementsArray) {     console.log(elementIndex + ': ' + element);});
```
<a name="SDV.Util.Function"></a>
### Util.Function : <code>object</code>
Base namespace for SDV.js library function utils.All supporting function utils are accessible through it.

**Kind**: static namespace of <code>[Util](#SDV.Util)</code>  

* [.Function](#SDV.Util.Function) : <code>object</code>
  * [.isFunction(obj)](#SDV.Util.Function.isFunction) ⇒ <code>boolean</code>
  * [.bind(fn, desiredContext)](#SDV.Util.Function.bind) ⇒ <code>function</code>

<a name="SDV.Util.Function.isFunction"></a>
#### Function.isFunction(obj) ⇒ <code>boolean</code>
Checks whether a given object is a function.

**Kind**: static method of <code>[Function](#SDV.Util.Function)</code>  
**Returns**: <code>boolean</code> - Returns true if inspected object is a function, otherwise returns false.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | Inspected object. |

**Example**  
```javascript
SDV.Util.Function.isFunction(); // false.SDV.Util.Function.isFunction(null); // false.SDV.Util.Function.isFunction({one: 1}); // false.SDV.Util.Function.isFunction('This is a string'); // false.SDV.Util.Function.isFunction(1); // false.SDV.Util.Function.isFunction([1]); // false.SDV.Util.Function.isFunction(function(){return 1;}); // true.
```
<a name="SDV.Util.Function.bind"></a>
#### Function.bind(fn, desiredContext) ⇒ <code>function</code>
Binds a function to be called with a given context.

**Kind**: static method of <code>[Function](#SDV.Util.Function)</code>  
**Returns**: <code>function</code> - A given function binded to be called with a given context.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | A function which must be called. |
| desiredContext | <code>object</code> | Desired context of the call. |

**Example**  
```javascript
var printMyName = function(greeting) {    console.log((greeting || '') + 'My name is ' + this.name + '.');};SDV.Util.Function.bind(printMyName, {name: 'Jack'})(); // It will log 'My name is Jack.' to console.SDV.Util.Function.bind(printMyName, {name: 'John'})(); // It will log 'My name is John.' to console.SDV.Util.Function.bind(printMyName, {name: 'Jerry'})('Hello!'); // It will log 'Hello! My name is John.' to console.
```
<a name="SDV.Util.Object"></a>
### Util.Object : <code>object</code>
Base namespace for SDV.js library object utils.All supporting object utils are accessible through it.

**Kind**: static namespace of <code>[Util](#SDV.Util)</code>  

* [.Object](#SDV.Util.Object) : <code>object</code>
  * [.isObject(obj, [nullIsAllowed])](#SDV.Util.Object.isObject) ⇒ <code>boolean</code>
  * [.create(Desirable)](#SDV.Util.Object.create) ⇒ <code>object</code>
  * [.extend(dest, src, recursive)](#SDV.Util.Object.extend) ⇒ <code>Object</code>
  * [.getPropertiesNames(obj, [allowPrototypeProperties])](#SDV.Util.Object.getPropertiesNames) ⇒ <code>Array.&lt;string&gt;</code>
  * [.getPropertyValue(options)](#SDV.Util.Object.getPropertyValue) ⇒ <code>\*</code>
  * [.uniqueId(obj, [idProperty])](#SDV.Util.Object.uniqueId) ⇒ <code>number</code> &#124; <code>null</code>

<a name="SDV.Util.Object.isObject"></a>
#### Object.isObject(obj, [nullIsAllowed]) ⇒ <code>boolean</code>
Checks whether a given parameter is an object.

**Kind**: static method of <code>[Object](#SDV.Util.Object)</code>  
**Returns**: <code>boolean</code> - Returns true if inspected parameter is an object, otherwise returns false.  
**Access:** public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | <code>object</code> |  | Inspected parameter. |
| [nullIsAllowed] | <code>boolean</code> | <code>false</code> | Flag: allows to return true if inspected parameter is null. |

**Example**  
```javascript
SDV.Util.Object.isObject(); // false.SDV.Util.Object.isObject(null); // false.SDV.Util.Object.isObject('This is a string'); // false.SDV.Util.Object.isObject(1); // false.SDV.Util.Object.isObject([1]); // false.SDV.Util.Object.isObject(function(){return 1;}); // false.SDV.Util.Object.isObject({one: 1}); // true.SDV.Util.Object.isObject({}); // true.var allowNull = true;SDV.Util.Object.isObject(null, allowNull); // true.
```
<a name="SDV.Util.Object.create"></a>
#### Object.create(Desirable) ⇒ <code>object</code>
Creates a new object with the specified prototype.

**Kind**: static method of <code>[Object](#SDV.Util.Object)</code>  
**Returns**: <code>object</code> - New object with the specified prototype.  
**Throws**:

- <code>TypeError</code> Will throw an error if the given parameter is not an object.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| Desirable | <code>object</code> | prototype object. |

**Example**  
```javascript
var prototypeObject = {    printMyName: function() {        console.log('My name is ' + this.name + '.');    }};var newObject = SDV.Util.Object.create(prototypeObject);newObject.name = 'John';newObject.printMyName(); // It will log 'My name is John.' to console.
```
<a name="SDV.Util.Object.extend"></a>
#### Object.extend(dest, src, recursive) ⇒ <code>Object</code>
Extends an object with properties of one or more other objects.

**Kind**: static method of <code>[Object](#SDV.Util.Object)</code>  
**Returns**: <code>Object</code> - An object in which accumulated properties of other given objects.  
**Throws**:

- <code>TypeError</code> Will throw an error if the given parameter is not an object.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| dest | <code>object</code> | An object in which to accumulate properties of other given objects. |
| src | <code>object</code> | Properties source object. |
| recursive | <code>boolean</code> | Flag: indicates whether inner objects-properties must be extended too. |

**Example**  
```javascript
var dest = {one: 1, two: 2};SDV.Util.Object.extend(dest, {a: 'a', two: '1+1'}); // {one: 1, two: '1+1', a: 'a'}.var dest = {one: 1, two: {value: 2, caption: 'Two'}};// {one: 1, two: {value: 2, caption: 'THIS IS TWO!!!', binary: '10'}, a: 'a'}.SDV.Util.Object.extend(dest, {two: {caption: 'THIS IS TWO!!!', binary: '10'}, a: 'a'});
```
<a name="SDV.Util.Object.getPropertiesNames"></a>
#### Object.getPropertiesNames(obj, [allowPrototypeProperties]) ⇒ <code>Array.&lt;string&gt;</code>
Gets array of names of given object properties.

**Kind**: static method of <code>[Object](#SDV.Util.Object)</code>  
**Returns**: <code>Array.&lt;string&gt;</code> - Returns array of names of given object properties.  
**Access:** public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | <code>object</code> |  | Object of interest. |
| [allowPrototypeProperties] | <code>boolean</code> | <code>false</code> | Flag: allows to include properties of object prototype. If false, then names only of own properties will be included to result. |

**Example**  
```javascript
SDV.Util.Object.getPropertiesNames(); // [].SDV.Util.Object.getPropertiesNames(null); // [].SDV.Util.Object.getPropertiesNames('This is a string'); // [].SDV.Util.Object.getPropertiesNames(1); // [].SDV.Util.Object.getPropertiesNames([1]); // [].SDV.Util.Object.getPropertiesNames(function(){ return 1; }); // [].SDV.Util.Object.getPropertiesNames({}); // [].SDV.Util.Object.getPropertiesNames({ one: 1, two: 2 }); // ['one', 'two'].var MyClass = function() { this.one = 1; this.two = 2; };var proto = { three: 3 };MyClass.prototype = proto;var obj = new MyClass();SDV.Util.Object.getPropertiesNames(obj); // ['one', 'two'].SDV.Util.Object.getPropertiesNames(obj, true); // ['one', 'two', 'three'].
```
<a name="SDV.Util.Object.getPropertyValue"></a>
#### Object.getPropertyValue(options) ⇒ <code>\*</code>
Gets value of object property with given name.

**Kind**: static method of <code>[Object](#SDV.Util.Object)</code>  
**Returns**: <code>\*</code> - Returns value of given property, or undefined, if property doesn't exist.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Method options. |
| options.srcObject | <code>object</code> | Object of interest. |
| options.propertyName | <code>string</code> | Name of object property (all string values allowed, but be careful with dots in names). |

**Example**  
```javascript
SDV.Util.Object.getPropertyValue(); // undefined.SDV.Util.Object.getPropertyValue({ one: 1, two: 2 }); // undefined.SDV.Util.Object.getPropertyValue({ one: 1, two: '1+1' }, 'one'); // 1.SDV.Util.Object.getPropertyValue({ one: 1, two: '1+1' }, 'two'); // '1+1'.SDV.Util.Object.getPropertyValue({ one: 1, two: '1+1' }, 'two.length'); // 3 (length of '1+1' string).SDV.Util.Object.getPropertyValue({ a: 'a', b: {value: 'b'}}, 'b.value'); // 'b'.SDV.Util.Object.getPropertyValue({ a: 'a', b: {value: 'b'}}, 'b.value.length'); // '1'.SDV.Util.Object.getPropertyValue({ a: 'a', 'a.b': 'ab', 'a.b.c': {value: 'abc'}}, 'a.b.c.value'); // 'abc'.SDV.Util.Object.getPropertyValue({ a: 'a', 'a.b': 'ab', 'a.b.c': {value: 'abc'}}, 'a.b'); // 'ab'.
```
<a name="SDV.Util.Object.uniqueId"></a>
#### Object.uniqueId(obj, [idProperty]) ⇒ <code>number</code> &#124; <code>null</code>
Assigns integer unique ID to an object (unique ID is greater or equal to 0 integer number).

**Kind**: static method of <code>[Object](#SDV.Util.Object)</code>  
**Returns**: <code>number</code> &#124; <code>null</code> - New integer unique ID, or existing ID, or null if given obj properties are not assignable.  
**Access:** public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | <code>object</code> |  | An object which need to be marked with unique ID. |
| [idProperty] | <code>string</code> | <code>&quot;&#x27;uniqueId&#x27;&quot;</code> | Name of unique ID property. |

**Example**  
```javascript
var obj = {};SDV.Util.Object.uniqueId(obj); // Returns 0. And  obj now has a property obj.uniqueId == 0.var obj2 = {};SDV.Util.Object.uniqueId(obj2); // Returns 1. And  obj2 now has a property obj2.uniqueId == 1.SDV.Util.Object.uniqueId(obj); // Returns 0, because obj already has a property obj.uniqueId == 0.var obj3 = {};SDV.Util.Object.uniqueId(obj3, 'ID'); // Returns 2. And  obj3 now has a property obj3.ID == 3.SDV.Util.Object.uniqueId(obj3, 'ID'); // Returns 2, because obj3 already has a property obj.ID == 3.// Returns 4, because obj3 idProperty is not defined and obj3 doesn't have a property obj.uniqueId.SDV.Util.Object.uniqueId(obj3);
```
<a name="SDV.Util.Json"></a>
### Util.Json : <code>object</code>
Base namespace for SDV.js library JSON utils.All supporting JSON utils are accessible through it.

**Kind**: static namespace of <code>[Util](#SDV.Util)</code>  

* [.Json](#SDV.Util.Json) : <code>object</code>
  * [.parse(jsonString)](#SDV.Util.Json.parse) ⇒ <code>object</code>
  * [.stringify(value)](#SDV.Util.Json.stringify) ⇒ <code>string</code>
  * [.getFromFile(options)](#SDV.Util.Json.getFromFile) ⇒ <code>object</code>

<a name="SDV.Util.Json.parse"></a>
#### Json.parse(jsonString) ⇒ <code>object</code>
Transforms given string into JSON object.

**Kind**: static method of <code>[Json](#SDV.Util.Json)</code>  
**Returns**: <code>object</code> - Returns JSON-object, if given string contains valid stringed JSON.  
**Throws**:

- <code>SyntaxError</code> Throws a SyntaxError exception if the given string contains invalid JSON.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| jsonString | <code>string</code> | String, contains stringed JSON-information. |

**Example**  
```javascript
SDV.Util.Json.parse(); // Will throw SyntaxError.SDV.Util.Json.parse(''); // Will throw SyntaxError.// Will throw SyntaxError, because in valid stringed JSON properties names must be enclosed in double quotes.SDV.Util.Json.parse('{ property1: 1 }');SDV.Util.Json.parse('{ \"property1\": 1 }'); // Will return following JSON-object: { property1: 1 }.
```
<a name="SDV.Util.Json.stringify"></a>
#### Json.stringify(value) ⇒ <code>string</code>
Transforms given JSON-object into string, contains stringed representation of given object.Note, that all symbol-keyed properties will be completely ignored.

**Kind**: static method of <code>[Json](#SDV.Util.Json)</code>  
**Returns**: <code>string</code> - Returns string, contains stringed representation of given JSON-object.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>object</code> | JSON-object being converted to a string. |

**Example**  
```javascript
SDV.Util.Json.stringify({});                  // '{}'SDV.Util.Json.stringify(true);                // 'true'SDV.Util.Json.stringify('foo');               // '"foo"'SDV.Util.Json.stringify([1, 'false', false]); // '[1,"false",false]'SDV.Util.Json.stringify({ x: 5 });            // '{"x":5}'SDV.Util.Json.stringify({ x: 5, y: 6 });      // '{"x":5,"y":6}' or '{"y":6,"x":5}'// Symbol-keyed properties will be completely ignored:SDV.Util.Json.stringify({ x: undefined, y: Object, z: Symbol('') }); // '{}'
```
<a name="SDV.Util.Json.getFromFile"></a>
#### Json.getFromFile(options) ⇒ <code>object</code>
Makes a GET-request to address specified in 'filePath'-option, and receives JSON-object (in a case of success).In case of invalid data in file, data will be received as string instead of JSON-object.

**Kind**: static method of <code>[Json](#SDV.Util.Json)</code>  
**Returns**: <code>object</code> - Returns XMLHttpRequest-object, or ActiveXObject (for old IE versions),or XDomainRequest-object (for IE8/IE9 if given file path is cross domain URL).  
**Access:** public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  | Request options. |
| options.filePath | <code>string</code> |  | Path to target JSON-file (for most browsers it could be even cross domain URL). |
| [options.async] | <code>boolean</code> | <code>true</code> | Flag: represents if request should be asynchronous or not. |
| [options.timeout] | <code>number</code> | <code>0</code> | Request timeout (Non negative integer value). |
| options.onSuccess | <code>function</code> |  | Callback-function that handles successful request completion. |
| [options.onError] | <code>function</code> | <code>function(error, xhr) { console.error(error.message); }</code> | Callback-function that handles failed request. |

**Example**  
```javascript
// If server contains file 'myJsonFile.json' in the same path as the current page, and that file contains following data:// { "property1": 1 }, then onSuccess callback-function will receive that data and log it to console.// In the case of fail, error message will be logged to browser console.SDV.Util.Json.getFromFile({ filePath: 'myJsonFile.json', onSuccess: function(data, xhr) { console.log(data); } });
```
<a name="SDV.Util.Xml"></a>
### Util.Xml : <code>object</code>
Base namespace for SDV.js library XML utils.All supporting XML utils are accessible through it.

**Kind**: static namespace of <code>[Util](#SDV.Util)</code>  

* [.Xml](#SDV.Util.Xml) : <code>object</code>
  * [.isXml(xmlObject)](#SDV.Util.Xml.isXml) ⇒ <code>boolean</code>
  * [.parse(xmlString)](#SDV.Util.Xml.parse) ⇒ <code>object</code>
  * [.stringify(xmlObject)](#SDV.Util.Xml.stringify) ⇒ <code>string</code>
  * [.getFromFile(options)](#SDV.Util.Xml.getFromFile) ⇒ <code>object</code>

<a name="SDV.Util.Xml.isXml"></a>
#### Xml.isXml(xmlObject) ⇒ <code>boolean</code>
Checks whether a given object is an XML-document.

**Kind**: static method of <code>[Xml](#SDV.Util.Xml)</code>  
**Returns**: <code>boolean</code> - Returns true if inspected object is an XML-document, otherwise returns false.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| xmlObject | <code>object</code> | Inspected object. |

**Example**  
```javascript
SDV.Util.Xml.isXml(); // false.SDV.Util.Xml.isXml(null); // false.SDV.Util.Xml.isXml('This is a string'); // false.SDV.Util.Xml.isXml(1); // false.SDV.Util.Xml.isXml([1]); // false.SDV.Util.Xml.isXml(function(){return 1;}); // false.SDV.Util.Xml.isXml({one: 1}); // true.SDV.Util.Xml.isXml(SDV.Util.Xml.parse('<node1>1</node1>')); // true.
```
<a name="SDV.Util.Xml.parse"></a>
#### Xml.parse(xmlString) ⇒ <code>object</code>
Transforms given string into XML-document.

**Kind**: static method of <code>[Xml](#SDV.Util.Xml)</code>  
**Returns**: <code>object</code> - A [XMLDocument](https://developer.mozilla.org/en-US/docs/Web/API/XMLDocument)or common [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document)that represents the DOM tree of the XML source.  
**Throws**:

- <code>SyntaxError</code> Throws a SyntaxError exception if the given string contains invalid XML.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| xmlString | <code>string</code> | String, contains stringed XML-information. |

**Example**  
```javascript
SDV.Util.Xml.parse(); // Will throw SyntaxError.SDV.Util.Xml.parse(''); // Will throw SyntaxError.SDV.Util.Xml.parse('{ property1: 1 }'); // Will throw SyntaxError.SDV.Util.Xml.parse('<node1>1</node1>'); // Will return document, contains parsed XML: <root><node1>1</node1></root>.
```
<a name="SDV.Util.Xml.stringify"></a>
#### Xml.stringify(xmlObject) ⇒ <code>string</code>
Transforms given XML-document into string, contains stringed representation of given XML.

**Kind**: static method of <code>[Xml](#SDV.Util.Xml)</code>  
**Returns**: <code>string</code> - Returns string, contains stringed representation of given XML-document.  
**Throws**:

- <code>TypeError</code> Throws a TypeError exception if given object is not a document at all,if it is, for example, a number, or a string.
- <code>SyntaxError</code> Throws a SyntaxError exception if the given object is not valid XML-document.
- <code>Error</code> Throws common Error exception if browser don't support any XML-serialization facilities.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| xmlObject | <code>document</code> | XML-document being converted to a string. |

**Example**  
```javascript
SDV.Util.Xml.stringify();                  // It will throw TypeError.SDV.Util.Xml.stringify(true);                // It will throw TypeError.SDV.Util.Xml.stringify('foo');               // It will throw TypeError.SDV.Util.Xml.stringify([1, 'false', false]); // It will throw TypeError.SDV.Util.Xml.stringify({ x: 5 });            // It will throw TypeError.// It will throw SyntaxError, because '<node1>' isn't closed.SDV.Util.Xml.stringify(SDV.Util.Xml.parse('<node1>1</blahblah>'));// It will return '<node1>1</node1>'.SDV.Util.Xml.stringify(SDV.Util.Xml.parse('<node1>1</node1>'));
```
<a name="SDV.Util.Xml.getFromFile"></a>
#### Xml.getFromFile(options) ⇒ <code>object</code>
Makes a GET-request to address specified in 'filePath'-option, and receives XML-document (in a case of success).In case of invalid data in file, data will be received as string instead of XML-document.

**Kind**: static method of <code>[Xml](#SDV.Util.Xml)</code>  
**Returns**: <code>object</code> - Returns XMLHttpRequest-object, or ActiveXObject (for old IE versions),or XDomainRequest-object (for IE8/IE9 if given file path is cross domain URL).  
**Access:** public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  | Request options. |
| options.filePath | <code>string</code> |  | Path to target XML-document (for most browsers it could be even cross domain URL). |
| [options.async] | <code>boolean</code> | <code>true</code> | Flag: represents if request should be asynchronous or not. |
| [options.timeout] | <code>number</code> | <code>0</code> | Request timeout (Non negative integer value). |
| options.onSuccess | <code>function</code> |  | Callback-function that handles successful request completion. |
| [options.onError] | <code>function</code> | <code>function(error, xhr) { console.error(error.message); }</code> | Callback-function that handles failed request. |

**Example**  
```javascript
// If server contains file 'myXmlFile.xml' in the same path as the current page, and that file contains following data:// <node1>1</node1>, then onSuccess callback-function will receive that data and log it to console.// In the case of fail, error message will be logged to browser console.SDV.Util.Xml.getFromFile({ filePath: 'myXmlFile.xml', onSuccess: function(data, xhr) { console.log(data); } });
```
<a name="SDV.Util.Ajax"></a>
### Util.Ajax : <code>object</code>
Base namespace for SDV.js library AJAX utils.All supporting AJAX utils are accessible through it.

**Kind**: static namespace of <code>[Util](#SDV.Util)</code>  

* [.Ajax](#SDV.Util.Ajax) : <code>object</code>
  * [.isUrlCrossDomain(url)](#SDV.Util.Ajax.isUrlCrossDomain) ⇒ <code>boolean</code>
  * [.makeRequest(options)](#SDV.Util.Ajax.makeRequest) ⇒ <code>object</code>

<a name="SDV.Util.Ajax.isUrlCrossDomain"></a>
#### Ajax.isUrlCrossDomain(url) ⇒ <code>boolean</code>
Checks if given url is cross domain.

**Kind**: static method of <code>[Ajax](#SDV.Util.Ajax)</code>  
**Returns**: <code>boolean</code> - Returns true if inspected url is cross domain, otherwise returns false.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | Inspected url. |

**Example**  
```javascript
// Suppose that the current page has following address: http://localhost:63342/SpatialDataVisualization/pagesDist/examples.htmlSDV.Util.Ajax.isUrlCrossDomain(); // false, because url is undefined.SDV.Util.Ajax.isUrlCrossDomain(null); // false, because url is not a string.// It will return false, because given url is a relative path to a file on the same domain.SDV.Util.Ajax.isUrlCrossDomain('data/myXmlFile.xml');// It will return true, because protocols are different.SDV.Util.Ajax.isUrlCrossDomain('https://localhost:63342/SpatialDataVisualization/pagesDist/examples.html');// It will return true, because domains are different.SDV.Util.Ajax.isUrlCrossDomain('http://anotherhost:63342/SpatialDataVisualization/pagesDist/examples.html');// It will return true, because ports are different.SDV.Util.Ajax.isUrlCrossDomain('http://localhost:8080/SpatialDataVisualization/pagesDist/examples.html');
```
<a name="SDV.Util.Ajax.makeRequest"></a>
#### Ajax.makeRequest(options) ⇒ <code>object</code>
Makes AJAX request.

**Kind**: static method of <code>[Ajax](#SDV.Util.Ajax)</code>  
**Returns**: <code>object</code> - Returns XMLHttpRequest-object, or ActiveXObject (for old IE versions),or XDomainRequest-object (for IE8/IE9 if given file path is cross domain URL).  
**Access:** public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  | Request options. |
| options.url | <code>string</code> |  | Request URL (cross domain urls are supported even in IE8/IE9). |
| [options.method] | <code>string</code> | <code>&quot;&#x27;GET&#x27;&quot;</code> | Desirable HTTP-method for request (should be one of the followings: 'GET', 'POST', 'PUT', 'DELETE'). |
| [options.timeout] | <code>number</code> | <code>0</code> | Request timeout (should be non-negative integer number). |
| [options.async] | <code>boolean</code> | <code>true</code> | Flag: represents if request should be asynchronous or not. |
| [options.user] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | User on whose behalf the request is made. |
| [options.password] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | Password of those user on whose behalf the request is made |
| [options.headers] | <code>object</code> |  | Object with request headers (for example { "MyHeader1": 'blah blah1', "MyHeader2": 'blah blah2' }). |
| [options.requestContent] | <code>\*</code> | <code></code> | Data that will be transferred to the given URL-address (for requests such as POST, PATH, or DELETE), or will be translated to string and object's properties will be added to the URL query parameters (for GET-request). |
| [options.requestContentType] | <code>string</code> | <code>&quot;&#x27;application/x-www-form-urlencoded&#x27;&quot;</code> | Type of outgoing data (of RequestContent). See supported types [here](http://en.wikipedia.org/wiki/Internet_media_type#List_of_common_media_types). |
| [options.responseContentType] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | Desirable type of incoming data (for example, 'json', or 'document' for xml). |
| options.onSuccess | <code>function</code> |  | Callback-function to handle successful request completion (Something like this: function(data, xhr) { console.log('Successful request! Received data: '); console.log(data); }). |
| [options.onError] | <code>function</code> | <code>function(error, xhr) { console.error(error.message); }</code> | Callback-function to handle failed request. |

**Example**  
```javascript
// If server contains file 'myJsonFile.json' in the same path as the current page, and that file contains following data:// { "property1": 1 }, then onSuccess callback-function will receive that data and log it to console.// In the case of fail, error message will be logged to browser console.SDV.Util.Ajax.makeRequest({     url: 'myJsonFile.json',     method: 'GET',     onSuccess: function(data, xhr) { console.log(data); },     responseContentType: 'json'});
```
<a name="SDV.Util.Geojson"></a>
### Util.Geojson : <code>object</code>
Base namespace for SDV.js library GEOJSON utils.All supporting GEOJSON utils are accessible through it.

**Kind**: static namespace of <code>[Util](#SDV.Util)</code>  
**See**: [Learn about GEOJSON data format.](http://geojson.org/geojson-spec.html)  

* [.Geojson](#SDV.Util.Geojson) : <code>object</code>
  * [.validate(geoJsonObject, [allowedGeoObjectTypes])](#SDV.Util.Geojson.validate) ⇒ <code>optionsValidationResult</code>
  * [.isGeojson(obj)](#SDV.Util.Geojson.isGeojson) ⇒ <code>boolean</code>
  * [.getGeoObjects(geoJsonObject, validationNeeded)](#SDV.Util.Geojson.getGeoObjects) ⇒ <code>boolean</code>

<a name="SDV.Util.Geojson.validate"></a>
#### Geojson.validate(geoJsonObject, [allowedGeoObjectTypes]) ⇒ <code>optionsValidationResult</code>
Checks whether a given object is a [valid GeoJSON object](http://geojson.org/geojson-spec.html).

**Kind**: static method of <code>[Geojson](#SDV.Util.Geojson)</code>  
**Returns**: <code>optionsValidationResult</code> - Returns object contains validation results.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| geoJsonObject | <code>object</code> | Inspected object. |
| [allowedGeoObjectTypes] | <code>Array</code> | Allowed geoObjectTypes for inspected object (all types are allowed by default). |

**Example**  
```javascript
// It will return { isValid: false, message: 'Error. Required parameter 'geoJsonObject' is undefined.' }.SDV.Util.Geojson.validate();// It will return {//   isValid: false,//   message: 'Error. Parameter 'geoJsonObject' must be of type 'Object', but not of type '[object Null]'.'// }.SDV.Util.Geojson.validate(null); // Same logic for all types except plain object [object Object].// It will return {//   isValid: false,//   message: 'Error. Required parameter 'geoJsonObject.type' is undefined.'// }.SDV.Util.Geojson.validate({});// It will return {//   isValid: false,//   message: 'Error. Parameter 'geoJsonObject.type' must have one of the following values://       'Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon', 'GeometryCollection',//       'Feature', 'FeatureCollection'. This value is not allowed: 'MyType'.'// }.SDV.Util.Geojson.validate({type: 'MyType'});// It will return { isValid: false, message: 'Error. Required parameter 'geoObject.coordinates' is undefined.' }.SDV.Util.Geojson.validate({type: 'Point'});// It will return { isValid: true, message: '' }.SDV.Util.Geojson.validate({type: 'Point', coordinates: [100.0, 0.0]});
```
<a name="SDV.Util.Geojson.isGeojson"></a>
#### Geojson.isGeojson(obj) ⇒ <code>boolean</code>
Checks whether a given object is a [valid GeoJSON object](http://geojson.org/geojson-spec.html).

**Kind**: static method of <code>[Geojson](#SDV.Util.Geojson)</code>  
**Returns**: <code>boolean</code> - Returns true if inspected object is a valid GEOJSON object, otherwise returns false.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | Inspected object. |

**Example**  
```javascript
SDV.Util.Geojson.isGeojson(); // false.SDV.Util.Geojson.isGeojson(null); // false.SDV.Util.Geojson.isGeojson('This is a string'); // false.SDV.Util.Geojson.isGeojson(1); // false.SDV.Util.Geojson.isGeojson([1]); // false.SDV.Util.Geojson.isGeojson(function(){return 1;}); // false.SDV.Util.Geojson.isGeojson({one: 1}); // false.SDV.Util.Geojson.isGeojson({type: 'Point', coordinates: [100.0, 0.0]}); // true.
```
<a name="SDV.Util.Geojson.getGeoObjects"></a>
#### Geojson.getGeoObjects(geoJsonObject, validationNeeded) ⇒ <code>boolean</code>
Gets array of geo-objects contained in given GeoJSON object.

**Kind**: static method of <code>[Geojson](#SDV.Util.Geojson)</code>  
**Returns**: <code>boolean</code> - Returns array of geo-objects contained in given GeoJSON object.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| geoJsonObject | <code>object</code> | GeoJSON object of interest. |
| validationNeeded | <code>boolean</code> | Flag: indicates whether preliminary validation of given object is needed or not. |

**Example**  
```javascript
SDV.Util.Geojson.getGeoObjects(); // []. And error message in console, about invalid GeoJSON.SDV.Util.Geojson.getGeoObjects(null); // []. And error message in console, about invalid GeoJSON.SDV.Util.Geojson.getGeoObjects('This is a string'); // []. And error message in console, about invalid GeoJSON.SDV.Util.Geojson.getGeoObjects(1); // []. And error message in console, about invalid GeoJSON.SDV.Util.Geojson.getGeoObjects([1]); // []. And error message in console, about invalid GeoJSON.SDV.Util.Geojson.getGeoObjects(function(){ return 1; }); // []. And error message in console, about invalid GeoJSON.SDV.Util.Geojson.getGeoObjects({}); // []. And error message in console, about invalid GeoJSON.// [{type: 'Point', coordinates: [0.0, 1.0]}].SDV.Util.Geojson.getGeoObjects({     type: 'Point',     coordinates: [0.0, 1.0]});// [{type: 'MultiPoint', coordinates: [[0.0, 1.0], [0.0, 2.0]]}].SDV.Util.Geojson.getGeoObjects({     type: 'MultiPoint',     coordinates: [[0.0, 1.0]]});// [{type: 'LineString', coordinates: [[0.0, 1.0], [0.0, 2.0]]}].SDV.Util.Geojson.getGeoObjects({     type: 'LineString',     coordinates: [[0.0, 1.0], [0.0, 2.0]]});// [{type: 'MultiLineString', coordinates: [[[0.0, 1.0], [0.0, 2.0]], [[0.0, 1.0], [0.0, 3.0]]]}].SDV.Util.Geojson.getGeoObjects({     type: 'MultiLineString',     coordinates: [[[0.0, 1.0], [0.0, 2.0]], [[0.0, 1.0], [0.0, 3.0]]]});// [{type: 'Polygon', coordinates: [[[1.0, 0.0], [2.0, 0.0], [2.0, 1.0]]]}].SDV.Util.Geojson.getGeoObjects({     type: 'Polygon',     coordinates: [[[1.0, 0.0], [2.0, 0.0], [2.0, 1.0]]]});// [{type: 'MultiPolygon', coordinates: [[[[1.0, 0.0], [2.0, 0.0], [2.0, 1.0]]], [[[3.0, 0.0], [4.0, 0.0], [4.0, 1.0]]]]}].SDV.Util.Geojson.getGeoObjects({     type: 'MultiPolygon',     coordinates: [[[[1.0, 0.0], [2.0, 0.0], [2.0, 1.0]]], [[[3.0, 0.0], [4.0, 0.0], [4.0, 1.0]]]]});// [{type: 'Point', coordinates: [0.0, 1.0]}, {type: 'Point', coordinates: [0.0, 2.0]}].SDV.Util.Geojson.getGeoObjects({     type: 'GeometryCollection',         geometries: [{             type: 'Point',             coordinates: [0.0, 1.0]         }, {             type: 'Point',             coordinates: [0.0, 2.0]         }]});// [{type: 'Feature', geometry: {type: 'Point', coordinates: [0.0, 1.0]}, properties: {property1: 1, property2: 2}}].SDV.Util.Geojson.getGeoObjects({     type: 'Feature',     geometry: {         type: 'Point',         coordinates: [0.0, 1.0]     },     properties: {         property1: 1,         property2: 2     }});// [{type: 'Feature', geometry: {type: 'Point', coordinates: [0.0, 1.0]}, properties: {property1: 1, property2: 2}},//  {type: 'Feature', geometry: {type: 'Point', coordinates: [0.0, 2.0]}, properties: {property1: '1', property2: '2'}}].SDV.Util.Geojson.getGeoObjects({     type: 'FeatureCollection',     features: [{         type: 'Feature',         geometry: {             type: 'Point',             coordinates: [0.0, 1.0]         },         properties: {             property1: 1,             property2: 2         }     }, {         type: 'Feature',         geometry: {             type: 'Point',             coordinates: [0.0, 2.0]         },         properties: {             property1: '1',             property2: '2'         }     }]});
```
<a name="SDV.Localization"></a>
## SDV.Localization : <code>object</code>
Base namespace for SDV.js library localization methods.Localization methods are designed to add to the library string resources in different languages,and then get access to them.As the examples of such resources can act error messages.

**Kind**: static namespace of <code>[SDV](#SDV)</code>  

* [.Localization](#SDV.Localization) : <code>object</code>
  * [.getResource(resourceName, [locale])](#SDV.Localization.getResource) ⇒ <code>\*</code> &#124; <code>undefined</code>
  * [.getCurrentLanguage()](#SDV.Localization.getCurrentLanguage) ⇒ <code>string</code>
  * [.getDefaultLanguage()](#SDV.Localization.getDefaultLanguage) ⇒ <code>string</code>
  * [.setCurrentLanguage(locale)](#SDV.Localization.setCurrentLanguage)
  * [.extend(options)](#SDV.Localization.extend) ⇒ <code>boolean</code>

<a name="SDV.Localization.getResource"></a>
### Localization.getResource(resourceName, [locale]) ⇒ <code>\*</code> &#124; <code>undefined</code>
Gets requested localized resource by its name and desired language locale name (locale is optional).

**Kind**: static method of <code>[Localization](#SDV.Localization)</code>  
**Returns**: <code>\*</code> &#124; <code>undefined</code> - Returns desired localized resource, or undefined if desirable dictionary doesn't exist.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| resourceName | <code>string</code> | Name of desired localized resource. |
| [locale] | <code>string</code> | Language of desired dictionary (by default equals to current language (if it is setted), or to default language - language of the first added dictionary). |

**Example**  
```javascript
// It will log 'Hello, world!' to console.// Because initially english language is used as current and as default.console.log(SDV.Localization.getResource('greeting'));// It will log 'Привет, мир!' to console.console.log(SDV.Localization.getResource('greeting', 'ru'));
```
<a name="SDV.Localization.getCurrentLanguage"></a>
### Localization.getCurrentLanguage() ⇒ <code>string</code>
Returns locale of current library language.

**Kind**: static method of <code>[Localization](#SDV.Localization)</code>  
**Returns**: <code>string</code> - Returns locale of current library language.  
**Access:** public  
<a name="SDV.Localization.getDefaultLanguage"></a>
### Localization.getDefaultLanguage() ⇒ <code>string</code>
Returns locale of default library language.

**Kind**: static method of <code>[Localization](#SDV.Localization)</code>  
**Returns**: <code>string</code> - Returns locale of default library language.  
**Access:** public  
<a name="SDV.Localization.setCurrentLanguage"></a>
### Localization.setCurrentLanguage(locale)
Sets locale of current library language.

**Kind**: static method of <code>[Localization](#SDV.Localization)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| locale | <code>string</code> | Language of one of already existing dictionaries. |

<a name="SDV.Localization.extend"></a>
### Localization.extend(options) ⇒ <code>boolean</code>
Extends existing localized string resources with given localization extension.

**Kind**: static method of <code>[Localization](#SDV.Localization)</code>  
**Returns**: <code>boolean</code> - Returns true if given localization dictionary was added successfully, otherwise returns false.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Localization extension options. |
| options.locale | <code>string</code> | Locale of given localization extension. |
| options.setAsCurrent | <code>boolean</code> | Flag: is it necessary to set up given localization extension as current. |
| options.dictionary | <code>object</code> | Dictionary containing localized string resources. |

**Example**  
```javascript
SDV.Localization.extend({locale: 'en', setAsCurrent: true, dictionary: {greeting: 'Hello, world!'}});console.log(SDV.Localization.getResource('greeting')); // It will log 'Hello, world!' to console.// Secondary extension will not remove existing resources, existing dictionary will be extended.// So you can add additional resources to already existing dictionaries.SDV.Localization.extend({locale: 'en', dictionary: {greeting2: 'Hello, world again!'}});console.log(SDV.Localization.getResource('greeting')); // It will log 'Hello, world!' to console.console.log(SDV.Localization.getResource('greeting2')); // It will log 'Hello, world again!' to console.
```
<a name="SDV.Enumerable"></a>
## SDV.Enumerable : <code>object</code>
Base namespace for SDV.js library LINQ-like enumerable facilities.All supporting LINQ-like enumerable facilities are accessible through it.

**Kind**: static namespace of <code>[SDV](#SDV)</code>  

* [.Enumerable](#SDV.Enumerable) : <code>object</code>
  * [.create(items)](#SDV.Enumerable.create) ⇒ <code>[Enumerable](#Enumerable)</code>
  * [.isEnumerable(obj)](#SDV.Enumerable.isEnumerable) ⇒ <code>boolean</code>

<a name="SDV.Enumerable.create"></a>
### Enumerable.create(items) ⇒ <code>[Enumerable](#Enumerable)</code>
[Enumerable](#Enumerable) factory-method. It is an entry point to library LINQ-like enumerable facilities.

**Kind**: static method of <code>[Enumerable](#SDV.Enumerable)</code>  
**Returns**: <code>[Enumerable](#Enumerable)</code> - Returns new instance of [Enumerable](#Enumerable) if given items-parameter is array, otherwise returns null.  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>Array</code> | Array, which need to be transformed into [Enumerable](#Enumerable). |

<a name="SDV.Enumerable.isEnumerable"></a>
### Enumerable.isEnumerable(obj) ⇒ <code>boolean</code>
Checks if given object is instance of [Enumerable](#Enumerable).

**Kind**: static method of <code>[Enumerable](#SDV.Enumerable)</code>  
**Returns**: <code>boolean</code> - Returns true if given object is instance of [Enumerable](#Enumerable), otherwise returns false.  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Inspected object. |

**Example**  
```javascript
var integersEnumerable = SDV.Enumerable.create([1, 2, 3,4 , 5]);SDV.Enumerable.isEnumerable(); // false.SDV.Enumerable.isEnumerable(null); // false.SDV.Enumerable.isEnumerable('enumerable'); // false.SDV.Enumerable.isEnumerable({}); // false.SDV.Enumerable.isEnumerable([1, 2, 3, 4, 5]); // false.SDV.Enumerable.isEnumerable(integersEnumerable); // true.
```
<a name="SDV.Condition"></a>
## SDV.Condition : <code>object</code>
Base namespace for SDV.js library templated conditions utils.All supporting templated conditions utils are accessible through it.

**Kind**: static namespace of <code>[SDV](#SDV)</code>  

* [.Condition](#SDV.Condition) : <code>object</code>
  * [.parse(condition)](#SDV.Condition.parse) ⇒ <code>conditionParseResult</code>
  * [.create(condition)](#SDV.Condition.create) ⇒ <code>[Condition](#Condition)</code> &#124; <code>null</code>
  * [.isCondition(obj, allowString)](#SDV.Condition.isCondition) ⇒ <code>boolean</code>
  * [.parsedTemplate](#SDV.Condition.parsedTemplate) : <code>object</code>
  * [.conditionParseResult](#SDV.Condition.conditionParseResult) : <code>object</code>

<a name="SDV.Condition.parse"></a>
### Condition.parse(condition) ⇒ <code>conditionParseResult</code>
Checks whether a given object is a valid templated condition.

**Kind**: static method of <code>[Condition](#SDV.Condition)</code>  
**Returns**: <code>conditionParseResult</code> - Returns object contains validation results.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| condition | <code>string</code> | Templated condition to parse. |

**Example**  
```javascript
// It will return { isValid: false, message: 'Error. Required parameter 'condition' is undefined.', templates: null }.SDV.Condition.parse();// It will return {//   isValid: false,//   message: 'Error. Parameter 'condition' must be of type 'String', but not of type '[object Null]'.',//   templates: null// }.SDV.Condition.parse(null); // Same logic for all types except string.// It will return {//   isValid: true,//   message: '',//   templates: []// }.SDV.Condition.parse('');// It will return {//   isValid: true,//   message: '',//   templates: [{ start: 0, end: 6, propertyName: 'a.b' }]// }.SDV.Condition.parse('{{a.b}} > 5');
```
<a name="SDV.Condition.create"></a>
### Condition.create(condition) ⇒ <code>[Condition](#Condition)</code> &#124; <code>null</code>
[Condition](#Condition) factory-method. It is an entry point to library templated conditions facilities.

**Kind**: static method of <code>[Condition](#SDV.Condition)</code>  
**Returns**: <code>[Condition](#Condition)</code> &#124; <code>null</code> - Returns new instance of [Condition](#Condition) if given condition is valid, otherwise returns null.  

| Param | Type | Description |
| --- | --- | --- |
| condition | <code>string</code> | Templated condition. |

**Example**  
```javascript
// null.var conditionInstance = SDV.Condition.create();// nullvar conditionInstance = SDV.Condition.create(null);// Creates white color RGB representation from its stringed name.var conditionInstance = SDV.Condition.create('{{properties.area}} >= 100 && {{properties.area}} <= 200');
```
<a name="SDV.Condition.isCondition"></a>
### Condition.isCondition(obj, allowString) ⇒ <code>boolean</code>
Checks whether a given object is a valid templated condition.

**Kind**: static method of <code>[Condition](#SDV.Condition)</code>  
**Returns**: <code>boolean</code> - Returns true if inspected object is a valid templated condition, otherwise returns false.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Inspected object. |
| allowString | <code>boolean</code> | Flag: indicates whether unparsed condition string is allowed. |

**Example**  
```javascript
SDV.Condition.isCondition(); // false.SDV.Condition.isCondition(null); // false.SDV.Condition.isCondition('2 > 1'); // false.SDV.Condition.isCondition('2 > 1', true); // true.SDV.Condition.isCondition('{{myOption}} > 1', true); // true.SDV.Condition.isCondition('{{myOption1}} > 1 && {{myOption2}, true} < 2'); // true.SDV.Condition.isCondition('({{myOption1}} + {{myOption2}}) < 2', true); // true.SDV.Condition.isCondition('Math.Max({{myOption1}}, {{myOption2}}, true) == {{myOption1}}'); // true.SDV.Condition.isCondition('{{myOption.mySubOption}} > 1', true); // true.var conditionInstance = SDV.Condition.create('{{myOption}} > 1');SDV.Condition.isCondition(conditionInstance); // true.
```
<a name="SDV.Condition.parsedTemplate"></a>
### Condition.parsedTemplate : <code>object</code>
Parsed template.

**Kind**: static typedef of <code>[Condition](#SDV.Condition)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| start | <code>number</code> | Template start index in condition string. |
| end | <code>number</code> | Template end index in condition string. |
| propertyName | <code>string</code> | propertyName contained inside the template. |

**Example**  
```javascript
// For condition '{{a.b}} > 5' it will be next object.{ start: 0, end: 6, propertyName: 'a.b' };
```
<a name="SDV.Condition.conditionParseResult"></a>
### Condition.conditionParseResult : <code>object</code>
Condition parse result.

**Kind**: static typedef of <code>[Condition](#SDV.Condition)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| isValid | <code>boolean</code> | Flag: represents if parsed condition is valid. |
| message | <code>string</code> | Message with error information if condition is invalid, otherwise it will be an empty string. |
| templates | <code>Array.&lt;parsedTemplate&gt;</code> | Array of parsed templates, |

**Example**  
```javascript
// For condition '{{a.b}} > 5 || {{c.d}} < 10' it will be next array.[{ start: 0, end: 6, propertyName: 'a.b' }, { start: 15, end: 21, propertyName: 'c.d' }];
```
<a name="SDV.Color"></a>
## SDV.Color : <code>object</code>
Base namespace for SDV.js library capabilities for working with colors.All supporting colors capabilities are accessible through it.

**Kind**: static namespace of <code>[SDV](#SDV)</code>  

* [.Color](#SDV.Color) : <code>object</code>
  * [.Model](#SDV.Color.Model) : <code>object</code>
    * [.Hex](#SDV.Color.Model.Hex) : <code>object</code>
      * [.Code](#SDV.Color.Model.Hex.Code) : <code>enum</code>
      * [.create(colorDefinition)](#SDV.Color.Model.Hex.create) ⇒ <code>string</code> &#124; <code>null</code>
      * [.isHex(obj)](#SDV.Color.Model.Hex.isHex) ⇒ <code>boolean</code>
    * [.Rgb](#SDV.Color.Model.Rgb) : <code>object</code>
      * [.create(colorDefinition)](#SDV.Color.Model.Rgb.create) ⇒ <code>[Rgb](#Rgb)</code> &#124; <code>null</code>
      * [.isRgb(obj)](#SDV.Color.Model.Rgb.isRgb) ⇒ <code>boolean</code>
    * [.Hsl](#SDV.Color.Model.Hsl) : <code>object</code>
      * [.create(colorDefinition)](#SDV.Color.Model.Hsl.create) ⇒ <code>[Hsl](#Hsl)</code> &#124; <code>null</code>
      * [.isHsl(obj)](#SDV.Color.Model.Hsl.isHsl) ⇒ <code>boolean</code>
    * [.Hsb](#SDV.Color.Model.Hsb) : <code>object</code>
      * [.create(colorDefinition)](#SDV.Color.Model.Hsb.create) ⇒ <code>[Hsb](#Hsb)</code>
      * [.isHsb(obj)](#SDV.Color.Model.Hsb.isHsb) ⇒ <code>boolean</code>
  * [.create(colorDefinition)](#SDV.Color.create) ⇒ <code>[Color](#Color)</code>
  * [.isColor(obj)](#SDV.Color.isColor) ⇒ <code>boolean</code>
  * [.random([options])](#SDV.Color.random) ⇒ <code>string</code> &#124; <code>Array.&lt;string&gt;</code> &#124; <code>null</code>

<a name="SDV.Color.Model"></a>
### Color.Model : <code>object</code>
Base namespace for SDV.js library color representation models.All supporting color representation models are accessible through it.

**Kind**: static namespace of <code>[Color](#SDV.Color)</code>  

* [.Model](#SDV.Color.Model) : <code>object</code>
  * [.Hex](#SDV.Color.Model.Hex) : <code>object</code>
    * [.Code](#SDV.Color.Model.Hex.Code) : <code>enum</code>
    * [.create(colorDefinition)](#SDV.Color.Model.Hex.create) ⇒ <code>string</code> &#124; <code>null</code>
    * [.isHex(obj)](#SDV.Color.Model.Hex.isHex) ⇒ <code>boolean</code>
  * [.Rgb](#SDV.Color.Model.Rgb) : <code>object</code>
    * [.create(colorDefinition)](#SDV.Color.Model.Rgb.create) ⇒ <code>[Rgb](#Rgb)</code> &#124; <code>null</code>
    * [.isRgb(obj)](#SDV.Color.Model.Rgb.isRgb) ⇒ <code>boolean</code>
  * [.Hsl](#SDV.Color.Model.Hsl) : <code>object</code>
    * [.create(colorDefinition)](#SDV.Color.Model.Hsl.create) ⇒ <code>[Hsl](#Hsl)</code> &#124; <code>null</code>
    * [.isHsl(obj)](#SDV.Color.Model.Hsl.isHsl) ⇒ <code>boolean</code>
  * [.Hsb](#SDV.Color.Model.Hsb) : <code>object</code>
    * [.create(colorDefinition)](#SDV.Color.Model.Hsb.create) ⇒ <code>[Hsb](#Hsb)</code>
    * [.isHsb(obj)](#SDV.Color.Model.Hsb.isHsb) ⇒ <code>boolean</code>

<a name="SDV.Color.Model.Hex"></a>
#### Model.Hex : <code>object</code>
Base namespace for SDV.js library HEX color representation model.All supporting HEX model facilities are accessible through it.

**Kind**: static namespace of <code>[Model](#SDV.Color.Model)</code>  

* [.Hex](#SDV.Color.Model.Hex) : <code>object</code>
  * [.Code](#SDV.Color.Model.Hex.Code) : <code>enum</code>
  * [.create(colorDefinition)](#SDV.Color.Model.Hex.create) ⇒ <code>string</code> &#124; <code>null</code>
  * [.isHex(obj)](#SDV.Color.Model.Hex.isHex) ⇒ <code>boolean</code>

<a name="SDV.Color.Model.Hex.Code"></a>
##### Hex.Code : <code>enum</code>
Enum containing hex-codes of all major web-colors.

**Kind**: static enum property of <code>[Hex](#SDV.Color.Model.Hex)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| black | <code>string</code> | <code>&quot;#000000&quot;</code> | '#000000' |
| navy | <code>string</code> | <code>&quot;#000080&quot;</code> | '#000080' |
| darkblue | <code>string</code> | <code>&quot;#00008b&quot;</code> | '#00008b' |
| mediumblue | <code>string</code> | <code>&quot;#0000cd&quot;</code> | '#0000cd' |
| blue | <code>string</code> | <code>&quot;#0000ff&quot;</code> | '#0000ff' |
| darkgreen | <code>string</code> | <code>&quot;#006400&quot;</code> | '#006400' |
| green | <code>string</code> | <code>&quot;#008000&quot;</code> | '#008000' |
| teal | <code>string</code> | <code>&quot;#008080&quot;</code> | '#008080' |
| darkcyan | <code>string</code> | <code>&quot;#008b8b&quot;</code> | '#008b8b' |
| deepskyblue | <code>string</code> | <code>&quot;#00bfff&quot;</code> | '#00bfff' |
| darkturquoise | <code>string</code> | <code>&quot;#00ced1&quot;</code> | '#00ced1' |
| mediumspringgreen | <code>string</code> | <code>&quot;#00fa9a&quot;</code> | '#00fa9a' |
| lime | <code>string</code> | <code>&quot;#00ff00&quot;</code> | '#00ff00' |
| springgreen | <code>string</code> | <code>&quot;#00ff7f&quot;</code> | '#00ff7f' |
| aqua | <code>string</code> | <code>&quot;#00ffff&quot;</code> | '#00ffff' |
| cyan | <code>string</code> | <code>&quot;#00ffff&quot;</code> | '#00ffff' |
| midnightblue | <code>string</code> | <code>&quot;#191970&quot;</code> | '#191970' |
| dodgerblue | <code>string</code> | <code>&quot;#1e90ff&quot;</code> | '#1e90ff' |
| lightseagreen | <code>string</code> | <code>&quot;#20b2aa&quot;</code> | '#20b2aa' |
| forestgreen | <code>string</code> | <code>&quot;#228b22&quot;</code> | '#228b22' |
| seagreen | <code>string</code> | <code>&quot;#2e8b57&quot;</code> | '#2e8b57' |
| darkslategrey | <code>string</code> | <code>&quot;#2f4f4f&quot;</code> | '#2f4f4f' |
| darkslategray | <code>string</code> | <code>&quot;#2f4f4f&quot;</code> | '#2f4f4f' |
| limegreen | <code>string</code> | <code>&quot;#32cd32&quot;</code> | '#32cd32' |
| mediumseagreen | <code>string</code> | <code>&quot;#3cb371&quot;</code> | '#3cb371' |
| turquoise | <code>string</code> | <code>&quot;#40e0d0&quot;</code> | '#40e0d0' |
| royalblue | <code>string</code> | <code>&quot;#4169e1&quot;</code> | '#4169e1' |
| steelblue | <code>string</code> | <code>&quot;#4682b4&quot;</code> | '#4682b4' |
| darkslateblue | <code>string</code> | <code>&quot;#483d8b&quot;</code> | '#483d8b' |
| mediumturquoise | <code>string</code> | <code>&quot;#48d1cc&quot;</code> | '#48d1cc' |
| indigo | <code>string</code> | <code>&quot;#4b0082&quot;</code> | '#4b0082' |
| darkolivegreen | <code>string</code> | <code>&quot;#556b2f&quot;</code> | '#556b2f' |
| cadetblue | <code>string</code> | <code>&quot;#5f9ea0&quot;</code> | '#5f9ea0' |
| cornflowerblue | <code>string</code> | <code>&quot;#6495ed&quot;</code> | '#6495ed' |
| mediumaquamarine | <code>string</code> | <code>&quot;#66cdaa&quot;</code> | '#66cdaa' |
| dimgray | <code>string</code> | <code>&quot;#696969&quot;</code> | '#696969' |
| dimgrey | <code>string</code> | <code>&quot;#696969&quot;</code> | '#696969' |
| slateblue | <code>string</code> | <code>&quot;#6a5acd&quot;</code> | '#6a5acd' |
| olivedrab | <code>string</code> | <code>&quot;#6b8e23&quot;</code> | '#6b8e23' |
| slategrey | <code>string</code> | <code>&quot;#708090&quot;</code> | '#708090' |
| slategray | <code>string</code> | <code>&quot;#708090&quot;</code> | '#708090' |
| lightslategrey | <code>string</code> | <code>&quot;#778899&quot;</code> | '#778899' |
| lightslategray | <code>string</code> | <code>&quot;#778899&quot;</code> | '#778899' |
| mediumslateblue | <code>string</code> | <code>&quot;#7b68ee&quot;</code> | '#7b68ee' |
| lawngreen | <code>string</code> | <code>&quot;#7cfc00&quot;</code> | '#7cfc00' |
| chartreuse | <code>string</code> | <code>&quot;#7fff00&quot;</code> | '#7fff00' |
| aquamarine | <code>string</code> | <code>&quot;#7fffd4&quot;</code> | '#7fffd4' |
| maroon | <code>string</code> | <code>&quot;#800000&quot;</code> | '#800000' |
| purple | <code>string</code> | <code>&quot;#800080&quot;</code> | '#800080' |
| olive | <code>string</code> | <code>&quot;#808000&quot;</code> | '#808000' |
| gray | <code>string</code> | <code>&quot;#808080&quot;</code> | '#808080' |
| grey | <code>string</code> | <code>&quot;#808080&quot;</code> | '#808080' |
| skyblue | <code>string</code> | <code>&quot;#87ceeb&quot;</code> | '#87ceeb' |
| lightskyblue | <code>string</code> | <code>&quot;#87cefa&quot;</code> | '#87cefa' |
| blueviolet | <code>string</code> | <code>&quot;#8a2be2&quot;</code> | '#8a2be2' |
| darkred | <code>string</code> | <code>&quot;#8b0000&quot;</code> | '#8b0000' |
| darkmagenta | <code>string</code> | <code>&quot;#8b008b&quot;</code> | '#8b008b' |
| saddlebrown | <code>string</code> | <code>&quot;#8b4513&quot;</code> | '#8b4513' |
| darkseagreen | <code>string</code> | <code>&quot;#8fbc8f&quot;</code> | '#8fbc8f' |
| lightgreen | <code>string</code> | <code>&quot;#90ee90&quot;</code> | '#90ee90' |
| mediumpurple | <code>string</code> | <code>&quot;#9370db&quot;</code> | '#9370db' |
| darkviolet | <code>string</code> | <code>&quot;#9400d3&quot;</code> | '#9400d3' |
| palegreen | <code>string</code> | <code>&quot;#98fb98&quot;</code> | '#98fb98' |
| darkorchid | <code>string</code> | <code>&quot;#9932cc&quot;</code> | '#9932cc' |
| yellowgreen | <code>string</code> | <code>&quot;#9acd32&quot;</code> | '#9acd32' |
| sienna | <code>string</code> | <code>&quot;#a0522d&quot;</code> | '#a0522d' |
| brown | <code>string</code> | <code>&quot;#a52a2a&quot;</code> | '#a52a2a' |
| darkgray | <code>string</code> | <code>&quot;#a9a9a9&quot;</code> | '#a9a9a9' |
| darkgrey | <code>string</code> | <code>&quot;#a9a9a9&quot;</code> | '#a9a9a9' |
| lightblue | <code>string</code> | <code>&quot;#add8e6&quot;</code> | '#add8e6' |
| greenyellow | <code>string</code> | <code>&quot;#adff2f&quot;</code> | '#adff2f' |
| paleturquoise | <code>string</code> | <code>&quot;#afeeee&quot;</code> | '#afeeee' |
| lightsteelblue | <code>string</code> | <code>&quot;#b0c4de&quot;</code> | '#b0c4de' |
| powderblue | <code>string</code> | <code>&quot;#b0e0e6&quot;</code> | '#b0e0e6' |
| firebrick | <code>string</code> | <code>&quot;#b22222&quot;</code> | '#b22222' |
| darkgoldenrod | <code>string</code> | <code>&quot;#b8860b&quot;</code> | '#b8860b' |
| mediumorchid | <code>string</code> | <code>&quot;#ba55d3&quot;</code> | '#ba55d3' |
| rosybrown | <code>string</code> | <code>&quot;#bc8f8f&quot;</code> | '#bc8f8f' |
| darkkhaki | <code>string</code> | <code>&quot;#bdb76b&quot;</code> | '#bdb76b' |
| silver | <code>string</code> | <code>&quot;#c0c0c0&quot;</code> | '#c0c0c0' |
| mediumvioletred | <code>string</code> | <code>&quot;#c71585&quot;</code> | '#c71585' |
| indianred | <code>string</code> | <code>&quot;#cd5c5c&quot;</code> | '#cd5c5c' |
| peru | <code>string</code> | <code>&quot;#cd853f&quot;</code> | '#cd853f' |
| chocolate | <code>string</code> | <code>&quot;#d2691e&quot;</code> | '#d2691e' |
| tan | <code>string</code> | <code>&quot;#d2b48c&quot;</code> | '#d2b48c' |
| lightgray | <code>string</code> | <code>&quot;#d3d3d3&quot;</code> | '#d3d3d3' |
| lightgrey | <code>string</code> | <code>&quot;#d3d3d3&quot;</code> | '#d3d3d3' |
| thistle | <code>string</code> | <code>&quot;#d8bfd8&quot;</code> | '#d8bfd8' |
| orchid | <code>string</code> | <code>&quot;#da70d6&quot;</code> | '#da70d6' |
| goldenrod | <code>string</code> | <code>&quot;#daa520&quot;</code> | '#daa520' |
| palevioletred | <code>string</code> | <code>&quot;#db7093&quot;</code> | '#db7093' |
| crimson | <code>string</code> | <code>&quot;#dc143c&quot;</code> | '#dc143c' |
| gainsboro | <code>string</code> | <code>&quot;#dcdcdc&quot;</code> | '#dcdcdc' |
| plum | <code>string</code> | <code>&quot;#dda0dd&quot;</code> | '#dda0dd' |
| burlywood | <code>string</code> | <code>&quot;#deb887&quot;</code> | '#deb887' |
| lightcyan | <code>string</code> | <code>&quot;#e0ffff&quot;</code> | '#e0ffff' |
| lavender | <code>string</code> | <code>&quot;#e6e6fa&quot;</code> | '#e6e6fa' |
| darksalmon | <code>string</code> | <code>&quot;#e9967a&quot;</code> | '#e9967a' |
| violet | <code>string</code> | <code>&quot;#ee82ee&quot;</code> | '#ee82ee' |
| palegoldenrod | <code>string</code> | <code>&quot;#eee8aa&quot;</code> | '#eee8aa' |
| lightcoral | <code>string</code> | <code>&quot;#f08080&quot;</code> | '#f08080' |
| khaki | <code>string</code> | <code>&quot;#f0e68c&quot;</code> | '#f0e68c' |
| aliceblue | <code>string</code> | <code>&quot;#f0f8ff&quot;</code> | '#f0f8ff' |
| honeydew | <code>string</code> | <code>&quot;#f0fff0&quot;</code> | '#f0fff0' |
| azure | <code>string</code> | <code>&quot;#f0ffff&quot;</code> | '#f0ffff' |
| sandybrown | <code>string</code> | <code>&quot;#f4a460&quot;</code> | '#f4a460' |
| wheat | <code>string</code> | <code>&quot;#f5deb3&quot;</code> | '#f5deb3' |
| beige | <code>string</code> | <code>&quot;#f5f5dc&quot;</code> | '#f5f5dc' |
| whitesmoke | <code>string</code> | <code>&quot;#f5f5f5&quot;</code> | '#f5f5f5' |
| mintcream | <code>string</code> | <code>&quot;#f5fffa&quot;</code> | '#f5fffa' |
| ghostwhite | <code>string</code> | <code>&quot;#f8f8ff&quot;</code> | '#f8f8ff' |
| salmon | <code>string</code> | <code>&quot;#fa8072&quot;</code> | '#fa8072' |
| antiquewhite | <code>string</code> | <code>&quot;#faebd7&quot;</code> | '#faebd7' |
| linen | <code>string</code> | <code>&quot;#faf0e6&quot;</code> | '#faf0e6' |
| lightgoldenrodyellow | <code>string</code> | <code>&quot;#fafad2&quot;</code> | '#fafad2' |
| oldlace | <code>string</code> | <code>&quot;#fdf5e6&quot;</code> | '#fdf5e6' |
| red | <code>string</code> | <code>&quot;#ff0000&quot;</code> | '#ff0000' |
| magenta | <code>string</code> | <code>&quot;#ff00ff&quot;</code> | '#ff00ff' |
| fuchsia | <code>string</code> | <code>&quot;#ff00ff&quot;</code> | '#ff00ff' |
| deeppink | <code>string</code> | <code>&quot;#ff1493&quot;</code> | '#ff1493' |
| orangered | <code>string</code> | <code>&quot;#ff4500&quot;</code> | '#ff4500' |
| tomato | <code>string</code> | <code>&quot;#ff6347&quot;</code> | '#ff6347' |
| hotpink | <code>string</code> | <code>&quot;#ff69b4&quot;</code> | '#ff69b4' |
| coral | <code>string</code> | <code>&quot;#ff7f50&quot;</code> | '#ff7f50' |
| darkorange | <code>string</code> | <code>&quot;#ff8c00&quot;</code> | '#ff8c00' |
| lightsalmon | <code>string</code> | <code>&quot;#ffa07a&quot;</code> | '#ffa07a' |
| orange | <code>string</code> | <code>&quot;#ffa500&quot;</code> | '#ffa500' |
| lightpink | <code>string</code> | <code>&quot;#ffb6c1&quot;</code> | '#ffb6c1' |
| pink | <code>string</code> | <code>&quot;#ffc0cb&quot;</code> | '#ffc0cb' |
| gold | <code>string</code> | <code>&quot;#ffd700&quot;</code> | '#ffd700' |
| peachpuff | <code>string</code> | <code>&quot;#ffdab9&quot;</code> | '#ffdab9' |
| navajowhite | <code>string</code> | <code>&quot;#ffdead&quot;</code> | '#ffdead' |
| moccasin | <code>string</code> | <code>&quot;#ffe4b5&quot;</code> | '#ffe4b5' |
| bisque | <code>string</code> | <code>&quot;#ffe4c4&quot;</code> | '#ffe4c4' |
| mistyrose | <code>string</code> | <code>&quot;#ffe4e1&quot;</code> | '#ffe4e1' |
| blanchedalmond | <code>string</code> | <code>&quot;#ffebcd&quot;</code> | '#ffebcd' |
| papayawhip | <code>string</code> | <code>&quot;#ffefd5&quot;</code> | '#ffefd5' |
| lavenderblush | <code>string</code> | <code>&quot;#fff0f5&quot;</code> | '#fff0f5' |
| seashell | <code>string</code> | <code>&quot;#fff5ee&quot;</code> | '#fff5ee' |
| cornsilk | <code>string</code> | <code>&quot;#fff8dc&quot;</code> | '#fff8dc' |
| lemonchiffon | <code>string</code> | <code>&quot;#fffacd&quot;</code> | '#fffacd' |
| floralwhite | <code>string</code> | <code>&quot;#fffaf0&quot;</code> | '#fffaf0' |
| snow | <code>string</code> | <code>&quot;#fffafa&quot;</code> | '#fffafa' |
| yellow | <code>string</code> | <code>&quot;#ffff00&quot;</code> | '#ffff00' |
| lightyellow | <code>string</code> | <code>&quot;#ffffe0&quot;</code> | '#ffffe0' |
| ivory | <code>string</code> | <code>&quot;#fffff0&quot;</code> | '#fffff0' |
| white | <code>string</code> | <code>&quot;#ffffff&quot;</code> | '#ffffff' |

<a name="SDV.Color.Model.Hex.create"></a>
##### Hex.create(colorDefinition) ⇒ <code>string</code> &#124; <code>null</code>
Color hex-code factory-method. It is an entry point to library HEX color representation model.

**Kind**: static method of <code>[Hex](#SDV.Color.Model.Hex)</code>  
**Returns**: <code>string</code> &#124; <code>null</code> - Returns 6-character color hex-code if given colorDefinition is valid, otherwise returns null.  

| Param | Type | Description |
| --- | --- | --- |
| colorDefinition | <code>string</code> | Color definition represented as: 1. String color name, for example 'white'; 2. String color 3/6-character hex-code , for example '#fff' or '#ffffff'. |

**Example**  
```javascript
// Creates white color RGB representation from its 3-character hex-code.// It will return '#ffffff'.var whiteRgb = SDV.Color.Model.Rgb.create('#fff');// Creates white color RGB representation from its 6-character hex-code.// It will return '#ffffff'.var whiteRgb = SDV.Color.Model.Rgb.create('#ffffff');// Creates white color RGB representation from its stringed name.// It will return '#ffffff'.var whiteRgb = SDV.Color.Model.Rgb.create('white');
```
<a name="SDV.Color.Model.Hex.isHex"></a>
##### Hex.isHex(obj) ⇒ <code>boolean</code>
Checks if given object is stringed color hex-code.

**Kind**: static method of <code>[Hex](#SDV.Color.Model.Hex)</code>  
**Returns**: <code>boolean</code> - Returns true if given object is is stringed color hex-code, otherwise returns false.  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Inspected object. |

**Example**  
```javascript
SDV.Color.Model.Hex.isHex(); // false.SDV.Color.Model.Hex.isHex('white'); // false.SDV.Color.Model.Hex.isHex('#fff'); // true.SDV.Color.Model.Hex.isHex('#ffffff'); // true.
```
<a name="SDV.Color.Model.Rgb"></a>
#### Model.Rgb : <code>object</code>
Base namespace for SDV.js library RGB color representation model.All supporting RGB model facilities are accessible through it.

**Kind**: static namespace of <code>[Model](#SDV.Color.Model)</code>  

* [.Rgb](#SDV.Color.Model.Rgb) : <code>object</code>
  * [.create(colorDefinition)](#SDV.Color.Model.Rgb.create) ⇒ <code>[Rgb](#Rgb)</code> &#124; <code>null</code>
  * [.isRgb(obj)](#SDV.Color.Model.Rgb.isRgb) ⇒ <code>boolean</code>

<a name="SDV.Color.Model.Rgb.create"></a>
##### Rgb.create(colorDefinition) ⇒ <code>[Rgb](#Rgb)</code> &#124; <code>null</code>
[Rgb](#Rgb) factory-method. It is an entry point to library RGB color representation model.

**Kind**: static method of <code>[Rgb](#SDV.Color.Model.Rgb)</code>  
**Returns**: <code>[Rgb](#Rgb)</code> &#124; <code>null</code> - Returns new instance of [Rgb](#Rgb) if given colorDefinition is valid, otherwise returns null.  

| Param | Type | Description |
| --- | --- | --- |
| colorDefinition | <code>string</code> &#124; <code>object</code> | Color definition represented as: 1. String color name, for example 'white'; 2. String color 3/6-character hex-code , for example '#fff' or '#ffffff'; 3. Object, containing values for reg, green and blue channels, for example { red: 255, green: 255, blue: 255 }. |

**Example**  
```javascript
// Creates white color RGB representation from its channels values.var whiteRgb = SDV.Color.Model.Rgb.create({     red: 255,     green: 255,     blue: 255});// Creates white color RGB representation from its 3-character hex-code.var whiteRgb = SDV.Color.Model.Rgb.create('#fff');// Creates white color RGB representation from its 6-character hex-code.var whiteRgb = SDV.Color.Model.Rgb.create('#ffffff');// Creates white color RGB representation from its stringed name.var whiteRgb = SDV.Color.Model.Rgb.create('white');
```
<a name="SDV.Color.Model.Rgb.isRgb"></a>
##### Rgb.isRgb(obj) ⇒ <code>boolean</code>
Checks if given object is instance of [Rgb](#Rgb).

**Kind**: static method of <code>[Rgb](#SDV.Color.Model.Rgb)</code>  
**Returns**: <code>boolean</code> - Returns true if given object is instance of [Rgb](#Rgb), otherwise returns false.  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Inspected object. |

**Example**  
```javascript
var whiteRgb = SDV.Color.Model.Rgb.create({     red: 255,     green: 255,     blue: 255});SDV.Color.Model.Rgb.isRgb(); // false.SDV.Color.Model.Rgb.isRgb('#ffffff'); // false.SDV.Color.Model.Rgb.isRgb('white'); // false.SDV.Color.Model.Rgb.isRgb({ red: 255, green: 255, blue: 255 }); // false.SDV.Color.Model.Rgb.isRgb(whiteRgb); // true.
```
<a name="SDV.Color.Model.Hsl"></a>
#### Model.Hsl : <code>object</code>
Base namespace for SDV.js library HSL (Hue Saturation Lightness) color representation model.All supporting HSL model facilities are accessible through it.

**Kind**: static namespace of <code>[Model](#SDV.Color.Model)</code>  

* [.Hsl](#SDV.Color.Model.Hsl) : <code>object</code>
  * [.create(colorDefinition)](#SDV.Color.Model.Hsl.create) ⇒ <code>[Hsl](#Hsl)</code> &#124; <code>null</code>
  * [.isHsl(obj)](#SDV.Color.Model.Hsl.isHsl) ⇒ <code>boolean</code>

<a name="SDV.Color.Model.Hsl.create"></a>
##### Hsl.create(colorDefinition) ⇒ <code>[Hsl](#Hsl)</code> &#124; <code>null</code>
[Hsl](#Hsl) factory-method.It is an entry point to library HSL (Hue Saturation Lightness) color representation model.

**Kind**: static method of <code>[Hsl](#SDV.Color.Model.Hsl)</code>  
**Returns**: <code>[Hsl](#Hsl)</code> &#124; <code>null</code> - Returns new instance of [Hsl](#Hsl) if given colorDefinition is valid, otherwise returns null.  

| Param | Type | Description |
| --- | --- | --- |
| colorDefinition | <code>string</code> &#124; <code>object</code> | Color definition represented as: 1. String color name, for example 'white'; 2. String color 3/6-character hex-code , for example '#fff' or '#ffffff'; 3. Object, containing values of hue, saturation and lightness, for example { hue: 0, saturation: 0, lightness: 1 }. |

**Example**  
```javascript
// Creates white color HSL representation from its numeric values.var whiteHsl = SDV.Color.Model.Hsl.create({     hue: 0,     saturation: 0,     lightness: 1});// Creates white color HSL representation from its 3-character hex-code.var whiteHsl = SDV.Color.Model.Hsl.create('#fff');// Creates white color HSL representation from its 6-character hex-code.var whiteHsl = SDV.Color.Model.Hsl.create('#ffffff');// Creates white color HSL representation from its stringed name.var whiteHsl = SDV.Color.Model.Hsl.create('white');
```
<a name="SDV.Color.Model.Hsl.isHsl"></a>
##### Hsl.isHsl(obj) ⇒ <code>boolean</code>
Checks if given object is instance of [Hsl](#Hsl).

**Kind**: static method of <code>[Hsl](#SDV.Color.Model.Hsl)</code>  
**Returns**: <code>boolean</code> - Returns true if given object is instance of [Hsl](#Hsl), otherwise returns false.  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Inspected object. |

**Example**  
```javascript
var whiteHsl = SDV.Color.Model.Hsl.create({     hue: 0,     saturation: 0,     lightness: 1});SDV.Color.Model.Hsl.isHsl(); // false.SDV.Color.Model.Hsl.isHsl('#ffffff'); // false.SDV.Color.Model.Hsl.isHsl('white'); // false.SDV.Color.Model.Hsl.isHsl({ hue: 0, saturation: 0, lightness: 1 }); // false.SDV.Color.Model.Hsl.isHsl(whiteHsl); // true.
```
<a name="SDV.Color.Model.Hsb"></a>
#### Model.Hsb : <code>object</code>
Base namespace for SDV.js library HSB (Hue Saturation Brightness) color representation model.All supporting HSB model facilities are accessible through it.

**Kind**: static namespace of <code>[Model](#SDV.Color.Model)</code>  

* [.Hsb](#SDV.Color.Model.Hsb) : <code>object</code>
  * [.create(colorDefinition)](#SDV.Color.Model.Hsb.create) ⇒ <code>[Hsb](#Hsb)</code>
  * [.isHsb(obj)](#SDV.Color.Model.Hsb.isHsb) ⇒ <code>boolean</code>

<a name="SDV.Color.Model.Hsb.create"></a>
##### Hsb.create(colorDefinition) ⇒ <code>[Hsb](#Hsb)</code>
[Hsb](#Hsb) factory-method. It is an entry point to library HSB (Hue Saturation Brightness) color representation model.

**Kind**: static method of <code>[Hsb](#SDV.Color.Model.Hsb)</code>  
**Returns**: <code>[Hsb](#Hsb)</code> - Returns new instance of [Hsb](#Hsb) if given colorDefinition is valid, otherwise returns null.  

| Param | Type | Description |
| --- | --- | --- |
| colorDefinition | <code>string</code> &#124; <code>object</code> | Color definition represented as: 1. String color name, for example 'white'; 2. String color 3/6-character hex-code , for example '#fff' or '#ffffff'; 3. Object, containing values of hue, saturation and brightness, for example { hue: 0, saturation: 0, brightness: 1 }. |

**Example**  
```javascript
// Creates white color HSB representation from its numeric values.var whiteHsb = SDV.Color.Model.Hsb.create({     hue: 0,     saturation: 0,     brightness: 1});// Creates white color HSB representation from its 3-character hex-code.var whiteHsb = SDV.Color.Model.Hsb.create('#fff');// Creates white color HSB representation from its 6-character hex-code.var whiteHsb = SDV.Color.Model.Hsb.create('#ffffff');// Creates white color HSB representation from its stringed name.var whiteHsb = SDV.Color.Model.Hsb.create('white');
```
<a name="SDV.Color.Model.Hsb.isHsb"></a>
##### Hsb.isHsb(obj) ⇒ <code>boolean</code>
Checks if given object is instance of [Hsb](#Hsb).

**Kind**: static method of <code>[Hsb](#SDV.Color.Model.Hsb)</code>  
**Returns**: <code>boolean</code> - Returns true if given object is instance of [Hsb](#Hsb), otherwise returns false.  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Inspected object. |

**Example**  
```javascript
var whiteHsb = SDV.Color.Model.Hsb.create({     hue: 0,     saturation: 0,     brightness: 1});SDV.Color.Model.Hsb.isHsb(); // false.SDV.Color.Model.Hsb.isHsb('#ffffff'); // false.SDV.Color.Model.Hsb.isHsb('white'); // false.SDV.Color.Model.Hsb.isHsb({ hue: 0, saturation: 0, brightness: 1 }); // false.SDV.Color.Model.Hsb.isHsb(whiteHsb); // true.
```
<a name="SDV.Color.create"></a>
### Color.create(colorDefinition) ⇒ <code>[Color](#Color)</code>
[Color](#Color) factory-method. It is an entry point to library color facilities.

**Kind**: static method of <code>[Color](#SDV.Color)</code>  
**Returns**: <code>[Color](#Color)</code> - Returns new instance of [Color](#Color) if given color definition is valid color representation,otherwise returns null.  

| Param | Type | Description |
| --- | --- | --- |
| colorDefinition | <code>string</code> &#124; <code>[Rgb](#Rgb)</code> &#124; <code>[Hsl](#Hsl)</code> &#124; <code>[Hsb](#Hsb)</code> &#124; <code>object</code> | Color represented as: 1. String (3/6-character hex code or color-name); 2. Or [Rgb](#Rgb) (Red Green Blue) color representation instance; 3. Or [Hsl](#Hsl) (Hue Saturation Lightness) color representation instance; 4. Or [Hsb](#Hsb) (Hue Saturation Brightness) color representation instance; 5. Or instance of some other color representation model (instance should contain method toHex, which must be able to return 6-character color hex code). |

**Example**  
```javascript
SDV.Color.create('#fff');    // It will return instance of white color.SDV.Color.create('#ffffff'); // It will return instance of white color.SDV.Color.create('white');  // It will return instance of white color.// It will return instance of white color.SDV.Color.create(SDV.Color.Model.Rgb.create({ red: 255, green: 255, blue: 255 }));// It will return instance of white color.SDV.Color.create(SDV.Color.Model.Hsl.create({ hue: 0, saturation: 0, lightness: 1 }));// It will return instance of white color.SDV.Color.create(SDV.Color.Model.Hsb.create({ hue: 0, saturation: 0, brightness: 1 }));// It will return null.SDV.Color.create('blahblah');
```
<a name="SDV.Color.isColor"></a>
### Color.isColor(obj) ⇒ <code>boolean</code>
Checks if given object is instance of [Color](#Color).

**Kind**: static method of <code>[Color](#SDV.Color)</code>  
**Returns**: <code>boolean</code> - Returns true if given object is instance of [Color](#Color), otherwise returns false.  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Inspected object. |

**Example**  
```javascript
var whiteColor = SDV.Color.create('white');SDV.Color.isColor(); // false.SDV.Color.isColor('#ffffff'); // false.SDV.Color.isColor('white'); // false.SDV.Color.isColor(whiteColor); // true.
```
<a name="SDV.Color.random"></a>
### Color.random([options]) ⇒ <code>string</code> &#124; <code>Array.&lt;string&gt;</code> &#124; <code>null</code>
Generates new random color/colors (rather its hex code/codes in 6-character dash notation).

**Kind**: static method of <code>[Color](#SDV.Color)</code>  
**Returns**: <code>string</code> &#124; <code>Array.&lt;string&gt;</code> &#124; <code>null</code> - Returns generated color hex-code in 6-character dash notation (if colorsCount wasn't defined),or array of hex-codes in 6-character dash notation (if colorsCount was defined), or null (if given options are invalid).  
**Access:** public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> |  | Method options. |
| [options.count] | <code>number</code> |  | Colors count (how much colors to generate). If undefined, then single color will be generated. |
| [options.hue] | <code>string</code> &#124; <code>number</code> | <code>&quot;&#x27;random&#x27;&quot;</code> | Desirable hue of generated colors. As a string it could be color hex-code, color name, or one of the following keywords: 'random', 'monochrome'. As a number it could be float number from 0.0 to 1.0. |
| [options.saturation] | <code>string</code> &#124; <code>number</code> | <code>&quot;&#x27;rich&#x27;&quot;</code> | Desirable saturation of generated colors. As a string it could be color hex-code, color name, or one of the following keywords: 'random', 'rich', 'pale'. As a number it could be float number from 0.0 to 1.0. |
| [options.brightness] | <code>string</code> &#124; <code>number</code> | <code>&quot;&#x27;bright&#x27;&quot;</code> | Desirable brightness of generated colors. As a string it could be color hex-code, color name, or one of the following keywords: 'random', 'bright', 'dark'. As a number it could be float number from 0.0 to 1.0. |

**Example**  
```javascript
SDV.Color.random(); // It will return something like '#b3446c'.SDV.Color.random({ count: 2 }); // It will return something like ['#b3446c', '#2b48ef'].// It will return something like ['#3fd422', '#199101', '#4b8c27', #77ff2e] (different hues of green).SDV.Color.random({ count: 4, hue: 'green' });
```
<a name="SDV.Tool"></a>
## SDV.Tool : <code>object</code>
Base namespace for SDV.js library spatial data analysis tools.All supporting analysis tools are accessible through it.

**Kind**: static namespace of <code>[SDV](#SDV)</code>  

* [.Tool](#SDV.Tool) : <code>object</code>
  * [.base](#SDV.Tool.base)
  * [.choropleth(options)](#SDV.Tool.choropleth) ⇒ <code>object</code>

<a name="SDV.Tool.base"></a>
### Tool.base
Base and abstract analysis tool. Other tools must be a base tool extensions.

**Kind**: static property of <code>[Tool](#SDV.Tool)</code>  
<a name="SDV.Tool.choropleth"></a>
### Tool.choropleth(options) ⇒ <code>object</code>
Analysis by categories tool (choropleth tool).It can apply GeoJSON data and divide its features into several categories, according to the specified mode and mode options.

**Kind**: static method of <code>[Tool](#SDV.Tool)</code>  
**Returns**: <code>object</code> - Returns similar (or even same) GeoJSON data object, in which every feature contains following property:feature.properties.sdv.choropleth = {category: '', style: {}}.  
**Access:** public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  | Categorization options. |
| options.data | <code>object</code> |  | GeoJSON data (only 'Feature' and 'FeaturesCollection' types are allowed for choropleth tool). |
| [options.cloneData] | <code>boolean</code> | <code>false</code> | Flag: indicates whether to clone given data before recording analysis results into it. If cloneData flag is true, then given data will be cloned before preprocessing, processing, and recording of the results, otherwise same data object will be used, and results will be recorded into features of the same object. |
| options.preprocessor | <code>function</code> |  | Method of data preprocessing. This method will be called for each feature in given data, method applies three arguments: feature (current feature), featureIndex (index of current feature in whole features array), featuresArray (array of all features). This method could be used, for example, to compute some additional properties and push them inside features (distance from each feature to some dynamicly defined point is a good example of usage). To break preprocessing (to stop iteration over features) preprocessing method must return exactly false value. |
| options.mode | <code>string</code> |  | Name of desirable mode, for example 'random', or 'manual'. |
| options.modeOptions | <code>object</code> |  | Specific mode options. |

<a name="SDV.defineSdv"></a>
## SDV.defineSdv()
Defines spatial data visualization namespace object (SDV) globally, and stores previously existing SDV object.

**Kind**: static method of <code>[SDV](#SDV)</code>  
**Access:** public  
<a name="SDV.noConflict"></a>
## SDV.noConflict() ⇒ <code>object</code>
Returns spatial data visualization namespace object (SDV) locally, and assigns stored,previously existing SDV object to window.SDV.Allows to use spatial data visualization library without conflicts with another librarieshaving the same global namespace.

**Kind**: static method of <code>[SDV](#SDV)</code>  
**Returns**: <code>object</code> - Object which points to spatial data visualization namespace.  
**Access:** public  
**Example**  
```javascript
// If you use other library which points to SDV as its global namespace, you can avoid such problem.// Before usage of SDV.js facilities you can assign its global namespace to a local variable as follows:var sdvjs = SDV.noConflict();// Now sdvjs variable points to SDV.js library global namespace, and SDV points to that other library namespace.// So you can use SDV.js facilities through a local variable as follows:console.log('Current SDV.js version is ' + sdvjs.version);
```
