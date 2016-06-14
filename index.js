/* eslint-env node */
'use strict';

let transformTools = require('browserify-transform-tools');
let path = require('path');
let paths = [];

module.exports = transformTools.makeRequireTransform(
  'browserify-fixcase-transform',
  {
    evaluateArguments: true,
    jsFilesOnly: true
  },
  function (args, opts, cb) {
    var include = args[0];
    var fullpath = args[0];
    
    // Only handle relative paths for now...
    if (opts.file && fullpath.match(/^\.{1,2}(\\|\/)/)) {
      // if a relative file path, create a full path for it so the same file can be referenced in from
      // multiple locations and still be recognised as the same file
      fullpath = path.normalize(path.join(path.dirname(opts.file), fullpath));
      
      let exists = paths.some(function(p) {
        return fullpath.toUpperCase() === p.fullpath.toUpperCase() && fullpath !== p.fullpath; 
      });

      if (!exists) {
        paths.push({ include: include, fullpath: fullpath, source: opts.file });
      }
      return cb(null, `require('${include.toLowerCase()}')`);
    }
    else {
      return cb();
    }
  }
);