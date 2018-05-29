let co = require('co');
let OSS = require('ali-oss');
// let config = require('../config/index');
let ossConfig = {
  init:{
    region: 'oss-cn-hangzhou',
    // 表示内网节点
    internal: 'true',
    accessKeyId: 'LTAIDfCQajVB8O6W',
    accessKeySecret: 'D9F2aonNtlm10EYGJiYdAtttz7MbEn'
  },
  bucket:'factorismart',
  dir:'mes-cnc-web/static/',
};

let client = new OSS(ossConfig.init);

let fs = require('fs');
let path = require("path");
let filePath = path.resolve("dist/static");
let arr = [];

let files = fs.readdirSync(filePath);
files.forEach(filename =>{
  let stats = fs.statSync(path.join(filePath,filename));
  if(stats.isFile()){
    arr.push(filename);
    // console.log(arr)
  }else if(stats.isDirectory()){
    readFile(path.join(filePath,filename),filename);
    // }
  }
});
console.log(arr);

function readFile(readurl,name){
  let files = fs.readdirSync(readurl);
  files.forEach(filename=>{
    let stats = fs.statSync(path.join(readurl,filename));
    //是文件
    if(stats.isFile()){
      if(getSuffix(filename)!=="map"){
        arr.push(name+'/'+filename);
      }
    }else if(stats.isDirectory()){
      readFile(path.join(readurl,filename),name+'/'+filename);
    }
  });

}

//获取后缀名
function getSuffix(name){
  let arr = name.split('.');
  return arr[arr.length-1];
}

// 先删除oss上原来的
let del_arr = [];

function* list(dir) {
  let result = yield client.list({
    prefix: dir,
    delimiter: '/'
  });
  if(result.prefixes!==null && result.prefixes!==undefined){
    for(let i=0;i<result.prefixes.length;i++){
      yield list(result.prefixes[i]);
    }
  }
  if(result.objects!==null && result.objects!==undefined){
    result.objects.forEach(function (obj) {
      console.log(obj.name);
      del_arr.push(obj.name);
    });
  }
}
co(function* () {
  client.useBucket(ossConfig.bucket);
  yield list(ossConfig.dir);
  // console.log(del_arr);
  // 删除原来的
  if(del_arr.length>0){
    let result = yield client.deleteMulti(del_arr);
    // console.log(result);
  }
  if(arr.length>0){
    for(let i=0;i<arr.length;i++){
      let result = yield client.put(ossConfig.dir+arr[i], './dist/static/'+arr[i]);
      console.log(result);
    }
  }
}).catch(function (err) {
  console.log(err);
});
