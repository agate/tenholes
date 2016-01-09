'use strict';

var gulp = module.exports.gulp = exports.gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    jade = require('gulp-jade');

gulp.task('clean', function(cb) {
  del(['dest'], cb);
});

gulp.task('css', function () {
  gulp.src('src/assets/stylesheets/**/*.sass')
      .pipe(sass().on('error', function () { console.log(arguments) }))
      .pipe(gulp.dest('dest/stylesheets/'));
});

gulp.task('js', function () {
  gulp.src('src/assets/javascripts/**/*.coffee')
      .pipe(coffee({bare: true}).on('error', function () { console.log(arguments) }))
      .pipe(gulp.dest('dest/javascripts/'));
});

gulp.task('lib', function () {
  gulp.src('node_modules/angular/angular.js')
      .pipe(gulp.dest('dest/javascripts/'));
});

 
gulp.task('jade', function() {
  gulp.src('src/views/*.jade')
      .pipe(jade())
      .pipe(gulp.dest('dest/'));
});

gulp.task('build', ['clean', 'lib', 'js', 'css', 'jade']);
gulp.task('default', ['build']);
