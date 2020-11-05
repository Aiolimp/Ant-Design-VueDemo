import Mock from 'mockjs'
// import mUtils from '../utils/mUtils'
import userAPI from "./user";
const name_mock = [
  '视觉设计师',
  '前端工程师',
  '销售',
  '客服',
  'java工程师',
  '测试工程师',
  '运维工程师'
]

const post_mock = [
  '设计岗',
  '技术岗',
  '人事'
]

const level_mock = [
  '初级',
  '中级',
  '高级'
]

const recruit_mock = [
  '管理部',
  '研发部',
]

const education_mock = [
  '硕士',
  '一本',
  '二本'
]
var arr = [];
  var count = 15;
  for (let i = 0; i < count; i++) {
    arr.push({
      id: i + 1,
      name: name_mock[Mock.mock({
        "number|0-6": 6
      }).number],
      post: post_mock[Mock.mock({
        "number|0-2": 2
      }).number],
      level: level_mock[Mock.mock({
        "number|0-2": 2
      }).number],
      recruit: recruit_mock[Mock.mock({
        "number|0-1": 1
      }).number],
      education: education_mock[Mock.mock({
        "number|0-2": 2
      }).number],
      num: Mock.mock({
        "number|0-50": 50
      }).number
    })
  }
//获取数据
// Mock.mock(("http://text.com"),{
//   arr
// })
//删除
let list = function (options) {
  // console.log(options.type);
  let rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
  switch (rtype) {
    case 'get':
      break;
    case 'post':
      let id = parseInt(JSON.parse(options.body).params.id); // 获取请求的id，将options.body转换为JSON对象
      console.log(id);
      this.arr = arr.filter(function (val) {
        return val.id != id; // 过滤掉前台传过来的id对应的相应数据，并重新返回
      });
      console.log(this.arr);
      break;
    default:
      break;
  }
  return {
    data: this.arr
  }
}
Mock.mock('/list', /get|post/i, list)
//增加
let listAdd = function (options) {
  //  console.log("传过来的数据"+JSON.parse(options.body).params.obj);
  let rtype = options.type.toLowerCase(); //获取请求的类型
  switch (rtype) {
    case 'get':
      break;
    case 'post':
      let obj = JSON.parse(options.body).params.obj;
      // console.log("数据获取"+ obj);
      arr.unshift(obj)
      this.arr = arr // 将前台返回来的数据，拼接到数组中。
      console.log(this.arr);
      break;
    default:
      break;
  }
  return {
    data: this.arr
  }
}
Mock.mock('/listAdd', /get|post/i, listAdd);

//修改
let listUpdate = function (options) {
  let rtype = options.type.toLowerCase(); //获取请求的类型
  switch (rtype) {
    case 'get':
      break;
    case 'post':
      let obj = JSON.parse(options.body).params.obj;
      this.arr = arr.map(val => { // 将需要替换的数据替换掉
        return val.id === obj.id ? obj : val;
      });
      break;
    default:
      break;
  }
  return {
    data: this.arr
  }
}
Mock.mock('/listUpdate', /get|post/i, listUpdate);
//查询
let searchList = (params) => {
  let {
    current,
    pageSize,
    condition
  } = JSON.parse(params.body).params
  const {
    name,
    post,
    level,
    education,
    recruit,
    num
  } = condition;
  let dataClone = JSON.parse(JSON.stringify(arr))
  for (let i in condition) {
    if (condition[i]) {
      dataClone = dataClone.filter(
        (item) => {
          if (i === 'num') {
            let min = condition[i][0] || 0
            let max = condition[i][1] || 50
            return item[i] > min && item[i] < max
          } else {
            return condition[i].indexOf(item[i]) !== -1
          }
        });
    }
  }

  if (!(name || post || level || education || recruit || num)) {
    dataClone = arr;
  }
  let page = current - 1
  let data = dataClone.slice(0 + page * pageSize, current * pageSize)
  let total = arr.length
  return {
    data,
    total
  }
}
Mock.mock('/searchList', 'post', searchList)


let getList = (params) => {
  let {
    current,
    pageSize,
  } = JSON.parse(params.body).params
  let page = current - 1
  let data = arr.slice(0 + page * pageSize, current * pageSize)
  let total = arr.length
  return {
    data,
    total,
  }
}
Mock.mock('/getList', 'post', getList)
Mock.mock("/user/login", "post", userAPI.login);//登录
Mock.mock(/\/user\/getInfo\.*/, "get", userAPI.getInfo);//获取用户信息
Mock.mock("/user/logout", "post", userAPI.logout);//退出登录
export default Mock;