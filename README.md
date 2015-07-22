# Sircus Web

[![Build Status](https://img.shields.io/travis/sircus/sircus/master.svg?style=flat)](https://travis-ci.org/sircus/sircus)
[![devDependency Status](https://david-dm.org/sircus/sircus/dev-status.svg)](https://david-dm.org/sircus/sircus#info=devDependencies)

Sircus is Moduler CSS For People Who Make Web Together.

[sircus.blivesta.com](http://sircus.blivesta.com/)

## Building

Gulping Handlebars and JSON for GitHub Pages. It's the most simple static site generator using gulp.

Install : `nodejs` `npm` `gulp`

```
$ git clone https://github.com/sircus/sircus-web.git
$ cd sircus-web
```

build:

```
npm install
gulp build
```

Watch & Connect:

```
gulp
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
│   │   │   └── / import.css
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

- To configure for your project
> `pkg` from package.json
> `site` from config.yml

example:
```
{{pkg.name}}
{{site.title}}
```

- Static files using common naming
  - CSS: main.css
  - JS: app.js

### developments

#### Sircus by [blivesta](https://github.com/sircus)

- Sircus Modular CSS Family [Usage](https://github.com/sircus/sircus)

#### Handlebarsjs by [wycats](https://github.com/wycats)

- Handlebarsjs [Usage](https://github.com/wycats/handlebars.js)

#### Handlebars Plugins by [shannonmoeller](https://github.com/shannonmoeller)

- Handlebars for Gulp  [API, Options](https://github.com/shannonmoeller/gulp-hb)
- Handlebars Registrar [API, Options](https://github.com/shannonmoeller/handlebars-registrar)
- Handlebars Layouts [API, Helpers](https://github.com/shannonmoeller/handlebars-layouts)

#### Markdown by [Helper team](https://github.com/helpers)

- Markdown [basic, syntax](http://daringfireball.net/projects/markdown/)
- Markdown Helper uses [CommonMark](https://github.com/jgm/CommonMark)

#### Stylestats by [t32k](https://github.com/t32k/)

- Stylestyle [Usage](https://github.com/t32k/stylestats)
- [Gulp module](https://github.com/1000ch/gulp-stylestats) by [1000ch](https://github.com/1000ch)

### Dependencies

- [Package](https://github.com/sircus/sircus-web/blob/master/package.json)

### License
Released under the [MIT license](https://github.com/sircus/license/blob/master/LICENSE).

Copyright &copy; 2015 [@blivesta](https://github.com/blivesta) and [@ungki](https://github.com/ungki)
