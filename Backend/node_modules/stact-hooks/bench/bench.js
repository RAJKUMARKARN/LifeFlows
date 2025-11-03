var createHooks = require('../')
  , eventflow = require('eventflow')
  , bench = require('bench');

var functions = {
  'one': [
    function (next) {
      process.nextTick(function () {
        next(null, 'A');
      });
    },
    function (next) {
      process.nextTick(function () {
        next(null, 'B');
      });
    },
    function (next) {
      process.nextTick(function () {
        next(null, 'C');
      });
    }
  ],
  'two': [
    function (next) {
      process.nextTick(function () {
        next(null, 'A');
      });
    },
    function (next) {
      process.nextTick(function () {
        next(null, 'B');
      });
    },
    function (next) {
      process.nextTick(function () {
        next(null, 'C');
      });
    }
  ],
  'three': [
    function (next) {
      process.nextTick(function () {
        next(null, 'A');
      });
    },
    function (next) {
      process.nextTick(function () {
        next(null, 'B');
      });
    },
    function (next) {
      process.nextTick(function () {
        next(null, 'C');
      });
    }
  ]
};

// Setup hooks.
var hooks = createHooks();
Object.keys(functions).forEach(function (name) {
  functions[name].forEach(function (func) {
    hooks(name).add(func);
  });
  // Presort.
  hooks(name)._sort();
});

// Setup eventflow.
var flow = eventflow();
Object.keys(functions).forEach(function (name) {
  functions[name].forEach(function (func) {
    flow.on(name, func);
  });
});

exports.compare = {
  'stact-hooks parallel': function (done) {
    hooks('two').run(done);
  },

  'eventflow parallel': function (done) {
    flow.parallel('two', done);
  },

  'stact-hooks series': function (done) {
    hooks('two').runSeries(done);
  },

  'eventflow series': function (done) {
    flow.series('two', done);
  }
};

bench.runMain();
