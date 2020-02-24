<template>
  <el-menu
    class="aside-menu"
    background-color="#333744"
    text-color="#fff"
    active-text-color="#409EFF"
    v-if="menuList"
    unique-opened
    :collapse="isCollapse"
    :collapse-transition="false"
    router
    :default-active="activePath"
  >
    <el-submenu
      :index="item.id+''"
      v-for="item in menuList"
      :key="item.id"
    >
      <!-- 一级菜单的模板内容-->
      <template slot="title">
        <!-- 图标-->
        <i
          :class="icons[item.id]"
          class="icon"
        ></i>
        <span class="sub-title">{{item.authName}}</span>
      </template>
      <!-- 二级菜单-->
      <el-menu-item
        :index="'/'+subItem.path"
        v-for="subItem in item.children"
        :key="subItem.id"
        @click="saveActivePath(subItem.path)"
      >
        <i class="el-icon-menu"></i>
        <span slot="title">{{subItem.authName}}</span>
      </el-menu-item>
    </el-submenu>

  </el-menu>
</template>

<script>
export default {
  name: "HomeAsideMenu",
  props: {
    menuList: Array,
    isCollapse: Boolean
  },
  data() {
    return {
      icons: {
        125: "iconfont icon-yuangongqudaoAPP-wodekehu",
        103: "iconfont icon-box",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-dingdan",
        145: "iconfont icon-ScreenPresentationF"
      },
      activePath: ""
    };
  },
  methods: {
    saveActivePath(path) {
      //点击获取 路径，并保存
      sessionStorage.setItem("activePath", "/" + path);
      console.log(path);

      this.activePath = "/" + path;
    }
  },
  created() {
    //刷新  使用上次 路径
    const path = sessionStorage.getItem("activePath");
    if (path) {
      this.activePath = path;
    }
  }
};
</script>

<style lang="less" scoped>
// .el-menu {
//   /* width: 200px; */
//   border-right: none;
// }
.aside-menu {
  .icon {
    margin-right: 20px;
  }
  .sub-title {
    margin-right: 30px;
  }
   border-right: none;
  span{
     font-size: 13px;
  }
}
</style>