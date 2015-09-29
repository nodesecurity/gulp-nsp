# gulp-requiresafe

# Usage
To install the gulp-requiresafe plugin into your project simply run

`npm install gulp-requiresafe --save`

Then in your gulpfile, add the following task.

```
var gulpRequireSafe = require('gulp-requiresafe');

//To check your project
gulp.task('requiresafe', function (cb) {
  gulpRequireSafe('path/to/package.json_or_npm-shrinkwrap.json', cb);
});

//If you don't want to stop your gulp flow if some vulnerabilities have been found:
/*
gulp.task('requiresafe', function (cb) {
  gulpRequireSafe({
    path: './',
    stopOnError: false
  }, cb);
});
*/
```
