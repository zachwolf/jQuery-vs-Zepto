// define(["../app"], function(App) {

//   describe("App setup", function() {

//     it("Namespaced object ready to use", function() {
//       expect(window.App).toBeDefined();
//     });
//   });

// });

// define(['../app', '../lib/underscore'], function(App, _) {
define(["app"], function(App) {
// define(["underscore"], function(_) {
// define(function() {

  console.log("-------------------------------------------------");
  console.log("test loaded");
  // console.log("_", _);
  // console.log("App", App);
  console.log("-------------------------------------------------");

  describe('just checking', function() {

    it('works for app', function() {
      expect(App).toBe("hi");
    });

  });

});
