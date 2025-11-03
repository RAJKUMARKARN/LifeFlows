var createStact = require('../');

describe('basic test', function () {
  var stack, func;

  beforeEach(function () {
    stack = createStact();
    results = [];
  });

  func = function (letter, cb) {
    // Make it async.
    setTimeout(function () {
      cb(null, letter);
    }, Math.random() * 10);
  };

  it('can run functions in parallel', function (done) {
    stack.add(func.bind(null, 'A'));
    stack.add(func.bind(null, 'B'));
    stack.add(func.bind(null, 'C'));

    stack.run(function (err, results) {
      assert.ifError(err);
      assert.deepEqual(results, ['A', 'B', 'C']);

      // Can run multiple times.
      stack.run(function (err, results) {
        assert.ifError(err);
        assert.equal(results.length, 3);
        done();
      });
    });
  });

  it('can run functions in series', function (done) {
    stack.add(func.bind(null, 'B'));
    stack.add(func.bind(null, 'C'));
    stack.add(func.bind(null, 'D'));
    stack.first(func.bind(null, 'A'));

    stack.runSeries(function (err, results) {
      assert.ifError(err);
      assert.equal(results.length, 4);
      assert.equal(results[0], 'A');
      assert.equal(results[3], 'D');

      // Can run multiple times.
      stack.runSeries(function (err, results) {
        assert.ifError(err);
        assert.equal(results.length, 4);
        assert.equal(results[0], 'A');
        assert.equal(results[3], 'D');
        done();
      });
    });
  });

  it('can run functions in a waterfall', function (done) {
    stack.add(function (arg1, next) {
      setTimeout(function () {
        next(null, arg1, '2');
      }, Math.random * 10);
    });

    stack.add(function (arg1, arg2, next) {
      setTimeout(function () {
        next(null, arg1, arg2, '3');
      }, Math.random * 10);
    });

    stack.add(function (arg1, arg2, arg3, next) {
      setTimeout(function () {
        next(null, arg1 + arg2 + arg3 + '4');
      }, Math.random * 10);
    });

    stack.add(function (combined, next) {
      next(null, 'Combined', combined);
    });

    stack.runWaterfall('1', function (err, result1, result2) {
      assert.ifError(err);
      assert.equal(result1, 'Combined');
      assert.equal(result2, '1234');
      done();
    });
  });

  it('stops running if it hits an error', function (done) {
    stack.add(func.bind(null, 'A'));
    stack.add(func.bind(null, 'B'));
    stack.add(function (cb) {
      setTimeout(function () {
        cb(new Error('this is an error'));
      }, 30);
    });
    stack.add(func.bind(null, 'C'));
    stack.add(func.bind(null, 'D'));

    stack.runSeries(function (err, results) {
      assert(err);
      assert.equal(results.length, 2);
      done();
    });
  });

  it('can run an empty stack', function (done) {
    stack.run(function (err) {
      assert.ifError(err);
      stack.runSeries(function (err) {
        assert.ifError(err);
        stack.runWaterfall(function (err) {
          assert.ifError(err);
          done();
        });
      });
    });
  });

  it('can run function in parallel with arbitrary arguments', function (done) {
    stack.add(func);
    stack.add(func);
    stack.add(func);

    stack.run('A', function (err, results) {
      assert.ifError(err);
      assert.deepEqual(results, ['A', 'A', 'A']);
      done();
    });
  });

  it('can run function in series with arbitrary arguments', function (done) {
    stack.add(func);
    stack.add(func);
    stack.add(func);

    stack.runSeries('A', function (err, results) {
      assert.ifError(err);
      assert.deepEqual(results, ['A', 'A', 'A']);
      done();
    });
  });

  it('can handle functions added with weights', function (done) {
    stack.add(3, func.bind(null, 'D'));
    stack.add(1, func.bind(null, 'B'));
    stack.add(2, func.bind(null, 'C'));
    stack.first(400, func.bind(null, 'A'));

    stack.runSeries(function (err, results) {
      assert.ifError(err);
      assert.deepEqual(results, ['A', 'B', 'C', 'D']);
      done();
    });
  });

  it('can handle objects with a funcProp and weight', function (done) {
    stack = createStact({
      funcProp: 'func'
    });

    stack.add({
      weight: 3,
      func: func.bind(null, 'C')
    });
    stack.add({
      weight: 1,
      func: func.bind(null, 'A')
    });
    stack.add({
      weight: 2,
      func: func.bind(null, 'B')
    });

    stack.runSeries(function (err, results) {
      assert.ifError(err);
      assert.deepEqual(results, ['A', 'B', 'C']);
      done();
    });
  });

  it('can run a stack that uses a single function', function (done) {
    stack = createStact(function (methodName, next) {
      next(null, this[methodName]());
    });

    stack.last('D');
    stack.add('B');
    stack.add('C');
    stack.first('A');

    stack.runSeries('toLowerCase', function (err, results) {
      assert.ifError(err);
      assert.deepEqual(results, ['a', 'b', 'c', 'd']);
      done();
    });
  });

  it('can run a stack with initial items', function (done) {
    createStact([
      function (next) {
        next(null, 'a');
      },
      function (next) {
        next(null, 'b');
      },
      function (next) {
        next(null, 'c');
      },
      function (next) {
        next(null, 'd');
      }
    ]).runSeries(function (err, results) {
      assert.ifError(err);
      assert.deepEqual(results, ['a', 'b', 'c', 'd']);
      done();
    });
  });

  it('can run with options and initial items', function (done) {
    stack = createStact({funcProp: 'func'}, [
      {
        weight: 3,
        func: func.bind(null, 'C')
      },
      {
        weight: 1,
        func: func.bind(null, 'A')
      },
      {
        weight: 2,
        func: func.bind(null, 'B')
      }
    ]).runSeries(function (err, results) {
      assert.ifError(err);
      assert.deepEqual(results, ['A', 'B', 'C']);
      done();
    });
  });
});
