// api/index.ts

import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
// import { message } from 'antd';

// 创建 Axios 实例
const service: AxiosInstance = axios.create({
  baseURL: '/xxx-api', // API 基础路径
  timeout: 5000, // 超时时间
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
  responseType: 'json', // 确保响应解析为 JSON
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在请求头中添加 Token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 请求错误
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 响应成功
    return response.data;
  },
  (error) => {
    // 响应错误
    console.error('Error:', error.response || error.message);
    return Promise.reject(error);

    // 使用 atnd 进行错误处理
    // message.error(error.response?.data?.message || '请求失败');
    // return Promise.reject(error);
  },
);

export default service;
