var gulp = require('gulp'),
    util = require('gulp-util'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    browserSync = require('browser-sync');
var b = browserify('./src/app.js',{debug:true}).transform("babelify",{presets:["es2015","react","stage-0"]});

gulp.task('browserify',function(){
    return b.bundle()
    .on('error',util.log)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public'));
});


