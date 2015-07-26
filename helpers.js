var layouts = require('handlebars-layouts');
var md = require('helper-markdown');

module.exports.register = function (handlebars) {
  handlebars.registerHelper(layouts(handlebars));
  handlebars.registerHelper('markdown', md);

  handlebars.registerHelper('is', function(context, compare, options) {
    if(context == compare) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  handlebars.registerHelper('isnot', function(context, compare, options) {
    if(context == compare) {
      return options.inverse(this);
    } else {
      return options.fn(this);      
    }
  });

};
