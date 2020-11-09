import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from "./router/";
import store from "./store/";
import './mock/mock'
import axios from 'axios';
import '@/icons';
import "normalize.css/normalize.css";
import VCharts from 'v-charts'
import "@/styles/index.scss";
import "./permission";
import has from './utils/permissions';

Vue.config.productionTip = false

Vue.prototype.$http = axios;
Vue.use(Antd);
Vue.use(VCharts);
import serviceManger from "@/service/index"; //请求服务的所有代码
Vue.prototype.$serviceManger = serviceManger; //其中$xx为新命的名。全局引入
new Vue({
  router,
  store,
  has,
  render: h => h(App)
}).$mount('#app')
