import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {initMenu} from "./utils/menus";
import 'font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false

Vue.use(ElementUI);

router.beforeEach((to,from,next)=>{
  //to:到哪里去,from:从哪里来，next相当于过滤器链
  //菜单初始化
  if(to.path=='/'){
    //去login页面就直接跳转
    next();
  }else{
    //来到需要加载菜单的页面
    initMenu(router,store);
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
