<script setup>
import {defineProps, defineEmits, ref, watchEffect} from 'vue'
// import {dropDownActive, toggleDropDown} from '@/store/sidebar/state.sidebar'
import AsideMenuItem from "@/components/AsideMenuItem.vue";


const props = defineProps({
  menuParent: {
    type: Array,
    required: true
  },
  menus: {
    type: Array,
    required: true
  }
})

const isPropsLoaded = ref(false)
const refItem = ref(props.menuParent);
const emit = defineEmits(['menuClick'])

watchEffect(() => {
  if (props.menuParent && props.menus) {
    isPropsLoaded.value = !isPropsLoaded.value;
    refItem.value = props.menuParent
  }
})

const toggleSubMenu = (index) => {
  emit('menuClick', index)
}

</script>

<template>
  <ul v-if="isPropsLoaded" class="space-y-2 font-medium">
    <p class="flex justify-center align-middle bg-gray-50 text-gray-400 rounded-e-sm ">Loading ...</p>
  </ul>
  <ul v-else class="space-y-2 font-normal">
    <AsideMenuItem v-for="(item, index) in refItem"
                   :key="index"
                   :item-menu="item"
                   :menus="menus"
                   :index="index"
                   @menu-click="toggleSubMenu"
    />
  </ul>
</template>

<style scoped>

</style>