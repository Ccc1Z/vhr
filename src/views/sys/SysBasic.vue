<template>
    <div>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="部门管理" name="first"><DepMana></DepMana></el-tab-pane>
            <el-tab-pane label="职位管理" name="second"><PosMana></PosMana></el-tab-pane>
            <el-tab-pane label="职称管理" name="third"><JobLevelMana></JobLevelMana></el-tab-pane>
            <el-tab-pane label="奖惩管理" name="fourth"><EcMana></EcMana></el-tab-pane>
            <el-tab-pane label="权限组" name="fifth"><PermitMana></PermitMana></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import DepMana from "../../components/sys/basic/DepMana";
    import EcMana from "../../components/sys/basic/EcMana";
    import JobLevelMana from "../../components/sys/basic/JobLevelMana";
    import PermitMana from "../../components/sys/basic/PermitMana";
    import PosMana from "../../components/sys/basic/PosMana";


    export default {
        name: "SysBasic",
        data() {
            return{
                activeName:'second',
            }
        },
        //注册成组件
        components:{
            'DepMana':DepMana,
            'EcMana':EcMana,
            'JobLevelMana':JobLevelMana,
            'PermitMana':PermitMana,
            'PosMana':PosMana
        }
    }
</script>

<style scoped>

</style>