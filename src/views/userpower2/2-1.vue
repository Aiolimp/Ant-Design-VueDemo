<template>
  <div>
    <a-page-header
      title="返回"
      sub-title="| 测试权限2-1"
      @back="gohome()"
      style="padding: 5px"
      backIcon="<"
    />
    <h1>我是admin的权限2-1</h1>
    <router-link :to="'/userpower2/2-2/'+userId">
     <a-button >去公共组件</a-button>
    </router-link>
   
  </div>
</template>

<script>
// import AModel from "@/components/model";
export default {
  data(){
    return{
      userId:"lisi"
    }
  },
  // components:{
  //   AModel
  // },
  methods: {
    gohome(){
      this.$router.push({path:'/employ'})
    },
  }
};
</script>

<style>
</style>
