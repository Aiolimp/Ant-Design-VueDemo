<template>
  <div class="input">
    <!-- 调用一个组件的时候传入属性 (class 和 style 除外)，而且不在该组件内部的 props 中声明，
      就可以通过 v-bind="$attrs" 传入该组件的内部组件 -->
    <a-input
      v-bind="$attrs"
      style="width:200px"
    ></a-input>
  </div>
</template>

    <script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

    <style lang="less">
.input {
  height: 30px;
  display: flex;
}
</style>>

