var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    gulpsync = require('gulp-sync')(gulp),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector');

var config = require('./config.js');

//样式
gulp.task('styles', function() {
    return sass(config.sass.src)
        .on('error', function(error) {
            console.log('Error!', error.message);
        })
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(minifycss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.sass.dest))
        .pipe(notify({message:'Styles task is complete'}));
});

//rev
gulp.task('revChange',function(){
    return gulp.src(config.build.src)
    .pipe(rev())
    .pipe(gulp.dest(config.build.dest))
    .pipe(rev.manifest())
    .pipe(gulp.dest(config.sass.rev))
    .pipe(notify({message:'changeRev task is complete'}));
});

//revCollector
gulp.task('revCollector', function () {
    return gulp.src([config.rev.revJson, 'index.html'])
        .pipe( revCollector({
            replaceReved: true,
        }) )
        .pipe( gulp.dest('') )
        .pipe(notify({ message: 'Rev task complete' }));
});

// 清理
gulp.task('clean', function() {
    return gulp.src([config.clean.src], { read: false })
        .pipe(clean());
});

// 监听
gulp.task('watch', function() {
    // 监听所有.scss档
    gulp.watch(config.sass.all, ['clean','styles']);

    // 建立即时重整伺服器
    var server = livereload();

    // 监听所有位在 build/  目录下的档案，一旦有更动，便进行重整
    gulp.watch([config.dest]).on('change', function(file) {
        server.changed(file.path);
    });
});
gulp.task('default',gulpsync.sync(['clean',['styles'],'watch']));
gulp.task('rev',gulpsync.sync(['revChange','revCollector']));
