<template>
  <el-dialog
    title="分配角色"
    :visible="dialogVisible"
    @update:visible="$emit('update:dialogVisible',false)"
    width="50%"
    @close="closeHandler"
  >
    <div>
      <p>用户名称 ：{{user.username}}</p>
      <p>用户角色 ：{{user.role_name}}</p>
      分配的新角色<el-select
        v-model="selectedId"
        placeholder="请选择"
      >
        <el-option
          v-for="item in roleslist"
          :key="item.id"
          :label="item.roleName"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>

    <span slot="footer">
      <el-button @click="$emit('update:dialogVisible',false)">取 消</el-button>
      <el-button
        type="primary"
        @click="_uploadSet"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRoleslist } from "network/roles";
import { uploadSetRole } from "network/users";
export default {
  name: "SetRoleDialog",
  data() {
    return {
      roleslist: [],
      selectedId: ""
    };
  },
  props: {
    dialogVisible: Boolean,
    user: Object
  },
  methods: {
    async _uploadSet() {
      if (!this.selectedId) {
        this.$message.error("请选择新的角色");
      } else {
        console.log(this.selectedId);
        
        const res = await uploadSetRole(this.user.id, this.selectedId);
        console.log(res);
        
       if(res.meta.status!==200)
        {
          this.$message.error('用户角色 更新失败');
        }
        {
           this.$message.success('用户角色更新成功');
         
          this.$emit('allocateSuccess');
        }
      }
    },
    async _getRoleslist() {
      const res = await getRoleslist();
      if (res.meta.status !== 200) {
        this.$message.error("角色列表获取失败");
      } else {
        this.roleslist = res.data;
      }
    },closeHandler(){
       this.selectedId='';
    }
  },
  created() {
    //获取所有 角色列表

    this._getRoleslist();
  }
};
</script>

<style scoped>
.el-select{
  margin-left: 10px;
}
</style>