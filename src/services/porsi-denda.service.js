import axios from 'axios';
import { ad1taftParameterApi } from '@/api/api.ad1taft-parameter.js';
import dto from '@/services/dto/dto.js';

const ad1ParameterApi = new ad1taftParameterApi();

/**
 * Get all porsi denda existing
 * @returns {Promise<null>}
 */
export const getAllPorsiDenda = async () => {
  let result = null;
  try {
    axios.defaults.baseURL = ad1ParameterApi.urlBase;
    const response = await axios.post(ad1ParameterApi.ad1ParameterList.GETPORSIDENDA);
    result = response.data;
  } catch (err) {
    console.log(err.message);
  }
  return result;
};

/**
 * Save new data porsi denda
 * @param data
 * @returns {Promise<null>}
 */
export const addPorsiDenda = async (data = dto.savePorsiDendaDto) => {
  let result = null;
  try {
    axios.defaults.baseURL = ad1ParameterApi.urlBase;
    const response = await axios.post(ad1ParameterApi.ad1ParameterList.SAVEPORSIDENDA, data);
    result = response.data;
  } catch (err) {
    console.log(result);
  }
  return result;
};

/**
 * Delete exist data porsi denda
 * @param data
 * @returns {Promise<null>}
 */
export const removePorsiDenda = async (data = dto.deletePorsiDendaDto) => {
  let result = null;
  try {
    axios.defaults.baseURL = ad1ParameterApi.urlBase;
    const response = await axios.post(ad1ParameterApi.ad1ParameterList.DELETEPORSIDENDA, data);
    result = response.data;
  } catch (err) {
    console.log(err.message);
  }
  return result;
};
