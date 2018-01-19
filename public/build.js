({
    paths: {
        'jquery': './js/jquery',
        'a': './js/a',
        'b': './js/b',
        'main': './js/main'
    },
    shim: {
        'jquery': {
            exports: '$'
        }
    },
    name: 'main',
    out: './js/main-build.js'
});