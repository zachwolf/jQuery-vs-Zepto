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

  - set up build process
    ? lint built scripts
    X shared objects
    - require build / minify scripts
    - minify styles
  - remove un-needed packages from package.json
    - concat
    - livereload
    - requirejs ?
  - write contents directory
  - clean up / unify / organize Gruntfile
    - add descriptions to grunt tasks
    ? external tasks
  - convert to grunt-init template

*/

/*

  # CONTENTS

    $ grunt foo
      does xyz
    $ grunt bar
      does xyz

*/
var util = require('util'),
    _    = require('underscore');

var SOURCE_PATH        = "./source",
    STYLE_SOURCE_PATH  = SOURCE_PATH + "/style",
    SCRIPT_SOURCE_PATH = SOURCE_PATH + "/js",
    MARKUP_SOURCE_PATH = SOURCE_PATH + "/haml",

    BUILD_PATH        = "./build",
    STYLE_BUILD_PATH  = BUILD_PATH + "/style",
    SCRIPT_BUILD_PATH = BUILD_PATH + "/js",

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
        "newnew"   : true,
        "plusplus" : true,
        "undef"    : true,
        "unuse"    : true,
        "strict"   : true,
        "trailing" : true
      },
    JSHINT_DIST_SETTINGS  = _.extend({
      }, JSHINT_BASE_SETTINGS),
    JSHINT_DEV_SETTINGS   = _.extend({
        "debug": true
      }, JSHINT_BASE_SETTINGS);

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-haml');
  grunt.loadNpmTasks('grunt-contrib-clean');

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
        // beforeconcat: ['src/foo.js', 'src/bar.js'],
        // afterconcat: ['dist/output.js']
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
    clean: [ BUILD_PATH ]
  });

  // compile haml
  grunt.registerTask('haml:dev', function () {

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

  grunt.registerTask('debug', function () {
    // grunt.file.write("test.txt", util.inspect(grunt, { showHidden: true, depth: null }));
    
    if (this.flags.clean) {
      write = "clean";
    } else {
      write = "no clean";
    }
    grunt.file.write("test.txt", write);
  });

  // development tasks
  grunt.registerTask('dev:watch', function () {

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

  grunt.registerTask('buildDev', function () {

    grunt.task.run("clean");
    grunt.task.run('compass:dev');
    grunt.task.run('jshint:dev');
    grunt.task.run('karma:unit');
    grunt.task.run('copy:scripts');
    grunt.task.run('haml:dev');
  });

  grunt.registerTask('buildDist', function () {

    grunt.task.run("clean");
    
    grunt.task.run('compass:dist');
    grunt.task.run('jshint:dist');
    grunt.task.run('karma:unit');
    // minify and copy scripts
    // grunt.task.run('copy:scripts');
    // grunt.task.run('haml:dev');
  });

  grunt.registerTask('default', ['compass:dist']);

};
