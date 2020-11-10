import { resetRouter } from '@/router';
import serviceManger from "@/service/index"

let app = "my-vue-admin";
const user = {
    state: {
        token: "reader-token",
        name: "",
        roles: '',
        permission:'',
        // language: Cookies.get('antd-vue-language') || 'en'
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_NAME(state, name) {
            state.name = name
        },
        SET_ROLES(state, roles) {
            state.roles = roles
        },
        SET_PERMISSION(state,permission){
          state.permission = permission  
        },
        // SET_LANGUAGE: (state, language) => {
        //     state.language = language
        //     Cookies.set('antd-vue-language', language, { expires: 3650 }) // expires: cookies失效时间，没有设置时，那么 cookie 的生命周期只是在当前的会话中，关闭浏览器意味着这次会话的结束，此时 cookie 随之失效
        //   }
    },
    getters: {
        gettoken: state => state.token,
        getname: state => state.name,
        getroles: state => state.roles,
        getpermission :state =>state.permission,
        language: state => state.user.language
    },
    actions: {
        //设置权限
        setPermission({commit},permission){
          commit('SET_PERMISSION',permission)
        },
        //登录
        Login({
            commit
        }, userInfo) {
            const username = userInfo.username.trim();
            return new Promise((resolve, reject) => {
                serviceManger.login(username, userInfo.password)
                    .then(response => {
                        if (response) {
                            console.log(response.result);
                            // cookie.set(app, response.result);
                            sessionStorage.setItem("token",JSON.stringify(response.result))
                            commit("SET_TOKEN", response.result);
                            resolve(response)
                        } else {
                            reject(response)
                        }
                    });
            });
        },
        //获取用户信息
        GetInfo({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                serviceManger.getInfo(state.token).then(response => {
                    if (response) {
                        const data = response.result;
                        data.permission = state.permission
                        sessionStorage.setItem("user",JSON.stringify(data))
                        commit("SET_PERMISSION", data.permission);
                        commit("SET_ROLES", data.roles);
                        commit("SET_NAME", data.name);
                        resolve(response);
                    } else {
                        reject(response);
                    }
                });
            });
        },
        //退出登录
        LogOut({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                serviceManger
                    .logout(state.token)
                    .then(() => {
                        commit("SET_TOKEN", "");
                        commit('SET_ROLES', "")
                        // cookie.remove(app);
                        resetRouter()
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        //移除token
        resetToken({ commit }){
            return new Promise(resolve=>{
                commit("SET_TOKEN",'')
                commit("SET_ROLES",'')
                // cookie.remove(app);
                resolve();
            })
        },
        // setLanguage({ commit }, language) {
        //     commit('SET_LANGUAGE', language)
        //   }
    }
};
export default user;