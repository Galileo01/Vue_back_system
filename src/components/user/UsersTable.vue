<template>
  <el-table
        border
        stripe
        :data="users"
      >

        <el-table-column type="index"></el-table-column>
        <el-table-column
          label="用户名"
          prop="username"
        ></el-table-column>
        <el-table-column
          label="邮箱"
          prop="email"
        ></el-table-column>
        <el-table-column
          label="电话"
          prop="mobile"
        ></el-table-column>
        <el-table-column
          label="用户角色"
          prop="role_name"
        ></el-table-column>
        <el-table-column label="状态">
          <template v-slot="{row}">
            <el-switch
              v-model="row.mg_state"
              @change="switchClick(row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180px"
        >
          <template v-slot="{row}">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="edit(row.id)"
            >
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="deleteFun(row.id)"
              size="mini"
            ></el-button>

            <el-tooltip
              class="item"
              effect="dark"
              content="设置角色"
              placement="top"
              :enterable="false"
             
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                 @click="$emit('allocate',row)"
              ></el-button>
            </el-tooltip>

          </template>
        </el-table-column>
      </el-table>
</template>

<script>
import {changeUserState } from "network/users"
export default {
  name:"UsersTable",
  props:{
      users:Array
  },methods:{
    edit(id){
      //点击 编辑 向USers 组件发送edit 事件 
      this.$emit('edit',id);
    },
    //向USers 组件发送 delete 事件
    deleteFun(id){
      this.$emit('delete',id);
    },
    //Switch 切换，change 事件 的处理函数，更改用户状态
    switchClick(userdata) {
      //对象 解构 并重命名
      const { id, mg_state: type } = userdata;

      changeUserState(id, type).then(res => {
        if (res.meta.status !== 200) {
          this.$message.error("状态更改失败");
        } else {
          this.$message.success("状态更改成功");
        }
      });
    },
  }
}
</script>

<style>

</style>