'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var posthtml = require('gulp-posthtml');
var htmlinclude = require('posthtml-include');
var concat = require('gulp-concat');
var del = require('del');

gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulp.dest('build/css'))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'));
  gulp.watch('source/img/**/*.{png,jpg,svg}', gulp.series('cleanimg', 'copyimg', 'refresh'));
  gulp.watch('source/img/inline-*.svg', gulp.series('sprite', 'html', 'refresh'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
  gulp.watch('source/js/*.js', gulp.series('mainjs', 'refresh'));
  gulp.watch('source/js/lib/*.js', gulp.series('vendorjs', 'refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('img', function () {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('webp', function () {
  return gulp.src('source/img/content-*.{png,jpg}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('build/img'));
});

gulp.task('sprite', function () {
  return gulp.src('source/img/inline-*.svg')
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('html', function () {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      htmlinclude()
    ]))
    .pipe(gulp.dest('build'));
});

gulp.task('mainjs', function () {
  return gulp.src('source/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('vendorjs', function () {
  return gulp.src('source/js/lib/*.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('copy', function () {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**/*.{png,jpg,svg}',
    '!source/img/**/inline-*.svg',
    'source//*.ico'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'));
});

gulp.task('copybuild', function () {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source//*.ico'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('copyimg', function () {
  return gulp.src([
    'source/img/**/*.{png,jpg,svg}',
    '!source/img/**/inline-*.svg'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'));
});

gulp.task('cleanimg', function () {
  return del([
    'build/img/**/*.{png,jpg,svg}',
    '!build/img/**/sprite.svg'
  ]);
});

gulp.task('cleansvg', function () {
  return del('build/img/**/inline-*.{png,jpg,svg}');
});

gulp.task('build', gulp.series('clean', 'copybuild', 'css', 'img', 'webp', 'vendorjs', 'mainjs', 'sprite', 'html', 'cleansvg'));
gulp.task('start', gulp.series('clean', 'copy', 'css', 'webp', 'sprite', 'vendorjs', 'mainjs', 'html', 'server'));
