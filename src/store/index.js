import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        //路由数组(从服务端加载的数据都放进来)
        routes:[]
    },
    mutations:{
        /**
         *初始化Routes
         * @param state 上面的state,通过state才能访问到routes
         * @param data  传进来的参数
         */
        initRoutes(state,data){
            state.routes=data;
        }
    },
    actions:{

    }
})