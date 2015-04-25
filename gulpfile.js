'use strict';
var gulp = require('gulp');
var jshint=require('gulp-jshint')
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var gulpIf =require('gulp-if');
var autoprefixer=require('gulp-autoprefixer');
var sass=require('gulp-sass');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 7',
  'ie_mob >= 7',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('jshint', function () {
  return gulp.src('src/**/*.js')
    .pipe(reload({stream: true, once: true}))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulpIf(!browserSync.active, jshint.reporter('fail')));
});

gulp.task('serve', ['styles'], function () {
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    server: {baseDir:'src'}
  });

  gulp.watch(['src/**/*.html'], reload);
  gulp.watch(['src/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['src/**/*.js'], ['jshint']);
});

gulp.task('styles', function () {
  return gulp.src([
    'src/**/*.scss',
    'src/**/**/*.css'
  ])
    .pipe(sass({
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe(gulp.dest('build/'))
});