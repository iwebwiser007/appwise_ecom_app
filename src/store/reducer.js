import {appStatusTypes} from '../constant/type';
import {actionTypes} from './actionType';

const iState = {
  appStatus: appStatusTypes.splash,
  user: '',
  cart: [],
  wishlist: [],
  notification: 0,
};

export const appReducer = (state = iState, action) => {
  switch (action.type) {
    case actionTypes.SET_APP_STATUS:
      return {...state, appStatus: action.payload};
    case actionTypes.SET_USER:
      return {...state, user: action.payload};
    case actionTypes.SET_CART:
      return {...state, cart: action.payload};
    case actionTypes.SET_NOTIFICATION:
      return {...state, notification: action.payload};
    case actionTypes.SET_WISHLIST:
        return {...state, wishlist: action.payload};
    case actionTypes.SET_LOGOUT:
      return {
        ...state,
        notification: 0,
        user: '',
        cart: [],
        appStatus: appStatusTypes.auth,
        wishlist: []
      };
    default:
      return {...state};
  }
};
