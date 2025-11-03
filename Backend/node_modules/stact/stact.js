var Stac = require('stac').Stac
  , inherits = require('util').inherits
  , setImmediate = setImmediate || process.nextTick;

function Stact (options, items) {
  var self = this;

  if (typeof options === 'function') {
    options = {
      func: options
    };
  }
  if (Array.isArray(options)) {
    items = options;
    options = {};
  }

  options = options || {};
  this._func = options.func || null;
  this._funcProp = options.funcProp || null;
  this._getFunc = options.getFunc || function getFunc (item) {
    if (typeof self._func === 'function') return self._func;
    if (self._funcProp) return item[self._funcProp];
    return item;
  };

  Stac.call(this, options, items);
}
inherits(Stact, Stac);

Stact.prototype.run = function () {
  var self = this
    , results = []
    , count = 0
    , cb = arguments[arguments.length - 1]
    , args = arguments
    , abort = false;

  if (!this.length) return cb();

  function finish (i) {
    return (function runFinish (err, result) {
      if (abort) return;
      if (err) {
        abort = true;
        return cb(err, results);
      }
      results[i] = result;
      if (++count >= self.length) {
        cb(null, results);
      }
    });
  }

  this.forEach(function iterator (item, i) {
    fastApply(self._getFunc(item), item, args, finish(i));
  });
};

Stact.prototype.runSeries = function () {
  var self = this
    , items = this.items()
    , results = []
    , args = arguments
    , cb = arguments[arguments.length - 1];

  if (!this.length) return cb();

  function runNext (err, result) {
    if (err) return cb(err, results);
    results.push(result);
    if (results.length % 100 === 0) {
      setImmediate(run);
    }
    else {
      run();
    }
  }

  function run () {
    var item = items.shift();
    if (item) {
      fastApply(self._getFunc(item), item, args, runNext);
    }
    else {
      cb(null, results);
    }
  }

  run();
};

Stact.prototype.runWaterfall = function () {
  var self = this
    , items = this.items()
    , count = 0
    , args = Array.prototype.slice.call(arguments, 0)
    , cb = args.pop();

  if (!this.length) return cb();

  function run () {
    var runArgs = Array.prototype.slice.call(arguments, 0)
      , err = runArgs.shift()
      , item = items.shift();

    if (err) return cb(err);

    if (item) {
      runArgs.push(function runNext () {
        if (++count % 100 === 0) {
          setImmediate.apply(null, [run].concat(Array.prototype.slice.call(arguments, 0)));
        }
        else {
          run.apply(null, arguments);
        }
      });
      self._getFunc(item).apply(item, runArgs);
    }
    else {
      runArgs.unshift(null);
      cb.apply(null, runArgs);
    }
  }

  args.unshift(null);
  run.apply(null, args);
};

// Silly optimization instead of calling apply().
function fastApply (func, thisArg, args, cb) {
  switch (args.length) {
    case 1:
      return func.call(thisArg, cb);
    case 2:
      return func.call(thisArg, args[0], cb);
    case 3:
      return func.call(thisArg, args[0], args[1], cb);
    case 4:
      return func.call(thisArg, args[0], args[1], args[2], cb);
    case 5:
      return func.call(thisArg, args[0], args[1], args[2], args[3], cb);
    case 6:
      return func.call(thisArg, args[0], args[1], args[2], args[3], args[4], cb);
    case 7:
      return func.call(thisArg, args[0], args[1], args[2], args[3], args[4], args[5], cb);
    case 8:
      return func.call(thisArg, args[0], args[1], args[2], args[3], args[4], args[5], args[6], cb);
  }
}

module.exports = function (options, items) {
  return new Stact(options, items);
};
module.exports.Stact = Stact;
