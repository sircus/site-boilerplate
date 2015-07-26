# Sircus Web

[![Build Status](https://img.shields.io/travis/sircus/sircus-web/master.svg?style=flat)](https://travis-ci.org/sircus/sircus-web)
[![devDependency Status](https://david-dm.org/sircus/sircus-web/dev-status.svg)](https://david-dm.org/sircus/sircus-web#info=devDependencies&view=table)

Sircus Web Is Static Site Boilerplate For Sircus That Moduler CSS For People Who Make Web Together.

[sircus.blivesta.com](http://sircus.blivesta.com/)

## Building

Gulping Handlebars and JSON for GitHub Pages. It's the most powerful static site generator using gulp. Thanks see simple  [boilerplate](https://github.com/shannonmoeller/gulp-hb-boilerplate)

Install : `nodejs` `gulp`

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

- To configure for your project new
  - `pkg` from package.json
  - `site` from site.yml

```
example:
{{pkg.name}}
{{site.name}}
```

  - Data from front matter

```
example:
{{file.meta.name}}
```

- Prepared comparison helpers
  - is (A equal B)
  - isnot (A not equal B)

More useful helpers [here](https://github.com/helpers) by Helper team. Some helpers have to check on compatible gulp.


## developments

#### Handlebarsjs by [wycats](https://github.com/wycats)

- Handlebarsjs [Usage](https://github.com/wycats/handlebars.js)

#### Handlebars Plugins by [shannonmoeller](https://github.com/shannonmoeller)

- Handlebars for Gulp  [API, Options](https://github.com/shannonmoeller/gulp-hb)
- Handlebars Registrar [API, Options](https://github.com/shannonmoeller/handlebars-registrar)
- Handlebars Layouts [API, Helpers](https://github.com/shannonmoeller/handlebars-layouts)

#### Markdown by [Helper](https://github.com/helpers)

- Markdown [basic, syntax](http://daringfireball.net/projects/markdown/)
- Markdown Helper uses [CommonMark](https://github.com/jgm/CommonMark)

#### cssnext by [Maxime Thirouin](http://cssnext.io/)
- cssnext. [Usage](https://github.com/cssnext/cssnext)
- [Gulp module](https://github.com/cssnext/gulp-cssnext) by [Maxime Thirouin](https://github.com/MoOx)

#### Stylestats by [t32k](https://github.com/t32k/)

- Stylestyle [Usage](https://github.com/t32k/stylestats)
- [Gulp module](https://github.com/1000ch/gulp-stylestats) by [1000ch](https://github.com/1000ch)

#### Sircus by [blivesta](https://github.com/sircus)
- Modular CSS Family [Usage](https://github.com/sircus/sircus)


## Dependencies

- [Package](https://github.com/sircus/sircus-web/blob/master/package.json)

## License
Released under the [MIT license](https://github.com/sircus/license/blob/master/LICENSE).

Copyright &copy; 2015 [@blivesta](https://github.com/blivesta) and [@ungki](https://github.com/ungki)
