<template>
  <div>
    <div class="card-container">
      <a-tabs type="card" style="text-align: left" >
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
import vContent from "./dashboard/content";
import Xuanjiang from "./dashboard/xuanjiang";
export default {
  data() {
    return {
      role: "",
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
  height: 697px;
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
