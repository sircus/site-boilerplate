'use strict';

var gulp = require('gulp'),
       rename = require("gulp-rename"),
       stylestats = require('gulp-stylestats'),
       browserSync = require('browser-sync'),
       runSequence = require('run-sequence'),
       pkg = require('./package.json'),
       reload = browserSync.reload,
       base = { base: './src/' },
       autoprefixerBrowsers = ['last 2 version'];

// ----------------------------------------------------------------

gulp.task('engine', function () {
	var data = require('gulp-data'),
		fm = require('gulp-front-matter'),
		hb = require('./lib/handlebars-engine.js');

	function getJSON(file) {
		try {
			return require(file.path.replace('.html','md','.json'));
		}
		catch (e) {
			return {};
		}
	}

	return gulp.src('./src/**/*.html', base)
		.pipe(data(getJSON))
		.pipe(fm({ property: 'meta' }))
		.pipe(hb({
			debug: true,
			data: './src/data/*.{js,json}',
			helpers: './lib/handlebars-helpers.js',
			partials: './src/partials/**.hbs'
		}))
		.pipe(rename(function(path){
				if (path.basename=='index'){
						return;
				}
				path.dirname=path.basename.split('-').join('-');
				path.basename="index";
				path.extname = ".html";
		}))
		.pipe(gulp.dest('./gh-pages/'));
});

// ----------------------------------------------------------------

gulp.task('stylestats', function () {
	gulp.src('./src/static/css/docs.css')
		.pipe(stylestats({
			type: 'json',
			outfile: true
		}))
		.pipe(gulp.dest('./src/data'));
});

// ----------------------------------------------------------------

gulp.task('files', function() {
  return gulp.src('./src/static/**/*.*')
	 .pipe(gulp.dest('./gh-pages/static'));
});

gulp.task('data', function() {
  return gulp.src('./src/data/**/*')
	  .pipe(gulp.dest('./gh-pages/data'));
});

// ----------------------------------------------------------------

gulp.task('browsersync', function() {
		browserSync.init({
				server: {
						baseDir: "./gh-pages/"
				}
		});
});

// ----------------------------------------------------------------

gulp.task('build', function() {
  runSequence(
    'stylestats', 'engine', 'files', 'data', 'default'
  );
});

gulp.task('default', ['watch']);

gulp.task('watch',['browsersync'],function() {
	gulp.watch('gh-pages/**/*.html', reload);
	gulp.watch('src/**/*.{hbs,html,css,js,md}', ['engine',reload]);
});
