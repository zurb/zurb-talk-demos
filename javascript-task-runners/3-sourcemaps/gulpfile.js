var gulp = require('gulp');
var yargs = require('yargs');

// Load all Gulp plugins into one variable
var $ = require('gulp-load-plugins')();

// Check for --production flag
var PRODUCTION = !!(yargs.argv.production);

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: sassPaths,
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe($.if(PRODUCTION, $.cssnano()))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest('css'));
});

gulp.task('default', ['sass'])
