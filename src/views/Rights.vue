<template>
  <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <rights-table :rightsList="rightsList"></rights-table>
    </el-card>
  </div>
</template>

<script>
import {getRightsList} from 'network/rights.js'

import RightsTable from 'components/rights/RightsTable'
export default {
  name:"Rights",
  data(){
      return {
          rightsList:{}
      }
  },methods:{
     async  _getRightsList(){
   const  res =await getRightsList();
   if(res.meta.status!==200)
   {
       this.$message.error('权限列表获取失败')
   }
   else{
       this.rightsList=res.data;
   }
      }
  },
  created(){
      this._getRightsList();
  },
  components:{
      RightsTable
  }
}
</script>

<style>

</style>