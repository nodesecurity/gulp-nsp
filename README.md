# gulp-requiresafe

# Installation

To install the gulp-requiresafe plugin into your project simply run

npm install gulp-requiresafe --save

# Usage

Then in your gulpfile, add the following task.

```javascript
var gulpRequireSafe = require('gulp-requiresafe');

//To check your project
gulp.task('requiresafe', function (cb) {
  gulpRequireSafe({package: __dirname + '/package.json'}, cb);
});
```  
  
```javascript
//If you're using a shrinkwrap file
gulp.task('requiresafe', function (cb) {
  gulpRequireSafe({shrinkwrap: __dirname + '/npm-shrinkwrap.json'}, cb);
});
```  


If you don't want to stop your gulp flow if some vulnerabilities have been found use the stopOnError option:

```javascript
gulp.task('requiresafe', function (cb) {
  gulpRequireSafe({
    package: __dirname + '/package.json',
    stopOnError: false
  }, cb);
});
```
