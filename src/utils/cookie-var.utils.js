import useCrypto from '@/utils/crypto.utils.js'

export const useCookie = {
  /**
   * Method have function to create cookie
   * @param key , attr had key for cookie
   * @param value , attr value had value for cookie
   * @param proxy , method callback to parse the getCurrentInstance
   */
  setItem(key, value, proxy) {
    try {
      const dataEncrypted = useCrypto.encrypt(value)

      proxy.$cookies.set(key, dataEncrypted, '15MIN')
    } catch (err) {
      console.log('err :', err.message)
    }
  },
  /**
   * Method have function to get value of cookie
   * @param key , attr had key for cookie
   * @param proxy , method callback to parse the getCurrentInstance
   */
  getItem(key, proxy) {
    let result = ''
    try {
      const data = proxy.$cookies.get(key)
      const dataDecrypted = useCrypto.decrypt(data)

      const json = JSON.parse(dataDecrypted)

      if (typeof JSON.parse(json) === 'object') {
        result = JSON.parse(json)
        return result
      }
      result = dataDecrypted
      return result
    } catch (err) {
      console.log(err.message)
    }
    return result
  },
  /**
   * Method have function to remove cookie
   * @param key , attr had key for cookie
   * @param proxy , method callback to parse the getCurrentInstance
   */
  removeItem(key, proxy) {
    try {
      proxy.$cookies.remove(key)
    } catch (err) {
      console.log(err.message)
    }
  }
}

const existCookieKey = Object.freeze({
  USER_AUTH: '_su_auth_'
})

export default existCookieKey
