export const useLocalStorage = {
  // Set an item in a specific group
  setItem(group, key, value) {
    let groupData = JSON.parse(localStorage.getItem(group)) || {}
    groupData[key] = value
    localStorage.setItem(group, JSON.stringify(groupData))
  },

  // Get an item from a specific group
  getItem(group, key) {
    let groupData = JSON.parse(localStorage.getItem(group)) || {}
    return groupData[key]
  },

  // Remove an item from a specific group
  removeItem(group, key) {
    let groupData = JSON.parse(localStorage.getItem(group)) || {}
    delete groupData[key]

    localStorage.setItem(group, JSON.stringify(groupData))
  },

  // Clear an entire group
  clearGroup(group) {
    localStorage.removeItem(group)
  },

  // Clear all local storage
  clearAll() {
    localStorage.clear()
  }
}

export const existGroup = Object.freeze({
  //PRAM GLOBAL
  PARAM_GLOBAL: 'PARAM_GLOBAL',
})

export const existAttr = Object.freeze({
  //KEY PRAM_GLOBAL
  PARAM_GROUP_BANK: 'PARAM_GROUP_BANK',
  PARAM_BANK: 'PARAM_BANK',
  PARAM_FACILITY: 'PARAM_FACILITY',
  PARAM_PORSI_DENDA: 'PARAM_PORSI_DENDA',
  PARAM_PORSI_BANK: 'PARAM_PORSI_BANK',
  PARAM_GROUP_OBJECT: 'PARAM_GROUP_OBJECT',
  PARAM_INSTALLMENT_TYPE: 'PARAM_INSTALLMENT_TYPE',
  PARAM_LENDING_RATE: 'PARAM_LENDING_RATE',
  PARAM_ADV_ARR: 'PARAM_ADV_ARR',
})

