<script setup>

// import {dropDownActive} from "@/store/sidebar/state.sidebar";
import {defineEmits, defineProps, ref} from 'vue'

// const props =
const props = defineProps({
  itemMenu: {
    type: Object,
    required: true
  },
  menus: {
    type: Array,
    required: true
  },
  index: Number
})


const toggleActiveMenu = ref(false)
const emit = defineEmits(['menuClick'])

const handlerSelectedMenu = (index) => {
  emit('menuClick', index)
  toggleActiveMenu.value = props.itemMenu.subMenuActive;
}

const selectedMenu = (menuId) => {
  return props.menus.filter(menu => menu.parentId === menuId);
}
/* ================== LATE SETTINGS ==================
* :to="itemMenu.to ?? null"
* */
</script>

<template>
  <li>
    <component class="flex cursor-pointer w-full p-2 items-center text-gray-900 rounded-lg hover:bg-gray-100 group"
               :is="!itemMenu.subMenu ? 'router-link' : 'button'"
               :to="'http://localhost:8080/ad1taft/#/'"
               @click="handlerSelectedMenu(index)"
    >
      <font-awesome-icon :icon="itemMenu.icon"/>
      <span class="flex-1 ms-3 text-left text-sm rtl:text-right whitespace-nowrap">{{ itemMenu.menuName }}</span>
<!--      <TitleIcon v-if="itemMenu.subMenu" class="flex-none" :path="toggleActiveMenu ? mdiMinus : mdiPlus "/>-->
      <font-awesome-icon v-if="itemMenu.subMenu" :icon="['fas', 'fa-chevron-down']" :rotation="toggleActiveMenu ? 180 : null" size="xs" />
    </component>
    <ul v-if="toggleActiveMenu && itemMenu.subMenu" class="bg-gray-200 rounded">
      <li class="flex cursor-pointer text-xs w-full p-1 items-center text-gray-900 rounded hover:bg-gray-100 group my-1"
          v-for="(item, index) in selectedMenu(itemMenu.menuId)" :key="index">
         <span class="ml-5">
         <font-awesome-icon v-if="itemMenu.subMenu" :icon="['fas', 'o']" size="2xs" />
        </span>
        <span class="flex-1 ml-1 p-1 text-left rtl:text-right whitespace-nowrap">
          {{ item.menuName }}</span>
      </li>
    </ul>
  </li>
</template>

<style scoped>

</style>