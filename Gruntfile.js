/*

  # TODOS

  X move JS
  X jshint
  X HAML templating integration
  X livereload

  ? require.js

  - don't run lib files through jshint
  - clean task (delete and re compile all of build)
  - impliment some sort of object extend to share jshint config options
  - set up build process
    - lint built scripts
    - minify scripts
    - minfy styles
  - remove un-needed packages from package.json
    - concat
    - livereload
    - requirejs
  - write contents directory
  - convert to grunt-init template

*/

/*

  # CONTENTS

    $ grunt foo
      does xyz
    $ grunt bar
      does xyz

*/


var SOURCE_PATH = "./source",
    STYLE_SOURCE_PATH = SOURCE_PATH + "/style",
    SCRIPT_SOURCE_PATH = SOURCE_PATH + "/js",
    MARKUP_SOURCE_PATH = SOURCE_PATH + "/haml",

    BUILD_PATH = "./build",
    STYLE_BUILD_PATH = BUILD_PATH + "/style",
    SCRIPT_BUILD_PATH = BUILD_PATH + "/js";


module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-haml');

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
      },
      dev: {
        options: {
          debug:    true,
          bitwise:  true,
          freeze:   true,
          latedef:  true,
          newcap:   true,
          noarg:    true,
          trailing: true,
          curly:    true,
          eqeqeq:   true,
          eqnull:   true,
          browser:  true,
          globals: {
            define: true
          }
        },
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
    }
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

  // development tasks
  grunt.registerTask('dev:watch', function () {

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

  grunt.registerTask('default', ['compass:dist']);

};
