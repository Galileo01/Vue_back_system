<template>
  <el-dialog
    title="编辑用户信息"
    :visible="dialogVisible"
    @update:visible="$emit('update:dialogVisible',false)"
    width="600px"
    @open="_getUSer"
    @close="closeHandle"
  >
    <el-form
      :model="userdata"
      :rules="editFormRules"
      ref="editForm"
    >
      <el-form-item
        label="用户名"
        label-width="70px"
      >
        <el-input
          v-model="userdata.username"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item
        label="邮箱"
        label-width="70px"
        prop="email"
      >
        <el-input v-model="userdata.email"></el-input>
      </el-form-item>
      <el-form-item
        label="电话"
        label-width="70px"
        prop="mobile"
      >
        <el-input v-model="userdata.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="$emit('update:dialogVisible',false)">取 消</el-button>
      <el-button
        type="primary"
        @click="putEditedUser"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getUser, loadEditedUser } from "network/users";
import { emailCheck, mobileCheck } from "commonjs/utils";
export default {
  name: "EditDialog",
  props: {
    dialogVisible: Boolean,
    id: Number
  },
  data() {
    return {
      userdata: {
        username: "",
        email: "",
        mobile: ""
      },
      editFormRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            validator: emailCheck,
            trigger: "blur"
          }
        ],
        mobile: [
          { required: true, message: "请输入电话", trigger: "blur" },
          {
            validator: mobileCheck,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    async _getUSer() {
      const res = await getUser(this.id);
      if (res.meta.status !== 200) {
        {
          this.$message.error("用户查询失败");
          this.$emit("update:dialogVisible", false);
          return;
        }
      } else {
        this.userdata = res.data;
      }
    },
    closeHandle() {
      this.userdata = {};
      this.$refs.editForm.resetFields();
    },
    //提交 更改过的用户数据
    putEditedUser() {
        
      this.$refs.editForm.validate(async valid => {
        if (!valid) return;
        else {
          const { id, email, mobile } = this.userdata;
          const res = await loadEditedUser(id,email,mobile);
          if(res.meta.status!==200)
          {
              this.$message.error('用户信息更新失败');
              return ;
          }
          else{
              //关闭 对话框
               this.$emit("update:dialogVisible", false);
               this.$message.success('用户信息更新成功');
               //向 USers 组件 发送一个 编辑 成功 事件，触发，重新获取 列表
               this.$emit('editSuccess');
          }
        }
      });
    }
  }
};
</script>

<style>
</style>