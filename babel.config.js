// const presets = ['@babel/preset-env']
const presets = [
    [
        '@babel/env',
        {
            targets: {
                edge: '17',
                firefox: '60',
                chrome: '67',
                safari: '11.1'
            }
        }
    ]
]

const plugins = [
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: false }],
    ['@babel/plugin-proposal-class-properties'],
    // ['@babel/plugin-proposal-decorators', { legacy: true }],
    // ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-syntax-dynamic-import'
]

module.exports = {
    presets,
    plugins
}
