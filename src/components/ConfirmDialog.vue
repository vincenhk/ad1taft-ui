<script setup>
import {defineProps, defineEmits} from 'vue';
import CommonIcon from '@/components/CommonIcon.vue'


const props = defineProps({
  isOpen: {
    default: false,
    type: Boolean
  },
  type: {
    required: true,
    type: String
  },
  text: {
    default: null,
    type: String
  },
  title: {
    default: null,
    type: String
  },

});

const emit = defineEmits(['on-click', 'close']);


function typeModel() {
  if (props.type === 'question') {
    return {
      iclass: ['bg-blue-100', 'text-blue-800'],
      icon: ['fas', 'circle-question'],
      text: props.text === null ? "Question?" : props.text,
      title: props.title === null ? "Simpan Data" : props.title
    }
  } else if (props.type === 'update') {
    return {
      iclass: ['bg-yellow-100', 'text-yellow-500'],
      icon: ['fas', 'pen-to-square'],
      text: props.text === null ? "Data akan diupdate?" : props.text,
      title: props.title === null ? "Update Data" : props.title
    }
  } else if (props.type === 'delete') {
    return {
      iclass: ['bg-red-100', 'text-red-700'],
      icon: ['fas', 'trash-can'],
      text: props.text === null ? "Data akan dihapus?" : props.text,
      title: props.title === null ? "Delete Data" : props.title
    }
  } else if (props.type === 'save') {
    return {
      iclass: ['bg-gray-200', 'text-black'],
      icon:['fa', 'floppy-disk'],
      text: props.text === null ? "Data akan disimpan?" : props.text,
      title: props.title === null ? "Simpan Data" : props.title
    }
  } else {
    return {
      iclass: ['bg-green-100', 'text-green-800'],
      icon: ['fas', 'question-circle'],
      text: props.text === null ? "Message (?)" : props.text,
      title: props.title === null ? "Tittle (?)" : props.title
    }
  }
}

/**
* Jika ingin melempar dialog dan memberi fungsi pada dialog
* */
const getOnClick = (value) => {
  emit('on-click', value);
}

const close = () => {
  emit('close')
}

</script>

<template >
  <div  v-if="isOpen" class="relative z-50 " aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" aria-hidden="true"></div>
    <div class="fixed inset-0 z-10 w-screen overflow-y-auto"  @click="close">
      <div tabindex="0" class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:min-w-96 sm:w-fit" @click.stop>
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                  :class="typeModel().iclass"
                  class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 ">
                <common-icon :icon="typeModel().icon" :size="'lg'" />
              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">{{
                    typeModel().title
                  }}</h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">{{ typeModel().text }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-2.5 sm:flex sm:flex-row-reverse gap-2 sm:px-6">

            <button type="button"
                    class="button-white"
                    @click="close" >
              Tidak
            </button>
            <button type="button"
                    :class="typeModel().bclass"
                    class="button-primary"
                    @click="getOnClick('onOk')">
              Ya
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>