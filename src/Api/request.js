import {Helper} from '../Helper/Helper';
import {setLoading} from '../Storage/Action/Action';
import {GlobalConstant} from '../Constants/GlobalConstant';
import {Alert} from 'react-native';

const success_status = [200, 201, 500];

// Function to get request headers
export const getHeader = (isForm = false, token = GlobalConstant.userToken) => {
  return {
    Accept: 'application/json',
    'Content-Type': isForm ? 'multipart/form-data' : 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

// Function to check response status and show message if needed
export const checkResponse = (res, showMessage = true, url = '') => {
  if (res && res?.status) {
    return true;
  }
  if (showMessage && res?.message) {
    Helper.log('checkResponse, alert msg', {
      res,
      url,
    });
    Alert.alert('', res?.message);
  }
  return false;
};

// Function to perform GET request
export const GetRequest = async ({url = '', spinner, header}) => {
  try {
    spinner && setLoading(true);
    const res = await fetch(url, {
      headers: header ? header : getHeader(),
      method: 'GET',
    });
    let result = await res.json();
    if (success_status.includes(res.status)) {
      spinner && setLoading(false);
      return result;
    }
    spinner && setLoading(false);
    return result;
  } catch (error) {
    spinner && setLoading(false);
    console.log('------request error========', error);
  }
};

// Function to perform POST request

// request.js
export const PostRequest = async ({
  url = '',
  data,
  spinner,
  isLog = false,
  isForm = false,
  method = 'POST',
}) => {
  try {
    spinner && setLoading(true);
    const res = await fetch(`http://213.210.21.175:5000/AW0001/api/v1/${url}`, {
      method: method,
      headers: getHeader(isForm),
      body: isForm ? data : JSON.stringify(data),
    });
    const result = await res.json();
    if (isLog) {
      Helper.log('result', { body: data, result });
    }
    if (success_status.includes(res.status)) {
      spinner && setLoading(false);
      return result;
    }
    spinner && setLoading(false);
    return result;
  } catch (error) {
    spinner && setLoading(false);
    console.log('------request error========', error);
  }
};

export default{
  PostRequest,
  GetRequest,
  checkResponse,
  getHeader,
};
