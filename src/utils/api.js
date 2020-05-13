import axios from 'axios'
import { Message } from 'element-ui';
/*
使用axios里的响应拦截器封装服务端传来的响应信息
响应出错有两种情况：
    1.CRUD出错但是http响应码是200
    2.响应码是400 500的错误
http响应码为200的会进入data中
http响应码为400 500的会进入error中
来到data不一定成功，但是来到error一定失败
success.data是服务端返回的JSON
success.status是http的响应码
success.data.status是服务端传过来的响应码
 */

axios.interceptors.response.use(success => {
    if(success.status && success.status==200 && success.data.status==500){
        //这是一个业务上的错误
        //展示服务端respBean中的msg
        Message.error({message:success.data.msg})
        //返回空，那么当请求调用时会什么都得不到，那么只要调用时为空那么该请求就是失败的
        return;
    }
    //没有问题就将服务器的Json返回到调用处
    return success.data;
},error => {
    if(error.response.status==504 || error.response.status==404){
        Message.error({message:'服务器发送错误'})
    }else if(error.response.status==403){
        Message.error({message:'权限不足'})
    }else if(error.response.status==401){
        Message.error({message:'未登录'})
    }else{
        if(error.response.data.msg){
            //如果服务端有错误提示
            Message.error({message:error.response.data.msg})
        }else{
            Message.error({message:'未知错误'})
        }
        return;
    }
})


//全局变量base,到时候如果要加前缀直接改base就行了
let base='';
//登录以keyvalue传参
export const postKeyValueRequest=(url,params)=>{
    return axios({
        method:'post',
        url:`${base}${url}`,
        data:params,
        transformRequest:[function (data) {
            let ret = '';
            for(let i in data){
                //遍历data,将keyvalue转换为Json格式
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            return ret;
        }],
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    });
}

//传递JSON的POST封装
export const postRequest=(url,params)=>{
    return axios({
        method:'post',
        url:`${base}${url}`,
        data:params,

    })
}

export const putRequest=(url,params)=>{
    return axios({
        method:'put',
        url:`${base}${url}`,
        data:params,
    })
}

export const getRequest=(url,params)=>{
    return axios({
        method:'get',
        url:`${base}${url}`,
        data:params,
    })
}

export const deleteRequest=(url,params)=>{
    return axios({
        method:'delete',
        url:`${base}${url}`,
        data:params,
    })
}