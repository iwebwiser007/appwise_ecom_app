import { AppConstant } from '../constant/app_constant';
import { appStatusTypes } from '../constant/type';
import { actionTypes } from './actionType';
import { getStorage, setUserStorage } from './Asyncstorage';
import {Store} from './store';


const actionDispatcher=({
    type,
    payload
})=>{
    Store.dispatch({type, payload});
}


export const setAppStatus=(status)=>{
    actionDispatcher({
        type: actionTypes.SET_APP_STATUS,
        payload: status
    })
}

export const setUserDetail=(user)=>{
    if(user?.token){
        AppConstant.setUserToken(user?.token);
    }
    if(user?.id){
        AppConstant.setUserId(user?.id);
    }
    actionDispatcher({
        type: actionTypes.SET_USER,
        payload: user
    });
}

export const setLoginDetail=(user)=>{
    setUserDetail(user);
    setUserStorage({user});
    setAppStatus(appStatusTypes.home);
}

export const startApp=async()=>{
    const res = await getStorage();
    if(res.user?.id){
        setUserDetail(res.user);
        setAppStatus(appStatusTypes.home);
        return;
    }
    setAppStatus(appStatusTypes.auth);
}

