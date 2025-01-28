/* eslint-disable no-unused-vars */
// This module defines various Redux actions for managing application state, including cart, posts, user details, and authentication.

import React from 'react';
import { actionDispatcher } from './Dispatcher';
import { AppStatusTypes, Types } from '../Types';
import { removeStorage, setUserStorage } from '../../Storage/AsyncStorage';
import { Helper } from '../../Helper/Helper';
import { GlobalConstant } from '../../Constants/GlobalConstant';

// Action to hide/show the action sheet
export const setHideActionSheet = (status) => {
    actionDispatcher({ type: Types.SET_HIDE_ACTION_SHEET, payload: status });
};

// Action to set loading status
export const setLoading = (status) => {
    actionDispatcher({ type: Types.SET_LOADING, payload: status });
};

// Action to set application status
export const setAppStatus = (status) => {
    actionDispatcher({ type: Types.SET_APP_STATUS, payload: status });
};

// Action to log in user and set application status to home
export const loginUserByAction = (user) => {
    setUserDetail(user);
    setTimeout(() => {
        setAppStatus(AppStatusTypes.home);
    }, 500);
};

// Action to set user details and update global tokens
export const setUser = (payload) => {
    if (payload?.accessToken) {
        GlobalConstant.updateUserToken(payload?.accessToken);
        GlobalConstant.updateRefreshToken(payload?.refreshToken);
    }
    actionDispatcher({ type: Types.SET_APP_USER, payload: payload });
};

// Action to log out user, clear storage and update tokens
export const logoutAction = async () => {
    try {
        await removeStorage();
        GlobalConstant.updateUserToken('');
        actionDispatcher({ type: Types.USER_LOGOUT });
    } catch (error) {
        Helper.log('error',error);
    }
};

// Helper function to set user details and store in async storage
export const setUserDetail = async (user) => {
    if (user) {
        if (user?.id) {
            Helper.log('user id', user?.id);
        }
        await setUserStorage({ user });
        setUser(user);
    }
};

// Action to set the action sheet data
export const setActionSheet = (data) => {
    actionDispatcher({ type: Types.SET_ACTION_SHEET, payload: data });
};
