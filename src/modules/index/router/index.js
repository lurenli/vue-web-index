import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

Vue.use(Router);
Vue.use(Meta);

let mode = 'history';
let base = '/';
import routes from './routes';
import config from '../config';

if(mode === 'history'){
  base = config.router.rootPath;
}

export default new Router({
  mode: mode,
  base: base,
  routes: routes
});
