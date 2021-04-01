<template>
  <div>
    <a-page-header
      title="返回"
      sub-title="| 优化技巧"
      @back="gohome()"
      style="padding: 5px"
      backIcon="<"
    />
    <h1>优化技巧</h1>
    <a-button @click="tohanshu">函数式组件</a-button>
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
    tohanshu(){
        this.$router.push("/optimize/funComponents");
    }
  }
};
</script>

<style>
</style>
