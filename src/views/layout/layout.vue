<template>
 <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>
        <img src="@/assets/222.jpg" alt="" />
        <div>
         <MyHeader></MyHeader>
        </div>
      </a-layout-header>
      <a-layout>
        <a-layout-sider>
          <sidebar></sidebar>
        </a-layout-sider>
        <a-layout-content
          :style="{
            margin: '10px 16px',
            background: '#f5f5f5',
          }"
        >
        <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import sidebar from "./sidebar/";
import MyHeader from "./header/";
import { mapGetters } from "vuex";
export default {
  components: {
    sidebar,
    MyHeader,
  },
  computed: {
    ...mapGetters(["getsidebar"]),
    classObj() {
      return {
        hideSidebar: !this.getsidebar.opened,
        openSidebar: this.getsidebar.opened,
      };
    },
  },
  //   created(){
  //       console.log(this.getsidebar.opened);
  //   }
};
</script>
<style  scoped>
html, body {
margin:0;
padding:0;
width:100%;
height: 100%;
}
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
     position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    height: auto;

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
.ant-layout.ant-layout-has-sider{
  max-height:880px
}
</style>
