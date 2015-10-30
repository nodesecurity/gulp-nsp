# gulp-nsp

# Installation

To install the gulp-nsp plugin into your project simply run

```bash
npm install gulp-nsp --save
```  

# Usage

Then in your gulpfile, add the following task.

```javascript
var gulpNSP = require('gulp-nsp');

//To check your project
gulp.task('nsp', function (cb) {
  gulpNSP({package: __dirname + '/package.json'}, cb);
});
```  
  
```javascript
//If you're using a shrinkwrap file
gulp.task('nsp', function (cb) {
  gulpNSP({shrinkwrap: __dirname + '/npm-shrinkwrap.json'}, cb);
});
```  


If you don't want to stop your gulp flow if some vulnerabilities have been found use the stopOnError option:

```javascript
gulp.task('nsp', function (cb) {
  gulpNSP({
    package: __dirname + '/package.json',
    stopOnError: false
  }, cb);
});
```
