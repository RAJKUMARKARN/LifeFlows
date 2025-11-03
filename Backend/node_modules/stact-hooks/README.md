stact-hooks
===========

Manage a registry of function stacks and run them.

[![build status](https://secure.travis-ci.org/cpsubrian/node-stact-hooks.png)](http://travis-ci.org/cpsubrian/node-stact-hooks)

About
-----

`stact-hooks` is a simple wrapper around [stact](https://github.com/cpsubrian/node-stact).

It provides a registry-like interface to namespaced 'stacks' of functions.

Example
-------

```js
var hooks = require('stact-hooks')();

hooks('before:save').add(function (next) {
  // Do something.
  next();
});

hooks('before:save').add(function (next) {
  // Do something.
  next();
});

hooks('after:save').add(function (next) {
  // Do something.
  next();
});

hooks('before:save').run(function (err, results) {
  if (err) // Handle err.
  save(function (err) {
    if (err) // Handle err.
    hooks('after:save').run(function (err, results) {
      if (err) // Handle err.
    });
  });
}
});
```

API
---

`stact-hooks` exports a single function, which returns a hook 'registry'.

The registry is a function that accepts one argument. You pass this function a string and
it returns you a *stact* function stack. Subsequent calls with the same
string will return the same stack.

```js
var createHooks = require('stact-hooks');

var hooks = createHooks();

hooks('validate').add(function (next) {
  // Do something.
});

hooks('validate').add(function (next) {
  // Do something.
});

// The 'validate' namespace is now a stack with two functions on it.

// You could 'run' this stack like so:
hooks('validate').run(function (err, results) {

});

// Or run it in series mode.
hooks('validate').runSeries(function (err, results) {

});
```

For more information please see [stact](https://github.com/cpsubrian/node-stact)
and [stac](https://github.com/cpsubrian/node-stac).

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
