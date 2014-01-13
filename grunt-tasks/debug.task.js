var util = require('util');

module.exports = function (grunt) {

  grunt.registerTask('debug', "throw away function for debugging", function () {
		// console.log(util.inspect(require, { showHidden: true, depth: null }));
    // grunt.file.write("test.txt", util.inspect(grunt, { showHidden: true, depth: null }));
    console.log("-------------------------------------------------");
    console.log("globalSettings", require("./globalSettings"));
    console.log("-------------------------------------------------");
  });

};