import dto from '@/services/dto/dto.js';
import axios from 'axios';
import { ad1taftParameterApi } from '@/api/api.ad1taft-parameter.js';

const ad1ParameterApi = new ad1taftParameterApi();

export async function getCofDetail(data = dto.getDetailCofDto) {
  let result;
  try {
    axios.defaults.baseURL = ad1ParameterApi.urlBase;
    const response = await axios.post(
      ad1ParameterApi.ad1ParameterList.VIEWBANKCRITERIADETAIL,
      data
    );
    result = response.data;
  } catch (error) {
    console.log(error.message);
  }
  return result;
}

export async function getCofHeaderDetail(data = dto.getCofHeaderDetailDto) {
  let result = null;
  try {
    axios.defaults.baseURL = ad1ParameterApi.urlBase;
    const response = await axios.post(
      ad1ParameterApi.ad1ParameterList.VIEWBANKCRITERIAHEADER,
      data
    );
    result = response.data;
  } catch (error) {
    console.log(error.message);
  }
  return result[0];
}

export async function getInstallType() {
  let result = null;
  try {
    axios.defaults.baseURL = ad1ParameterApi.urlBase;
    const response = await axios.get(ad1ParameterApi.ad1ParameterList.GETTIPEANGSURAN);
    result = response.data.map( (x) => ({
      code : x.angsuranCode,
      text : x.angsuranDesc
    }));
    console.log(result);
  } catch (error) {
    console.log(error);
  }
  return result;
}

export async function getLendingRate() {
  let result = null;
  try {
    axios.defaults.baseURL = ad1ParameterApi.urlBase;
    const response = await axios.get(ad1ParameterApi.ad1ParameterList.GETLENDINGRATE);
    result = response.data.map( (x) => ({
      code : x.lendingRateCode,
      text : x.lendingRateDesc
    }));
  } catch (error) {
    console.log(error);
  }
  return result;
}

export async function getPortionBankByBank(data = dto.getPortionBankByBankDto) {
  let result = null;
  try {
    axios.defaults.baseURL = ad1ParameterApi.urlBase;
    const response = await axios.post(ad1ParameterApi.ad1ParameterList.GETPORSIBANKCRITERIA, data);
    console.log(response)
    result = response.data.map( (x) => ({
      code : parseInt(x.portionBank),
      text : x.portionDesc
    }));
  } catch (error) {
    console.log(error);
  }
  return result;
}

export async function getAdvArr() {
  let result = null;
  try {
    axios.defaults.baseURL = ad1ParameterApi.urlBase;
    const response = await axios.get(ad1ParameterApi.ad1ParameterList.GETADVANCEARREAR);
    result = response.data.map( (x) => ({
      code : x.advArrCode,
      text : x.advArrDesc
    }));
  } catch (error) {
    console.log(error);
  }
  return result;
}