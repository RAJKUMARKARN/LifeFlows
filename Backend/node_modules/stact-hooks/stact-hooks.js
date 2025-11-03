var createStact = require('stact');

function createHooks (options) {
  var stacks = {};

  return function getStact (name) {
    if (!stacks[name]) {
      stacks[name] = createStact(options);
    }
    return stacks[name];
  };
}

module.exports = createHooks;