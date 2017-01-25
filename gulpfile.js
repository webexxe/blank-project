//----------------------------------------------------------------------------------------------------------------//
//GULP REQUIRE
var
    gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,

//----------------------------------------------------------------------------------------------------------------//
//VENDOR JS/CSS
    vendor_js = [
        //NPM INSTALL
        'node_modules/jquery/dist/jquery.js',

        //JS LIB FOLDER
        '_front/js/lib/smothScroll.min.js'
    ],
    vendor_css = [];

//----------------------------------------------------------------------------------------------------------------//
//GULP TASKS

gulp
    .task('jade', function () {
        gulp.src(['_front/jade/*.jade', '!_front/jade/_*.jade'])
            .pipe(jade({pretty: true}))
            .pipe(gulp.dest('www/'))
            .pipe(reload({stream: true}))
    })
    
    .task('css', function () {
        gulp.src('_front/sass/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(autoprefixer({browsers: ['last 2 versions', '> 5%', 'Firefox ESR']}))
            .pipe(gulp.dest('www/assets/css'));
        gulp.src(vendor_css)
            .pipe(autoprefixer({browsers: ['last 2 versions', '> 5%', 'Firefox ESR']}))
            .pipe(concat('vendor.css'))
            .pipe(gulp.dest('www/assets/css/'));
    })

    .task('scripts', function () {
        gulp.src(['_front/js/**/*.js', '!_front/js/**/_*.js'])
            .pipe(uglify({mangle: false}))
            .pipe(concat('scripts.js'))
            .pipe(gulp.dest('www/assets/js'));
        gulp.src(vendor_js)
            .pipe(uglify())
            .pipe(concat('vendor.js'))
            .pipe(gulp.dest('www/assets/js'))
            .pipe(reload({stream: true}))
    })

    .task('imgMin', function () {
        return gulp.src('_front/img/**/*')
            .pipe(imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            }))
            .pipe(gulp.dest('www/assets/img'));
    })

    .task('browser-sync', function () {
        browserSync({
            files: 'www/**/*',
            server: {
                baseDir: 'www/'
            },
            https: false,
            port: 1900
        });
    })

    //-------------------------------------------------------------------------------------------------------------//
    //GULP START
    .task('watch', function () {
        gulp.watch('_front/jade/**/*.jade', ['jade']);
        gulp.watch('_front/sass/**/*.scss', ['css']);
        gulp.watch('_front/js/**/*.js', ['scripts']);
        gulp.watch('_front/img/**/*', ['imgMin']);
    })

    .task('default', ['jade', 'css', 'scripts', 'imgMin', 'browser-sync', 'watch']);