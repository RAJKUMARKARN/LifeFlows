var path = require('path'),
    fs = require('fs'),
    existsSync = fs.existsSync ? fs.existsSync : path.existsSync,
    modulePathCache = {},
    debug = require('debug')('witwip');

module.exports = witwip;

function witwip(base, modulePath) {
  var originalBase, newPath;

  // Allow base to be a module object (such as `module.parent`).
  if (base.filename) {
    base = path.dirname(base.filename);
  }
  originalBase = base;

  // If no modulePath is passed, check the base directory.
  modulePath = modulePath || '.';

  // Fetch from cache or initialize cache.
  if (!modulePathCache.hasOwnProperty(base)) {
    modulePathCache[base] = {};
  }
  var cache = modulePathCache[base];
  if (cache.hasOwnProperty(modulePath)) {
      debug('Found `' + modulePath + '` in `' + base + '` cache');
      return cache[modulePath];
  }

  // Find closest package.json to the base.
  if (modulePath === '.') {
    while (base) {
      newPath = path.resolve(base, 'package.json');
      debug('Trying to resolve `' + newPath + '`');
      if (existsSync(newPath)) {
        newPath = fs.realpathSync(newPath);
        cache[modulePath] = newPath;
        return newPath;
      }
      base = base.substr(0, base.lastIndexOf('/'));
    }
  }
  // Check a relative path for a package.json.
  else if (modulePath[0] === '.' || modulePath[0] === '/') {
    newPath = path.resolve(base, modulePath, 'package.json');
    debug('Trying to resolve `' + newPath + '`');
    if (existsSync(newPath)) {
      newPath = fs.realpathSync(newPath);
      cache[modulePath] = newPath;
      return newPath;
    }
  }
  // Recurse backwards through node_modules looking for the module.
  else {
    while (base) {
      newPath = path.resolve(base, 'node_modules', modulePath, 'package.json');
      debug('Trying to resolve `' + newPath + '`');
      if (existsSync(newPath)) {
        newPath = fs.realpathSync(newPath);
        cache[modulePath] = newPath;
        return newPath;
      }
      base = base.substr(0, base.lastIndexOf('/'));
    }
  }

  // Oops, couldn't find it.
  var err = new Error("Can't find '" + modulePath + "' relative to '" + originalBase + "'");
  err.code = 'ENOENT';
  throw err;
}

// Returns the directory containing package.json instead of the filename.
witwip.dir = function(base, modulePath) {
  return path.dirname(witwip(base, modulePath));
};