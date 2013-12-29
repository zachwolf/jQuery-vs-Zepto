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
    watch: {
      gruntfile: {
        files: ['./source/**/*'],
        tasks: ['compass:dev', 'karma']
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

  // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  // grunt.registerTask('default', ['jshint', 'qunit']);
  grunt.registerTask('dev', ['compass:dev']);
  grunt.registerTask('default', ['compass:dist']);

};
