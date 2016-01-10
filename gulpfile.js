'use strict';

var gulp = module.exports.gulp = exports.gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    jade = require('gulp-jade');

gulp.task('clean', function (cb) {
  del(['dest'], cb);
});

gulp.task('css', ['cssLib'], function () {
  return gulp.src('src/assets/stylesheets/**/*.sass')
             .pipe(sass().on('error', function () { console.log(arguments) }))
             .pipe(gulp.dest('dest/stylesheets/'));
});

gulp.task('js', ['jsLib'], function () {
  return gulp.src('src/assets/javascripts/**/*.coffee')
             .pipe(coffee({bare: true}).on('error', function () { console.log(arguments) }))
             .pipe(gulp.dest('dest/javascripts/'));
});

gulp.task('jsLib', function () {
  return gulp.src([
           'node_modules/angular/angular.js',
           // 'node_modules/jquery/dist/jquery.js',
           // 'node_modules/bootstrap/dist/js/bootstrap.js',
           'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
         ])
         .pipe(gulp.dest('dest/javascripts/'));
});

gulp.task('cssLib', function () {
  return gulp.src([
           'node_modules/bootstrap/dist/css/bootstrap.css',
         ])
         .pipe(gulp.dest('dest/stylesheets/'));
});

 
gulp.task('jade', function() {
  return gulp.src('src/views/*.jade')
             .pipe(jade())
             .pipe(gulp.dest('dest/'));
});

gulp.task('build', ['clean', 'js', 'css', 'jade']);
gulp.task('default', function () {
  gulp.run('build');
  gulp.watch(['src/**/*'], ['build']);
});
