<template>
  <div>
    <a-checkbox-group @change="onChangePost">
      <a-checkbox value="技术岗"> 技术岗 </a-checkbox>
      <a-checkbox value="设计岗"> 设计岗 </a-checkbox>
      <a-checkbox value="人事"> 人事 </a-checkbox>
    </a-checkbox-group>
  </div>
</template>
<script>
export default {
  name:'InputNum',
   props:{
      value:{
      type:Array,
      default:()=>[]
      }
  },
  data() {
    return{

    }
  },
  methods: {
    onChangePost(value){
      this.$emit("change",value)
    }
  },
};
</script>