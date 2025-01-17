import { actionTypes } from './actionType';
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

