'use strict';

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const cleanCSS = require('gulp-clean-css');
const fileinclude = require('gulp-file-include');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

gulp.task('fileinclude', () => {
  return gulp.src('./src/pages/index.html')
  .pipe(fileinclude({
    prefix: '@@',
    basepath: '@file'
  }))
  .pipe(gulp.dest('./'));
});

gulp.task('browserify', () => {
  return browserify('./src/assets/js/app.js')
  .transform('babelify', {presets: ['env']})
  .bundle()
  .pipe(source('app.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./assets/js'));
});

gulp.task('sass', () => {
  return gulp.src('./src/assets/scss/app.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
  .pipe(cleanCSS())
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./assets/css'));
});

gulp.task('build', ['fileinclude', 'browserify', 'sass']);

gulp.task('watch', () => {
  gulp.watch('./src/pages/**/*.html', ['fileinclude']);
  gulp.watch('./src/assets/js/**/*.js', ['browserify']);
  gulp.watch('./src/assets/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['build', 'watch']);
