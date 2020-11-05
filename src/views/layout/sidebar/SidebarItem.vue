<template functional>
      <a-sub-menu
        :key="props.sidebarItem.path"
        class="ant-menu-submenu"
      >
        <span slot="title">
          <a-icon type="appstore" /><span>{{ props.sidebarItem.meta.title }}</span>
        </span>
        <template v-for="it in props.sidebarItem.children">
         <SidebarItem
          v-if="it.children && !it.hidden"
          :key="it.path"
          :sidebarItem="it"
        ></SidebarItem>
        <a-menu-item
          v-else
          :key="it.path"
          class="ant-menu-item"
        >
        <router-link :to="props.sidebarItem.path + '/' + it.path">
          <span>{{ it.meta.title }}</span>
           </router-link>
        </a-menu-item>
        </template>
       
      </a-sub-menu>
</template>
<script>
export default {
  name: "SidebarItem",
  data() {
    return {};
  },
  created() {
  },
};
</script>
<style  scoped>
.title {
  color: #fff;
}
</style>