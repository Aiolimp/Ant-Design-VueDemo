<template>
  <div class="hello select-con">
    <!-- 直接在 el-input 设置 v-bind="$attrs" 是不行的，原因在于动态组件传入的属性 configProps 是一个对象，而不是解构后的对象属性 -->
    <a-select
      default-value="lucy"
      style="width: 120px"
      v-bind="$attrs"
    >
      <a-select-option value="jack">
        Jack
      </a-select-option>
      <a-select-option value="lucy">
        Lucy
      </a-select-option>
      <a-select-option
        value="disabled"
        disabled
      >
        Disabled
      </a-select-option>
      <a-select-option value="Yiminghe">
        yiminghe
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
export default {
  name: "Select",
  data() {
    return {
      value: "",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.select-con {
  margin: 20px;
  display: flex;
  align-items: center;
  label {
    width: 170px;
  }
}
</style>

