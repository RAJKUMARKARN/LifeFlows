var witwip = require('../'),
    path = require('path'),
    assert = require('assert');

describe('basic functionality', function() {
  var pkgPath, info;

  it('can find package.json of a base module', function() {
    pkgPath = witwip(module);
    info = require(pkgPath);
    assert.equal(info.name, 'basic');
  });

  it('can find package.json of local module', function() {
    pkgPath = witwip(module, './local/chief');
    info = require(pkgPath);
    assert.equal(info.name, 'chief');
  });

  it('can find package.json recursing out of a sub-folder', function() {
    pkgPath = witwip(__dirname + '/local/chief/subfolder/deeper');
    info = require(pkgPath);
    assert.equal(info.name, 'chief');
  });

  it('can find package.json of a module', function() {
    pkgPath = witwip(module, 'debug');
    info = require(pkgPath);
    assert.equal(info.name, 'debug');
  });

  it('throws when a match cannot be found', function() {
    assert.throws(function(){
      pkgPath = witwip(__dirname, './local/double-trouble');
    });
  });

  it('can return the directory instead of the filepkgPath', function() {
    pkgPath = witwip.dir(module, 'debug');
    assert.equal(pkgPath, path.resolve(__dirname, '..', 'node_modules/debug'));
  });

});