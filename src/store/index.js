import { createStore } from 'vuex'
import userAuth from '@/store/credential.store.js'
import globalParam from '@/store/parameter.store.js'

// Create a new store instance.
const store = createStore({
  modules: {
    modelAuth: userAuth,
    modelGlobal: globalParam
  }
})

export default store
