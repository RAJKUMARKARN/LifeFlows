// Note: This test is a little unfair because here we only initialize the stack
// one time, whereas async has to run through its setup routine everytime.
// However, this is how you would 'use' the APIs in an app.
//
// If you wanted to compare a 'one-time' use of stact vs. async, you should
// create a new stack on each iteration. In that scenario, as of v0.0.6, stact
// is about 5x slower than async (possibly due to the sorting).

var createStact = require('../')
  , async = require('async')
  , bench = require('bench');

var functions = [
  function (next) {
    process.nextTick(function () {
      next(null, 'One');
    });
  },
  function (next) {
    process.nextTick(function () {
      next(null, 'Two');
    });
  },
  function (next) {
    process.nextTick(function () {
      next(null, 'Three');
    });
  },
  function (next) {
    process.nextTick(function () {
      next(null, 'Four');
    });
  }
];

// Create stack.
var stack = createStact().multi('add', functions);
// Pre-sort it.
stack._sort();

exports.compare = {
  'stact parallel': function (done) {
    stack.run(done);
  },

  'async parallel': function (done) {
    async.parallel(functions, done);
  },

  'stact series': function (done) {
    stack.runSeries(done);
  },

  'async series': function (done) {
    async.series(functions, done);
  }
};

bench.runMain();