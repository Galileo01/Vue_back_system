import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuequilleditor from 'vue-quill-editor'

import './plugins/element.js'

import TreeTable from 'vue-table-with-tree-grid'
Vue.config.productionTip = false


//手动 注册全局 第三方组件
Vue.component('tree-table',TreeTable)

Vue.use(Vuequilleditor)

//手动引入 样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
