/*

  # TODOS

  - HAML templating integration
  - jslint
  X move JS
  - move/minify JS
  - livereload
  - convert to grunt-init template

*/

var util = require('util');

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
            expand: true,
            cwd: SCRIPT_SOURCE_PATH + '/',
            // copy all js and directories except our tests
            src: [ '**', '!' + 'test/**' ],
            dest: SCRIPT_BUILD_PATH
          }
        ]
      }
    }
    // watch: {
      /*
      gruntfile: {
        files: ['./Gruntfile.js'],
        tasks: ['jshint:gruntfile']
        options: {
        }
      },
      */
      // scripts: {
      //   files: ['./source/js/*'],
      //   tasks: ['karma'/*, jshint*/],
      //   options: {

      //   }
      // },
      // styles: {
      //   files: ['./source/style/*'],
      //   tasks: ['compass:dev'],
      //   options: {
      //   }
      // }
      // gruntfile: {
      //   files: ['./source/**/*'],
      //   tasks: ['compass:dev', 'karma']
        // options: {
        //   livereload: 9000
        // }
        // files: ['/source/style/*.scss','/source/js/*.js'],
        // tasks: ['compass:dev', 'karma']
      // }
      // ,
      // lib_test: {
      //   files: '<%= jshint.lib_test.src %>',
      //   tasks: ['jshint:lib_test', 'qunit']
      // }
    // }
  });

/*


  grunt.registerTask("devMobile:watch", function () {

    grunt.task.run("devMobile:buildLocal");

    grunt.config('watch', conf);
    grunt.task.run("watch");


*/



  // grunt.registerTask("devMobile:watch", function () {

  //   grunt.task.run("devMobile:buildLocal");

  //   var conf = {

  //     image: {
  //       files: MOBILE_SOURCE_PATH_IMG + '/**/*',
  //       tasks: [
  //         'devMobile:publishDocroot'
  //       ],
  //       options: {
  //         debounceDelay: 250
  //       }
  //     },
  //     template: {
  //       files: MOBILE_SOURCE_PATH_TEMPLATE + '/**/*.html',
  //       tasks: [
  //         'devMobile:compileTemplates',
  //         'devMobile:compileJS'
  //       ],
  //       options: {
  //         debounceDelay: 250
  //       }
  //     },
  //     scripts: {
  //       files: MOBILE_SOURCE_PATH_JS + '/**/**/*.js',
  //       tasks: [
  //         'devMobile:compileJS'
  //       ],
  //       options: {
  //         debounceDelay: 250
  //       }
  //     },
  //     style: {
  //       files: [
  //         MOBILE_SOURCE_PATH_SCSS + '/*.scss',
  //         MOBILE_SOURCE_PATH_SCSS + '/**/*.scss',
  //         MOBILE_SOURCE_PATH_SCSS + '/**/**/*.scss'
  //       ],
  //       tasks: [
  //         'devMobile:compileCSS'
  //       ],
  //       options: {
  //         debounceDelay: 250
  //       }
  //     }
  //   };

  //   grunt.config('watch', conf);
  //   grunt.task.run("watch");

  // });



  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  // grunt.registerTask('default', ['jshint', 'qunit']);
  // grunt.registerTask('dev', ['compass:dev', 'karma', 'connect']);

  // run for development
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
          // lint files
          'karma:unit'
          // copy files
        ]
      }
    };

    grunt.config('watch', conf);
    grunt.task.run("watch");
  });

  grunt.registerTask('default', ['compass:dist']);

};
