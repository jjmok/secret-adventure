var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');
var rename = require('gulp-rename');

// var input = './stylesheets/**/*.scss';
var input = './scss/*.scss';
var output = './dist/';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded' //nested, expanded, compact, compressed
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(rename('booker.css'))
    .pipe(gulp.dest(output))
    .resume();
});

gulp.task('watch', function() {
  return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    .watch(input, ['sass'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

/*Generate SASS Document*/
gulp.task('sassdoc', function () {
  return gulp
    .src(input)
    .pipe(sassdoc())
    .resume();
});

/*
Generate Default task
if you run gulp, instead of gulp sass, it'll run the default task. In this case, it runs gulp sass and gulp watch
*/
gulp.task('default', ['sass', 'watch' /*, possible other tasks... */]);

/*Generate Production Files*/
gulp.task('prod', ['sassdoc'], function () {
  return gulp
    .src(input)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output));
});