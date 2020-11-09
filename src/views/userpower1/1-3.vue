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
    <countTo :startVal="startVal" :endVal="endVal" :duration="3000"></countTo>
  </div>
</template>

<script>
import countTo from "vue-count-to";
export default {
  components: { countTo },
  data() {
    return {
      startVal: 0,
      endVal: 2020,
    };
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