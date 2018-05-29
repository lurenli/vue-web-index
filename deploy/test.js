let co = require('co');
let OSS = require('ali-oss');
let config = require('../config/index');
// let client = new OSS({
//   region: 'oss-cn-hangzhou',
//   // 表示内网节点
//   // internal: 'true',
//   accessKeyId: 'LTAIKSqiCJot4eam',
//   accessKeySecret: 'GtkCbCXpgHjpIJoX29NWkcs6kUW5pY'
// });

co(function* () {
  var client = new OSS({
    region: 'oss-cn-hangzhou',
    accessKeyId: 'STS.CBH73PpgxTFEfTkVQ8n3UwZ1s',
    accessKeySecret: 'A2P34R4fd5xDkUv5pUPHdp1uTUqyeijhBSmxDztB38Cd',
    stsToken: 'CAISmgJ1q6Ft5B2yfSjIooH9fInknbhZ44SuZHLaslFtYrx5mJ+akTz2IH9JeXZvBukWsfs+nGhW5vcalqB6T55OSAmcNZIoeArXB4HiMeT7oMWQweEulv/MQBqKaXPS2MvVfJ+2Lrf0ceusbFbpjzJ6xaCAGxypQ12iN+/u6/tgdc9FcQSkSjBECdxKXFwAzvUXLnzML/2gHwf3i27LdipStxF7lHl05Nb0oISV4QGMi0bhmK1H5db6K4KgaMBqe4tySMvywO1zeezDyCFyk0ETqPsu0PcYoG6a7onAWQFrjk/YY7aOwLpGNxRkY6U2IalAocXnmOdw0u6pzNuqlkkSYrgFDHuOHNj+kJqcAo2uLc0wba7ru9A7Uz132vMagAGjNdIKh1Ho7ZpJOQxY1bVYmrsPo6Vi9b4CGa1eiRlNU5n9DyvkN4mgmmQY+QBQjYVXREVMjCg6NL8U37RdjAwresXg+qpCq5Wzl89LYSmyb2/d/tmKYPsVE0Wv8GPtuD0WYZ7ptS6iJ4BgPi+bJggWoR+KOEh+1CBxe/9IcPE+Rw==',
    bucket: 'carloan'
  });

  console.log(client.signatureUrl('liuc/timg.jpg'));
  // var result = yield client.get('test/timg.jpg', 'test.jpg');
  // console.log(result);
}).catch(function (err) {
  console.log(err);
});
