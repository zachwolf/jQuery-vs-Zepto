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
      X external tasks
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

    // task settings
var GRUNT_TASKS_PATH  = "./grunt-tasks",
    SETTINGS = require( GRUNT_TASKS_PATH + "/globalSettings" );

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
        options: SETTINGS.JSHINT_DIST_SETTINGS,
        files: {
          src: [ SETTINGS.SCRIPT_SOURCE_PATH + '/*.js', SETTINGS.SCRIPT_SOURCE_PATH + '/**/*.js',
                 "!" + SETTINGS.SCRIPT_SOURCE_PATH + '/lib/*.js',
                 "!" + SETTINGS.SCRIPT_SOURCE_PATH + '/test/*.js']
        }
      },
      dev: {
        options: SETTINGS.JSHINT_DEV_SETTINGS,
        files: {
          src: [ SETTINGS.SCRIPT_SOURCE_PATH + '/*.js', SETTINGS.SCRIPT_SOURCE_PATH + '/**/*.js',
                 "!" + SETTINGS.SCRIPT_SOURCE_PATH + '/lib/*.js']
        }
      }
    },
    connect: {
      local: {
        options: {
          port: 9000,
          base: SETTINGS.BUILD_PATH,
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
            cwd: SETTINGS.SCRIPT_SOURCE_PATH + '/',
            dest: SETTINGS.SCRIPT_BUILD_PATH
          }
        ]
      }
    },
    requirejs: {
      compile: {
        options: {
          name: "app",
          baseUrl: SETTINGS.SCRIPT_SOURCE_PATH,
          mainConfigFile: SETTINGS.SCRIPT_SOURCE_PATH + "/app.js",
          out: SETTINGS.SCRIPT_BUILD_PATH + "/app.js"
        }
      }
    },
    clean: [ SETTINGS.BUILD_PATH ]
  });


  // load all required grunt tasks dependencies
  require('load-grunt-tasks')(grunt);

  // load tasks from the grunt tasks dir
  grunt.task.loadTasks(GRUNT_TASKS_PATH);

};
