<script>
import CommonIcon from '@/components/CommonIcon.vue'

export default {
  components: { CommonIcon },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    type: {
      type: Object,
      default: null
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  },
  setup() {
    return {}
  }
}
</script>

<template>
  <div
    v-if="isOpen"
    class="relative z-50"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity"
      aria-hidden="true"
    ></div>
    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:min-w-96 sm:w-fit"
        >
          <!-- Modal Content -->
          <div class="bg-white px-4 pb-4 pt-5 sm:p-4 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-2 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                <div class="flex justify-between border-b-2 pb-1">
                  <h3 class="flex text-base font-medium leading-6 text-gray-900 bg" id="modal-title">
                    {{ title }}
                  </h3>
                  <button @click="close">
                    <common-icon :icon="['fas', 'x']" :size="'sm'" />
                  </button>
                </div>
                <div class="flex items-center mt-4 text-sm">
                  <common-icon :icon="type.icon" :class="type.color" :size="'xl'"/>
                  <p class="p-1">{{ message }}</p>
                </div>
                <div class="flex justify-end mt-4">
                  <button
                    class="justify-center rounded bg-white px-5 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 sm:ml-2 ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    @click="close"
                    type="button"
                  >
                    Oke
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your custom styles here */
</style>