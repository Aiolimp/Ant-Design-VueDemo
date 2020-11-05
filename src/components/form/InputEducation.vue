<template>
  <div>
    <a-cascader
      placeholder="请选择最低学历要求"
      :options="options"
      :display-render="displayRender"
      :load-data="loadData"
      change-on-select
      @change="onChangeEducation"
    ></a-cascader>
  </div>
</template>
<script>
export default {
  name: "InputEducation",
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      options: [
        {
          value: "本科",
          label: "本科",
          isLeaf: false,
        },
        {
          value: "专科",
          label: "专科",
        },
        {
          value: "硕士",
          label: "硕士",
        },
      ],
    };
  },
  methods: {
    displayRender({ labels }) {
      return labels[labels.length - 1];
    },
    loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;

      setTimeout(() => {
        targetOption.loading = false;
        targetOption.children = [
          {
            label: "一本",
            value: "一本",
          },
          {
            label: "二本",
            value: "二本",
          },
        ];
        this.options = [...this.options];
      }, 1000);
    },
    onChangeEducation(value) {
      console.log(value);
      this.$emit("change", value);
    },
  },
};
</script>