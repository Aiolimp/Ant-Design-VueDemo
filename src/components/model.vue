<template>
    <div>
        <h1>我是公共组件</h1>
        <!-- <a-input :value="value" style="width:200px"></a-input>
        <a-button  @change="onChange" type="success">确认</a-button>
        <h3>{{message}}</h3> -->
        <h2></h2>
     </div>
</template>
<script>
export default {
    computed:{
    userId(){
      return this.$route.params.userId
    }
  },
    data(){
        return{
          value:'',
          message:''
        }
    },
    methods:{
        onChange(){
            console.log(this.value);
            this.message = this.value
        }
    }
}
</script>
<style  scoped>

</style>