var createHooks = require('../');

describe('basic test', function () {
  var hooks, func;

  beforeEach(function () {
    hooks = createHooks();
  });

  func = function (letter, cb) {
    setTimeout(function () {
      cb(null, letter);
    }, Math.random() * 10);
  };

  it('can register and run stacks of functions', function (done) {
    hooks('one').add(func.bind(null, 'A'));
    hooks('one').add(func.bind(null, 'B'));
    hooks('one').add(func.bind(null, 'C'));

    hooks('two').add(func.bind(null, 'D'));
    hooks('two').add(func.bind(null, 'E'));
    hooks('two').add(func.bind(null, 'F'));

    hooks('one').runSeries(function (err, results) {
      assert.ifError(err);
      assert.deepEqual(results, ['A', 'B', 'C']);

      hooks('two').run(function (err, results) {
        assert.ifError(err);
        assert.equal(results.length, 3);
        assert(results.indexOf('E') >= 0);
        assert(results.indexOf('A') < 0);
        done();
      });
    });
  });

});