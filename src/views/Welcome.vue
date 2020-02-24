<template>
  <div>Welcome {{usertype}} <span class="username">{{username}}</span></div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {};
  },
  computed: {
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
  }
,created(){
  const copyright="copyright by ltt  https://github.com/Galileo01 "
  console.log(copyright);
  
}
};
</script>

<style>
</style>