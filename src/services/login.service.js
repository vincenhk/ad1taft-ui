import axios from 'axios';
import { ad1taftAccessApi } from '@/api/api.secure-access';
import { ad1taftMenuApi } from '@/api/api.ad1taft-menu';
import store from '@/store'

const ad1AccessApi = new ad1taftAccessApi()
const _ad1taftAccessApi = ad1AccessApi.ad1taftAccessList

const ad1taftApi = new ad1taftMenuApi()
const _ad1taftMenuApi = ad1taftApi.ad1taftMenuList

/**
 * Auth Login getting Access
 *  This method contain all function for login and this method root the login
 *  @param nik
 *  @param password
 * */
export const authLogin = async function(nik, password) {
  let result = "";
  const payload = {
    login: nik,
    applicationAlias: 'IDM.Taft',
    groupALias: '',
    status: 'Allow',
    menu: true
  };
  try {
    axios.defaults.baseURL = ad1AccessApi.urlBase
    const response = await axios.post(_ad1taftAccessApi.PERMISSION_MATRIX, payload);
    if (response.data) {
      store.commit('modelAuth/menuAccess', response.data);
      const auth = await authUser(nik, password);
      if (auth.includes('OK')) {
        result = userProps(nik);
        alert('Login Success');
      }
    }
  } catch (err) {
    err.response.data.length < 1 ? alert('NIK tidak memiliki akses') : alert("err :", err.message);
  };
  return result;
}

/**
 * Auth verification User
 *  @param password
 *  @param nik
 * */
async function authUser(nik, password) {
  let result = ""
  try {
    axios.defaults.baseURL = ad1AccessApi.urlBase
    const response = await axios.post(_ad1taftAccessApi.AUTHENTICATE_USER, {
      login: nik,
      password: password ? password : ''
    })
    result = response.data;
  } catch (err) {
    if (err.response.data.includes('ExpiredPassword') && err.response.status === 417 ) {
      alert('Password Expired');
    } else if (err.response.data.includes('WrongPassword') && err.response.status === 417) {
      alert('Wrong Password');
    }else {
      alert('err :', err.message);
    }
  }
  return result;
}

/**
 * Getting User Properties API Portsight
 *  @param nik
 * */
const userProps = async (nik) => {
  let result = "";
  const payload = {
    login: nik
  }
  try {
    axios.defaults.baseURL = ad1AccessApi.urlBase
    const response = await axios.post(_ad1taftAccessApi.USER_PROPERTY, payload)
    if (response.data.orgDepartment.includes('FUNDING')) {
      response.data.schemaId = 2
    } else if (response.data.orgDepartment.includes('JOINT FINANCING')) {
      response.data.schemaId = 1
    } else {
      response.data.schemaId = 3
    }
    result = response.data;
  } catch (err) {
    console.log(err)
    throw err
  }
  return result;
}

/**
 * Get version application
 * */
export const getApiVersion = () => {
  let response = null
  axios.defaults.baseURL = ad1taftApi.urlBase
  axios
    .get(_ad1taftMenuApi.GETVERSION)
    .then((res) => {
      response = res.data
    })
    .catch((err) => {
      console.log(err)
    })
  return response
}
