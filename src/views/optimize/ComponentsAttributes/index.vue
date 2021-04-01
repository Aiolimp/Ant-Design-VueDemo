<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <h3>属性穿透</h3>
    <HelloWorld :configJsonArr="configJson" />
  </div>
</template>

<script>
import HelloWorld from "./config";
export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      configJson: [
        {
          type: "Input",
          props: {
            placeholder: "我是默认值",
            clearable: true,
          },
        },
        {
          type: "Select",
          props: {
            placeholder: "我是默认值",
          },
        },
        {
          type: "Input",
          props: {
            placeholder: "我是默认值",
            suffixIcon: "el-icon-delete",
          },
        },
      ],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      const programmerOutput = [
        {
          name: "Uncle Bobby",
          linesOfCode: 500,
        },
        {
          name: "Suzie Q",
          linesOfCode: 1500,
        },
        {
          name: "Jimmy Gosling",
          linesOfCode: 150,
        },
        {
          name: "Gracie Hopper",
          linesOfCode: 1000,
        },
      ];
      const totalOutput = programmerOutput
        .map((programmer) => programmer.linesOfCode)
        .reduce((acc, linesOfCode) => acc + linesOfCode, 0);
        console.log(totalOutput)
    },
  },
};
</script>