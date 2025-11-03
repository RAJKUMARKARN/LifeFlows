/**
 * Investigate what stack traces deep withing a stact run look like.
 */

var stack = require('../')()
  , string = 'This is a long string that is going to be used to check the stack trace.'
  , i = -1;

while (++i < string.length) {
  (function (i) {
    stack.add(i, function (next) {
      if (i === 30) throw new Error('Poop');
      next(null, string.charAt(i));
    });
  })(i);
}

stack.run(function (err, results) {
  console.log(results.join(''));
});
