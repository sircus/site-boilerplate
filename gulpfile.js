'use strict';

var banner = [
'/*!',
' * <%= pkg.name %> - <%= pkg.description %>',
' * Version <%= pkg.version %>',
' * <%= pkg.homepage %>',
' * Author : <%= pkg.author %>',
' * License : <%= pkg.license %>',
' */',
''].join('\n');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var cssnext = require('gulp-cssnext');
var del = require('del');
var fm = require('gulp-front-matter');
var fs = require('fs');
var gulp = require('gulp');
var header = require('gulp-header');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var pkg = require('./package.json');
var pngquant = require('imagemin-pngquant');
var reload = browserSync.reload;
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var source = require('vinyl-source-stream');
var sourcemaps   = require('gulp-sourcemaps');
var stylestats = require('gulp-stylestats');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var yaml = require('js-yaml');

// ----------------------------------------------------------------

gulp.task('html', function() {
  // var hb = require('gulp-hb');
	return gulp.src(['src/**/*.hbs','!src/{partials,partials/**}'])
		.pipe(fm({ property: 'meta' }))
		.pipe(require('gulp-hb')({
			debug: false,
			data: {
				pkg: pkg,
				site: yaml.safeLoad(fs.readFileSync('./site.yml', 'utf8')),
        sircus: require('./src/data/sircus.json')
			},
			helpers: './src/helpers/**/*.js',
			partials: './src/partials/**/*.hbs'
		}))
		.pipe(rename(function(path){
			if (path.basename == 'index'){
				path.extname = '.html';
			} else {
				path.dirname  = (path.dirname ? path.dirname + '/' : '') + path.basename;
				path.basename = 'index';
				path.extname = '.html';
      }
		}))
		.pipe(gulp.dest('./gh-pages'));
});

// ----------------------------------------------------------------

gulp.task('jshint', function() {
  return gulp.src('./src/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

gulp.task('javascript', function() {
  return browserify('./src/static/js/' + pkg.name + '.js', { debug: true })
    .bundle()
    .on('error', function (err) {
      console.log('Error : ' + err.message);
      this.emit('end');
    })
    .pipe(source(pkg.name + '.js'))
    .pipe(gulp.dest('./gh-pages/js'));
});

gulp.task('jsmin', function() {
	return gulp.src('./gh-pages/js/' + pkg.name + '.js')
    .pipe(uglify())
		.pipe(gulp.dest('./gh-pages/js'));
});

// ----------------------------------------------------------------

gulp.task('css', function() {
	return gulp.src('./src/static/css/' + pkg.name + '.css')
		.pipe(header(banner, {pkg:pkg}))
		.pipe(cssnext({
        browsers: ['last 2 versions'],
        sourcemap: true
    }))
		.pipe(gulp.dest('./gh-pages/css'));
});

gulp.task('cssmin', function() {
	return gulp.src('./src/static/css/' + pkg.name + '.css')
    .pipe(header(banner, {pkg:pkg}))
    .pipe(cssnext({
      browsers: ['last 2 versions'],
			compress: true
		}))
		.pipe(gulp.dest('./gh-pages/css'));
});

gulp.task('stylestats', function() {
	return gulp.src('./node_modules/sircus/dist/sircus.css')
		.pipe(stylestats({
			type: 'json',
			outfile: true
		}))
		.pipe(gulp.dest('./src/data'));
});

// ----------------------------------------------------------------

gulp.task('images', function() {
	return gulp.src('./src/static/images/**/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('./gh-pages/images'));
});

// ----------------------------------------------------------------

gulp.task('browsersync', function() {
	browserSync.init({
		server: {
			baseDir: './gh-pages',
      open: 'external'
		}
	});

  gulp.watch(['./src/static/css/*.css'], ['css']);
  gulp.watch(['./src/static/js/*.js'], ['javascript']);
  gulp.watch(['./src/**/*.hbs'], ['html']);
  gulp.watch(['./gh-pages/{css,js}/*.{css,js}']).on('change', reload);
  gulp.watch(['./gh-pages/*.html']).on('change', reload);
});

// ----------------------------------------------------------------

gulp.task('cleanup', function(){
	return del([ './gh-pages' ]);
});

// ----------------------------------------------------------------

gulp.task('minify',['cssmin','jsmin']);

// ----------------------------------------------------------------

gulp.task('deploy',['minify'], function() {});

// ----------------------------------------------------------------

gulp.task('default', ['browsersync']);

// ----------------------------------------------------------------

gulp.task('build', function() {
	runSequence(
    ['stylestats', 'cleanup'],
    'javascript','jshint','css','html','images',
    ['default']
	);
});
