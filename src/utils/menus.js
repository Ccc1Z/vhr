/*
处理服务端传入的数据
 */
import {getRequest} from "./api";
import router from "../router/router";
import store from "element-ui/packages/cascader-panel/src/store";
/*
router:
store:
 */
export const initMenu=(router,store)=>{
    if(store.state.routes.length > 0){
        //有菜单数据就无需再加载了，直接return
        return;
    }
    getRequest("/system/config/menu").then(data=>{
        if(data){
            //格式化字符串
            let fmtRoutes = formatRoutes(data);
            router.addRoutes(fmtRoutes);
            //给store里面加fmtRoutes
            store.commit('initRoutes',fmtRoutes);
        }
    })
}

export const formatRoutes=(routes)=>{
    let fmRoutes = [];
    routes.forEach(router=>{
        let{
            path,
            component,
            name,
            meta,
            iconCls,
            children,
        } = router;
        if(children && children instanceof Array){
            //一级菜单的children
            children=formatRoutes(children);
        }
        let fmRouter={
            path:path,
            name:name,
            iconCls:iconCls,
            meta:meta,
            //这个children是格式化之后的children
            children:children,
            //动态加载component
            component(resolve) {
                if(component.startsWith("Emp")){
                    require(['../views/emp/'+component+'.vue'],resolve);
                }else if(component.startsWith("Per")){
                    require(['../views/per/'+component+'.vue'],resolve);
                }else if(component.startsWith("Sal")){
                    require(['../views/sal/'+component+'.vue'],resolve);
                }else if(component.startsWith("Sta")){
                    require(['../views/sta/'+component+'.vue'],resolve);
                }else if(component.startsWith("Sys")){
                    require(['../views/sys/'+component+'.vue'],resolve);
                }else{
                    require(['../views/'+component+'.vue'],resolve);
                }
            }
        }
        fmRoutes.push(fmRouter);
    })
    return fmRoutes;
}