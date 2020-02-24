<template>
   <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,i) in text" :key="i">{{item}}</el-breadcrumb-item>
      
    </el-breadcrumb>
</template>

<script>
export default {
 name:"BreadNav",
 props:{
     text:Array
 }
}
</script>

<style>

</style>