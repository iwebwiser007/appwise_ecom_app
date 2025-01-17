import {Helper} from '../helper/Helper';
import {AppConstant} from '../constant/app_constant';
import {Alert} from 'react-native';

const setSpinner = () => {};

export const isSuccess = (res, showMsg = true) => {
  if (res.status) {
    return true;
  }
  if (res.message && showMsg) {
    Alert.alert('', res?.message);
  }
  return false;
};

export const GetRequest = async ({url, isLog, spinner}, callback) => {
  const token = AppConstant.userToken;
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);

  const config = {
    headers: myHeaders,
    method: 'GET',
  };
  spinner && setSpinner(true);
  const response = await fetch(url, config);
  if (response.status == 200) {
    let res = '';
    res = await response.json();
    spinner && setSpinner(false);
    callback && callback(res);
    return res;
  }
  spinner && setSpinner(false);
  callback && callback(false);
  return false;
};

export const PostRequest = async (
  {url, isLog, body, isFile, spinner},
  callback,
) => {
  const token = AppConstant.userToken;
  var myHeaders = new Headers();
  if (isFile) {
    myHeaders.append(
      'Content-Type',
      'multipart/form-data;',
    );
  } else {
    myHeaders.append('Content-Type', 'application/json');
  }
  myHeaders.append('Authorization', `Bearer ${token}`);

  const config = {
    headers: myHeaders,
    method: 'POST',
    body: isFile ? body : JSON.stringify(body),
  };

  try {
    spinner && setSpinner(true);
    const response = await fetch(url, config);
    if (response.status == 200) {
      let res = '';
      res = await response.json();
      spinner && setSpinner(false);
      callback && callback(res);
      return res;
    }
  } catch (error) {
    console.log('error---------', error);
    spinner && setSpinner(false);
    callback && callback(false);
    return false;
  }
  callback && callback(false);
  spinner && setSpinner(false);
  return false;
};
