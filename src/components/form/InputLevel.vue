<template>
  <div>
       <a-select
              placeholder="请选择职位级别"
              style="width: 180px"
              @change="onChangeLevel"
            >
              <a-select-option value="高级"> 高级 </a-select-option>
              <a-select-option value="中级"> 中级 </a-select-option>
              <a-select-option value="初级"> 初级 </a-select-option>
            </a-select>
  </div>
</template>
<script>
export default {
  name:'InputLevel',
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
    onChangeLevel(value){
      this.$emit("change",value)
    }
  },
};
</script>