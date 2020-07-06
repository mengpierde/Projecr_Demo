module.exports = {
    presets: [
        // '@vue/cli-plugin-babel/preset',
        ["@babel/preset-env", {
            "useBuiltIns": "entry",
            "corejs": {
                "version": 3, // 使用core-js@3
                "proposals": true,
            },
            "targets": {
                "chrome": "44",
                "ie": "11"
            }
        }],
    ],
    plugins: [
        "@babel/plugin-proposal-class-properties",
        '@babel/plugin-transform-modules-commonjs',
        [
            "@babel/transform-runtime", {
            "corejs": {
                "version": 3,
                "proposals": true
            },
            // "useESModules": true
        }],
        'transform-vue-jsx',
        'transform-es2015-modules-commonjs',
        "transform-es2015-typeof-symbol",
    ],
}
