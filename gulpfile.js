var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var includer = require('gulp-htmlincluder');

gulp.task('compile-less', function() {  
	gulp.src('dev/less/general.less')
		.pipe(less())
		.pipe(gulp.dest('build/css'));
});

gulp.task('make-html', function() {
	gulp.src('dev/html/**/*.html')
		.pipe(includer())
		.pipe(gulp.dest('build/'));
});

gulp.task('move-fonts', function() {
	gulp.src('dev/fonts/**/*.*').pipe(gulp.dest('build/fonts'));
});
gulp.task('move-img', function() {
	gulp.src('dev/img/**/*.*').pipe(gulp.dest('build/img'));
});
gulp.task('move-js', function() {
	gulp.src('dev/js/**/*.*').pipe(gulp.dest('build/js'));
});
gulp.task('move-libs', function() {
	gulp.src('dev/libs/**/*.*').pipe(gulp.dest('build/libs'));
});

gulp.task('default', function(){
	gulp.start(	'make-html', 'compile-less', 'move-fonts',
				'move-img', 'move-js', 'move-libs');

	gulp.watch(['dev/less/**/*.less'], function(){
		gulp.start('compile-less');
	});

	gulp.watch(['dev/html/**/*.html'], function(){
		gulp.start('make-html');
	});

	gulp.watch(['dev/fonts/**/*.*'], function(){
		gulp.start('move-fonts');
	});

	gulp.watch(['dev/img/**/*.*'], function(){
		gulp.start('move-img');
	});

	gulp.watch(['dev/js/**/*.*'], function(){
		gulp.start('move-js');
	});

	gulp.watch(['dev/libs/**/*.*'], function(){
		gulp.start('move-libs');
	});

});