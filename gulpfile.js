'use strict';

/**
 * Params of gulp-command
 * - --sync
 * - --host <browser-sync host value>
 * - --port <browser-sync port value>
 * - --open <browser-sync open value>
 */

// Load plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var stripdebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var babel = require('gulp-babel');

// error function for plumber
var onError = function(err) {
  gutil.beep();

  notification({ title: 'Gulp Task Error', message: 'Check the console' }, err);

  console.log(err);
  this.emit('end');
};

var notification = function(params, error) {
	var param = gutil.env.notify;

	error = error || false;

	if(!param) {
		param = 'error';
	}

	if(param) {
		if(param === 'both') {
			param = (error ? 'error' : 'success');
		}

		if(param === 'error' && error) {
			return notify(params).write(error);
		}
		else if(param === 'success' && !error) {
			return notify(params);
		}
	}

	return notify(function() {});
};

var sassOptions = {
	outputStyle: 'compressed'
};

var autoprefixerOptions = {
	browsers: [
		'> 0%',
		'not ie <= 10',
		'not Chrome < 50',
		'not Firefox < 46',
		'not Opera < 37',
		'not Safari < 8'
	],
	cascade: false
};

gulp.task('css', function() {
	return gulp.src('src/scss/*.scss')
	.pipe(plumber({ errorHandler: onError }))
	.pipe(sass(sassOptions))
	.pipe(autoprefixer(autoprefixerOptions))
	.pipe(gulp.dest('dist/css/'))
	.pipe(notification({ message: 'CSS done!' }));
});

gulp.task('js', function() {
	return gulp.src([
		'src/js/**/*.js'
	])
	.pipe(concat('script.js'))
	.pipe(gulp.dest('dist/js'))
	//.pipe(stripdebug())
	//.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
	.pipe(notification({ message: 'Scripts task complete' }));
});

gulp.task('watch', function () {
	gulp.watch('src/scss/**/*', ['css']);
	gulp.watch(['src/js/**/*.js'], ['js']);
});

gulp.task('default', ['css', 'js']);
