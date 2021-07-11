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
var fileinclude = require('gulp-file-include');
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

gulp.task('js', function () {
  return gulp.src('source/js/main.js')
    .pipe(plumber())
    .pipe(fileinclude())
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

gulp.task('build', gulp.series('clean', 'copy', 'css', 'sprite', 'html'));
gulp.task('start', gulp.series('build', 'server'));
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

