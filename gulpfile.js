const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rigger = require('gulp-rigger');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const cache = require('gulp-cache');
const webserver = require('browser-sync').create();
const rename = require('gulp-rename');
const runSequence = require('run-sequence');

//styles
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

//JS
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

//html
const pug = require('gulp-pug');

//images
const imagemin = require('gulp-imagemin');
const jpegrecompress = require('imagemin-jpeg-recompress');
const pngquant = require('imagemin-pngquant');


let path = {
    build: {
        html:  'docs/',
        js:    'docs/js/',
        css:   'docs/css/',
        img:   'docs/img/',
        fonts: 'docs/fonts/'
    },
    src: {
        html:  'src/*.html',
        pug:   'src/*.pug',
        js:    'src/js/index.js',
        es6:   ['src/blocks/autocomplate/autocomplate_settings.js'],
        style: 'src/style/index.scss',
        img:   'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html:  'src/**/*.html',
        pug:   'src/**/*.pug',
        js:    ['src/**/*.js', '!src/**/*.transpiled.js'],
        css:   'src/**/*.scss',
        img:   'src/img/**/*.*',
        fonts: 'srs/fonts/**/*.*'
    },
    clean: {
        build:      './docs',
        transpiled: './**/*.transpiled.js'
    }
};


/* настройки сервера */
let serverConfig = {
    server: {
        baseDir: './build'
    },
    tunnel: false,
    host: 'localhost',
    port: 3000,
    notify: true,
    open: true
};

// запуск сервера
gulp.task('webserver', function () {
    //webserver(serverConfig);
    webserver.init([
        '**/*.html',
        'css/*.css',
        'img/*.{png,jpg}',
        'js/*.js',
        'fonts/*.{eot,woff,woff2,ttf}'
    ],  serverConfig);
});

// сбор стилей
gulp.task('css:build', function () {
    gulp.src(path.src.style) // получим index.scss
        .pipe(plumber()) // для отслеживания ошибок
        .pipe(sourcemaps.init()) // инициализируем sourcemap
        .pipe(sass()) // scss -> css
        .pipe(autoprefixer())
        .pipe(cleanCSS()) // минимизируем CSS
        .pipe(sourcemaps.write('./')) // записываем sourcemap
        .pipe(gulp.dest(path.build.css)) // выгружаем в build
       // .pipe(webserver.reload({stream: true})); // перезагрузка сервера
});


// транспиляция js
gulp.task('js:transpilation', function () {
    return gulp.src(path.src.es6)
        .pipe(babel({ presets: ['env']}))
        .pipe(rename(function (path) {
            path.basename += ".transpiled";
        }))
        .pipe(gulp.dest(function(file){ // положить в ту же папку
            return file.base;
        }));
    // .pipe(webserver.reload({stream: true})); // перезагрузка сервера
});


// сбор js
gulp.task('js:bundle', function () {
    return gulp.src(path.src.js) // получим файл main.js
        .pipe(plumber()) // для отслеживания ошибок
        .pipe(rigger()) // импортируем все указанные файлы в index.js
        //.pipe(babel({ presets: ['env']}))
        .pipe(sourcemaps.init()) //инициализируем sourcemap
        .pipe(uglify()) // минимизируем js
        .pipe(sourcemaps.write('./')) //  записываем sourcemap
        .pipe(gulp.dest(path.build.js)) // положим готовый файл
       // .pipe(webserver.reload({stream: true})); // перезагрузка сервера
});

gulp.task('js:build', function() {
    runSequence('js:transpilation','js:bundle','clean:transpiled');
});


// сбор html
gulp.task('html:build', function () {
    return gulp.src(path.src.html) // выбор всех html файлов по указанному пути
        .pipe(plumber()) // отслеживание ошибок
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html)) // выкладывание готовых файлов
        //.pipe(webserver.reload()); // перезагрузка сервера
});


// перенос шрифтов
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

// обработка картинок
gulp.task('image:build', function () {
    gulp.src(path.src.img) // путь с исходниками картинок
        .pipe(cache(imagemin([ // сжатие изображений
            imagemin.gifsicle({interlaced: true}),
            jpegrecompress({
                progressive: true,
                max: 90,
                min: 80
            }),
            pngquant(),
            //imagemin.svgo({plugins: [{removeViewBox: true}]})
        ])))
        .pipe(gulp.dest(path.build.img)); // выгрузка готовых файлов
});

gulp.task('clean:transpiled', function () {
    del.sync(path.clean.transpiled);
});

gulp.task('clean', function () {
    del.sync([path.clean.build, path.clean.transpiled]);
});

// очистка кэша
gulp.task('cache:clear', function () {
    cache.clearAll();
});

// сборка
gulp.task('build', [
    'html:build',
    'css:build',
    'js:transpilation',
    'js:build',
    'fonts:build',
   // 'image:build'
]);

// запуск задач при изменении файлов
gulp.task('watch', function() {
    gulp.watch(path.watch.html, ['html:build']);
    gulp.watch(path.watch.css, ['css:build']);
    gulp.watch(path.watch.js, ['js:build']);
  //  gulp.watch(path.watch.img, ['image:build']);
    gulp.watch(path.watch.fonts, ['fonts:build']);
});

// задача по умолчанию
gulp.task('default', [
    'clean',
    'build',
 //   'webserver',
    'watch'
]);