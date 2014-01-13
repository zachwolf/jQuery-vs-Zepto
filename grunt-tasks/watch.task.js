var SETTINGS = require("./globalSettings");

module.exports = function (grunt) {

  grunt.registerTask('watch:dev', "watch and build local to :dev settings", function () {

    var conf = {};

    console.log("watch:dev called");

    // clean out and recompile all of BUILD_PATH
    grunt.task.run("build:dev");

    // start a local server
    grunt.task.run("connect:local");

    conf = {
      // reload the page when things change
      options: { livereload: true },
      // process style sheets on change
      styles: {
        files: [
          SETTINGS.STYLE_SOURCE_PATH + '/*.scss',
          SETTINGS.STYLE_SOURCE_PATH + '/**/*.scss'
        ],
        tasks: [
          'compass:dev'
        ]
      },
      // process js on change
      scripts: {
        files: [
          SETTINGS.SCRIPT_SOURCE_PATH + '/*.js',
          SETTINGS.SCRIPT_SOURCE_PATH + '/**/*.js'
        ],
        tasks: [
          'jshint:dev',
          'karma:unit',
          'copy:scripts'
        ]
      },
      // compile html business
      markup: {
        files: [
          SETTINGS.MARKUP_SOURCE_PATH + '/*.haml',
          SETTINGS.MARKUP_SOURCE_PATH + '/**/*.haml'
        ],
        tasks: [
          'buildHaml'
        ]
      }
    };

    grunt.config('watch', conf);
    grunt.task.run("watch");

  });

  grunt.registerTask('watch:dist', "watch and build local to :dist settings", function () {

    var conf = {};

    console.log("watch:dist called");

    // clean out and recompile all of BUILD_PATH
    grunt.task.run("build:dist");

    // // start a local server
    grunt.task.run("connect:local");

    conf = {
      // reload the page when things change
      options: { livereload: true },
      // process style sheets on change
      styles: {
        files: [
          SETTINGS.STYLE_SOURCE_PATH + '/*.scss',
          SETTINGS.STYLE_SOURCE_PATH + '/**/*.scss'
        ],
        tasks: [
          'compass:dist'
        ]
      },
      // process js on change
      scripts: {
        files: [
          SETTINGS.SCRIPT_SOURCE_PATH + '/*.js',
          SETTINGS.SCRIPT_SOURCE_PATH + '/**/*.js'
        ],
        tasks: [
          'jshint:dist',
          'karma:unit',
          'requirejs:compile'
        ]
      },
      // compile html business
      markup: {
        files: [
          SETTINGS.MARKUP_SOURCE_PATH + '/*.haml',
          SETTINGS.MARKUP_SOURCE_PATH + '/**/*.haml'
        ],
        tasks: [
          'buildHaml'
        ]
      }
    };

    grunt.config('watch', conf);
    grunt.task.run("watch");

  });

};