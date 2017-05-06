var gulp = require('gulp');
// var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');




var sassSource = ['sass/*.scss'];
var css = 'build/css';
var jsSource = ['build/js/*.js'];
var htmlSource = ['build/*.html'];



// gulp.task('js', function() {
//   return gulp.src(jsSource)
//     // .pipe(jshint('./.jshintrc'))
//     // .pipe(jshint.reporter('jshint-stylish'))
//     .pipe(connect.reload());
// });
gulp.task('js', function (){
	return gulp.src(jsSource)
		.pipe(connect.reload())
})
gulp.task('sassCompile', function () {
  return gulp.src(sassSource)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'})
      .on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(css))
    .pipe(connect.reload());
})
gulp.task('html', function () {
	gulp.src(htmlSource)
		.pipe(connect.reload());
})
gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch(jsSource, ['js']);
  gulp.watch(sassSource, ['sassCompile']);
  gulp.watch(htmlSource, ['html']);
});

gulp.task('default', ['sassCompile', 'watch', 'connect']);