/*global module:false*/

var SOURCE_PATH = "/source",
    BUILD_PATH = "/build";

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
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
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['compass:dev']
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
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  // grunt.registerTask('default', ['jshint', 'qunit']);
  grunt.registerTask('dev', ['compass:dev']);
  grunt.registerTask('default', ['compass:dist']);

};
