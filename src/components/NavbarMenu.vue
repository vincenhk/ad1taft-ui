<script setup>
import {watchEffect, ref} from "vue";
import { useStore } from 'vuex'

const store = useStore()

const userName = ref(null);
const userRole = ref(null);

watchEffect(() => {
  if (store.state.modelAuth.user) {
    const user = store.state.modelAuth.user;
    userName.value = user.objectName;
    userRole.value = user.orgPosition;
  }
})

</script>

<template>
  <nav class=" base-nav ">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end">
          <button type="button"
                  class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
          </button>
          <a href="" class="flex ms-2 md:me-24">
            <img src="../assets/LogoAdira.png" class="h-9 me-3" alt="FlowBite Logo"/>
          </a>
        </div>
        <div class="items-center">
          <div class="flex items-center ms-3">
            <button type="button"
                    class=" w-9 h-9 text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false" data-dropdown-toggle="dropdown-user">
              <span class="sr-only">Open user menu</span>
              <img class="w-9 h-9 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                   alt="user photo">
            </button>
            <div class="px-2 hidden sm:block">
              <div class="text-sm">{{ userName }}</div>
              <div class="text-xs">{{ userRole }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>