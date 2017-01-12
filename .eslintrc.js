module.exports = {
    root: true,
    // https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb#eslint-config-airbnbbase
    extends: 'airbnb-base',
    // required to lint *.html files
    plugins: [
        'html'
    ],
    // add your custom rules here
    rules: {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // disallow trailing comma for arrays and objects
        'comma-dangle': 0,
        indent: [2, 4, {SwitchCase: 1}],
        // allow console
        'no-console': 0,
        // allow debugger during development
        'no-debugger': process.env.DEBUG_MODE ? 2 : 0,
        'import/no-unresolved': 0,
        'no-param-reassign': ['error', { props: false }],
        'import/no-extraneous-dependencies': 0,
        'import/extensions': [2, {js: 'never'}]
    },
    globals: {
        it: true,
        describe: true,
        afterEach: true,
        beforeEach: true
    },
    env: {
        browser: true
    }
}
