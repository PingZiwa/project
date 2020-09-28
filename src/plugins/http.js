import axios from 'axios'

const MyHttp = {}

MyHttp.install = function (Vue) {
  // 设置接口基准地址
  axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
  Vue.prototype.$http = axios
}

export default MyHttp
