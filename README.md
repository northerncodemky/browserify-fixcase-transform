# browserify-fixcase-transform
A simple browserify transform to ensure that the case of require()'d file names are consistent. This is based on the browserify-casesensitiverequire transform by Pete Ward (https://github.com/peteward44/browserify-casesensitiverequire) which just warned and took no steps to rectify the issues. As I was facing errors in production code due to the case sensitivity issue it was imperative to automagically fix these.

Example usage (command line)
```
npm i browserify-fixcase-transform -g
browserify -t browserify-fixcase-transform ./myindex.js
```
Example

File: index1.js
```
var a = require( './index3.js' );
```

File: index2.js
```
var b = require( './INDEX3.js' );
```

This will emit a warning that index3.js is referenced in multiple files using different casing.


Example (using relative paths from different subfolders)

File: index1.js
```
var a = require( './index3.js' );
```

File: subfolder/index2.js
```
var b = require( '../INDEX3.js' );
```

browserify-fixcase-transform is smart enough to figure out that they are referencing the same index3.js, so will also emit a warning.

