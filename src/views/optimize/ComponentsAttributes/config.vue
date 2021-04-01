<template>
  <div class="hello">
    <div v-for="(config, index) in configJsonArr" :key="config.type + index" style="display:flex">
      <comp-form-item :configJson="config"></comp-form-item>
    </div>
  </div>
</template>

<script>
import InputTest from "./InputTest";
import SelectTest from "./SelectTest";
const CompFormItem = {
  components: {
    InputTest, SelectTest
  },
  name: 'FormItem',
  props: {
    configJson: {
      required: true
    }
  },
  render (h) {
    return h(`${this.configJson.type}`, {
      props: {
        ...this.configJson.props || {}
      },
      attrs: {
        ...this.configJson.props || {}
      }
    })
  }
}
export default {
  name: 'Config',
  components: {
    // Input,
    // Select,
    CompFormItem
  },
  props: {
    configJsonArr: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>