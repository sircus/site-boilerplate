# Site Boilerplate

[![Build Status](https://img.shields.io/travis/sircus/site-boilerplate/master.svg?style=flat)](https://travis-ci.org/sircus/site-boilerplate)
[![devDependency Status](https://david-dm.org/sircus/site-boilerplate/dev-status.svg)](https://david-dm.org/sircus/site-boilerplate#info=devDependencies&view=table)

Gulping Handlebars and JSON for GitHub Pages. It's The Most Powerful Static Site Generator Using Gulp. Thanks See Simple  [boilerplate](https://github.com/shannonmoeller/gulp-hb-boilerplate)

## Building

Install : `nodejs` `gulp`

```
$ git clone https://github.com/sircus/site-boilerplate.git
$ cd site-boilerplate
$ npm install
```

build:

```
$ gulp build
```

Watch & Connect:

```
$ gulp
```

deploy:

```
$ gulp deploy
```

## Structure

src:

```
/src
├── / css
├── / js
├── / data
├── / images
├── / partials
└──├── / include
```

build:

```
/ gh-pages
├── / css
├── / js
└── / images
```

## Usage

To configure for your project new

- `pkg` from package.json

```
example: {{pkg.name}}
```
```
"name": "your-project",
"version": "0.0.0",
"author": "yourName <yourEmail@gmail.com> (https://github.com/your-repo)",
"description": "your project description",
"repository": {
  "type": "git",
  "url": "https://github.com/your-repo.git"
},
```

- `site` from site.yml

```
example:  {{site.title}}
```
```
title: your site
description: your site description
tags: every1
author: your name
author_url: https://github.com/your-repo
copyright: Copyright (c) 2015 your name. all rights reserved.
```

- Data from front matter

```
example: {{file.meta.name}}
```

Prepared comparison helpers
- `is` (A equal B)
- `isnot` (A not equal B)

```
example: {{#is A "B"}}, {{#isnot A "B"}} and or="C" option
```

More useful helpers [here](https://github.com/helpers) by Helper team. Some helpers have to check on compatible gulp.

## devDependencies

- [Handlebars](https://github.com/wycats/handlebars.js) : [@wycats](https://github.com/wycats) (Yehuda Katz)
- [gulp-hb](https://github.com/shannonmoeller/gulp-hb): [@shannonmoeller](https://github.com/shannonmoeller) (Shannon Moeller)
- [handlebars-registrar](https://github.com/shannonmoeller/handlebars-registrar) : [@shannonmoeller](https://github.com/shannonmoeller) (Shannon Moeller)
- [handlebars-layouts](https://github.com/shannonmoeller/handlebars-layouts) : [@shannonmoeller](https://github.com/shannonmoeller) (Shannon Moeller)
- [helper-markdown](https://github.com/helpers/helper-markdown): [@{{helpers}}](https://github.com/helpers) (Jon Schlinkert)
- [cssnext](https://github.com/cssnext/cssnext): [@MoOx](https://github.com/MoOx) (Maxime Thirouin)
- [gulp-cssnext](https://github.com/cssnext/gulp-cssnext): [@MoOx](https://github.com/MoOx) (Maxime Thirouin)
- [stylestats](https://github.com/t32k/stylestats): [@t32k](https://github.com/t32k/) (Koji Ishimoto)
- [gulp-stylestats](https://github.com/1000ch/gulp-stylestats): [@1000ch](https://github.com/1000ch) (1000ch)
- [sircus](https://github.com/sircus): [@blivesta](https://github.com/blivesta) (Yasuyuki Enomoto)

## Other devDependencies

- [Package](https://github.com/sircus/site-boilerplate/blob/master/package.json)

## License
Released under the [MIT license](https://github.com/sircus/license/blob/master/LICENSE).

Copyright &copy; 2015 [@blivesta](https://github.com/blivesta) and [@ungki](https://github.com/ungki)
