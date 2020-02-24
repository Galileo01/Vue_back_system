module.exports={
    //定义路劲别名，省略../
    configureWebpack:{
        resolve:{
            alias:{   //@ 已经在 目录中被定义 ，定义为src
                'assets':'@/assets',
                'commonjs':'@/commonjs',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views'
            }
        }
    },
    publicPath:"./",
        // devServer: {
        //   proxy: 'http://localhost:8080'
        // }
}

chainWebpack: config => {
    // 发布模式 下采用的webpack 配置
    config.when(process.env.NODE_ENV === 'production', config => {})
}
      