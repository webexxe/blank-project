var vendor_js = [
        //NPM INSTALL
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/owl-carousel-2-beta/dist/owl.carousel.min.js',

        //JS LIB FOLDER
        'js/lib/smothScroll.min.js'
    ],

    gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    jsmin = require('gulp-jsmin'),
    jade = require('gulp-jade'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;


gulp.task('jade', function () {
    gulp.src(['jade/*.jade', '!jade/_*.jade'])
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('www/'))
        .pipe(reload({stream: true}))

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
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('www/css/'))
        .pipe(reload({stream: true}))
});

gulp.task('jsMin', function () {
    gulp.src(['js/**/*.js', '!js/**/_*.js'])
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('www/js'))
        .pipe(reload({stream: true}))
});

gulp.task('scripts', function () {
    gulp.src(['js/*.js', '!js/_*.js'])
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('www/js'));
    gulp.src(vendor_js)
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('www/js'))
        .pipe(reload({stream: true}))

});

gulp.task('browser-sync', function () {
    browserSync({
        files: "www/css/*.css",
        server: {
            baseDir: "www/"
        },
        port: 1900
    });
});

gulp.task('watch', function () {
    gulp.watch('jade/**/*.jade', ['jade']);
    gulp.watch('sass/**/*.scss', ['sass', 'cssprefix']);
    //gulp.watch(['js/**/*.js', '!js/**/_*.js'], ['jsMin']);
    gulp.watch('js/*.js', ['scripts']);
});

gulp.task('default', ['jade', 'sass', 'cssprefix', /*'jsMin',*/ 'scripts', 'browser-sync', 'watch']);