/*

  # TODOS

  X move JS
  X jshint
  X HAML templating integration
  X livereload
  X require.js
  X don't run lib files through jshint
  X clean task (delete and re compile all of build)
  X impliment some sort of object extend to share jshint config options
  X run watch tasks once when starting watch
  X remove un-needed packages from package.json
    X concat
    X livereload
  X set up build process
    ? lint built scripts
    X require build
    X shared objects
    X minify styles

  - Gruntfile.js changes
    - add descriptions to grunt tasks
      - write contents directory
    - organize
    - unify
      ? external tasks
    - clean up
  - convert to grunt-init template

*/

/*

  # CONTENTS

    $ grunt foo
      does xyz
    $ grunt bar
      does xyz

*/
var _ = require('underscore'),

    // source settings
    SOURCE_PATH        = "./source",
    STYLE_SOURCE_PATH  = SOURCE_PATH + "/style",
    SCRIPT_SOURCE_PATH = SOURCE_PATH + "/js",
    MARKUP_SOURCE_PATH = SOURCE_PATH + "/haml",

    // build settings
    BUILD_PATH        = "./build",
    STYLE_BUILD_PATH  = BUILD_PATH + "/style",
    SCRIPT_BUILD_PATH = BUILD_PATH + "/js",

    // task settings
    GRUNT_TASKS_PATH  = "./grunt-tasks",

    // hint settings
    JSHINT_BASE_SETTINGS  = {
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
      },
    JSHINT_DIST_SETTINGS  = _.extend({
        "globals" : {
          "requirejs" : true,
          "define"    : true,
          "window"    : true
        }
      }, JSHINT_BASE_SETTINGS),
    JSHINT_DEV_SETTINGS   = _.extend({
        "debug"   : true,
        "globals" : {
          "requirejs" : true,
          "describe"  : true,
          "define"    : true,
          "expect"    : true,
          "window"    : true,
          "it"        : true
        }
      }, JSHINT_BASE_SETTINGS);

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    karma: {
      unit: {
        singleRun: true,
        configFile: 'karma.conf.js'
      }
    },
    compass: {
      dist: {
        options: {
          outputStyle: 'compressed',
          noLineComments: true
        }
      },
      dev: {
        options: {
          outputStyle: 'expanded',
          watch: false
        }
      }
    },
    jshint: {
      dist: {
        options: JSHINT_DIST_SETTINGS,
        files: {
          src: [ SCRIPT_SOURCE_PATH + '/*.js', SCRIPT_SOURCE_PATH + '/**/*.js',
                 "!" + SCRIPT_SOURCE_PATH + '/lib/*.js',
                 "!" + SCRIPT_SOURCE_PATH + '/test/*.js']
        }
      },
      dev: {
        options: JSHINT_DEV_SETTINGS,
        files: {
          src: [ SCRIPT_SOURCE_PATH + '/*.js', SCRIPT_SOURCE_PATH + '/**/*.js',
                 "!" + SCRIPT_SOURCE_PATH + '/lib/*.js']
        }
      }
    },
    connect: {
      local: {
        options: {
          port: 9000,
          base: BUILD_PATH,
          open: true
        }
      }
    },
    copy: {
      scripts: {
        files: [
          {
            // copy all js and directories except our tests
            src: [ '**', '!test/**' ],
            expand: true,
            cwd: SCRIPT_SOURCE_PATH + '/',
            dest: SCRIPT_BUILD_PATH
          }
        ]
      }
    },
    requirejs: {
      compile: {
        options: {
          name: "app",
          baseUrl: SCRIPT_SOURCE_PATH,
          mainConfigFile: SCRIPT_SOURCE_PATH + "/app.js",
          out: SCRIPT_BUILD_PATH + "/app.js"
        }
      }
    },
    clean: [ BUILD_PATH ]
  });


  // load all required grunt tasks dependencies
  require('load-grunt-tasks')(grunt);

  // load tasks from the grunt tasks dir
  grunt.task.loadTasks(GRUNT_TASKS_PATH);

};
