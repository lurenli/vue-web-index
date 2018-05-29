/**
 * 本module 的配置文件
 */

import mainConfig from '../../config';

let module={
  name:'index'
};

export default {
  router:{
    rootPath: mainConfig.router.projectPath(module)
  },
  meta: mainConfig.meta
}
