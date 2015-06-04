var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var ejs = require("gulp-ejs");
var minifyHTML = require('gulp-minify-html');
var uglify = require('gulp-uglify');


/** Path definitions */
var assets_styles = './assets/stylesheets/*.css';
var assets_javascripts = './assets/javascripts/*.js';
var ejs_views = ['./views/*.ejs', './views/**/*.ejs'];

/**
  Default task
  Does everything to deploy to production
  Also, watches to call minify when needed
  * Minifies and cleans CSS, HTML, Javascript
*/
gulp.task('default', function(){
  // Watch CSS
  gulp.watch([assets_styles], ['minify-css']);

  // Watch Javascript
  gulp.watch([assets_javascripts], ['minify-js']);

  // Watch HTML
  gulp.watch(ejs_views, ['compile-min-ejs']);

});



/**
  minify
  Minifies and cleans HTML, CSS, Javascript
*/
gulp.task('minify', ['minify-css', 'minify-js', 'compile-min-ejs']);

/**
  minify-css
  Minifies CSS
*/
gulp.task('minify-css', function(){
  return gulp.src(assets_styles)
    .pipe(minifyCss())
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(gulp.dest('dist/stylesheets'));
});

/**
  minify-js
  Minifies Javascript
*/
gulp.task('minify-js', function(){
  return gulp.src(assets_javascripts)
    .pipe(uglify())
    .pipe(gulp.dest('public/javascripts'))
    .pipe(gulp.dest('dist/javascripts'));
});

/**
  compile-min-ejs
  Compiles and minifies EJS views
*/
gulp.task('compile-min-ejs', function(){
  return gulp.src('./views/*.ejs')
    .pipe(ejs())
    .pipe(minifyHTML())
    .pipe(gulp.dest("dist"));
});
