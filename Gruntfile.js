/*global module:false*/

// var SOURCE_PATH = "/source",
//     BUILD_PATH = "/build";

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    karma: {
      unit: {
        configFile: 'my.conf.js'
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
      site: {
        options: {
          port: 9000,
          base: 'build',
          open: true,
          livereload: true
        }
      }
    },
    watch: {
      gruntfile: {
        files: ['./source/**/*'],
        tasks: ['connect', 'compass:dev', 'karma']
        // files: ['/source/style/*.scss','/source/js/*.js'],
        // tasks: ['compass:dev', 'karma']
      }
      // ,
      // lib_test: {
      //   files: '<%= jshint.lib_test.src %>',
      //   tasks: ['jshint:lib_test', 'qunit']
      // }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task.
  // grunt.registerTask('default', ['jshint', 'qunit']);
  grunt.registerTask('dev', ['compass:dev', 'karma']);
  grunt.registerTask('default', ['compass:dist']);

};
