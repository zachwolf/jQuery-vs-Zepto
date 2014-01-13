var _ = require('underscore'),
    settings = {};

// source settings
settings.SOURCE_PATH = "./source";
settings.STYLE_SOURCE_PATH  = settings.SOURCE_PATH + "/style";
settings.SCRIPT_SOURCE_PATH = settings.SOURCE_PATH + "/js";
settings.MARKUP_SOURCE_PATH = settings.SOURCE_PATH + "/haml";

// build settings
settings.BUILD_PATH        = "./build";
settings.STYLE_BUILD_PATH  = settings.BUILD_PATH + "/style";
settings.SCRIPT_BUILD_PATH = settings.BUILD_PATH + "/js";

// hint settings
settings.JSHINT_BASE_SETTINGS = {
    "bitwise"  : true,
    "curly"    : true,
    "eqeqeq"   : true,
    "forin"    : true,
    "freeze"   : true,
    "latedef"  : true,
    "newcap"   : true,
    "noarg"    : true,
    "noempty"  : true,
    "nonew"    : true,
    "plusplus" : true,
    "undef"    : true,
    "unused"   : true,
    "strict"   : true,
    "trailing" : true
  };

settings.JSHINT_DIST_SETTINGS = _.extend({
    "globals" : {
      "requirejs" : true,
      "define"    : true,
      "window"    : true
    }
  }, settings.JSHINT_BASE_SETTINGS);

settings.JSHINT_DEV_SETTINGS = _.extend({
    "debug"   : true,
    "globals" : {
      "requirejs" : true,
      "describe"  : true,
      "define"    : true,
      "expect"    : true,
      "window"    : true,
      "it"        : true
    }
  }, settings.JSHINT_BASE_SETTINGS);

module.exports = settings;
