<template>
  <div class="login-container">
    <div class="login-wapper">
      <div class="avatar"><img
          src="~assets/img/logo.png"
          alt=""
        ></div>
      <el-form
        class="login-form"
        :model="loginform"
        :rules="testRules"
        ref="loginform"
      >
        <el-form-item prop="username">

          <el-input
            placeholder="用户名"
            v-model="loginform.username"
            clearable
            prefix-icon="el-icon-user"
          autofocus
          @keyup.enter.native="_login"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passwd">
          <el-input
            placeholder="密码"
            v-model="loginform.passwd"
            show-password
            type="password"
            prefix-icon="el-icon-lock"
            @keyup.enter.native="_login"
          >

          </el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button
            type="primary"
            @click="_login"
          >登录</el-button>
          <el-button
            type="info"
            @click="resetForm"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "network/login";
export default {
  name: "Login",
  data() {
    return {
      //表单 数据
      loginform: {
        username: "",
        passwd: ""
      },
      //验证规则
      testRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        passwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //点击 重置 按钮，重置表单的 输入
    resetForm() {
      //使用el-form 提供的方法，重置
      this.$refs.loginform.resetFields();
    },
    _login() {
      //登录之前 先 预验证
      // 表单的 validate  函数 接受一个 函数，传入 的参数就是 表单验证 是否通过
      this.$refs.loginform.validate(valid => {
        if (!valid) return;

        login(this.loginform.username, this.loginform.passwd).then(res => {
          console.log(res);
          //验证状态码
          if (res.meta.status === 200) {
            //弹窗提示
            this.$message.success('登录成功');
        //保存token
            window.sessionStorage.setItem('token',res.data.token);
          //存储到vuex
          this.$store.commit('getUserdata',res.data);
            //路由跳转
            this.$router.push('/home');
          } else {
            this.$message.error('用户名或密码错误')
          }
        });
      });
    }
  }
};
</script>

<style scoped>
.login-container {
  height: 100%;
  width: 100%;
  background-color: #2b4b6b;
}
.login-wapper {
  height: 300px;
  width: 450px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar {
  box-shadow: 0 0 10px #ddd;
  background-color: #fff;
  position: absolute;
  left: 50%;
  padding: 10px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
.avatar img {
  width: 120px;
  border-radius: 50%;
}
.login-form {
  padding: 0 10px;
  margin-top: 100px;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>