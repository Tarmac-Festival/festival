var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();

// Set the banner content
var banner = ['/*!\n',
    ' * Tarmac Festival - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2019-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' */\n',
    '\n'
].join('');

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function () {

    // Bootstrap
    gulp.src([
        './node_modules/bootstrap/dist/**/*',
        '!./node_modules/bootstrap/dist/css/bootstrap-grid*'
    ])
        .pipe(gulp.dest('./public/vendor/bootstrap'));

    // Summernote Editor
    gulp.src([
        './node_modules/summernote/dist/summernote-bs4.min.js',
        './node_modules/summernote/dist/summernote-bs4.min.css'
    ])
        .pipe(gulp.dest('./public/vendor/summernote'));
    gulp.src([
        './node_modules/summernote/dist/font/*'
    ])
        .pipe(gulp.dest('./public/vendor/summernote/font'));

    // Font Awesome
    gulp.src([
        './node_modules/@fortawesome/**/*'
    ])
        .pipe(gulp.dest('./public/vendor'));

    // jQuery
    gulp.src([
        './node_modules/jquery/dist/*',
        '!./node_modules/jquery/dist/core.js'
    ])
        .pipe(gulp.dest('./public/vendor/jquery'));

    // jQuery Easing
    gulp.src([
        './node_modules/jquery.easing/*.js'
    ])
        .pipe(gulp.dest('./public/vendor/jquery-easing'));

    // I18Next
    gulp.src([
        './node_modules/i18next/i18next*.js',
        './node_modules/i18next-xhr-backend/i18next*.js',
        './node_modules/i18next-browser-languagedetector/i18next*.js',
        './node_modules/jquery-i18next/*i18next*.js'
    ])
        .pipe(gulp.dest('./public/vendor/jquery-i18next'));
});

// Compile SCSS
gulp.task('css:compile', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass.sync({
            outputStyle: 'expanded',
            includePaths: "./node_modules"
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest('./public/css'))
});

// Minify CSS
gulp.task('css:minify', gulp.series('css:compile', function () {
    return gulp.src([
        './public/css/*.css',
        '!./public/css/*.min.css'
    ])
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
}));

// CSS
gulp.task('css', gulp.series('css:compile', 'css:minify'));

// Minify JavaScript
gulp.task('js:minify', function () {
    return gulp.src([
        './public/js/*.js',
        '!./public/js/*.min.js'
    ])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.stream());
});

// JS
gulp.task('js', gulp.series('js:minify'));

// Default task
gulp.task('default', gulp.series('css', 'js', 'vendor'));

// Configure the browserSync task
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Dev task
gulp.task('dev', gulp.series('css', 'js', 'browserSync', function () {
    gulp.watch('./scss/*.scss', ['css']);
    gulp.watch('./public/js/*.js', ['js']);
    gulp.watch('./public/*.html', browserSync.reload);
}));
