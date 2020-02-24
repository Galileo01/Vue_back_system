<template>
  <el-dialog
    title="添加角色"
    :visible="dialogVisible"
    @update:visible="$emit('update:dialogVisible',false)"
    width="30%"
    @close="closeHandle"
  >
    <el-form :model="newRole" :rules="addRoleRules" ref="addForm" label-width="80px">
      <el-form-item label="角色名" prop="roleName">
        <el-input v-model="newRole.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="newRole.roleDesc"></el-input>
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      
    >
      <el-button @click="$emit('update:dialogVisible',false)">取 消</el-button>
      <el-button
        type="primary"
        @click="_addRole"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {addRole} from 'network/roles'
export default {
  name: "AddDialog",
  props: {
    dialogVisible: Boolean
  },
  data() {
    return {
      newRole: {
        roleName: "",
        roleDesc: ""
      },
      addRoleRules: {
        roleName: [
          { required: true, message: "请输入角色名", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入描述", trigger: "blur" }
        ]
      }
    };
  },methods:{
      closeHandle(){
      this.$refs.addForm.resetFields();
    },
    _addRole(){
        this.$refs.addForm.validate(async valid=>{
            if(!valid)
            return 
            else{
            const res= await addRole(this.newRole);
            if(res.meta.status!==201)
            {
                this.$message({
                    message: '角色添加失败',
                    type: 'error'
                });
            }
            else{
                this.$message({
                    message: '角色添加成功',
                    type: 'success'
                });
                //关闭 对话框
                this.$emit('update:dialogVisible',false);
                // 提示 父组件  重新获取角色列表
                this.$emit('addSuccuss');
            }
            }
        })
    }
  }
};
</script>

<style>
</style>