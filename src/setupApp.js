import router from './router'
import store from './store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/*
 * Reset Timer
 * @Global
 **/
function resetTimer() {
  console.log('running reset timer!')
}

export function setupApp(app) {
  app.component('font-awesome-icon', FontAwesomeIcon)
  app.use(router)
  app.use(store)
  app.use(() => {
    document.addEventListener('mousemove', resetTimer)
    document.addEventListener('keypress', resetTimer)
  })
}
