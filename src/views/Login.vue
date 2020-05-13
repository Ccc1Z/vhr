<template>
    <div>
        <!--model里放的是表单数据-->
        <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
            <h3 class="loginTitle">系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="text" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-checkbox v-model="checked" class="loginRemembered"></el-checkbox>
            <el-button type="primary" style="width: 100%" @click="submitLogin">登录</el-button>
        </el-form>
    </div>
</template>

<script>
    import {postKeyValueRequest} from "../utils/api";

    export default {
        name: "Login",
        //定义表单输入规则
        data(){
            return{
                loginForm:{
                    username:'admin',
                    password:'123'
                },

                checked:true,

                rules:{
                    username:[{required:true,message:'请输入用户名',trigger:'blur'}],
                    password:[{required:true,message:'请输入密码',trigger:'blur'}]
                }
            }
        },
        methods:{
            submitLogin() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        postKeyValueRequest('/doLogin',this.loginForm).then(resp=>{
                            if(resp){
                                //这里的resp是经过api.js二次处理过的服务端响应
                                //如果为空就是登录失败
                                //把登录信息放在sessionStorage中
                                window.sessionStorage.setItem("user",JSON.stringify(resp.obj));
                                //获取当前Vue对象里的router对象，进行页面跳转
                                this.$router.replace('/home')
                            }
                        })
                        //alert('submit!');
                    } else {
                        this.$message.error('请输入所有字段');
                        return false;
                    }
                });
            }
        }
    }
</script>
<style>
    .loginContainer {
        border-radius: 15px;
        background-clip: padding-box;
        /*上下180px 左右自动*/
        margin: 180px auto;
        width: 350px;
        /*内边距 上 右 下 左*/
        padding: 25px 25px 25px 25px;
        background: #fff;
        border: 1px solid #eaeaea;
        /*阴影效果 水平位置 垂直位置 模糊位置 阴影颜色*/
        box-shadow:0 0 25px #cac6c6 ;
    }

    .loginTitle {
        margin: 15px auto 20px auto;
        text-align: center;
        color: #505458;
    }

    .loginRemembered{
        text-align: left;
        margin: 0px 0px 20px 0px;
    }

</style>