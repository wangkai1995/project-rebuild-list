//引入开发工具
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	cssmin = require('gulp-minify-css'),
	sourcemaps = require('gulp-sourcemaps'),
	notify = require('gulp-notify'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
    htmlhint = require('gulp-htmlhint'),
    imagemin = require('gulp-imagemin'),
	browserify = require('browserify'),
    watchify = require('watchify'),
	buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    browserSync = require('browser-sync').create();

var flag = true;

//编译sass
gulp.task('sass',function(){
	gulp.src(['./src/css/*.scss'])
	.pipe(sourcemaps.init())
	.pipe(sass({
        errLogToConsole:flag,
    }))
	.pipe(cssmin())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('./dist/css'));
	browserSync.reload();
});

//检测HTML语法
gulp.task('htmlhint',function(){
    gulp.src('./src/*.html')
    .pipe(htmlhint())
    .pipe(gulp.dest('dist/'));
    browserSync.reload();
});

//处理图片
gulp.task('img', function() {
    return gulp.src('./src/image/*.*')
        .pipe(imagemin({
            interlaced: true
        }))
        .pipe(gulp.dest('./dist/image'));
});


//编译js
gulp.task('javascript',function(){
    var browserified = function(filename){
        var bundler = browserify({
            entries: './src/js/'+filename,
            debug: false,
            cache: {},
            packageCache: {},
            fullPaths: true
        }),
        rebundle = function(){
            bundler.bundle()
            .pipe(source(filename))
            .pipe(buffer())
            .pipe(uglify({
                        mangle: false
                    }))
            .pipe(gulp.dest('./dist/js'));
        };

        if(flag){
            bundler = watchify(bundler);
            bundler.on('update',rebundle);
        }
        rebundle();
    };

    browserified('index.js');
});



//开启刷新
gulp.task('dev',function(){
	browserSync.init({
        port: 3000,
        server: './dist'
    });
})



//串起来批处理
gulp.task('watch',function(){
	gulp.start('sass','htmlhint','javascript','img','dev');
	gulp.watch('./src/css/**/*.scss', ['sass']);
    gulp.watch('./src/*.html', ['htmlhint']);
	gulp.watch('./src/js/**/*.js', ['javascript']);
    flag = false;
})

