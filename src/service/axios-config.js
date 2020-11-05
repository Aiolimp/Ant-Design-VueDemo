import axios from 'axios';

//创建axios实例
const service = axios.create({
    timeout: 5000 // 请求超时时间
});

// 添加请求拦截器
service.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        // console.log('添加请求拦截器', config);
        return config;
    },
    function (error) {
        //错误请求
        return Promise.reject(error)
    }
);
//添加响应拦截器
service.interceptors.response.use(response => {
        const res = response.data;
        // console.log('添加响应拦截器', response);
        if (res.code != 200) {
            Message({
                type: "error",
                message: res.message,
            })
        } else {
            return res
        }
    },
    (error) => {
        return Promise.reject(error)
    }

)

export default service;