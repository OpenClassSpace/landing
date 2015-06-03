var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');

/**
  Default task
  Does everything to deploy to production
  Also, watches to call minify when needed
  * Minifies and cleans CSS, HTML, Javascript
*/
gulp.task('default', function(){
  // Just watch for css changes and
  gulp.watch(['./public/stylesheets/*.css'], ['minify-css']);
});



/**
  minify
  Minifies and cleans HTML, CSS, Javascript
*/
gulp.task('minify', ['minify-css']);

/**
  minify-css
  Minifies CSS
*/
gulp.task('minify-css', function(){
  return gulp.src('public/stylesheets/*.css')
   .pipe(minifyCss())
   .pipe(gulp.dest('dist/stylesheets'));
});
