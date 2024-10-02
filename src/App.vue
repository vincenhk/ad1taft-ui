<script setup>
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useStore } from 'vuex'
const store = useStore()

store.dispatch('modelAuth/login', { nik: '10044090', password: 'newadira' });

</script>

<template>
  <LayoutAuthenticated/>

  <RouterView />
</template>

<style scoped>

</style>
