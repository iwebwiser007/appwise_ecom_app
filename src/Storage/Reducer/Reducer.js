// // Redux reducer file to manage the application's state
// import { AppStatusTypes, Types } from '../Types';

// // Initial state of the reducer
// const iState = {
//     user: '',
//     appStatus: AppStatusTypes.splash,
//     loading: false,
//     actionSheet: {},
//     hideActionSheet: false,
// };


// // Reducer function to handle actions and update the state
// export const Reducer = (state = { ...iState }, action) => {
//     switch (action?.type) {
//         case Types.SET_APP_STATUS:
//             return { ...state, appStatus: action?.payload };
//         case Types.SET_APP_USER:
//             return { ...state, user: action?.payload };
//         case Types.USER_LOGOUT:
//             return {
//                 ...state,
//                 user: '',
//                 appStatus: AppStatusTypes.market,
//                 loading: false,
//                 hideActionSheet: false,
//             };
//         case Types.SET_LOADING:
//             return { ...state, loading: action?.payload };
//         case Types.SET_ACTION_SHEET:
//             return { ...state, actionSheet: action?.payload };
//         default:
//             return state;
//     }
// };














import { AppStatusTypes, Types } from '../Types';

// Initial state of the custom reducer
const iState = {
  user: '',
  appStatus: AppStatusTypes.splash,
  loading: false,
  actionSheet: {},
  hideActionSheet: false,
};

// Reducer function to handle actions
export const Reducer = (state = { ...iState }, action) => {
  switch (action?.type) {
    case Types.SET_APP_STATUS:
      return { ...state, appStatus: action?.payload };
    case Types.SET_APP_USER:
      return { ...state, user: action?.payload };
    case Types.USER_LOGOUT:
      return {
        ...state,
        user: '',
        appStatus: AppStatusTypes.market,
        loading: false,
        hideActionSheet: false,
      };
    case Types.SET_LOADING:
      return { ...state, loading: action?.payload };
    case Types.SET_ACTION_SHEET:
      return { ...state, actionSheet: action?.payload };
    default:
      return state;
  }
};
