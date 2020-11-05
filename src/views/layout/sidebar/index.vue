<template>
  <div>
    <a-menu
      :selected-keys="selectedKeys"
      :opnekeys="openKeys"
      mode="inline"
      theme="dark"
      class="menu"
      @click="menuClick"
    >
      <template v-for="item in getrouters">
        <SidebarItem
          v-if="item.children && !item.hidden"
          :key="item.path"
          :sidebarItem="item"
        ></SidebarItem>

        <a-menu-item
          v-if="!item.children && !item.hidden"
          :key="item.path"
          class="ant-menu-item"
        >
          <router-link :to="item.path">
            <a-icon :type="item.meta.icon" />
            <span>{{ item.meta.title }}</span>
          </router-link>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(["getrouters", "getsidebar", "getname"]),
    variables() {
      return variables;
    },
  },
  data() {
    return {
      defaultOpenKeys: [],
      selectedKeys: [],
      openKeys: [],
      isCollapse: false,
      permissionItem: [],
    };
  },
  created() {
    this.selectedKeys = [this.$route.path];
    const openKeysArr = this.$route.path.split("/");
    openKeysArr.shift();
    openKeysArr[0] = "/" + openKeysArr[0];
    openKeysArr.forEach((item, index) => {
      this.openKeys.unshift(item);
    });
    ///////////////////////////////////////
    var stateUser = JSON.parse(sessionStorage.getItem("user"));
    if (stateUser.permission == "") {
      stateUser = JSON.parse(sessionStorage.getItem("store")).user;
    }
    this.permissionItem = stateUser.permission;
    this.openKeys = [
      this.$route.path.substr(0, this.$route.path.lastIndexOf("/")),
    ];
    if (this.permissionItem != "") {
      this.getrouters.forEach((item) => {
        var result = this.getrouters.findIndex((item) => {
          return item.children && this.permissionItem.indexOf(item.path) == -1;
        });
        if (result > -1) {
          this.getrouters.splice(result, 1);
        }
        if (item.children) {
          item.children.forEach((it) => {
            var result2 = item.children.findIndex((it) => {
              return this.permissionItem.indexOf(it.path) == -1;
            });
            if (result2 > -1) {
              item.children.splice(result2, 1);
            }
          });
        }
      });
    }
  },
  methods: {
    // 点击菜单触发事件
    menuClick({ item, key, keyPath }) {
      // length为1则说明没有子菜单
      keyPath.length === 1 ? (this.openKeys = []) : "";
    },
    // createGetrouters(getRouters){
    //   let routers = [];
    //   if(this.permissionItem!==null){
    //     this.getrouters.forEach(item=>{
    //       var result =this.getrouters.findIndex(it=>{
    //         return this.permissionItem.indexOf(it.path) == -1;
    //       });
    //       if(result>-1){
    //        this.getrouters= this.getrouters.splice(result,1)
    //       }
    //       if(item.children){
    //          this.getrouters = this.createGetrouters(item.children)
    //       }
    //     })
    //     routers.push(this.getrouters)
    //   }
    //   return routers
    // }
  },
};
</script>
<style scoped>
.menu {
  padding-top: 10px;
}
</style>