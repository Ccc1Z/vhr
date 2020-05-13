//定义一个代理对象
let proxyObj = {};
proxyObj['/'] = {
    ws: false,
    //目标转发地址
    target: 'http://localhost:8081',
    changeOrigin: true,
    pathRewrite: {
        '^/': ''
    }
}

module.exports={
    devServer:{
        host:'localhost',
        port:8080,
        proxy:proxyObj
    }
}