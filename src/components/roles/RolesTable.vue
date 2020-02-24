<template>
  <el-table
    border
    stripe
    :data="roleslist"
  >
    <el-table-column type="expand">
      <template v-slot="{row}">
        <el-row
          v-for="(item1,i1) in row.children"
          :key="item1.id"
          :class="['bd-bottom',i1===0?'bd-top':'']"
          type="flex"
          align="middle"
        >
          <!--一级权限-->
          <el-col :span="5">
            <el-tag
              closable
              @close="_removeRight(row,item1.id)"
            >{{item1.authName}}</el-tag>
            <el-icon class="el-icon-caret-right"></el-icon>
          </el-col>
          <!--二级权限，三级权限-->
          <el-col :span="19">
            <el-row
              v-for="(item2,i2) in item1.children"
              :key="item2.id"
              :class="[i2===0?'':'bd-top']"
              type="flex"
              align="middle"
            >
              <!--二级权限 渲染-->
              <el-col :span="6">
                <el-tag
                  type="success"
                  closable
                  @close="_removeRight(row,item2.id)"
                >{{item2.authName}}</el-tag>
                <el-icon class="el-icon-caret-right"></el-icon>
              </el-col>
              <!-- 三级权限 渲染-->
              <el-col :span="18">
                <el-tag
                  v-for="(item3) in item2.children"
                  :key="item3.id"
                  type="warning"
                  closable
                  @close="_removeRight(row,item3.id)"
                >
                  {{item3.authName}}
                </el-tag>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </template>
    </el-table-column>
    <el-table-column type="index"></el-table-column>
    <el-table-column
      label="角色名称"
      prop="roleName"
    ></el-table-column>
    <el-table-column
      label="角色描述"
      prop="roleDesc"
    ></el-table-column>
    <el-table-column
      label="操作"
      width="300px"
    >
      <template v-slot="{row}">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-edit"
          @click="$emit('edit',row.id)"
        >编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="$emit('deleteRole',row.id)"
        >删除</el-button>
        <el-button
          size="mini"
          type="warning"
          icon="el-icon-setting"
          @click="setClick(row)"
        >分配权限</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { removeRight } from "network/rights.js";
export default {
  name: "RolesTable",
  data(){
    return {
     
    }
  },
  props: {
    roleslist: Array
  },
  methods: {
    emit(type, id) {
      this.$emit(type, id); //向外 发送 事件
    },
    async _removeRight(role, id) {
      const result = await this.$confirm(
        "此操作将永久删除该权限, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(error => error);
      if (result === "cancel") {
        this.$message.info("已取消删除操作");
      } else {
        const res = await removeRight(role.id, id);
        if (res.meta.status !== 200) {
          console.log(res);

          this.$message.error("权限删除失败");
        } else {
          this.$message.success("权限删除成功");
          //重新 获取 角色列表
          role.children = res.data;
        }
      }
    },
    setClick(role) {
      this.$emit("setRight",role);
    },
    //定义递归 方法，获取 该用户的三级 id，列表
    
    
  }
};
</script>

<style lang="less" scoped>
.el-tag {
  margin-top: 7px;
  margin-left: 7px;
}
.bd-top {
  border-top: 1px solid #eee;
}
.bd-bottom {
  border-bottom: 1px solid #eee;
}
</style>