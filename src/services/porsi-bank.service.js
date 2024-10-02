import axios from "axios";
import {ad1taftParameterApi} from "@/api/api.ad1taft-parameter";

const ad1ParameterApi = new ad1taftParameterApi();

/**
 * GET PORSI PENDANAAN
 * @async axios
 *
 * ACCESS API
 * @access ad1ParameterApi
 */
export const getPorsiList = async () => {
    let result = null;
    try {
        axios.defaults.baseURL = ad1ParameterApi.urlBase;
        const response = await axios.post(ad1ParameterApi.ad1ParameterList.GETBANKPORTION);
        result = response.data;
    } catch (err) {
        console.log(err.message);
    }
    return result;
}

/**
* Save Porsi Bank
 * @param data
 * param contain
 *
*/
export const addPorsiBank = async (data) => {
    let result = null;
    try{
        axios.defaults.baseURL = ad1ParameterApi.urlBase;
        const response = await axios.post(ad1ParameterApi.ad1ParameterList.SAVEBANKPORTION, data);
        result = response.data;
    }catch (err){
        console.log(err.message)
    }
    return result;
}

/**
 * Delete porsi Bank
 * @param data
 * @returns {Promise<null>}
 */
export const deletePorsiBank = async (data) => {
    let result = null;
    try{
        axios.defaults.baseURL = ad1ParameterApi.urlBase;
        const response = await axios.post(ad1ParameterApi.ad1ParameterList.DELETEBANKPORTION, data);
        result = response.data;
    }catch (err) {
        console.log(err.message)
    }
    return result;
}
