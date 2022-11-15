import axios from "axios"
import { Message } from "element-ui"

const defaultConfig = {
  timeout: 5000,
  baseURL: "",
}
// 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    try {
      const { data, status } = response
      data.status = status
      if (data.code < 0) {
        Message.error({
          message: `请求错误 ${data.code}`,
          description: data.note,
        })
      }
      return data
    } catch {
      // 非标准http报文
      return response
    }
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export const request = (url, options) => {
  const instance = axios.create()
  options = Object.assign(defaultConfig, options)
  return instance(url, options)
}
