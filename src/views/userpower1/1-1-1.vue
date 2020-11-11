<template>
  <div>
    <a-page-header
      title="返回"
      sub-title="| 防抖节流"
      @back="gohome()"
      style="padding: 5px"
      backIcon="<"
    />
    <div style="display: flex">
      <a-input
        v-model="value"
        style="width: 200px; margin-top: 45px"
        addonAfter="未做处理"
      ></a-input>
      <span> 响应数据：{{ value }}</span>
    </div>
    <div style="display: flex">
      <a-input
        v-model="debounceValue1"
        style="width: 200px; margin-top: 45px"
        addonAfter="防抖处理"
        @change="debChange"
      ></a-input>
      <span> 响应数据：{{ debounceValue2 }}</span>
    </div>
    <div style="display: flex">
      <a-input
        v-model="throttleValue1"
        style="width: 200px; margin-top: 45px"
        addonAfter="节流处理"
        @change="thrChange"
      ></a-input>
      <span> 响应数据：{{ throttleValue2 }}</span>
    </div>
  </div>
</template>
<script>
import globalFunction from "@/utils/globalFunction.js";
export default {
  data() {
    return {
      value: "",
      debounceValue1: "",
      debounceValue2: "",
      throttleValue1: "",
      throttleValue2: "",
    };
  },
  created() {},
  methods: {
    gohome() {
      this.$router.push({ path: "/employ" });
    },
    debChange: globalFunction.debounce(function () {
      this.debounceValue2 = this.debounceValue1;
    }, 1000),

    thrChange: globalFunction.throttle(function () {
      this.throttleValue2 = this.throttleValue1;
    }, 1000),
  },
};
</script>
<style>
</style>
