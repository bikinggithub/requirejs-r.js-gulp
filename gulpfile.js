var gulp = require('gulp');
var rev=require('gulp-rev');/*给文件用哈希码添加版本号*/
var revReplace=require('gulp-rev-replace');/*更新引用*/
var useref=require('gulp-useref');/*合并文件*/
var filter=require('gulp-filter');/*过滤器：筛选，恢复*/
var uglify=require('gulp-uglify');/*压缩js*/
var csso=require('gulp-csso');/*压缩css*/

var imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

var htmlmin = require('gulp-htmlmin');

var assetRev = require('gulp-asset-rev'),
    runSequence = require('run-sequence'),
    revCollector = require('gulp-rev-collector');


//开发构建
gulp.task('todist', function (done) {
    condition = false;
    runSequence(    //需要说明的是，用gulp.run也可以实现以上所有任务的执行，只是gulp.run是最大限度的并行执行这些任务，而在添加版本号时需要串行执行（顺序执行）这些任务，故使用了runSequence.
        ['jsdone'],
        ['cssdone'],
        ['htmldone'],
        ['imagemin'],
        ['jsmin'],
        ['cssmin'],
        done);
});

/*
gulp.task('todist', ['jsdone', 'cssdone', 'htmldone', 'imagemin', 'jsmin', 'cssmin']);
*/

gulp.task('imagemin', function () {
    return gulp.src('public/images/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('jsdone',function(){
    return gulp.src('public/js/*.js')/*需要处理的文件*/
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/js'));/*文件流放到dist目录下*/
});

gulp.task('jsmin',['jsdone','htmldone'],function(){
    return gulp.src('public/js/*.js')/*需要处理的文件*/
        .pipe(useref())/*处理注释压缩*/
        .pipe(uglify())/*压缩js文件*/
        .pipe(gulp.dest('dist/js'));/*文件流放到dist目录下*/
});

gulp.task('cssdone',function(){
    return gulp.src('public/css/*.css')/*需要处理的文件*/
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/css'));/*文件流放到dist目录下*/
});

gulp.task('cssmin',['cssdone','htmldone'],function(){
    return gulp.src('public/css/*.css')/*需要处理的文件*/
        .pipe(useref())/*处理注释压缩*/
        .pipe(csso())/*压缩css文件*/
        .pipe(gulp.dest('dist/css'));/*文件流放到dist目录下*/
});

gulp.task('htmldone',function(){
    return gulp.src(['dist/**/*.json','public/*.html'])/*需要处理的文件*/
        .pipe(useref())/*处理注释压缩*/
        .pipe(htmlmin({
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        }))
        .pipe(revCollector())
        .pipe(gulp.dest('dist'));/*文件流放到dist目录下*/
});