<template>
  <div>
    <a-page-header
      title="返回"
      sub-title="| countTo"
      @back="gohome()"
      style="padding: 5px"
      backIcon="<"
    />
    <countTo
      ref="example"
      :startVal="startVal"
      :endVal="endVal"
      :duration="4000"
      :prefix="prefix"
      :suffix="suffix"
      style="font-size: 32px; color: #ff0055; font-weight: 600"
    >
    </countTo>
    <div style="margin-top:-30px">
      <a-button @click="start" type="primary" ghost>开始</a-button>
      <a-button @click="pauseResume" type="danger" ghost style="margin-left:20px">暂停/恢复</a-button>
    </div>
    <div class="a-input">
      <a-input style="width: 150px" addonBefore="开始值" v-model="startVal" />
      <a-input style="width: 150px" addonBefore="结束值" v-model="endVal" />
      <a-input style="width: 150px" addonBefore="持续时间/s" v-model="duration" />
      <a-input style="width: 150px" addonBefore="分隔符" v-model="separator" />
      <a-input style="width: 150px" addonBefore="前缀" v-model="prefix" />
      <a-input style="width: 150px" addonBefore="后缀" v-model="suffix" />
    </div>
    <ve-radar :data="chartData" style="margin-top:20px"></ve-radar>

  </div>
</template>

<script>
import countTo from "vue-count-to";
export default {
  components: { countTo },
  data() {
    return {
      chartData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
        ],
      },
      startVal: 0,
      endVal: 2020,
      prefix: "￥",
      suffix: "rmb",
      decimals: 0,
      separator: ",",
      duration:4
    };
  },
  methods: {
    gohome() {
      this.$router.push({ path: "/employ" });
    },
    start() {
      this.$refs.example.start();
    },
    pauseResume() {
      this.$refs.example.pauseResume();
    },
  },
};
</script>
<style scoped>
.a-input {
  display: flex;
  justify-content: space-around;
}
</style>