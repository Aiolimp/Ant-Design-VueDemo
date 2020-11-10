import router from "./router/";
import store from "./store/";
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ["/login"]; // 不重定向白名单

// main.js
router.beforeEach((to, from, next) => {

  NProgress.start();

  if (store.getters.gettoken) {
    // 判断是否有token
    if (to.path === "/login") {
      //有token , 将要去登录页,转到首页
      next({ path: "/" });
      NProgress.done()
    } else {
      // "有token , 非 去登录页
      if (store.getters.getroles.length === 0) {
        //获取用户信息
        store
          .dispatch("GetInfo")
          .then(res => {
            // 拉取角色
            const roles = res.result.roles;
            //根据角色 生成相应的路由
            store.dispatch("GenerateRoutes", { roles }).then(() => {
              //生成可访问的路由表
              router.addRoutes(store.getters.getaddRouters); // 动态添加可访问路由表
              // next();
              next({ ...to, replace: true }); //确保add已完成
            });
          })
          .catch(err => {
          });
      } else {
        NProgress.done()
        next(); //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    }
  } else {
    // 无token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next("/login");
      NProgress.done()
    }
  }
});

//页面加载完成
router.afterEach(() => {
  NProgress.done()
})

