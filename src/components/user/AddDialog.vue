<template>
  <el-dialog
    title="添加用户"
    :visible="dialogVisible"
    @update:visible="$emit('update:dialogVisible',false)"
    width="30%"
    @close="closeHandle"
  >
  <!--由于表单组件 被分离，必须舍弃.sync 修饰符，
       必须向外通知 visible 属性的更新 -->
    <el-form
      :model="newUser"
      :rules="addFormrules"
      ref="addForm"
      label-width="70px"
    >
      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input v-model="newUser.username"></el-input>

      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input v-model="newUser.password"></el-input>

      </el-form-item>
      <el-form-item
        label="邮箱"
        prop="email"
      >
        <el-input v-model="newUser.email"></el-input>

      </el-form-item>
      <el-form-item
        label="电话"
        prop="mobile"
      >
        <el-input v-model="newUser.mobile"></el-input>

      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="$emit('update:dialogVisible',false)">取 消</el-button>
      <el-button
        type="primary"
        @click="_addUser"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {getUsers,addUser} from 'network/users'
import { emailCheck, mobileCheck } from "commonjs/utils";
export default {
  name: "AddDialog",
  data() {
    //在 data 内定义 邮箱，电话的自定义 验证器

    // const emailCheck = (rule, value, callback) => {
    //   //验证 邮箱的 正则
    //   const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    //   if (reg.test(value)) return callback();
    //   callback(new Error("请输入合法邮箱"));
    // };

    // const mobileCheck = (rule, value, callback) => {
    //   //验证 手机号码的 正则
    //   const reg = /^1(3|4|5|7|8)\d{9}$/;

    //   if (reg.test(value)) return callback();
    //   callback(new Error("请输入合法电话"));
    // };
    return {
      newUser: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      addFormrules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        //邮箱和 电话使用自定义的 验证规则
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
  props: {
    dialogVisible: Boolean
  },methods:{
      _getUsers() {
      getUsers(this.queryInfo).then(res => {
        console.log(res);
        if (res.meta.status !== 200) {
          this.$message.error("用户列表 获取失败");
        } else {
          this.users = res.data.users;
          this.total = res.data.total;
        }
      });
    },
    //处理 对话框的 关闭事件，清除 表单的数据
    closeHandle(){
      this.$refs.addForm.resetFields();
    },
    //添加用户
    _addUser(){
      this.$refs.addForm.validate(async valid=>{
        //数据 预验证
        if(!valid)
          return ;
        else{
          const res= await addUser(this.newUser);
          if(res.meta.status!==201)
          {
            this.$message.error('用户添加失败');
          }
           else{
             this.$emit('update:dialogVisible',false);
             this.$message.success('用户添加成功');
             //获取新的 用户列表
             this._getUsers();
             //关闭 对话框
            
           }
        }
      })
    }
  }
};
</script>

<style>
</style>