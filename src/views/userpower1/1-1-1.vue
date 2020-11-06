<template>
  <div>
    <a-page-header
      title="返回"
      sub-title="| 测试权限1-1"
      @back="gohome()"
      style="padding: 5px"
      backIcon="<"
    />
    <h1>我是1-1的蛾子1-1-1</h1>
    
  </div>
</template>

<script>
export default {
  methods: {
     gohome(){
      this.$router.push({path:'/employ'})
    },
  }
};
</script>

<style>
</style>
