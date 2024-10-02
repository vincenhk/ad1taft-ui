import { createApp, ref } from 'vue'
import AlertNotification from '@/components/AlertNotification.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import { setupApp } from './setupApp'

export function showNotification({ title, message, type }) {
  const app1 = createApp({
    components: { AlertNotification },
    setup() {
      const isOpen = ref(true)
      const close = () => {
        isOpen.value = false
        app1.unmount()
        document.body.removeChild(container)
      }
      return { isOpen, title, message, close, type }
    },
    template: `
      <alert-notification :is-open="isOpen" :type="type" :title="title" :message="message" @close="close" />`
  })
  const container = document.createElement('div')
  document.body.appendChild(container)
  setupApp(app1)
  app1.mount(container)
}

export const confirmDialog = {
  // data: null,
  showDialog: async ({ title, message, type }) => {
    return new Promise((resolve, reject) => {
      const app1 = createApp({
        components: { ConfirmDialog },
        setup() {
          const isOpen = ref(true)
          const close = () => {
            isOpen.value = false
            app1.unmount()
            document.body.removeChild(container)
          }
          const getOnClick = (value) => {
            try {
              resolve(value)
              isOpen.value = false
              app1.unmount()
              document.body.removeChild(container)
            } catch (err) {
              reject({
                message: err.message
              })
            }
          }
          const closeKeyHandler = (event) => {
            console.log("event.key", event.key)
            if (event.key === 'Escape') close()
          }
          document.addEventListener('keypress', closeKeyHandler)

          return { title, message, type, close, getOnClick, isOpen, closeKeyHandler }
        },
        template: `
          <confirm-dialog :is-open="isOpen" :type="type" :title="title" :text="message" @on-click="getOnClick"
                          @close="close" @keydown="closeKeyHandler" />`
      })
      const container = document.createElement('div')
      document.body.appendChild(container)
      setupApp(app1)
      app1.mount(container)
      // console.log(app1.mount(container))
    })
  }
}

export const iconNotif = Object.freeze({
  SUCCESS: {
    icon: ['fas', 'circle-check'],
    color: ['text-green-600']
  },
  ERROR: {
    icon: ['fas', 'circle-exclamation'],
    color: ['text-red-600']
  },
  INFORMATION: {
    icon: ['fas', 'circle-info'],
    color: ['text-blue-600']
  }
})

export const titleNotif = Object.freeze({
  SUCCESS: 'Berhasil',
  ERROR: 'Gagal',
  INFORMATION: 'Informasi'
})

export const confirmDialogNotif = Object.freeze({
  QUESTION: 'question',
  UPDATE: 'update',
  DELETE: 'delete',
  SAVE: 'save'
})

