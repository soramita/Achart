import { Modal } from 'antd'
import axios, { AxiosRequestConfig } from 'axios'

const Axios = axios.create({
    baseURL:'http://localhost:3001/api',
    timeout:10000
})
Axios.interceptors.request.use((config:AxiosRequestConfig)=>{
    config.headers.authorization = localStorage.getItem('token')
    return config
})
Axios.interceptors.response.use((res:any)=>{
    return res.data
},(error:any)=>{
    if(error.response.data.statusCode === 403){
        localStorage.clear()
        Modal.info({
            content:'当前登录信息已过期请重新登录！',
            onOk() {
                window.location.href = '/login'
            },
        })
    }
    throw new Error(error.response.data.message)
})
export default Axios;