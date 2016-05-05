var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    jsmin = require('gulp-jsmin'),
    jade = require('gulp-jade'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync');


gulp.task('jade', function () {
    gulp.src(['jade/*.jade', '!jade/_*.jade'])
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('www/'))
});

gulp.task('sass', function () {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('www/css'))
});

gulp.task('cssprefix', function () {
    return gulp.src('www/css/sass.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('www/css/'));
});

gulp.task('jsMin', function () {
    gulp.src(['js/**/*.js', '!js/**/_*.js'])
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('www/js'));
});

gulp.task('scripts', function () {
    gulp.src(['www/js/*.js', '!www/js/scripts.js'])
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('www/js'))
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "www/"
        },
        port: 1900
    });
});

gulp.task('watch', function () {
    gulp.watch('jade/**/*.jade', ['jade']);
    gulp.watch('sass/**/*.scss', ['sass', 'cssprefix']);
    gulp.watch(['js/**/*.js', '!js/**/_*.js'], ['jsMin']);
    //gulp.watch(['www/js/*.js','!www/js/scripts.js'],['scripts']);
});

gulp.task('default', ['jade', 'sass', 'cssprefix', 'jsMin', /*'scripts',*/ 'browser-sync', 'watch']);