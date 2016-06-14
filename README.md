# browserify-fixcase-transform
A simple browserify transform to ensure that the case of require()'d file names are consistent. This is based on the browserify-casesensitiverequire transform by Pete Ward (https://github.com/peteward44/browserify-casesensitiverequire) which just warned and took no steps to rectify the issues. As I was facing errors in production code due to the case sensitivity issue it was imperative to automagically fix these.

This currently limits itself to dealing with relative file paths only.

Example usage (command line)
```
npm i browserify-fixcase-transform -g
browserify -t browserify-fixcase-transform ./myindex.js
```
Example
Running the following files through the transform
File: index1.js
```
var a = require( './Index3.js' );
var r = require('React');
```

File: index2.js
```
var b = require( './INDEX3.js' );
var m = require('material-ui/AppBar');
```

will emit
File: index1.js
```
var a = require( './index3.js' );
var r = require('React');
```

File: index2.js
```
var b = require( './index3.js' );
var m = require('material-ui/AppBar');
```