const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const minifyCSS = require('gulp-minify-css');
const cleanCSS = require('gulp-clean-css');
const clean = require('gulp-clean');
import {execTask, sequenceTask, root} from './util/task_helpers';
const css = require('@nuintun/gulp-css');
const cssVip = require('gulp-css-vip'); // 增加css代码中的!important
const delImportant = require('gulp-replace-important'); // 删除css代码中的!important
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer'); // 针对浏览器生成不同的CSS前缀
const noImportant = require('postcss-no-important');  // 删除css代码中的!important
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
/*33*/
const releasesDir = root('dist/gulp/css');
const preReleasesDir = root('dist/gulp/precss');

// gulp.task('default', sequenceTask('start-service', 'sass'));
gulp.task('default', sequenceTask('empty', 'sass', 'postcss', 'clean:css', 'clean'));
// 编译, postcss ,clean:css
// gulp.task('one', execTask(npm, ['init', '-y']));
gulp.task('one', function() {
  console.log(root('src/themes/prebuilt/*.scss'));
});
gulp.task('start-service', execTask(npm, ['run', 'build:ng'], {
  cwd: root()
}));

gulp.task('empty', function() {
  return gulp.src(root('dist/gulp'), {read: false}).pipe(clean({force: true}));
});

gulp.task('clean', function() {
  return gulp.src(preReleasesDir, {read: false}).pipe(clean({force: true}));
});

gulp.task('sass', function() {
  return gulp.src(root('src/themes/prebuilt/*.scss'))
    .pipe(sass())
    .pipe(rename({prefix: 'theme-'}))
    .pipe(gulp.dest(preReleasesDir));
});

gulp.task('minify:css', function() {
  return gulp.src(root('dist/gulp/precss/*.css'))
    .pipe(rename({ suffix: '.min' })
    .pipe(minifyCSS()))
    .pipe(gulp.dest(releasesDir));
});

gulp.task('clean:css', function() {
  return gulp.src(root('dist/gulp/precss/*.css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(releasesDir));
});

// postcss([ require('postcss-no-important') ])
gulp.task('postcss', function() {
  const plugins = [
    autoprefixer({browsers: ['last 2 versions'], cascade: true}),
    noImportant()
  ];
  return gulp.src(root('dist/gulp/precss/*.css'))
    .pipe(postcss(plugins))
    .pipe(gulp.dest(preReleasesDir));
});

