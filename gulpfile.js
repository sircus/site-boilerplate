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

gulp.task('engine', function() {
	var data = require('gulp-data');
	var fm = require('gulp-front-matter');
	var hb = require('gulp-hb');
	var fs = require('fs');
	var yaml = require('js-yaml');
	var config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

	function getJSON(file) {
		try {
			return require(file.path.replace('.html','.json'));
		}
		catch (e) {
			return {};
		}
	}

	return gulp.src(root.src + '/**/*.html')
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
						return;
				}
				path.dirname  = (path.dirname ? path.dirname + "/" : "") + path.basename;
				path.basename = "index";
				path.extname = ".html";
		}))
		.pipe(gulp.dest(root.build));
});

// ----------------------------------------------------------------

gulp.task('js', function() {
	var stylish = require('jshint-stylish');
	var uglify = require('gulp-uglify');
	var jshint = require('gulp-jshint');

	return gulp.src(root.src + '/static/js/app.js')
		.pipe(header(banner, { pkg:pkg }))
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(gulp.dest(root.build + '/js'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(header(banner, { pkg:pkg }))
		.pipe(gulp.dest(root.build + '/js'));
});

gulp.task('browserify', function() {
	var browserify = require('browserify');
	var source = require('vinyl-source-stream');

	return browserify(root.src + '/static/js/app.js', { debug: true })
		.bundle()
		.on("error", function (err) {
			console.log("Error : " + err.message);
			this.emit('end');
		})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(root.build + '/js'));
});

// ----------------------------------------------------------------

gulp.task('sircus', function() {
	return gulp.src('./node_modules/sircus/dist/sircus.min.css')
		.pipe(gulp.dest(root.build + '/css'));
});

gulp.task('css', function() {
	var cssnext = require("gulp-cssnext");

	return gulp.src(root.src + '/static/css/main.css')
		.pipe(header(banner, {pkg:pkg}))
		.pipe(cssnext({
			compress: true
		}))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(root.build + '/css'));
});

gulp.task('stylestats', function() {
	var stylestats = require('gulp-stylestats');

	return gulp.src('./node_modules/sircus/dist/sircus.css')
		.pipe(stylestats({
			type: 'json',
			outfile: true
		}))
		.pipe(gulp.dest(root.src + '/data'));
});

// ----------------------------------------------------------------

gulp.task('images', function() {
	var imagemin = require('gulp-imagemin');
	var pngquant = require('imagemin-pngquant');

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

  gulp.watch(root.src + '/**/*.{hbs,html,css,js}', ['engine', reload]);
  gulp.watch(root.build + '/**/*.html', reload);
});

// ----------------------------------------------------------------

gulp.task('cleanup', function(){
	var del = require('del');

	return del([ root.build ]);
});

// ----------------------------------------------------------------

gulp.task('build', function() {
	runSequence(
    'cleanup',
    ['js','browserify'],
    ['sircus','css','stylestats'],
    'engine',
    'images',
    'default'
	);
});

gulp.task('default', ['browsersync']);
