var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jsmin = require('gulp-jsmin');
var jade = require('gulp-jade');
var	uglify = require('gulp-uglify');
var	concat = require('gulp-concat');
var rename = require('gulp-rename');

gulp.task('jade', function(){
	gulp.src(['jade/*.jade','!jade/_*.jade'])
			.pipe(jade({
				pretty: true
			}))
			.pipe(gulp.dest('export/'))
});

gulp.task('sass', function () {
	gulp.src('sass/**/*.scss')
			.pipe(sass().on('error', sass.logError))
			.pipe(sass({outputStyle: 'compressed'}))
			.pipe(gulp.dest('export/css'))
});

gulp.task('cssprefix', function () {
	return gulp.src('export/css/sass.css')
			.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: true
			}))
			.pipe(concat('style.css'))
			.pipe(gulp.dest('export/css/'));
});

gulp.task('jsMin', function () {
	gulp.src(['js/**/*.js','!js/**/_*.js'])
			.pipe(jsmin())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('export/js'));
});

gulp.task('scripts',function(){
	gulp.src(['export/js/*.js','!export/js/scripts.js'])
			.pipe(uglify())
			.pipe(concat('scripts.js'))
			.pipe(gulp.dest('export/js'))
});


gulp.task('watch',function(){
	gulp.watch('jade/**/*.jade',['jade']);
	gulp.watch('sass/**/*.scss',['sass','cssprefix']);
	gulp.watch(['js/**/*.js','!js/**/_*.js'],['jsMin']);
	gulp.watch(['export/js/*.js','!export/js/scripts.js'],['scripts']);

});

gulp.task('default', ['jade','sass','cssprefix','jsMin','scripts','watch']);

//INSTALL
//npm install --save-dev gulp
//npm install --save-dev gulp-sass gulp-autoprefixer gulp-jsmin gulp-jade gulp-uglify gulp-concat gulp-rename