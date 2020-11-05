<template>
  <div>
    <a-input-number
      style="width: 90px; text-align: center"
      placeholder="报名数"
      v-model="min"
      :min="0"
      @change="onchangeMin"
    />
    <a-input
      style="
        width: 30px;
        border-left: 0;
        pointer-events: none;
        backgroundcolor: #fff;
      "
      placeholder="~"
      disabled
    />
    <a-input-number
      style="width: 90px; text-align: center; border-left: 0"
      placeholder="报名数"
      v-model="max"
      :max="50"
      @change="onchangeMax"
    />
  </div>
</template>
<script>
export default {
  name: "InputNum",
  components: {},
  model:{
   prop:'value',
   event:'change'
  },
  props:{
      value:{
      type:Array,
      default:()=>[0,50]
      }
  },
  watch:{
   value:{
    handler(val,olVal){
        this.min = val[0];
        this.max = val[1];
    },
   },
  },
  data() {
      return{
          min:0,
          max:50
      }
  },
  methods:{
      onchangeMin(value){
          this.min =value;
          let arr = [value,this.max]
          this.$emit("change",arr)
      },
       onchangeMax(value){
          this.max =value;
          let arr = [this.min,value]
          this.$emit("change",arr)
      },
   }
};
</script>
<style scoped>
</style>