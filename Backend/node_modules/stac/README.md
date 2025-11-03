stac
====

Maintain a sorted stack of things.

[![build status](https://secure.travis-ci.org/cpsubrian/node-stac.png)](http://travis-ci.org/cpsubrian/node-stac)

![Puzzle](http://www.stageslearning.com/files/free-resources/blog_images/ring%20stack.jpg)


Examples
--------

**Add arbitrary things to a stack**

```js
var createStac = require('stac')
  , stack = createStac();

stack.add('A');
stack.add(23);
stack.add(['foo', 'bar']);

stack.first({my: 'Object'});
stack.last('The End');

console.log(stack.items());
// [ { my: 'Object' }, 'A', 23, [ 'foo', 'bar' ], 'The End']
```


**Add things to a stack with weights**

```js
var createStac = require('stac')
  , stack = createStac();

stack.add(3, 'C');
stack.add(1, 'A');
stack.add(4, 'D');
stack.add(2, 'B');

stack.forEach(function (letter) {
  console.log(letter);
});
// A
// B
// C
// D
```

**Advanced usage: custom sortBy and comparator**

```js
var createStac = require('stac')
var stack = createStac({
  sortBy: function (item) {
    return item.width * item.height;
  },
  comparator: function (a, b) {
    if (a === b) return 0;
    // Reverse sort
    return a < b ? 1 : -1;
  }
});

stack.add({color: 'red', width: 5, height: 4});
stack.add({color: 'green', width: 1, height: 2});
stack.add({color: 'blue', width: 8, height: 2});

console.log(stack.map(function (item) {
  return item.color;
}));
// [ 'red', 'blue', 'green' ]
```

API
---

### createStac([options])

The only export for this module. Returns instances of Stac objects.

```js
var createStac = require('stac');

// Create a stac object.
var stack = createStac();

// Create a stac object with options.
var another = createStac({
  sortBy: 'age'
});
```

#### options

- **sortBy** - String or function. If string, and items are objects, then the value
           of the property at this key will be used for sorting. If function,
           then the function will be called with the item to determine its
           sort value. Default: `'weight'`.
- **defaultVal** - If no sorting value is provided or can be determined for an item,
               then this value will be used. Default: `0`.
- **comparator** - A custom comparator function `(a, b)`. Will be called with the
               values of two items to compare. Should return 0, 1, or -1; similar
               to how `Array.prototype.sort()` is used. Default: `(sort by numeric value)`.

### Methods

Methods of `Stac` objects.

**add ( [val], item )**

Add an item to the stack. Optionally pass a value to sort by.

**remove ( item )**

Remove an item from the stack.

**first ( [val], item ) | unshift ( [val], item )**

Add an item to the front of the stack. Items inserted this way will *always* be sorted
in front of items added with `add()` or `last()`. Within the *first* set, items
will be sorted normally.

**last ( [val], item ) | push ( [val], item )**

Add an item to the end of the stack. Items inserted this way will *always* be
sorted behind items added with `add()` or `first()`. Within the *last* set, items
will be sorted normally.

**multi (method, items)**

Helper to operate on multiple items with one call. Example: `stack.multi('add', ['A', 'B', 'C'])`.

**clone()**

Returns a copy of a stack.

*Note: items in the stack will still reference the originals.*

**items() | toJSON()**

Returns the sorted array of items in the stack.

**forEach ( iterator, [thisArg] )**

Iterate over items in the stack (just like `Array.prototype.forEach`).

**map ( func, [thisArg] )**

Returns a mapped representation of the stack (just like an `Array.prototype.map`).

**pop()**

Returns and removes the last item from the stack (similar to `Array.prototype.pop`).

**shift()**

Returns and removes the first item from the stack (similar to `Array.prototype.shift`).

### Properties

Properties of `Stac` objects.

**length**

Returns the current length of the stack.


- - -

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Aptos, CA and Washington, D.C.

- - -

### License: MIT
Copyright (C) 2012 Terra Eclipse, Inc. ([http://www.terraeclipse.com](http://www.terraeclipse.com))

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
