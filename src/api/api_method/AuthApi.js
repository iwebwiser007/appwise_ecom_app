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