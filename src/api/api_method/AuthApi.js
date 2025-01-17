import { Helper } from '../../helper/Helper';
import {apiUrl} from '../baseUrl';
import { getLoginForm } from '../form';
import {GetRequest, PostRequest, isSuccess} from '../request';



export const loginUserByApi=async({
    email,
    password
})=>{
    const form = getLoginForm({
        email,
        password
    })
    const obj = {
        detail: ""
    }
    const res = await PostRequest({
        url: apiUrl.login,
        body: form
    });
    if(isSuccess(res)){
        obj['detail'] = res?.data;
    }
    return obj;
}

export const registerUserByApi=async({
    form
})=>{
    const obj = {
        detail: ""
    }
    const res = await PostRequest({
        url: apiUrl.register,
        body: form
    });
    
    if(isSuccess(res)){
        obj['detail'] = res?.data;
    }
    return obj;
}

export const verifyTokenByApi=async({
    token
})=>{
    const obj = {
        status: false,
    }
    let URL = `${apiUrl.verify_token}?token=${token}`;
    const res = await GetRequest({
        url: URL,
    });
    obj['status'] = true;
    return obj;
}

export const getPasswordChangeLinkByApi=async({
    email
})=>{
    const obj = {
        status: false,
    }
    let URL = apiUrl.forget_password;
    const res = await PostRequest({
        url: URL,
        body:{
            email
        }
    });
    if(isSuccess(res)){
        obj['status'] = true;
    }
    return obj;
}