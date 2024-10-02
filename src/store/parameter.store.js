import {
  getAllFasilitasPendanaan,
  getAllGroupBank,
  getBankBySchema,
  getPorsiDenda
} from '@/services/bank-pendanaan.service.js';
import { useLocalStorage, existAttr, existGroup } from '@/utils/local-storage.utils.js';
import { getPorsiList } from '@/services/porsi-bank.service.js';
import { getObjectGroup } from '@/services/common/common.service.js';
import { getAdvArr, getInstallType, getLendingRate } from '@/services/bank-criteria.js'

export const globalParam = {
  namespaced: true,
  state() {
    return {};
  },
  getter: {},
  mutations: {},
  actions: {
    /**
     * Using for update Group Bank Local Storage
     * @Char : Global
     * */
    async getAllGroupBank() {
      const res = await getAllGroupBank();
      useLocalStorage.setItem(existGroup.PARAM_GLOBAL, existAttr.PARAM_GROUP_BANK, res);
    },
    /**
     * Using for update Bank Local Storage
     * @Char : Global
     * */
    async getBankBySchema({ rootState }) {
      const schemaId = rootState.modelAuth.user.schemaId;
      const res = await getBankBySchema({ bankSchemaId: schemaId });
      useLocalStorage.setItem(existGroup.PARAM_GLOBAL, existAttr.PARAM_BANK, res);
    },
    /**
     * Using for update Facility Local Storage
     * @Char : Global
     * */
    async getAllFasilitasPendanaan() {
      const res = await getAllFasilitasPendanaan();
      useLocalStorage.setItem(existGroup.PARAM_GLOBAL, existAttr.PARAM_FACILITY, res);
    },
    /**
     * Using for update Porsi Denda Local Storage
     * @Char : Global
     * */
    async getPorsiDenda() {
      const res = await getPorsiDenda();
      useLocalStorage.setItem(existGroup.PARAM_GLOBAL, existAttr.PARAM_PORSI_DENDA, res);
    },
    /**
     * Using for update Porsi Bank Local Storage
     * @Char : Global
     * */
    async getPorsiList() {
      const res = await getPorsiList();
      useLocalStorage.setItem(existGroup.PARAM_GLOBAL, existAttr.PARAM_PORSI_BANK, res);
    },
    /**
     * Using for update Object Group Local Storage
     * @Char : Global
     * */
    async getObjectGroup() {
      const res = await getObjectGroup();
      useLocalStorage.setItem(existGroup.PARAM_GLOBAL, existAttr.PARAM_GROUP_OBJECT, res);
    },
    async getInstallType() {
      const res = await getInstallType();
      useLocalStorage.setItem(existGroup.PARAM_GLOBAL, existAttr.PARAM_INSTALLMENT_TYPE, res);
    },
    async getLendingRate() {
      const res = await getLendingRate();
      useLocalStorage.setItem(existGroup.PARAM_GLOBAL, existAttr.PARAM_LENDING_RATE, res);
    },
    async getAdvArr() {
      const res = await getAdvArr();
      useLocalStorage.setItem(existGroup.PARAM_GLOBAL, existAttr.PARAM_ADV_ARR, res);
    }
  }
};

export default globalParam;
