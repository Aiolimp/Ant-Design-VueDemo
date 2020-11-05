<template>
  <div>
    <a-tree-select
              show-search
              style="width: 180px"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="选择招聘部门"
              allow-clear
              tree-default-expand-all
              @change="onChangeRecruit"
            >
              <a-tree-select-node key="0-1" value="研发部" title="研发部">
                <a-tree-select-node
                  key="0-1-1"
                  value="前端开发"
                  title="前端开发"
                >
                  <a-tree-select-node
                    key="random1"
                    value="小程序开发"
                    title="小程序开发"
                  />
                  <a-tree-select-node
                    key="random2"

                    value="APP开发"
                    title="APP开发"
                  />
                </a-tree-select-node>
                <a-tree-select-node
                  key="0-1-2"
                  value="后端开发"
                  title="后端开发"
                >
                  <a-tree-select-node
                    key="random3"
                    value="python"
                    title="python"
                  />
                  <a-tree-select-node key="random1" value="JAVA" title="JAVA" />
                </a-tree-select-node>
              </a-tree-select-node>
              <a-tree-select-node key="0-2" value="管理部" title="管理部">
                <a-tree-select-node key="0-2-1" value="行政部" title="行政部">
                  <a-tree-select-node
                    key="random4"
                    value="人事部"
                    title="人事部"
                  />
                </a-tree-select-node>
              </a-tree-select-node>
            </a-tree-select>
  </div>
</template>
<script>
export default {
  name:'InputRecruit',
   props:{
      value:{
      type:String,
      default:()=>''
      }
  },
  data() {
    return{
    }
  },
  methods: {
    onChangeRecruit(value){
        console.log(value);
      this.$emit("change",value)
    }
  },
};
</script>