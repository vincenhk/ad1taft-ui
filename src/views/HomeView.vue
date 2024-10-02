<script setup>
import { useStore } from 'vuex';
import {  ref } from 'vue'

const store = useStore();

const nik = ref(null)
const password = ref(null)

const login = (nik, password) => {
  console.log(nik, password)
  store.dispatch('login', {nik, password})
}

</script>

<template>
  <form @submit.prevent="login(nik, password)" class="space-y-2">
    <div>
      <label for="test-1">
        <input
          v-model="nik"
          id="test-1"
          class="text-sm p-2 border border-gray-100"
          placeholder="NIK"
          required
        />
      </label>
    </div>
    <div>
      <label for="password">
        <input
          v-model="password"
          id="password"
          type="password"
          class="text-sm p-2 border border-gray-100"
          placeholder="*********"
        />
      </label>
    </div>
    <button
      type="submit"
      class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    >
      Login
    </button>
  </form>
</template>

<style scoped></style>
