import existCookieKey, { useCookie } from '@/utils/cookie-var.utils.js';
import axios from 'axios';

import { ad1taftMenuApi } from '@/api/api.ad1taft-menu.js';
import dto from '@/services/dto/dto.js';

const ad1MenuApi = new ad1taftMenuApi();

export function getNikLog(proxy) {
  const _user = useCookie.getItem(existCookieKey.USER_AUTH, proxy);
  return `${_user.nik} - ${_user.name}`.slice(0, 50);
}

export const getSchemaList = () => {
  let result = [];
  result.push({ id: 1, desc: 'Join Finance' });
  result.push({ id: 2, desc: 'Founding' });
  return result;
};

export async function getObjectGroup() {
  let result;
  try {
    axios.defaults.baseURL = ad1MenuApi.urlBase;
    const response = await axios.get(ad1MenuApi.ad1taftMenuList.GETALLGROUPOBJT);
    result = response.data;
  } catch (err) {
    console.log(err.message);
  }
  return result;
}

export async function getObjectClass(data = dto.getClassObjectDto) {
  let result;
  try {
    axios.defaults.baseURL = ad1MenuApi.urlBase;
    const response = await axios.post(ad1MenuApi.ad1taftMenuList.GETCLASSOBJT, data);
    result = response.data;
  } catch (err) {
    console.log(err.message);
  }
  return result;
}


