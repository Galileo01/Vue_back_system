import axios from 'axios'

//1.创建 实例, 在实例上 配置 默认的请求 配置选项
const instance = axios.create({
    baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
    timeout: 5000
});


//2.拦截器
instance.interceptors.request.use(config => {
    //对于有权限的 api 接口，必须在请求头 内添加  Authorization
    config.headers.Authorization=sessionStorage.getItem('token');
    return config;
});

instance.interceptors.response.use(res => {
    return res.data;//只返回 有效的 数据 部分
})

export default instance