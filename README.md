# Sircus Web

[![Build Status](https://img.shields.io/travis/sircus/sircus-web/master.svg?style=flat)](https://travis-ci.org/sircus/sircus-web)
[![devDependency Status](https://david-dm.org/sircus/sircus-web/dev-status.svg)](https://david-dm.org/sircus/sircus-web#info=devDependencies&view=table)

Sircus web is static site generator for sircus that Moduler CSS For People Who Make Web Together.

[sircus.blivesta.com](http://sircus.blivesta.com/)

## Building

Gulping Handlebars and JSON for GitHub Pages. It's the most powerful static site generator using gulp. Thanks  [boilerplate](https://github.com/shannonmoeller/gulp-hb-boilerplate)

Install : `nodejs` `npm` `gulp`

```
$ git clone https://github.com/sircus/sircus-web.git
$ cd sircus-web
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

## Structure

src:

```
/src
├── / static
│   ├── / images
│   ├── / css
│   │   ├── main.css
│   │   ├── / folder
│   │   │   ├── / import.css
│   └── / js
│   │   │── app.js
├── / data
│   ├── / sircus.json
├── / partials
└── / helpers
```

build:

```
/ gh-pages
├── / css
├── / js
├── / images
└── index.html
```

## Usage

- To configure for your project new
  - `pkg` from package.json
  - `site` from config.yml

```
example:
{{pkg.name}}
{{site.title}}
```

- Static files using common naming
  - CSS: main.css
  - JS: app.js

- Prepared comparisons helpers
  - is ( A == B )
  - isnot ( A !== B)

More comparisons [here](https://github.com/danharper/Handlebars-Helpers) but no npm registry. just copy. And more useful helpers [here](https://github.com/helpers) by Helper team. Some helpers need to check on compatible gulp.

## developments

#### Sircus by [blivesta](https://github.com/sircus)

- Modular CSS Family [Usage](https://github.com/sircus/sircus)
- Use tomorrow's CSS syntax, today. [Usage](https://github.com/cssnext/cssnext)

#### Handlebarsjs by [wycats](https://github.com/wycats)

- Handlebarsjs [Usage](https://github.com/wycats/handlebars.js)

#### Handlebars Plugins by [shannonmoeller](https://github.com/shannonmoeller)

- Handlebars for Gulp  [API, Options](https://github.com/shannonmoeller/gulp-hb)
- Handlebars Registrar [API, Options](https://github.com/shannonmoeller/handlebars-registrar)
- Handlebars Layouts [API, Helpers](https://github.com/shannonmoeller/handlebars-layouts)

#### Markdown by [Helper](https://github.com/helpers)

- Markdown [basic, syntax](http://daringfireball.net/projects/markdown/)
- Markdown Helper uses [CommonMark](https://github.com/jgm/CommonMark)

#### Stylestats by [t32k](https://github.com/t32k/)

- Stylestyle [Usage](https://github.com/t32k/stylestats)
- [Gulp module](https://github.com/1000ch/gulp-stylestats) by [1000ch](https://github.com/1000ch)

## Dependencies

- [Package](https://github.com/sircus/sircus-web/blob/master/package.json)

## License
Released under the [MIT license](https://github.com/sircus/license/blob/master/LICENSE).

Copyright &copy; 2015 [@blivesta](https://github.com/blivesta) and [@ungki](https://github.com/ungki)