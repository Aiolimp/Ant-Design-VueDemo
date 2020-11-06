<template>
  <div>
        <div>
          <!-- <SelectLanguage class="SelectLanguage"></SelectLanguage> -->
          <span style="margin-right: 10px">帮助中心</span>
          <a-badge dot>
            <a-icon type="notification" />
          </a-badge>
          <a-avatar
            style="margin-left: 20px; width: 40px; height: 40px"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
          <a-dropdown
          >
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              {{getname}} <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="gohome">首页</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="logout">退出登录</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
  </div>
</template>

<script>
// import SelectLanguage from '@/components/langSelect/index'
import { mapGetters } from "vuex";
export default {
//   components:{
//  SelectLanguage,
//   },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push(`/login`);
    },
    gohome(){
      this.$router.push(`/employ`)
    }
  },
  computed: {
    ...mapGetters(["getsidebar", "getname"])
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  background-color: #ccc;
  height: 60px;
}
.icon {
  font-size: 40px;
  margin-top: 10px;
}
.avatar-container {
  height: 40px;
  display: inline-block;
  position: absolute;
  right: 35px;
  margin-top: 10px;
}
.user-avatar {
  border-radius: 10px;
  cursor: pointer;
}
#header-sidebar-open-close {
  display: inline-block;
}
.SelectLanguage{
  display: inline-block;
  margin-right:20px;
  font-size: 24px;
}
</style>
