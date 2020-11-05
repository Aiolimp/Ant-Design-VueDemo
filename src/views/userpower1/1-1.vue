<template>
  <div>
    <a-page-header
      title="返回"
      sub-title="| 测试权限1-1"
      @back="gohome()"
      style="padding: 5px"
      backIcon="<"
    />
    <h1>我是admin的权限1-1</h1>
    <a-button  @click="gonext">去1-2</a-button>
  </div>
</template>

<script>
export default {
  methods: {
    gonext() {
      this.$router.push("/userpower1/1-2");
    },
     gohome(){
      this.$router.push({path:'/home'})
    },
  }
};
</script>

<style>
</style>
