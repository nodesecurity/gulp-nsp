# gulp-requiresafe

# Usage
To install the gulp-requiresafe plugin into your project simply run

`npm install gulp-requiresafe --save`

Then in your gulpfile, add the following task.

```
var gulpRequireSafe = require('gulp-requiresafe');

//To check your project
gulp.task('requiresafe', function (cb) {
  var package = fs.readFileSync('./package.json'); // probably don't actually do this.
  gulpRequireSafe({package: package}, cb);
});
```

If you don't want to stop your gulp flow if some vulnerabilities have been found use the stopOnError option:

```
gulp.task('requiresafe', function (cb) {
  gulpRequireSafe({
    path: './',
    stopOnError: false
  }, cb);
});
```
