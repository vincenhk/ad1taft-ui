import axios from 'axios';
import dto from '@/services/dto/dto.js'
import { ad1taftMenuApi } from '@/api/api.ad1taft-menu.js'

const ad1Menu = new ad1taftMenuApi();

export async function getSubBankByBank(data = dto.getSubBankByBank) {
  let result;
  try{
    axios.defaults.baseURL = ad1Menu.urlBase;
    const response = await axios.post(ad1Menu.ad1taftMenuList.GETALLSUBBANKBYBANKID, data);
    result = response.data;
  }catch(err){
    console.log(err.message);
  }
  return result
}
