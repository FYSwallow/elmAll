module.exports = {
    baseUrl: './',
    devServer:{//代理
        port: 8080,
        proxy:[
            {
                '/v1': {
                    target: 'http://elm.cangdu.org/v1', //对应自己的接口
                    changeOrigin: true,
                    ws: true,
                    pathRewrite: {
                    '^/v1': ''
                    }
                }
            }
        ]
    }
}