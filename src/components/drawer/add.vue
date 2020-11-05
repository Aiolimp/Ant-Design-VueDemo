<template>
  <div>
    <a-drawer
      ref="drawer"
      :title="selectId != '' ? '编辑招聘信息' : '新建招聘信息'"
      placement="right"
      :closable="false"
      :visible.sync="drawer"
      width="450px"
    >
      <a-form
        :form="drawerForm"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-form-item label="职位名称:">
          <a-input
            placeholder="请输入职位名称"
            style="width: 200px"
            v-decorator="[
              'name',
              {
                rules: [
                  { required: true, message: '请输入职位名称!' },
                  { validator: validatorNum },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="对应岗位:">
          <a-select
            v-decorator="[
              'post',
              {
                rules: [{ required: true, message: '请选择对应岗位!' }],
              },
            ]"
            placeholder="请选择对应岗位"
          >
            <a-select-option value="技术岗"> 技术岗 </a-select-option>
            <a-select-option value="设计岗"> 设计岗 </a-select-option>
            <a-select-option value="人事"> 人事 </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="职位级别:">
          <a-radio-group
            v-decorator="[
              'level',
              {
                rules: [{ required: true, message: '请选择职位级别!' }],
              },
            ]"
            style="display: flex; padding: 10px"
          >
            <a-radio value="高级"> 高级 </a-radio>
            <a-radio value="初级"> 初级 </a-radio>
            <a-radio value="中级"> 中级 </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="最低学历要求:">
          <a-radio-group
            v-decorator="[
              'education',
              {
                rules: [{ required: true, message: '请选择最低学历要求!' }],
              },
            ]"
            style="display: flex; padding: 10px"
          >
            <a-radio value="一本"> 一本 </a-radio>
            <a-radio value="硕士"> 硕士 </a-radio>
            <a-radio value="二本"> 二本 </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="招聘部门:">
          <a-cascader
            placeholder="请选择招聘部门"
            v-decorator="[
              'recruit',
              {
                rules: [{ required: true, message: '请输入招聘部门!' }],
              },
            ]"
            :options="options"
            :display-render="displayRender"
            :load-data="loadData"
          ></a-cascader>
        </a-form-item>
        <a-form-item label="报名数:">
          <a-input
            placeholder="请输入报名数"
            style="width: 200px"
            v-decorator="[
              'num',
              {
                rules: [{ required: true, message: '请输入报名数!' }],
              },
            ]"
          >
          </a-input>
        </a-form-item>
      </a-form>
      <div class="drawer_footer">
        <a-button type="primary" @click="back(true)"> 返回 </a-button>
        <a-button type="danger" style="margin-left: 30px" @click="save(true)">
          提交
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  name: "Add",
  props: {
    drawer: {
      type: Boolean,
      default: () => false,
    },
    selectId: {
      type: String,
      default: () => "",
    },
    pager: {
      type: Object,
    },
  },
  data() {
    return {
      drawerForm: this.$form.createForm(this, { name: "drawerForm" }),
      obj: {
        id: 0,
        name: "",
        post: "",
        level: "",
        recruit: "",
        education: "",
        num: "",
      },
      obj2: {
        id: 0,
        name: "",
        post: "",
        level: "",
        recruit: "",
        education: "",
        num: "",
      },
      values: {},
      data: [],
      options: [
        {
          value: "研发部",
          label: "研发部",
          isLeaf: false,
        },
        {
          value: "管理部",
          label: "管理部",
          isLeaf: false,
        },
      ],
    };
  },
  created() {
    this.initData();
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
          this.data = res.data.data;
          console.log(this.data);
          if (this.selectId) {
            this.obj2 = this.data[this.selectId - 1];
            console.log(this.obj2);
            this.obj2.recruit = Array.of(this.obj2.recruit);
            setTimeout(() => {
              this.drawerForm.setFieldsValue({
                name: this.obj2.name,
                post: this.obj2.post,
                level: this.obj2.level,
                education: this.obj2.education,
                num: this.obj2.num,
                recruit: this.obj2.recruit,
              });
            }, 0);
          } else {
          }
        });
    },
    displayRender({ labels }) {
      return labels[labels.length - 1];
    },
    back(isClose = false) {
      this.drawerForm.resetFields();
      if (isClose) {
        this.$emit("close");
      }
    },
    validatorNum(rule, value, callback) {
      var str = "";
      for (var k in this.data) {
        str += this.data[k].name + ",";
        var arr = str.split(",");
      }
      if (arr.indexOf(value) != -1 && this.selectId == "") {
        callback("该职位名称已存在,请重新输入");
      } else {
        callback();
      }
    },
    //异步加载
    loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      setTimeout(() => {
        targetOption.loading = false;
        targetOption.children = [
          {
            label: "前端开发",
            value: "前端开发",
          },
          {
            label: "后端开发",
            value: "后端开发",
          },
        ];
        this.options = [...this.options];
      }, 1000);
    },
    save() {
      this.drawerForm.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.obj = values;
          this.obj2 = values;
          this.obj2.id = parseInt(this.selectId);
          if (!this.selectId) {
            this.obj.id = this.pager.totalRecord + 1;
            console.log(this.obj);
            this.$http
              .post("/listAdd", {
                params: {
                  obj: this.obj,
                },
              })
              .then((res) => {
                this.data = res.data.data;
                this.pager.totalRecord = res.data.data.length;
                if (res.status == 200) {
                  this.$message.info("提交成功");
                }
                this.drawerForm.resetFields();
                let page = this.pager.currentPage - 1;
                this.data = this.data.slice(
                  0 + page * this.pager.pageSize,
                  this.pager.currentPage * this.pager.pageSize
                );
                this.$emit("change", this.data);
                if (close) {
                  this.back(true);
                }
              });
          } else {
            this.$http
              .post("/listUpdate", {
                params: {
                  obj: this.obj2,
                },
              })
              .then((res) => {
                this.data = res.data.data;
                if (res.status == 200) {
                  this.$message.success("修改成功");
                }
                let page = this.pager.currentPage - 1;
                this.data = this.data.slice(
                  0 + page * this.pager.pageSize,
                  this.pager.currentPage * this.pager.pageSize
                );
                this.$emit("change", this.data);
                this.drawerForm.resetFields();
                if (close) {
                  this.back(true);
                }
              });
          }
        }
      });
    },
  },
};
</script>
<style scoped>
.drawer_footer {
  margin-left: 80px;
  margin-top: 100px;
}
</style>