var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    util = require('gulp-util');

gulp.task('jshint', function(APP_SRC) {
    gulp.src([
        './routes/**/*.js',
        './routes/*.js',
        './lib/**/*.js',
        './lib/*.js',
        './models/**/*.js'],
        './models/*.js'])
        .pipe(jshint("./config/.jshintrc"))
        .on('end', function(){ util.log('Jshint finished.'); })
        .pipe(jshint.reporter('jshint-stylish'));
});
