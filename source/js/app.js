requirejs.config({
    paths: {
        'jquery': '../lib/jquery',
        'underscore': '../lib/underscore'
    },

    shim: {
        'underscore': {
            exports: '_'
        }
    }
});

define(function () {

	var App = "hi";

	console.log("app loaded");

	return App;

});
