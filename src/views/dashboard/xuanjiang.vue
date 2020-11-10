<template>
  <div>
    <a-page-header
      title="返回"
      sub-title="| 招聘管理"
      @back="gohome()"
      style="padding: 5px"
      backIcon="<"
    />
    <SearchFormModel
      :defaultFormValues="defaultSearchFormValues"
      :formList="searchFormList"
      @OnChange="searchOnChange"
      @Submit="searchList"
      :pager="pager"
    >
    </SearchFormModel>
    <a-button
      type="primary"
      @click="addEmploy()"
      style="float: right; margin-top: -60px; margin-right: 80px"
    >
      新建招聘
    </a-button>
    <a-table
      :columns="columns"
      :data-source="data"
      :loading="loading"
      :pagination="false"
      @change="handleTableChange"
      :rowKey="(data) => data.id"
    >
      <span slot="action" slot-scope="text, record">
        <a-popconfirm
          title="确认删除此条记录吗?"
          ok-text="确认"
          cancel-text="取消"
          @confirm="handDelete(record.id)"
        >
          <a>删除</a>
        </a-popconfirm>
        <a> | </a>
        <a @click="handInsert(record.id)">编辑</a>
      </span>
    </a-table>
    <div class="pagination">
      <Pagination :parentPager="pager" @paginationChange="paginationChange">
      </Pagination>
    </div>
    <Add
      v-if="drawer"
      :drawer.sync="drawer"
      ref="addModel"
      @close="closeModel"
      @change="updateChange"
      :selectId="selectId"
      :pager="pager"
    ></Add>
  </div>
</template>
<script>
const columns = [
  {
    title: "职位名称",
    key: "name ",
    dataIndex: "name",
    align: "center",
  },
  {
    title: "对应岗位",
    key: "post",
    dataIndex: "post",
    align: "center",
  },
  {
    title: "职位级别",
    key: "level",
    dataIndex: "level",
    align: "center",
  },
  {
    title: "招聘部门",
    dataIndex: "recruit",
    key: "recruit",
    align: "center",
  },
  {
    title: "最低学历要求",
    dataIndex: "education",
    key: "education",
    align: "center",
  },
  {
    title: "报名数",
    dataIndex: "num",
    key: "num",
    align: "center",
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center",
  },
];
import SearchFormModel from "@/components/SearchFormModel";
import Add from "@/components/drawer/add";
import Pagination from "@/components/pagination";

export default {
  components: {
    Add: Add,
    Pagination: Pagination,
    SearchFormModel: SearchFormModel,
  },
  data() {
    return {
      pager: {
        pageSizeOptions: ["5", "10", "20", "30", "50"],
        currentPage: 1,
        pageSize: 5,
        totalRecord: 0,
      },
      defaultSearchFormValues: {},
      searchFormList: [
        {
          type: "input",
          label: "职位名称",
          placeholder: "请输入",
          name: "name",
          prop: "name",
        },
        {
          type: "select",
          label: "职位级别:",
          name: "level",
          prop: "level",
          placeholder: "请选择",
          options: [{ value: "高级" }, { value: "中级" }, { value: "初级" }],
        },
        {
          type: "checkBox",
          label: "对应岗位:",
          name: "post",
          prop: "post",
          options: [
            { value: "技术岗" },
            { value: "设计岗" },
            { value: "人事" },
          ],
        },
        {
          type: "cascader",
          label: "最低学历要求",
          placeholder: "请选择",
          name: "education",
          prop: "education",
          options: [
            {
              value: "本科",
              label: "本科",
              children: [
                {
                  value: "一本",
                  label: "一本",
                },
                {
                  value: "二本",
                  label: "二本",
                },
              ],
            },
            {
              value: "专科",
              label: "专科",
              children: [
                {
                  value: "大专",
                  label: "大专",
                },
                {
                  value: "中专",
                  label: "中专",
                },
              ],
            },
            {
              value: "硕士",
              label: "硕士",
            },
          ],
        },
        {
          type: "treeSelect",
          label: "招聘部门:",
          name: "recruit",
          prop: "recruit",
          placeholder: "请选择",
          options: [
            {
              key: 1,
              value: "研发部",
              title: "研发部",
              children: [
                { key: 4, value: "JAVA", title: "JAVA" },
                { key: 5, value: "C++", title: "C++" },
              ],
            },
            { key: 2, value: "管理部", title: "管理部" },
            { key: 3, value: "销售部", title: "销售部" },
          ],
        },
        {
          type: "rangepicker",
          label: "创建时间:",
          name: "rangepicker",
          prop: "rangepicker",
        },
      ],
      form: this.$form.createForm(this, { name: "form" }),
      drawerForm: this.$form.createForm(this, { name: "drawerForm" }),
      data: [],
      obj: {
        id: 0,
        name: "",
        post: "",
        level: "",
        recruit: "",
        education: "",
        num: "",
      },
      loading: false,
      drawer: false,
      selectId: "",
      columns: columns,
      total: 0,
      pageNum: 1,
      pageSize: 5,
      paginationData: [], // 前端分页的全量数据
      condition: {},
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
    window.this = this;
  },
  methods: {
    gohome(){
      this.$router.push({path:'/home'})
    },
    paginationChange(currentPage, pageSize) {
      this.pager = Object.assign({}, this.pager, {currentPage,pageSize});
      this.initData();
    },
    searchOnChange(val) {
      this.data = val
    },
    searchList(values) {
      this.condition = values;
      this.$http
        .post("/searchList", {
          params: {
            current: this.pager.currentPage,
            pageSize: this.pager.pageSize,
            condition: this.condition,
          },
        })
        .then((res) => {
          console.log(res);
          this.data = res.data.data;
          this.pager.totalRecord = res.data.data.length;
        })
        .catch(() => {});
    },
    //获取数据列表
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
          // this.pager.totalRecord = res.data.data.length;
          this.$set(this.pager, "totalRecord", res.data.total);
        });
    },
    closeModel(isInit = true) {
      this.drawer = false;
      if (isInit) {
      }
    },
    handleTableChange(pagination) {
      console.log("tableChange", pagination);
    },
    //调用查询接口为dataSource 赋值
    //新建招聘
    addEmploy() {
      this.selectId = "";
      this.drawer = true;
    },
    //重置
    restting() {
      console.log('1111');
      this.form.resetFields();
      this.initData();
    },
    //删除
    handDelete(id) {
      this.data = this.data.filter(function (val) {
        return val.id != id; // 过滤掉前台传过来的id对应的相应数据，并重新返回
      });
      this.pager.totalRecord = this.pager.totalRecord-1
      },
    //修改
    handInsert(id) {
      this.selectId = id + "";
      this.drawer = true;
    },
    updateChange(value) {
      console.log(value);
      this.data = value;
    },
  },
};
</script>
<style scoped>
.body {
  min-width: 1024px;
}
.ant-advanced-search-form {
  padding: 24px;
  display: flex;
}

.ant-advanced-search-form .ant-form-item {
  justify-content: flex-start;
}
.drawer_footer {
  margin-left: 80px;
  margin-top: 100px;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}
.pagination {
  margin-left: 400px;
  margin-top: 2px;
}
#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
</style>