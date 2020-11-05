<template>
  <div>
    <a-page-header
      title="返回"
      sub-title="| 测试权限2-2"
      @back="gohome()"
      style="padding: 5px"
      backIcon="<"
    />
    <h1>我是公共组件</h1>
    <h2>{{userId}}</h2>
  </div>
</template>

<script>
export default {
  computed: {
    userId() {
      return this.$route.params.userId;
    },
  },
  methods: {},
};
</script>

<style>
</style>