import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { setupApp } from '@/setupApp.js'
import initFB from '@/utils/library.flowbite.js'
import '@/services/dto/dto.js'

//ICON
import '@/utils/library.icons.js'

//DATA TABLE
import DataTablesCore from 'datatables.net'
import DataTable from 'datatables.net-vue3'
import VueCookies from 'vue-cookies'
import existCookieKey from '@/utils/cookie-var.utils.js'

//Crypto Hash Data
// import useCrypto from '@/utils/crypto.utils.js'
DataTable.use(DataTablesCore)
const app = createApp(App)

/**
 * Creating Variable global using this line
 * to call this var use this. but the problem is vue 3 is not support for using this.
 * and should use supporting function is getCurrentInstance from 'vue'.
 * */
app.config.globalProperties.$cookiesKey = existCookieKey
app.config.globalProperties.$keyCrypto = 'ad1taft02'
// app.config.globalProperties.$useCrypto = useCrypto

setupApp(app)
DataTable.use(DataTablesCore)
app.use(VueCookies, {
  expire: '15MIN', // Default expiration time for cookies
  path: '/' // General Path or you can cofig to specific path
})
app.use(initFB)
app.mount('#app')
