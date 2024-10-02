import { ad1taftMenuApi } from '@/api/api.ad1taft-menu.js'
import { computed } from 'vue'
import store from '@/store/index.js'
import axios from 'axios'

const ad1MenuApi = new ad1taftMenuApi();

export const getMenuAllowed = async () => {
  let asideMenu = ""
  const perMenu = computed(() => store.state.accessedMenu);
  const payload = {
    menus: perMenu.value
  };
  try {
    axios.defaults.baseURL = ad1MenuApi.urlBase;
    const response = await axios.post(ad1MenuApi.ad1taftMenuList.MENU, payload);
    asideMenu = response.data;
  } catch (err) {
    alert("err : "+err.message);
  }
  return asideMenu;
};