import axios from 'axios';
import { ad1taftParameterApi } from '@/api/api.ad1taft-parameter.js';
import dto from '@/services/dto/dto.js'

const ad1ParameterApi = new ad1taftParameterApi();

export async function getAllParaBankGroup() {
  let result;
  try {
    axios.defaults.baseURL = ad1ParameterApi.urlBase;
    const response = await axios.get(ad1ParameterApi.ad1ParameterList.GETBANKGROUP);
    result = response.data;
  } catch (err) {
    console.log(err.message);
  }
  return result;
}

export async function saveGroupBank(data = dto.activityGroupBankDto){
  let result;
  try{
    axios.defaults.baseURL=ad1ParameterApi.urlBase;
    const response = await axios.post(ad1ParameterApi.ad1ParameterList.SAVEBANKGROUP, data);
    result = response.data;
  }catch(err){
    console.log(err.message);
  }
  return result
}

export async function activeGroupBank(data = dto.activityGroupBankDto){
  let result;
  try{
    axios.defaults.baseURL=ad1ParameterApi.urlBase;
    const response = await axios.post(ad1ParameterApi.ad1ParameterList.AKTIVPARABANKGROUPTMP, data);
    result = response.data;
  }catch(err){
    console.log(err.message);
  }
  return result
}

export async function updateGroupBank(data = dto.activityGroupBankDto){
  let result;
  try{
    axios.defaults.baseURL=ad1ParameterApi.urlBase;
    const response = await axios.post(ad1ParameterApi.ad1ParameterList.UPDATEBANKGROUP, data);
    result = response.data;
  }catch(err){
    console.log(err.message);
  }
  return result
}

export async function deleteGroupBank(data = dto.activityGroupBankDto){
  let result;
  try{
    axios.defaults.baseURL=ad1ParameterApi.urlBase;
    const response = await axios.post(ad1ParameterApi.ad1ParameterList.DELETEBANKGROUP, data);
    result = response.data;
  }catch(err){
    console.log(err.message);
  }
  return result
}