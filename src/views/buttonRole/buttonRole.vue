<template>
  <div>
    <div class="card-container">
      <a-tabs type="card" style="text-align: left">
        <a-tab-pane key="1" tab="招聘职位">
          <vContent />
        </a-tab-pane>
        <a-tab-pane key="2" tab="宣讲会">
          <Xuanjiang />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
import vContent from "../dashboard/content";
import Xuanjiang from "../dashboard/xuanjiang";
export default {
  data() {
    return {
      role: "",
      searchFormList: [
        {
          type: "input",
          label: "职位名称",
          placeholder: "请输入",
          name: "name",
        },
        {
          type: "select",
          label: "职位级别:",
          name: "level",
          placeholder: "请选择",
          options: [{ value: "高级" }, { value: "中级" }, { value: "初级" }],
        },
        {
          type: "checkBox",
          label: "对应岗位:",
          name: "post",
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
          type: "InputNum",
          label: "报名数:",
          name: "num",
          prop: "num",
          min: 0,
          max: 50,
        },
      ],
    };
  },
  name: "index",
  components: {
    vContent: vContent,
    Xuanjiang: Xuanjiang,
  },
  created() {},
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.card-container {
  background: #f5f5f5;
  padding: -30px;
  min-width: 1360px;
  max-width: 100%;
}
.card-container > .ant-tabs-card > .ant-tabs-content {
  height: 100%;
  margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-color: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}
.ant-dropdown-link {
  margin-left: 10px;
  color: black;
  font-weight: 600px;
}
#components-layout-demo-basic {
  text-align: center;
}
#components-layout-demo-basic .ant-layout-header {
  background: #fff;
  color: 4b4b4b;
  height: 60px;
  display: flex;
  justify-content: space-between;
}
#components-layout-demo-basic .ant-layout-sider {
  color: #fff;
  line-height: 120px;
  height: 100%
}
#components-layout-demo-basic .ant-layout-content {
  background: #fff;
  color: black;
  min-height: 120px;
  line-height: 120px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>
