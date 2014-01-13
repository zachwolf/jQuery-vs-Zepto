var SOURCE_PATH        = "source",
    STYLE_SOURCE_PATH  = SOURCE_PATH + "/style",
    SCRIPT_SOURCE_PATH = SOURCE_PATH + "/js",
    MARKUP_SOURCE_PATH = SOURCE_PATH + "/haml",

    BUILD_PATH        = "build",
    STYLE_BUILD_PATH  = BUILD_PATH + "/style",
    SCRIPT_BUILD_PATH = BUILD_PATH + "/js";

module.exports = function (grunt) {

  // compile haml
  grunt.registerTask('haml:dev', "", function () {

    var conf = {},
        FILES = {};

    FILES[ BUILD_PATH + "/index.html" ] = MARKUP_SOURCE_PATH + '/index.haml';

    conf = {
      markup: {
        options: {
          style: 'expanded'
        },
        files: FILES
      }
    };

    grunt.config('haml', conf);
    grunt.task.run("haml");
  });

  // development tasks
  grunt.registerTask('dev:watch', "", function () {

    // clean out and recompile all of BUILD_PATH
    grunt.task.run("buildDev");

    // start a local server
    grunt.task.run("connect:local");

    var conf = {
      // reload the page when things change
      options: { livereload: true },
      // process style sheets on change
      styles: {
        files: [
          STYLE_SOURCE_PATH + '/*.scss',
          STYLE_SOURCE_PATH + '/**/*.scss'
        ],
        tasks: [
          'compass:dev'
        ]
      },
      // process js on change
      scripts: {
        files: [
          SCRIPT_SOURCE_PATH + '/*.js',
          SCRIPT_SOURCE_PATH + '/**/*.js'
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
          MARKUP_SOURCE_PATH + '/*.haml',
          MARKUP_SOURCE_PATH + '/**/*.haml'
        ],
        tasks: [
          'haml:dev'
        ]
      }
    };

    grunt.config('watch', conf);
    grunt.task.run("watch");
  });

  grunt.registerTask('buildDev', "", function () {

    grunt.task.run("clean");

    grunt.task.run('compass:dev');
    grunt.task.run('jshint:dev');
    grunt.task.run('karma:unit');
    grunt.task.run('copy:scripts');
    grunt.task.run('haml:dev');
  });

  grunt.registerTask('buildDist', "", function () {

    grunt.task.run("clean");
    
    grunt.task.run('compass:dist');
    grunt.task.run('jshint:dist');
    grunt.task.run('karma:unit');
    grunt.task.run('requirejs:compile');
    grunt.task.run('haml:dev');
  });

};