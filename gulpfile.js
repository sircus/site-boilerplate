'use strict';

var gulp = require('gulp');
var pkg = require('./package.json');
var header = require('gulp-header');
var rename = require("gulp-rename");
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var root = {
  src:'./src',
  build:'./gh-pages'
};

var banner = [
'/*!',
' * <%= pkg.name %>',
' * <%= pkg.description %>',
' * Version <%= pkg.version %>',
' * <%= pkg.homepage %>',
' * Author : <%= pkg.author %>',
' * License : <%= pkg.license %>',
' */',
''].join('\n');

// ----------------------------------------------------------------
var fm = require('gulp-front-matter');
var data = require('gulp-data');
var fs = require('fs');
var yaml = require('js-yaml');
var config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

gulp.task('engine', function() {
  var hb = require('gulp-hb');

	function getJSON(file) {
		try {
			return require(file.path.replace('.hbs','.json'));
		}
		catch (e) {
			return {};
		}
	}

	return gulp.src(['src/**/*.hbs','!src/{partials,partials/**}'])
		.pipe(data(getJSON))
		.pipe(fm({ property: 'meta' }))
		.pipe(hb({
			debug: false,
			data: {
				pkg: pkg,
				site: config
			},
			helpers: root.src + '/helpers/**/*.js',
			partials: root.src + '/partials/**/*.hbs'
		}))
		.pipe(rename(function(path){
				if (path.basename == 'index'){
  				path.extname = ".html";
				} else {
				path.dirname  = (path.dirname ? path.dirname + "/" : "") + path.basename;
				path.basename = "index";
				path.extname = ".html";
      }
		}))
		.pipe(gulp.dest(root.build));
});

// ----------------------------------------------------------------
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('jshint', function() {
  return gulp.src(root.src + '/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

gulp.task('javascript', function() {
	return browserify(root.src + '/static/js/app.js', { debug: true })
		.bundle()
		.on("error", function (err) {
			console.log("Error : " + err.message);
			this.emit('end');
		})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(root.build + '/js'));
});

gulp.task('jsmin', function() {
	return gulp.src(root.build + '/js/bundle.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(root.build + '/js'));
});

// ----------------------------------------------------------------
var cssnext = require("gulp-cssnext");
var sourcemaps   = require('gulp-sourcemaps');
var stylestats = require('gulp-stylestats');

gulp.task('css', function() {
	return gulp.src(root.src + '/static/css/main.css')
		.pipe(header(banner, {pkg:pkg}))
		.pipe(cssnext())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(root.build + '/css'));
});

gulp.task('cssmin', function() {
  	return gulp.src(root.src + '/static/css/main.css')
    .pipe(header(banner, {pkg:pkg}))
    .pipe(cssnext({
			compress: true
		}))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(root.build + '/css'));
});

gulp.task('stylestats', function() {
	return gulp.src('./node_modules/sircus/dist/sircus.css')
		.pipe(stylestats({
			type: 'json',
			outfile: true
		}))
		.pipe(gulp.dest(root.src + '/data'));
});

// ----------------------------------------------------------------
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('images', function() {
	return gulp.src(root.src + '/static/images/**/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(root.build + '/images'));
});

// ----------------------------------------------------------------

gulp.task('browsersync', function() {
	browserSync.init({
		server: {
			baseDir: root.build
		}
	});

  gulp.watch(root.src + '/**/*.{hbs,css,js}', ['engine', reload]);
  gulp.watch(root.build + '/**/*.html', reload);
});

// ----------------------------------------------------------------
var del = require('del');

gulp.task('cleanup', function(){
	return del([ root.build ]);
});

// ----------------------------------------------------------------

gulp.task('build', function() {
	runSequence(
    'cleanup',
    'jshint','javascript','jsmin',
    'css','cssmin','stylestats',
    'engine',
    'images',
    'default'
	);
});

gulp.task('default', ['browsersync']);
