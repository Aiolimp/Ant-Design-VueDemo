<template>
  <a-form-model
    layout="inline"
    :model="formInline"
    @submit="handleSubmit"
    @submit.native.prevent
    :rules="rules"
    ref="formModelRef"
  >
    <a-form-model-item
      v-for="(item, index) in formList"
      :key="index"
      :label="item.label"
      :prop="item.prop"
    >
      <!-- input -->
      <a-input
        v-if="item.type == 'input'"
        v-model="formInline[item.name]"
        :placeholder="item.placeholder"
        allowClear
      ></a-input>
      <!-- select -->
      <a-select
        style="width: 200px"
        v-if="item.type == 'select'"
        v-model="formInline[item.name]"
        :mode="item.mode ? item.mode : 'default'"
        optionFilterProp="children"
        :placeholder="item.placeholder"
        allowClear
      >
        <a-select-option
          v-for="(it, idx) in item.options"
          :key="'formModelOption_' + idx"
          :value="it.value"
          >{{ it.value }}</a-select-option
        >
      </a-select>
      <!-- treeselect -->
      <a-tree-select
        style="width: 215px"
        v-if="item.type == 'treeSelect'"
        show-search
        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
        :placeholder="item.placeholder"
        allow-clear
        tree-default-expand-all
        v-model="formInline[item.name]"
      >
        <a-tree-select-node
          v-for="treeIt in item.options"
          :key="treeIt.key"
          :value="treeIt.value"
          :title="treeIt.title"
        >
        </a-tree-select-node>
      </a-tree-select>
      <!-- cascader -->
      <a-cascader
        v-if="item.type == 'cascader'"
        :options="item.options"
        :placeholder="item.placeholder"
        :field-names="item.fieldNames"
        change-on-select
        v-model="formInline[item.name]"
        @change="referOnChange"
      />
      <!-- checkbox  -->
      <a-checkbox-group
        style="width: 250px"
        v-if="item.type == 'checkBox'"
        v-model="formInline[item.name]"
        :value="item.options"
      >
        <a-checkbox
          v-for="(it, idx) in item.options"
          :key="idx"
          :value="it.value"
          >{{ it.value }}
        </a-checkbox>
      </a-checkbox-group>
      <!-- datapicker -->
      <a-range-picker
        style="width: 200px"
        v-if="item.type == 'rangepicker'"
        v-model="formInline[item.name]"
        :valueFormat="item.format ? item.format : 'YYYY-MM-DD'"
        :disabledDate="item.disabledDate"
      />
      <InputNum
        v-if="item.type == 'InputNum'"
        v-model="formInline[item.name]"
      ></InputNum>
    </a-form-model-item>
    <a-form-model-item v-show="buttonSubmit">
      <a-button type="primary" html-type="submit">查询</a-button>
    </a-form-model-item>
    <a-form-model-item v-show="buttonRestting">
      <a-button type="primary" @click="restting()">重置</a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
// :ranges=""
import InputNum from "./form/InputNum";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getroles", "getpermission"]),
  },
  components: {
    InputNum: InputNum,
  },
  props: {
    formList: {
      type: Array,
    },
    defaultFormValues: {
      type: Object,
    },
    pager: {
      type: Object,
    },
  },
  watch: {
    defaultFormValues: {
      handler(val, oldVal) {
        this.formInline = Object.assign({}, this.formInline, val);
      },
      deep: true,
    },
  },
  data() {
    let validatorNum = (rule, value, callback) => {
      if (this.formInline.num[0] > this.formInline.num[1]) {
        callback("最小值不能大于最大值");
      } else {
        callback();
      }
    };
    return {
      formInline: {},
      arrNum: [],
      buttonRestting: true,
      buttonSubmit: true,
      rules: {
        num: [{ validator: validatorNum, trigger: "change" }],
      },
    };
  },
  created() {
    this.buttonRestting = true;
    this.buttonSubmit = true;
    var stateUser = JSON.parse(sessionStorage.getItem("user"));
    if (stateUser.permission == "") {
      stateUser = JSON.parse(sessionStorage.getItem("store")).user;
    }
    this.permissionItem = stateUser.permission;
    if (this.permissionItem && this.permissionItem.indexOf("0-2-1") == -1) {
      this.buttonSubmit = false;
    }
    if (this.permissionItem && this.permissionItem.indexOf("0-2-2") == -1) {
      this.buttonRestting = false;
    }
  },
  methods: {
    initData() {
      this.$http
        .post("/getList", {
          params: {
            current: this.pager.currentPage,
            pageSize: this.pager.pageSize,
          },
        })
        .then((res) => {
          console.log(res);
          this.data = res.data.data;
          // this.pager.totalRecord = res.data.data.length;
          this.$set(this.pager, "totalRecord", res.data.total);
          this.$emit("OnChange", this.data);
        });
    },
    handleSubmit(e) {
      let obj = Object.assign({}, this.formInline);
      this.arrNum = obj.num;
      this.$emit("Submit", obj);
    },
    referOnChange(value) {
      console.log(value);
      this.$emit("OnChange", value);
    },
    //重置
    restting() {
      this.$refs["formModelRef"].resetFields();
      this.initData();
    },
  },
};
</script>
<style lang="less" scoped>
.ant-form {
  padding: 10px 15px;
  border-bottom: 1px solid #e8e8e8;
}
.ant-form-inline .ant-form-item {
  margin-bottom: 10px;
}
</style>
