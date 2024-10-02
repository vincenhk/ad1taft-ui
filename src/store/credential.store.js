import { authLogin } from '@/services/login.service.js';
import { useLocalStorage } from '@/utils/local-storage.utils.js';
import { getCurrentInstance } from 'vue';
import { useCookie } from '@/utils/cookie-var.utils.js';

export const userAuth = {
  namespaced: true,
  state() {
    return {
      user: {
        require: true
      },
      role: {
        default: null,
        type: String
      },
      accessedMenu: {
        default: null,
        type: Array
      },
      isAuthenticated: false
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    menuAccess(state, menu) {
      state.accessedMenu = menu;
    }
  },
  actions: {
    async login({ commit, dispatch }, data) {
      const { proxy } = getCurrentInstance();
      try {
        const response = await authLogin(data.nik, data.password);
        commit('setUser', response);
        proxy.$cookies.remove(proxy.$cookiesKey.USER_AUTH);
        let took_user = {
          name: response.objectName,
          nik: response.login,
          role: response.orgPosition,
          deparment: response.orgDepartment,
          email: response.email,
          schemaId: response.schemaId
        };
        const json = JSON.stringify(took_user);

        useCookie.setItem(proxy.$cookiesKey.USER_AUTH, json, proxy);

        useLocalStorage.clearAll();
        dispatch('modelGlobal/getPorsiList', null, { root: true });
        dispatch('modelGlobal/getBankBySchema', null, { root: true });
        dispatch('modelGlobal/getAllGroupBank', null, { root: true });
        dispatch('modelGlobal/getAllFasilitasPendanaan', null, { root: true });
        dispatch('modelGlobal/getPorsiDenda', null, { root: true });
        dispatch('modelGlobal/getObjectGroup', null, { root: true });
        dispatch('modelGlobal/getInstallType', null, { root: true });
        dispatch('modelGlobal/getLendingRate', null, { root: true });
        dispatch('modelGlobal/getAdvArr', null, { root: true });
      } catch (err) {
        console.log(err.message);
      }
    }
  }
};

export default userAuth;
