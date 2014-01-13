var SETTINGS = require("./globalSettings");

module.exports = function (grunt) {

  // compile haml
  grunt.registerTask('buildHaml', "compile haml to html", function () {

    var conf = {},
        FILES = {};

    FILES[ SETTINGS.BUILD_PATH + "/index.html" ] = SETTINGS.MARKUP_SOURCE_PATH + '/index.haml';

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

};