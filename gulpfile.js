let gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const watch = require("gulp-watch")

gulp.task('compilar-sass', function() {
    return gulp.src('source/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/style'))
});

gulp.task( 'watch', function() {
    gulp.watch( 'source/**/*.scss', gulp.series('compilar-sass'));
});