<template>
  <el-dialog
    title="编辑角色"
    :visible="dialogVisible"
    @update:visible="$emit('update:dialogVisible',false)"
    width="30%"
    @close="closeHandle"
    @open="_getRole"
  >
    <el-form
      :model="editting"
      :rules="editRoleRules"
      ref="addForm"
      label-width="80px"
    >
      <el-form-item
        label="角色名"
        prop="roleName"
      >
        <el-input v-model="editting.roleName"></el-input>
      </el-form-item>
      <el-form-item
        label="角色描述"
        prop="roleDesc"
      >
        <el-input v-model="editting.roleDesc"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="$emit('update:dialogVisible',false)">取 消</el-button>
      <el-button
        type="primary"
        @click="_editRole"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { editRole, getRole } from "network/roles";
export default {
  name: "EditDialog",
  props: {
    dialogVisible: Boolean,
    id: Number
  },
  data() {
    return {
      editting: {
        roleName: "",
        roleDesc: ""
      },
      editRoleRules: {
        roleName: [
          { required: true, message: "请输入角色名", trigger: "blur" }
        ],
        roleDesc: [{ required: true, message: "请输入描述", trigger: "blur" }]
      }
    };
  },
  methods: {
    closeHandle() {
      this.$refs.addForm.resetFields();
    },
    _editRole() {
      this.$refs.addForm.validate(async valid => {
        if (!valid) return;
        else {
          const res = await editRole(this.id, this.editting);
          console.log(res);
          
          if (res.meta.status !== 200) {
            this.$message({
              message: "角色编辑失败",
              type: "error"
            });
          } else {
            this.$message({
              message: "角色编辑成功",
              type: "success"
            });

            // 提示 父组件  重新获取角色列表
            this.$emit("editSuccuss");
          }
          //关闭 对话框
          this.$emit("update:dialogVisible", false);
        }
      });
    },
    async _getRole() {
      const res = await getRole(this.id);
      if (res.meta.status !== 200) {
        {
          this.$message.error("角色查询失败");
          this.$emit("update:dialogVisible", false);
          return;
        }
      } else {
        this.editting = res.data;
      }
    }
  },
  created() {}
};
</script>

<style>
</style>