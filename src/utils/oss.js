
// let OSS = require('ali-oss');
let co = require('co');
import config from '../config'

/**
 * https://github.com/ali-sdk/ali-oss
 * 官方demo: https://github.com/rockuw/oss-in-browser/blob/master/app.js
 *
 * key: 六位随机大小写字母+时间戳
 *
 * 使用demo：
 *    boolean = vue.$oss.upload(vue, 'data/test', [{key:'asfsvS155213522222', value:file }], true, success, fail)
 *    [] = vue.$oss.privateUrls(vue, 'data/test', ['data/test/files_key1','data/test/file_key2'])
 *    string = vue.$oss.publicUrl('data/test/file_key')
 *
 *
 * oss上目录结构：
 * data/
 *    member/
 *      <id>/
 *        imgs/ - public
 *        certs/ - private
 *    product/
 *      imgs/  - public
 *      <id>/
 *
 * static/
 */

var sts={};

/**
 * 所有文件上传
 * - vue
 * - resourcePath: 目录，'data/test',
 * - files: 对象数组，[{key:'1.jpg', value:file },{key:'2', value:file }]
 * - isPublic: （可选）是否公共读。（默认私有）
 * 最后文件相对路径为： 如 data/test/1
 */
function upload(vue, resourcePath, files, isPublic, success, fail) {
  // todo oss test
  let resources = [resourcePath];
  let params = {resources:JSON.stringify(resources)};
  let ret= {};
  vue.$http.post(
    vue,'/rest/common/oss/sts',params,
    function (vue,data) {
      let client = new OSS({
        region: data.data.region,
        accessKeyId: data.data.accessKeyId,
        accessKeySecret: data.data.accessKeySecret,
        stsToken: data.data.stsToken,
        bucket: data.data.bucket
      });

      files.forEach(o=>{
        co(function* () {
          let res = yield client.multipartUpload(resourcePath+"/"+o.key, o.value);
          if(res.res.status===200){
            // todo 成功
            if(isPublic===true){
              res = yield client.putACL(resourcePath+"/"+o.key,"public-read");
              if(res.res.status===200){
                // todo 成功
                success(resourcePath+"/"+o.key);
              }else{
                // todo 失败
                fail("设置图片权限错误");
              }
            }else{
              success(resourcePath+"/"+o.key);
            }
          }else{
            // todo 失败
            fail("上传失败");
          }
        }).catch(function (err) {
          // todo
          console.log(err);
          fail("上传程序失败");
        });
      });

    },function (error,data) {
      fail("获取oss权限失败");
    }
  );
}

/**
 * 针对private文件的下载
 * - resourcePath是paths的父级目录，如'data/test'
 * - paths: ['data/test/files_key1','data/test/file_key2']
 * - 返回 数组
 */
function privateUrls(vue,resourcePath,paths,success, fail) {
  let ret = [];
  let resources = [resourcePath];
  let params = {resources:JSON.stringify(resources)};
  vue.$http.post(
    vue,'/rest/common/oss/sts',params,
    function (vue,data) {
      let client = new OSS({
        region: data.data.region,
        accessKeyId: data.data.accessKeyId,
        accessKeySecret: data.data.accessKeySecret,
        stsToken: data.data.stsToken,
        bucket: data.data.bucket
      });
      paths.forEach(p=>{
        ret.push(client.signatureUrl(p));
      });
      success(ret);
    },function (error,data) {
      fail("获取oss权限失败");
    }
  );
  return ret;
}

/**
 * http://sssss/path
 */
function publicUrl(path) {
  return config.oss.domain+path;
}

function fetchSTS() {

}

function genKeyName() {
  let str = "";
  let timestamp = new Date().getTime();
  let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  // 随机产生
  for(let i=0; i<6; i++){
   let pos = Math.round(Math.random() * (arr.length-1));
    str += arr[pos];
  }
  str = str + timestamp;
  return str;
}

export default {
  install: function(Vue, name = '$oss') {
    Object.defineProperty(Vue.prototype, name, { value: this });
  },
  upload,
  privateUrls,
  publicUrl,
  genKeyName
}
