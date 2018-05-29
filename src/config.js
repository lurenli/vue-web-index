/**
 本项目的config
 */

import outConfig from '../config'

let app;
// project index/index.html 在服务器上的main路径
let projectPath;
if(process.env.NODE_ENV === "development"){
  projectPath = "";
  app = outConfig.app;
}else if(process.env.NODE_ENV === "production"){
  app = outConfig.app;
  projectPath =  app.rootPath;
}else {
  app = outConfig.app_test;
  projectPath =  app.rootPath;
}
let app_name = outConfig.app.name;

export default {
  router:{
    projectPath(module){
      return projectPath + (module.name==='index'?'':'/'+module.name)
    }
  },
  http:app.http,
  oss:app.oss,
  meta:{
    app_name: app_name
  }
}
