/* eslint-env node, mocha */
/* global done */
'use strict';
var expect = require('chai').expect();
var transform = require('../index.js');
var transformTools = require('browserify-transform-tools');

describe('browserify-fixcase-transform', function () {
  let dummyFile = './foo.js';

  describe('Working with relative paths', function () {
    it('should lower-case the require path', function () {
      let content = [
        "require('./Foo/barModule')",
        "require('./bAr/FooModule')"
      ].join('\n');
      let expectedContent = [
        "require('./foo/barmodule')",
        "require('./bar/foomodule')"
      ].join('\n');

      transformTools.runTransform(transform, dummyFile, {
        content: content
      }, function (err, result) {
        if (err) {
          return done(err);
        }
        expect(result).to.equal(expectedContent);
        done();
      });
    });
  });

  describe('Working with absolute paths', () => {
    it('should leave modules referenced by absolute path alone', () => {
      let content = [
        "require('material-ui/AppBar')",
        "require('React')"
      ].join('\n');
      let expectedContent = content;

      transformTools.runTransform(transform, dummyFile, {
        content: content
      }, function (err, result) {
        if (err) {
          return done(err);
        }
        expect(result).to.equal(expectedContent);
        done();
      });
    });
  });
});