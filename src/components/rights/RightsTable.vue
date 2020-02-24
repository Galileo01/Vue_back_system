<template>
  <el-table :data="rightsList" border stripe >
      <el-table-column type="index"></el-table-column>
      <el-table-column label="权限名称" prop="authName"></el-table-column>
      <el-table-column label="路径" prop="path"></el-table-column>
      <el-table-column label="权限等级" prop="level">
          <template v-slot="{row}">
              <el-tag v-if="row.level==='0'">等级一</el-tag>
              <el-tag type="success" v-else-if="row.level===1">等级二</el-tag>
              <el-tag type="warning" v-else>等级三</el-tag>
          </template>
      </el-table-column>
  </el-table>
</template>

<script>
export default {
  name:"RightsTable",
  props:{
      rightsList:Object
  }
}
</script>

<style>

</style>