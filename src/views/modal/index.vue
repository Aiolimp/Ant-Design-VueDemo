<template>
  <div>
    <a-page-header
      title="返回"
      sub-title="| 添加地区"
      @back="gohome()"
      style="padding: 5px"
      backIcon="<"
    />
    <a-button @click="add" type="primary">添加</a-button>
    <a-form-model ref="ruleForm" :model="ruleForm" v-bind="ruleForm">
      <a-table
        :columns="columns"
        :data-source="data"
        bordered
        :pagination="false"
      >
        <template slot="address" slot-scope="text, record, index">
          <a-form-model-item
            ref="address"
            :prop="'arr.' + index + '.address'"
            :rules="{
              required: true,
              message: '地区不能为空',
              trigger: 'blur',
            }"
          >
            <a-cascader
              v-model="ruleForm.arr[index].address"
              :options="options"
              placeholder="选择地区"
            />
          </a-form-model-item>
        </template>
        <template slot="job" slot-scope="text, record, index">
          <a-form-model-item
            ref="job"
            :prop="'arr.' + index + '.job'"
            :rules="{
              required: true,
              message: '职位不能为空',
              trigger: 'blur',
            }"
          >
            <a-select placeholder="选择职位" v-model="ruleForm.arr[index].job">
              <a-select-option
                v-for="(job, index) in ['经理', '销售', '研发']"
                :key="index"
                :value="job"
                >{{ job }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </template>
        <template slot="name" slot-scope="text, record, index">
          <a-form-model-item
            ref="name"
            :prop="'arr.' + index + '.name'"
            :rules="{
              required: true,
              message: '名称不能为空',
              trigger: 'blur',
            }"
          >
            <a-select
              v-if="ruleForm.arr[index].job == '经理'"
              placeholder="选择人员"
              v-model="ruleForm.arr[index].name"
            >
              <a-select-option
                v-for="(name, index) in ['分组一', '分组二', '分组三']"
                :key="index"
                :value="name"
                >{{ name }}</a-select-option
              >
            </a-select>
            <a-radio-group
              v-else-if="ruleForm.arr[index].job == '销售'"
              placeholder="选择人员"
              v-model="ruleForm.arr[index].name"
            >
              <a-radio
                :style="radioStyle"
                v-for="(name, index) in ['分组一', '分组二', '分组三']"
                :key="index"
                :value="name"
                >{{ name }}</a-radio
              >
            </a-radio-group>
            <a-input
              v-else
              v-model="ruleForm.arr[index].name"
              @change="onchange"
              placeholder="选择人员"
            ></a-input>
          </a-form-model-item>
        </template>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <a-popconfirm
              v-if="data.length"
              title="确定要删除吗?"
              @confirm="() => onDelete(record.key)"
            >
              <a-tag color="blue"> 删除 </a-tag>
            </a-popconfirm>
          </div>
        </template>
      </a-table>
      <a-form-model-item style="margin-top: 20px">
        <a-button
          type="primary"
          html-type="submit"
          @click="submitForm('ruleForm')"
        >
          提交
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import addressOptions from "./addressOptions";

const columns = [
  {
    title: "选择地区",
    dataIndex: "address",
    width: "25%",
    scopedSlots: { customRender: "address" },
  },
  {
    title: "选择职位",
    dataIndex: "job",
    width: "25%",
    scopedSlots: { customRender: "job" },
  },
  {
    title: "选择人员",
    dataIndex: "name",
    width: "25%",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

const data = [];
export default {
  data() {
    return {
      radioStyle: {
        display: "inline",
        height: "20px",
        lineHeight: "20px",
      },
      data: [],
      columns,
      options: [],
      ruleForm: {
        arr: [],
      },
    };
  },
  created() {
    this.options = addressOptions.addressOptions;
  },
  methods: {
    gohome() {
      this.$router.push({ path: "/employ" });
    },
    onchange(e) {
      //  console.log(e);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("提交成功!");
        } else {
          console.log("提交失败!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onDelete(key) {
      // console.log(item);
      // console.log(this.ruleForm.arr);
      const data = [...this.data];
      this.data = data.filter((it) => it.key !== key);
      // let index = this.ruleForm.arr.indexOf(item);
      // console.log(index);
      // if(index!= -1){
      //   this.ruleForm.arr.splice(index,1)
      // }
    },
    add() {
      this.ruleForm.arr.push({
        address: [],
        name: "",
        job: "",
        key: Date.now(),
      });
      console.log(this.ruleForm.arr);
      const { data } = this;
      const newData = {
        key: Date.now(),
        name: "",
        job: "",
        address: [],
      };
      this.data = [...data, newData];
    },
  },
};
</script>
<style scoped>
</style>