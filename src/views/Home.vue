<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <div class="title">微人事</div>
                <el-dropdown class="userInfo" @command="commandHandler">
  <span class="el-dropdown-link">
    {{user.name}}<i><img :src="user.userface" alt=""></i>
  </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                        <el-dropdown-item command="setting">设置</el-dropdown-item>
                        <el-dropdown-item  command="logout" divided>注销登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu router unique-opened>
                        <el-submenu :index="index+''" v-for="(item,index) in routes" v-if="!item.hidden" :key="index">
                            <template slot="title">
                                <i style="color:cadetblue;margin-right: 5px" :class="item.iconCls"></i>
                                <span>{{item.name}}</span>
                            </template>
                                <el-menu-item v-for="(child,indexj) in item.children" :key="indexj" :index="child.path">{{child.name}}</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <el-breadcrumb separator="/" v-if="this.$router.currentRoute.path != '/home'">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item><a href="/">{{this.$router.currentRoute.name}}</a></el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="homeWelcome" v-if="$router.currentRoute.path=='/home'">
                        欢迎来到微人事
                    </div>
                    <router-view class="homeRouterView"/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import {getRequest} from "../utils/api";

    export default {
        name: "Home",
        data(){
            return{
                user:JSON.parse(window.sessionStorage.getItem("user"))
            }
        },
        computed: {
            routes() {
                return this.$store.state.routes;
            }
        },
        methods:{
            commandHandler(cmd) {
                if(cmd == 'logout'){
                    this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        getRequest("/logout");
                        window.sessionStorage.removeItem("user");
                        //注销的时候清空Vuex存的东西
                        this.$store.commit('initRoutes',[]);
                        this.$router.replace("/");
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                }
            }
        }
    }
</script>

<style>
    .homeRouterView{
        margin-top: 10px;
    }


    .homeWelcome {
        text-align: center;
        font-size: 30px;
        font-family: 华文行楷;
        color: #4b39ff;
        padding-top:50px;
    }

    .homeHeader {
        background-color: #2057ff;
        /*弹性布局*/
        display:flex;
        /*垂直方向居中*/
        align-items: center;
        /*弹性布局，内容对齐*/
        justify-content: space-between;
        padding:0px 15px ;
        box-sizing: border-box;
    }

    .homeHeader .title{
        font-size: 30px;
        font-family: 华文行楷;
        color: #ffffff;
    }

    .homeHeader .userInfo{
        /*点击按钮变为手指*/
        cursor: pointer;
    }

    .el-dropdown-link {
        display: flex;
        align-items: center;
    }

    .el-dropdown-link img {
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-left: 8px;;
    }

</style>