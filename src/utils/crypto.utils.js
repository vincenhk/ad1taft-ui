import CryptoJS from 'crypto-js'

const useCrypto = {
  /**
   * Decrypt 128-BIT
   * @param data
   */
  encrypt(data) {
    const json = JSON.stringify(data)
    const key = import.meta.env.VITE_CRYPTO_SECRET_KEY
    const encryptedData = CryptoJS.AES.encrypt(json, key).toString()
    return encryptedData
  },
  /**
   * Decrypt 128-BIT
   * @param encryptedData
   */
  decrypt(encryptedData) {
    const key = import.meta.env.VITE_CRYPTO_SECRET_KEY
    const bytes = CryptoJS.AES.decrypt(encryptedData, key)
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
    return decryptedData
  }
}

export default useCrypto
