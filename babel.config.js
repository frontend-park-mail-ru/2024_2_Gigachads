export default {
    presets: [
      '@babel/preset-env', 
      '@babel/preset-typescript', 
    ],
    plugins: [
        ['@babel/plugin-syntax-jsx', { 'isJSX': true }],
        ['@babel/plugin-transform-react-jsx', {
            'pragma': 'createVDomElement',
            'pragmaFrag': 'Fragment',
            'throwIfNamespace': false,
            'runtime': 'classic'
        }],
    ],
};