<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created(){
  //页面加载时读取sessionStorage里的状态信息
  if(sessionStorage.getItem("store")){
    this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
  }
   //页面刷新时将vuex的信息保存到sessionStorage里
   window.addEventListener("beforeunload",()=>{
     console.log(this.$store.state);
     sessionStorage.setItem("store",JSON.stringify(this.$store.state))
   })
  }
};
</script>
<style>
</style>
