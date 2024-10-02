<script setup>
import AsideMenu from '@/components/AsideMenu.vue'
import NavbarMenu from '@/components/NavbarMenu.vue'
// import menuAside from "@/menuAside";
import axios from 'axios'
import { ad1taftMenuApi } from '@/api/api.ad1taft-menu'
import {  onMounted, ref } from 'vue'

import { useStore } from 'vuex'

const store = useStore()
// import ModalView from "@/components/ModalView.vue";

const ad1MenuApi = new ad1taftMenuApi()

const _allowed = ref(null);

let asideMenu = ref([])
let userProperties = ref(Object)

onMounted( () => {
  // console.log(store.state.auth.accessedMenu);
  setTimeout(()=> {
    getMenuAllowed()
    userProperties.value = store.state.modelAuth.accessedMenu
  }, 2000)
})

const getMenuAllowed = async () => {
  _allowed.value = store.state.modelAuth.accessedMenu
  const payload = {
    menus: _allowed.value
  }
  try {
    axios.defaults.baseURL = ad1MenuApi.urlBase
    const response = await axios.post(ad1MenuApi.ad1taftMenuList.MENU, payload)
    asideMenu.value = response.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

</script>

<template>
  <NavbarMenu class="" :user="userProperties" />
  <AsideMenu :menu="asideMenu" />

</template>

<style scoped></style>