// This module defines action types and status types used in Redux for the application.

export const Types = {
    SET_APP_STATUS: 'SET_APP_STATUS',
    SET_APP_USER: 'SET_APP_USER',
    USER_LOGOUT: 'USER_LOGOUT',
    SET_LOADING: 'SET_LOADING',

    SET_ACTION_SHEET: 'SET_ACTION_SHEET',
    SET_HIDE_ACTION_SHEET: 'SET_HIDE_ACTION_SHEET',
};


export const AppStatusTypes = {
    splash: 'splash',
    market: 'market',
    auth: 'auth',
    home: 'home',
};
