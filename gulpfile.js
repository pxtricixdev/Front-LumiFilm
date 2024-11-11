let gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

gulp.task('compilar-sass', function() {
    gulp.src('source/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/style'))
});