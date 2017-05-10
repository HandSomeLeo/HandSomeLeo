/**
 * Created by ybq on 2017/5/8.
 */
const gulp = require('gulp');
const concat  = require('gulp-concat');
const sprite = require('gulp-css-sprite');
const minicss = require('gulp-minify-css');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('js',()=>{
    return gulp.src('js/about.js')
        .pipe(uglify())
        .pipe(rename((path)=>{
            path.dirname = 'lll';
            path.basename += 'ddd';
            path.extname += '.md'
        }))
        .pipe(gulp.dest('src/js'));
});

gulp.task('concat',function(){
    return gulp.src(['js/base.js','js/about.js'])
        .pipe(concat('index.js'))
        .pipe(gulp.dest('src/js'));
});

gulp.task('css',function(){
    return gulp.src('css/test.css')
        .pipe(replace(/\.\.\/images/g,'../../images'))
        .pipe(minicss())
        .pipe(gulp.dest('src/css'));
});

gulp.task('default',['concat','css']);