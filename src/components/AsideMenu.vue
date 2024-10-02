<script setup>
import {defineProps, onMounted, ref, watchEffect} from 'vue'
// import {collapsedSidebar, toggleSidebar} from '@/store/sidebar/state.sidebar'
import AsideMenuList from "@/components/AsideMenuList.vue";

const isPropsLoaded = ref(false);
const menusTree = ref(null);

const props = defineProps({
  menu: {
    type: Array,
    required: true
  }
})

watchEffect(() => {
  if (props.menu) {
    isPropsLoaded.value = true;

    const menuParent = props.menu.filter(menu => {
      return menu.menuLevel === "1" && menu.parentId === "0" && menu.isActive === "1" && menu.fdelete === "0"
    })
    iconStamp(menuParent)
  }
});

/*GET PARENT HAVE SUB MENU*/
function iconStamp(parent) {

  for (let index in parent) {
    const item = parent[index]
    props.menu.forEach(child => {
      if (child.parentId === item.menuId) {
        parent[index].subMenu = true
        parent[index].subMenuActive = false
      }
    })

    /*ADD ICON PARENT*/
    if (item.menuId === "IDM.TAFT.HOME") {
      parent[index].icon = ['fas', 'house-chimney']
    } else if (item.menuId === "IDM.TAFT.PARA") {
      parent[index].icon = ['fas', 'sliders']
    } else if (item.menuId === "IDM.TAFT.DISB") {
      parent[index].icon = ['fas', 'cash-register']
    } else if (item.menuId === "IDM.TAFT.PENR") {
      parent[index].icon = ['fas', 'file-invoice-dollar']
    } else if (item.menuId === "IDM.TAFT.PYMN") {
      parent[index].icon = ['fas', 'scale-unbalanced-flip']
    } else if (item.menuId === "IDM.TAFT.RPT") {
      parent[index].icon = ['fas', 'file-lines']
    } else if (item.menuId === "IDM.TAFT.SYMN") {
      parent[index].icon = ['fas', 'gear']
    } else if (item.menuId === "IDM.TAFT.FG") {
      parent[index].icon = ['fas', 'person-circle-question']
    } else {
      parent[index].icon = ['fas', 'question']
    }
  }
  menusTree.value = parent
  // console.log("parent", menusTree.value);
}

const toggleSubMenu = (index) => {
  const menus = menusTree.value
  if (menus[index].subMenu) {
    menus[index].subMenuActive = !menus[index].subMenuActive;
  }
}

onMounted(() => {
})

</script>

<template>
  <aside id="sidebar-multi-level-sidebar"
         class="base-sidebar top-0 pt-19 transition-transform -translate-x-full sm:translate-x-1"
         aria-label="Sidebar">
    <div v-if="isPropsLoaded"
         class="h-full scrollbar-thin overflow-y-scroll  pt-20 px-3 pb-4 bg-gray-50 dark:bg-gray-800">
      <AsideMenuList :menu-parent="menusTree" :menus="props.menu" @menu-click="toggleSubMenu"/>
    </div>
    <div v-else class="flex h-full justify-center align-middle bg-gray-50 text-gray-400">
      <p class="flex items-center text-xl text-gray-400 ">Loading ...</p>
    </div>
  </aside>
</template>

<style scoped>


</style>