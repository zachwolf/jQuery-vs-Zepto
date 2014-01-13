var util = require('util');

module.exports = function (grunt) {

  grunt.registerTask('debug', "throw away function for debugging", function () {
    // grunt.file.write("test.txt", util.inspect(grunt, { showHidden: true, depth: null }));
    
    console.log("hi");
  });

};