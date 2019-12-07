// vue.config.js
module.exports = {
    // options...
    devServer: {
        useLocalIp: false,
        public: 'http://kristineparish.com:8080',
        disableHostCheck: true,
        proxy: {
            '^/api': {
                target: 'http://kristineparish.com:3000',
            },
        },
    }
}