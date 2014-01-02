// console.log("-------------------------------------------------");
// console.log("window.__karma__.files", window.__karma__.files);
// console.log("-------------------------------------------------");

var tests = [];
for (var file in window.__karma__.files) {
    if (/Spec\.js$/.test(file)) {
        tests.push(file);
    }
}

requirejs.config({
    // Karma serves files from '/base'
    // baseUrl: '/base/src/source/js',
    baseUrl: '/base/source/js',

    paths: {
        'underscore': 'lib/underscore'
    },

    shim: {
        'underscore': {
            exports: '_'
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});

