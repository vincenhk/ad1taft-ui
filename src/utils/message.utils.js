import * as msg from '@/general.alert.js'

const msgUtil = {
  massageSuccess({ message }) {
    msg.showNotification({
      title: msg.titleNotif.SUCCESS,
      message,
      type: msg.iconNotif.SUCCESS
    })
  },

  massageFailed({ message }) {
    msg.showNotification({
      title: msg.titleNotif.ERROR,
      message,
      type: msg.iconNotif.ERROR
    })
  },

  massageInfo({ message }) {
    msg.showNotification({
      title: msg.titleNotif.INFORMATION,
      message,
      type: msg.iconNotif.INFORMATION
    })
  }
}

export default msgUtil
