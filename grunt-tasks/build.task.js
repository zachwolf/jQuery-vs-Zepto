var SETTINGS = require("./globalSettings");

module.exports = function (grunt) {

  grunt.registerTask('build:dev', "build local to :dev settings", function () {
    grunt.task.run("clean");
    grunt.task.run('compass:dev');
    grunt.task.run('jshint:dev');
    grunt.task.run('karma:unit');
    grunt.task.run('copy:scripts');
    grunt.task.run('buildHaml');
  });

  grunt.registerTask('build:dist', "build local to :dist settings", function () {
    grunt.task.run("clean");
    grunt.task.run('compass:dist');
    grunt.task.run('jshint:dist');
    grunt.task.run('karma:unit');
    grunt.task.run('requirejs:compile');
    grunt.task.run('buildHaml');
  });

};