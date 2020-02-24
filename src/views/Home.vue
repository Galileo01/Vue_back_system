<template>
  <el-container class="home-container">
    <el-header>
      <div class="icon">
        <img
          src="~assets/img/logo.png"
          alt=""
        >
        <span>后台管理系统</span>
       
      </div>
       <div class="hello">
          <span>你好</span>
          <span>{{usertype}}</span>
          <span class="username">{{username}}</span>
        </div>
      <el-button
        @click="logout"
        type="danger"
      >退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="asideWidth">
        <div
          class="toggle-button"
          @click="toggle"
        >|||</div>
        <home-aside-menu
          :menuList="menuList"
          :isCollapse="isMenuCollapse"
        ></home-aside-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HomeAsideMenu from "components/HomeAsideMenu";

import { getMenuList } from "network/home";
export default {
  name: "Home",
  data() {
    return {
      menuList: [],
      //是否折叠菜单
      isMenuCollapse: false,
      asideWidth: "180px"
    };
  },
  methods: {
    logout() {
      //清空
      sessionStorage.clear();
      //跳转到登录页面
      this.$router.push("/login");
    },
    //切换 菜单的折叠
    toggle() {
      this.isMenuCollapse = !this.isMenuCollapse;
      if (!this.isMenuCollapse) {
        this.asideWidth = "180px";
      } else {
        this.asideWidth = "60px";
      }
    }
  },
  computed:{
    username(){
      return this.$store.state.userdata.username;
    },
    usertype(){
      if(this.username==='admin')
      {
        return '系统管理员';
      }
      else{
        return '普通用户';
      }
    }
  },
  components: {
    HomeAsideMenu
  },
  created() {
    getMenuList().then(res => {
      if (res.meta.status === 200) {
        this.menuList = res.data;
      } else {
        console.log(res.meta.msg);
      }
    });
  }
};
</script>

<style   scoped lang="less">
.home-container {
  height: 100%;
  color: #fff;
  // text-align: center;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .icon {
    display: flex;
    align-items: center;
    margin-left: 20px;
    img {
      height: 30px;
    }
    span {
      font-size: 20px;
      margin-left: 10px;
    }
    
  }
  .hello span{
      margin-left:10px;
    }
}
.el-aside {
  background-color: #333744;
  overflow: hidden;
}
.el-main {
  background-color: #eaedf1;
  color: #333744;
}
.toggle-button {
  height: 20px;
  line-height: 20px;
  background-color: #4a5064;
  letter-spacing: 0.2em;
  cursor: pointer;
  font-size: 12px;
  text-align: center;
}
</style>