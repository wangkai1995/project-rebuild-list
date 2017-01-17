//引入开发工具
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	cssmin = require('gulp-minify-css'),
	sourcemaps = require('gulp-sourcemaps'),
	notify = require('gulp-notify'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	htmlmin = require('gulp-htmlmin'),
	ngHtml2js = require('gulp-ng-html2js'),
	htmlhint = require('gulp-htmlhint'),
    imagemin = require('gulp-imagemin'),
	browserify = require('browserify'),
    watchify = require('watchify'),
    ngAnnotate = require('gulp-ng-annotate'),
	buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    spritesmith = require('gulp.spritesmith'),
    browserSync = require('browser-sync').create();

var flag = true;

//编译CSS
gulp.task('sass',function(){
	gulp.src(['app/css/*.scss'])
	.pipe(sourcemaps.init())
	.pipe(sass({
        errLogToConsole:flag,
    }))
	.pipe(cssmin())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('dist/css'));
	browserSync.reload();
});


//合并模块
gulp.task('build-html', function () {
    gulp.src(['app/js/**/*.html', 'app/js/com/**/*.html'])
        .pipe(htmlmin())
        .pipe(ngHtml2js({
            moduleName: 'template'
        }))
        .pipe(concat('template.js'))
        .pipe(gulp.dest('app/js'));
        browserSync.reload();
});


//检测HTML语法
gulp.task('htmlhint',function(){
	gulp.src('app/*.html')
	.pipe(htmlhint())
	.pipe(gulp.dest('dist/'));
	browserSync.reload();
});

//生成雪碧图
gulp.task('sprites', function(){
    var spriteData = gulp.src('./app/img/script/*.*').pipe(spritesmith({
        cssName: '_sprites.scss',
        cssFormat: 'scss',
        padding: 10,
        cssOpts : {
            cssClass: function(item) {
                if(item.name.indexOf('-hover') !== -1){
                    return '.icon-' +item.name.replace('-hover', ':hover');
                }else{
                    return '.icon-' + item.name;
                }
            }
        },
        imgName: 'sprite.png',
        imgPath: '../img/sprite.png'
    }));

    spriteData.img.pipe(gulp.dest('app/img'));
    spriteData.css.pipe(gulp.dest('app/css/lib'));
});

//处理图片
gulp.task('img', function() {
    return gulp.src('./app/img/*.*', {
            base: './app'
        })
        .pipe(imagemin({
            interlaced: true
        }))
        .pipe(gulp.dest('dist'));
});


//编译js
gulp.task('javascript',function(){
    var browserified = function(filename){
        var bundler = browserify({
            entries: 'app/js/'+filename,
            debug: false,
            cache: {},
            packageCache: {},
            fullPaths: true
        }),
        rebundle = function(){
            bundler.bundle()
            .pipe(source(filename))
            .pipe(buffer())
            .pipe(gulp.dest('dist/js'));
        };

        if(flag){
            bundler = watchify(bundler);
            bundler.on('update',rebundle);
        }
        rebundle();
    };

    browserified('lib.js');
    browserified('index/index.js');
});



//开启刷新
gulp.task('dev',function(){
	browserSync.init({
        port: 3010,
        server: './dist'
    });
})



//串起来批处理
gulp.task('watch',function(){
	gulp.start('sass', 'htmlhint', 'javascript','build-html','dev');
	gulp.watch(['app/js/**/*.html', 'app/js/common/**/*.html'],['build-html']);
	gulp.watch('app/css/**/*.scss', ['sass']);
	gulp.watch('app/js/**/*.js', ['javascript']);
	gulp.watch('app/*.html', ['htmlhint']);
    flag = false;
})



//启动一次 生成雪碧图
gulp.task('run',function(){
    flag = false;
	gulp.start('sass', 'htmlhint', 'javascript','build-html','sprites','img');
})
