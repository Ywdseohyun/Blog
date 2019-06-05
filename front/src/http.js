import axios from 'axios';
import router from './router';
import { Message, Loading } from 'element-ui';

let loading;
function startLoading() { // 开始加载动画的方法
  loading = Loading.service({
    lock: true,
    text: "玩命加载中...",  // 加载时显示的内容
    background: 'rgba(0,0,0,0.7)'
  });
}

function endLoading() { // 结束加载动画的方法
  loading.close();
}

// 请求拦截
axios.interceptors.request.use(config => {
  // 在发送请求之前加载动画
  startLoading();

  // token过期处理
  if (localStorage.Token) {
    // 设置统一的请求头
    config.headers.Authorization = localStorage.Token;
  }

  return config;
}, err => {
  return Promise.reject(err);
})

// 响应拦截
axios.interceptors.response.use(response => {
  endLoading();
  return response;
}, error => {
  endLoading();
  // 错误提醒
  Message.error(error.response.data);

  // 获取错误状态码
  const { status } = error.response;
  if (status == 401) {
    Message.error("token已失效,请重新登录!");
    // 清除token
    localStorage.removeItem('Token');
    // 跳转到登录页面
    router.push('/');
  }

  return Promise.reject(error);
})
export default axios;