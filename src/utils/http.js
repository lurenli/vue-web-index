import axios from 'axios';
import config from '../config';

const qs = require('qs');

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "production_test") {
  axios.defaults.baseURL = config.http.baseUrl;
} else {
  axios.defaults.baseURL = config.http.baseUrl4Test;
}
axios.defaults.withCredentials = true;
axios.defaults.method = 'post';
axios.defaults.headers = {'Content-Type': 'application/x-www-form-urlencoded'};

function getUrl() {
  return axios.defaults.baseURL;
}


// 请求: success是指data中result==1时的逻辑。（参数：vue，data（返回json））
// fail在默认基础上追加，同时也出现在result!=1时的逻辑
function post(vue, url, params, success, fail) {
  // 错误处理 默认方式
  let failInner = function (error) {
    // vue.$message.error("网络错误：" + error);
    console.log(error);
    if(fail !== undefined){
      // 可处理额外的fail逻辑
      fail(error);
    }
  };
  if(params.token === undefined){
    params.token=vue.$store.state.token;
  }
  axios.post(url, qs.stringify(params))
    .then(function (response) {
      let data = response.data;
      dealData(vue,data,success,fail,params);
    })
    .catch(failInner);
}

function get(vue, url, success, fail) {
  // 错误处理 默认方式
  let failInner = function (error) {
    // vue.$message.error("网络错误：" + error);
    console.log(error);
    if(fail !== undefined){
      // 可处理额外的fail逻辑
      fail(error);
    }
  };
  axios.get(url)
    .then(function (response) {
      let data = response.data;
      dealData(vue,data,success,fail);
    })
    .catch(failInner);
}

// 处理数据返回后的错误的result
function dealData(vue, data, success,fail,params) {
  // const msg = vue.$message;
  if (data.result === 1) {
    success(vue, data);
  }
  else if (data.result === 2) {
    // msg.error(data.message);
    // vue.$store.commit('rmToken');
    // 跳转到登录
    if(params._cannot===false){

    } else{
      vue.$router.push({path:'/Login'});
    }

  } else {
    // msg.error(data.message);
    // 处理错误逻辑
    if(fail !== undefined){
      fail(undefined,data);
    }
  }
}
//上传和下载的错误处理的方法
function dealpost(vue, data, success,fail) {
  // const msg = vue.$message;
  if (data.result === 1) {
    success(vue, data);
  }
  else if (data.result === 2) {
    // msg.error(data.message);
    // vue.$store.commit('rmToken');
    // 跳转到登录
      vue.$router.push({path:'/Login'});
  } else {
    // msg.error(data.message);
    // 处理错误逻辑
    if(fail !== undefined){
      fail(undefined,data);
    }
  }
}
//添加一个发布和紧固件库--上传模板的调用方法
function postupload(vue, url, file,success, fail) {
  // // 错误处理 默认方式
  let failInner = function (error) {
    // vue.$message.error("网络错误：" + error);
    console.log(error);
    if(fail !== undefined){
      // 可处理额外的fail逻辑
      fail(error);
    }
  };
  let formData = new FormData();
  formData.append('file', file,file.name);
  let config = {
    headers: {'Content-Type': 'multipart/form-data'}
  };
  axios.post(url, formData,config)
    .then(function (response) {
      let data = response.data;
      dealpost(vue,data,success,fail);
    })
    .catch(failInner);
}
//导出excel的方法定义
function getDownload(vue, url, params,filename, success, fail) {
  // 错误处理 默认方式
  let failInner = function (error) {
    // vue.$message.error("网络错误：" + error);
    console.log(error);
    if(fail !== undefined){
      // 可处理额外的fail逻辑
      fail();
    }
  };
  params.token=vue.$store.state.token;
  axios({
    method: 'get',
    url: url,
    params:params, // 参数
    responseType: 'blob' // 表明返回服务器返回的数据类型
  }).then(function (response) {
    const blob = response.data;
    if ('download' in document.createElement('a')) { // 非IE下载
      const elink = document.createElement('a')
      elink.download = filename;
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
    } else { // IE10+下载
      navigator.msSaveBlob(blob, fileName)
    }
    success(vue);
  })
    .catch(failInner);
}
export default {
  install: function(Vue, name = '$http') {
    Object.defineProperty(Vue.prototype, name, { value: this });
  },
  post: post,
  get:get,
  dealData: dealData,
  getUrl:getUrl,
  postupload:postupload,
  getDownload:getDownload,
}
