var createStac = require('../');

describe('basic test', function () {
  var stack;

  beforeEach(function () {
    stack = createStac();
  });

  it('add() - adds items in insertion order', function () {
    stack.add('one');
    stack.add('two');
    stack.add('three');
    stack.add('four');

    assert.equal(stack.pop(), 'four');
    assert.equal(stack.shift(), 'one');
    assert.equal(stack.pop(), 'three');
    assert.equal(stack.pop(), 'two');
    assert.equal(stack.pop(), undefined);
    assert.equal(stack.shift(), undefined);
  });

  it('add() - adds items at a specific value', function () {
    stack.add(2, 'two');
    stack.add(1, 'one');
    stack.add(3, 'three');

    assert.deepEqual(stack.items(), ['one', 'two', 'three']);
  });

  it('remove() - removes items', function () {
    stack.add('one');
    stack.add('two');
    stack.add('three');

    stack.remove('two');
    assert.equal(stack.length, 2);

    stack.remove('foo');
    assert.equal(stack.length, 2);
  });

  it('first() - adds items to the front of the stack', function () {
    stack.add('two');
    stack.add('three');
    stack.first('one');

    assert.equal(stack.shift(), 'one');
  });

  it('last() - adds items to the end of the stack', function () {
    stack.add('red');
    stack.add(500, 'blue');
    stack.last('green');

    assert.equal(stack.pop(), 'green');
  });

  it('clone() - can clone the stack', function () {
    var clone;

    stack.add('one');
    stack.add('two');
    stack.add('three');

    clone = stack.clone();

    stack.remove('two');
    clone.add('four');

    assert.equal(stack.length, 2);
    assert.equal(clone.length, 4);
  });

  it('forEach() - can loop over the items', function () {
    var check = [];

    stack.add(1);
    stack.add(2);
    stack.add(3);

    stack.forEach(function (num) {
      check.push(num);
    });

    assert.deepEqual(check, [1, 2, 3]);
  });

  it('map() - can map the items', function () {
    var mapped;

    stack.add(1);
    stack.add(2);
    stack.add(3);

    mapped = stack.map(function (num) {
      return num + 1;
    });

    assert.deepEqual(mapped, [2, 3, 4]);
  });

  it('multi() - can operate on multiple items', function () {
    stack.multi('add', [1, 2, 3]);
    assert.deepEqual(stack.items(), [1, 2, 3]);
  });

  it('can deal with objects in the stack', function () {
    var brian = {
      name: 'Brian',
      handle: 'cpsubrian'
    };
    var carlos = {
      name: 'Carlos',
      handle: 'carlos8f'
    };

    stack.add(brian);
    stack.add(carlos);

    stack.remove(brian);

    assert.equal(stack.length, 1);
    assert.equal(stack.pop(), carlos);
  });

  it('can sort with the default property (weight)', function () {
    stack.add({
      name: 'Apple',
      weight: 4
    });
    stack.add({
      name: 'Orange',
      weight: 10
    });
    stack.add({
      name: 'Banana',
      weight: 1
    });

    assert.equal(stack.shift().name, 'Banana');
    assert.equal(stack.shift().name, 'Apple');
    assert.equal(stack.shift().name, 'Orange');
  });

  it('can sort with a custom property', function () {
    stack = createStac({
      sortBy: 'age'
    });

    stack.add({name: 'Joe', age: 23});
    stack.add({name: 'Gramps', age: 67});
    stack.add({name: 'May', age: 34});
    stack.add({name: 'Bobby', age: 12});


    assert.equal(stack.pop().name, 'Gramps');
    assert.equal(stack.shift().name, 'Bobby');
  });

  it('can sort with a custom sortBy', function () {
    stack = createStac({
      sortBy: function (item) {
        return item.width * item.height;
      }
    });

    stack.add({color: 'red', width: 5, height: 4});
    stack.add({color: 'green', width: 1, height: 2});
    stack.add({color: 'blue', width: 8, height: 2});

    assert.equal(stack.pop().color, 'red');
    assert.equal(stack.shift().color, 'green');
  });

  it('can sort with a custom comparator', function () {
    stack = createStac({
      sortBy: 'medal',
      comparator: function (a, b) {
        if (a === 'gold') {
          return 1;
        }
        if (b == 'gold') {
          return -1;
        }
        if (a === 'silver') {
          return 1;
        }
        return 0;
      }
    });

    stack.add({name: 'László Cseh', medal: 'bronze'});
    stack.add({name: 'Michael Phelps', medal: 'gold'});
    stack.add({name: 'Ryan Lochte', medal: 'silver'});

    assert.equal(stack.pop().name, 'Michael Phelps');
    assert.equal(stack.pop().name, 'Ryan Lochte');
  });

  it('can be created with an existing array', function () {
    stack = createStac(['A', 'B', 'C', 'D']);
    assert.equal(stack.pop(), 'D');
    assert.equal(stack.shift(), 'A');
  });

  it('can be created with options and an existing array', function () {
    stack = createStac({sortBy: 'age'}, [
      {name: 'Joe', age: 23},
      {name: 'Gramps', age: 67},
      {name: 'May', age: 34},
      {name: 'Bobby', age: 12}
    ]);
    assert.equal(stack.pop().name, 'Gramps');
    assert.equal(stack.shift().name, 'Bobby');
  });

});

