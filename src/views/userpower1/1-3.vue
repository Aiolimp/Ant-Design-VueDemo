<template>
  <div>
    <a-page-header
      title="返回"
      sub-title="| 测试权限1-3"
      @back="gohome()"
      style="padding: 5px"
      backIcon="<"
    />
    <h1>1-3</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    gohome() {
      this.$router.push({ path: "/employ" });
    },
  },
};
</script>
<style>
</style>