/*

  # TODOS

  X move JS
  X jslint

  - HAML templating integration
  - livereload
  - convert to grunt-init template

  - set up build process
    - lint built scripts
    - minify scripts
    - minfy styles

*/

/*

  # CONTENTS

    $ grunt foo
      does xyz
    $ grunt bar
      does xyz

*/

/*global module:false*/

var SOURCE_PATH = "./source",
    STYLE_SOURCE_PATH = SOURCE_PATH + "/style",
    SCRIPT_SOURCE_PATH = SOURCE_PATH + "/js",

    BUILD_PATH = "./build",
    STYLE_BUILD_PATH = BUILD_PATH + "/style",
    SCRIPT_BUILD_PATH = BUILD_PATH + "/js";


module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
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
            // jQuery: true
          }
        },
        files: {
          src: [ SCRIPT_SOURCE_PATH + '/*.js', SCRIPT_SOURCE_PATH + '/**/*.js' ]
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
            src: [ '**', '!' + 'test/**' ],
            expand: true,
            cwd: SCRIPT_SOURCE_PATH + '/',
            dest: SCRIPT_BUILD_PATH
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');


  // development tasks
  grunt.registerTask('dev:watch', function () {

    // start a local server
    grunt.task.run("connect:local");

    var conf = {
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
      }
    };

    grunt.config('watch', conf);
    grunt.task.run("watch");
  });

  grunt.registerTask('default', ['compass:dist']);

};
