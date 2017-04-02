var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

var paths = {
  sass: ['./public/stylesheets/*.scss', './public/stylesheets/*.css'],
  js: [     
       './public/bower_components/angular/angular.min.js',
       './public/bower_components/angular-route/angular-route.min.js',
       './public/bower_components/angular-resource/angular-resource.min.js',
       './public/bower_components/angular-sanitize/angular-sanitize.min.js',
       './public/javascripts/modules/*.js',
       './public/javascripts/services/*.js',
       './public/javascripts/controllers/*.js',
       './public/javascripts/directives/*.js',
      ]
};

gulp.task('js', function() {
  return gulp.src(paths.js)
  .pipe(concat('all.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./public/src/'))
});

gulp.task('sass', function(done) {
  gulp.src(paths.sass)
  .pipe(concat('all.min.scss'))
  .pipe(sass({
    errLogToConsole: true
  }))
  .pipe(gulp.dest('./public/src/'))
  .pipe(minifyCss({
    keepSpecialComments: 0
  }))
  .pipe(rename({ extname: '.css' }))
  .pipe(gulp.dest('./public/src/'))
  .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['js']);
});

gulp.task('default', ['sass', 'js']);
