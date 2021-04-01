<template>
  <div>
    <a-page-header
      title="返回"
      sub-title="| 函数式组件"
      @back="gohome()"
      style="padding: 5px"
      backIcon="<"
    />
    <h1>函数式组件</h1>
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
