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
var jsPaths = [
  'bower_components/jquery/dist/jquery.js',
  'bower_components/what-input/what-input.js',
  'bower_components/foundation-sites/dist/foundation.js'
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
    .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
  return gulp.src(jsPaths.concat('js/*.js'))
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.js'))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest('dist/js'));

});
gulp.task('build', ['sass', 'js'])
gulp.task('default', ['build'])
