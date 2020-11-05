<template>
  <div style="width: 150px；height:100%">
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['sub1']"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      style="padding:10px"
    >
      <a-menu-item key="1">
        <a-icon type="home" style="margin-left:-40px" />
        <span>主页</span>
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="appstore" style="margin-left:10px"/>
        <span>基础应用管理</span>
      </a-menu-item>
   
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="appstore" /><span>应用市场</span></span>
        <a-menu-item key="3">
          应用购买
        </a-menu-item>
        <a-menu-item key="4">
          应用管理
        </a-menu-item>
        <a-menu-item key="5">
          订单管理
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="6">
        <a-icon type="smile" style="margin-left:-17px"/>
        <span>订单管理</span>
      </a-menu-item>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="account-book" /><span>资金管理</span></span>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <span slot="title"><a-icon type="file-protect" /><span>合同管理</span></span>
      </a-sub-menu>
       <a-menu-item key="7">
        <a-icon type="user-add" />
        <span>通讯录管理</span>
      </a-menu-item>
      <a-sub-menu key="sub4">
        <span slot="title"><a-icon type="setting" /><span>系统设置</span></span>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>
<style scoped>
.ant-menu-item{
  padding-left: 10px;
}
</style>
