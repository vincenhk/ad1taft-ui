import axios from 'axios';
import { ad1taftParameterApi } from '@/api/api.ad1taft-parameter';
import { ad1taftMenuApi } from '@/api/api.ad1taft-menu.js';
import dto from '@/services/dto/dto.js';

const ad1ParameterApi = new ad1taftParameterApi();
const ad1MenuApi = new ad1taftMenuApi();

/**
 * Save Parameter Bank Pendanaan
 * @param data , bankDto
 * @returns {Promise<*>}
 */
export const saveParaBank = async (data = dto.bankDto) => {
  let result = '';
  try {
    axios.defaults.baseURL = ad1ParameterApi.urlBase;
    const response = await axios.post(ad1ParameterApi.ad1ParameterList.SAVEPARABANK, data);
    console.log('response', response.data);
    result = response.data;
  } catch (err) {
    console.log(err.message);
    result = err.message;
  }
  return result;
};

/**
 * Update Parameter Bank Pendanaan
 * @param data , bankDto
 * @returns {Promise<*>}
 */
export const updateParaBank = async (data = dto.bankDto) => {
  let result = '';
  try {
    axios.defaults.baseURL = ad1ParameterApi.urlBase;
    const response = await axios.post(ad1ParameterApi.ad1ParameterList.UPDATEPARABANK, data);
    console.log('response', response.data);
    result = response.data;
  } catch (err) {
    console.log(err.message);
    result = err.message;
  }
  return result;
};

/**
 * Delete Parameter Bank Pendanaan
 * @param data , bankDto
 * @returns {Promise<*>}
 */
export const deleteParaBank = async (data = dto.bankDto) => {
  let result = '';
  try {
    axios.defaults.baseURL = ad1ParameterApi.urlBase;
    const response = await axios.post(ad1ParameterApi.ad1ParameterList.DELETEPARABANK, data);
    console.log('response', response.data);
    result = response.data;
  } catch (err) {
    console.log(err.message);
    result = err.message;
  }
  return result;
};

/**
 * Get Detail Parameter Bank Pendanaan existing
 * @param data , bankDetailDto
 * @returns {Promise<*>}
 */
export const getDetailBank = async (data = dto.bankDetailDto) => {
  let result;
  try {
    axios.defaults.baseURL = ad1ParameterApi.urlBase;
    const response = await axios.post(ad1ParameterApi.ad1ParameterList.GETPARABANKBYID, data);
    result = response.data[0];
  } catch (err) {
    console.log(err.message);
  }
  return result;
};

/**
 * Get porsi bank by ID
 * @param data , porsiBankDto
 * @returns {Promise<*>}
 */
export const getPorsiBankbyId = async (data = dto.porsiBankDto) => {
  let result;
  try {
    axios.defaults.baseURL = ad1ParameterApi.urlBase;
    const response = await axios.post(ad1ParameterApi.ad1ParameterList.GETPORSIBANKID, data);
    result = response.data;
  } catch (err) {
    console.log(err.message);
  }
  return result;
};

/**
 * PARAMETER GROUP BANK
 * Commonly Used
 * */
export const getAllGroupBank = async () => {
  let result = [];
  try {
    axios.defaults.baseURL = ad1ParameterApi.urlBase;
    const response = await axios.get(ad1ParameterApi.ad1ParameterList.GETBANKGROUP);
    result = response.data;
  } catch (err) {
    console.log(err.message);
  }
  return result;
};

/**
 * PARAMETER KODE BANK
 * Commonly Used
 * @param data
 *  * bankSchemaId
 * */
export const getBankBySchema = async (data = { bankSchemaId: { required: true } }) => {
  let result = [];
  try {
    axios.defaults.baseURL = ad1MenuApi.urlBase;
    const response = await axios.post(ad1MenuApi.ad1taftMenuList.GETBANKIDBYSKEMABANK, data);
    result = response;
  } catch (err) {
    console.log(err.message);
  }
  return result.data;
};

/**
 * PARAMETER SCHEMA PENDANAAN
 * Commonly Used
 * */
export const getAllFasilitasPendanaan = async () => {
  let result = [];
  try {
    axios.defaults.baseURL = ad1MenuApi.urlBase;
    const response = await axios.get(ad1MenuApi.ad1taftMenuList.GETALLFASILITASPENDANAAN);
    result = response.data;
  } catch (err) {
    console.log(err.message);
  }
  return result;
};

export const getPorsiDenda = async () => {
  let result = [];
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
 * PARAMETER TIPE BANK
 * Commonly Used
 * */
export function getTypeBank() {
  let result = [];
  result.push({ id: '1', desc: 'JOINT FINANCING' });
  result.push({ id: '2', desc: 'NON JOINT FINANCING' });
  result.push({ id: '3', desc: 'SELF FINANCING' });
  return result;
}

/**
 * PARAMETER SCHEMA PENDANAAN
 * Commonly Used
 * */
export function getSchemaPendanaan() {
  let result = [];
  result.push({ id: '1', desc: 'JOINT FINANCING' });
  result.push({ id: '2', desc: 'NON JOINT FINANCING' });
  return result;
}

/**
 * PARAMETER SCHEMA JENIS JF
 * Commonly Used
 * */
export function getJenisJF() {
  let result = [];
  result.push({ id: '0', desc: 'None' });
  result.push({ id: '1', desc: 'With Recourse' });
  result.push({ id: '2', desc: 'Without Recourse' });
  return result;
}

/**
 * PARAMETER TIPE PEMBIAYAAN
 * Commonly Used
 * */
export function getTypePembiayaan() {
  let result = [];
  result.push({ id: '1', desc: 'KONVENSIONAL' });
  result.push({ id: '2', desc: 'SYARIAH' });
  return result;
}

/**
 * PARAMETER JENIS PEMBIAYAAN
 * Commonly Used
 * */
export function getJenisPembiayaan() {
  let result = [];
  result.push({ id: '01', desc: 'CONSUMER FINANCING' });
  result.push({ id: '02', desc: 'CONSUMER LEASING' });
  return result;
}

/**
 * PARAMETER STATE PENDANAAN
 * Commonly Used
 * */
export function getStatePendanaan() {
  let result = [];
  result.push({ id: '1', desc: 'Dalam Negeri' });
  result.push({ id: '2', desc: 'Luar Negeri' });
  return result;
}

/**
 * PARAMETER TIME ZONE
 * Commonly Used
 * */
export function getTimeZone() {
  let result = [];
  result.push({ id: '1', desc: 'WIB' });
  result.push({ id: '2', desc: 'WIT' });
  result.push({ id: '3', desc: 'WITA' });
  return result;
}
