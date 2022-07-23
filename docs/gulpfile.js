const gulp = require('gulp'); // Gulp
const browserSync = require('browser-sync').create(); // Обновление браузера
const less = require('gulp-less'); // Компиляция LESS файлов в CSS
const plumber = require('gulp-plumber'); // Инструмент для выявления ошибок
const notify = require('gulp-notify'); // Сигнализатор ошибок
const autoprefixer = require('gulp-autoprefixer'); // Автопрефиксер
const sourcemaps = require('gulp-sourcemaps'); // Исхлдные карты
const watch = require('gulp-watch'); //Смотритель


function gulpServer(){
    browserSync.init({
        server: { baseDir: './app/'}
    });
};

function gulpLess(){
    return gulp.src('./app/less/main.less')
        .pipe(plumber({
            errorHandler: notify.onError(function(err){
                return {
                    title: 'Styles',
                    sound: false,
                    message: err.message
                }
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 3 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.stream());
};

function gulpWatch() {
    watch(['./app/**/*.html', './app/**/*.js']).on('change', browserSync.reload);
    watch('./app/less/**/*.less', gulp.series(gulpLess));
};

gulp.task('default', gulp.series(gulpLess, gulp.parallel(gulpServer, gulpWatch)))
