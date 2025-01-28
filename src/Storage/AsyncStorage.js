/* eslint-disable no-unused-vars */
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Helper } from '../Helper/Helper';

// Constants for storage keys
const KEY = 'Key_12121212';  // Key for general storage
const LOGIN_USER_KEY = 'JUBAL_LOGIN_USER_2121212'; //Key for login user storage

// Initial state for general storage
const iState = {
    user: '',
    notification: '',
};

// Retrieves general storage data
export const getStorage = async () => {
    const res = await AsyncStorage.getItem(KEY);
    if (res) {
        return JSON.parse(res);
    }
    return { ...iState };
};

// Sets user data in general storage
export const setUserStorage = async ({ user }) => {
    try {
        let obj = await getStorage();
        obj.user = user;
        AsyncStorage.setItem(KEY, JSON.stringify(obj));
    } catch (error) {
        console.log('error', error);
    }
};

// Sets notification data in general storage
export const setNotificationStorage = async ({ notification }) => {
    try {
        let obj = await getStorage();
        obj.notification = notification;
        AsyncStorage.setItem(KEY, JSON.stringify(obj));
    } catch (error) {
        console.log('error', error);
    }
};

// Removes general storage data
export const removeStorage = () => {
    try {
        AsyncStorage.removeItem(KEY);
    } catch (error) {
        console.log('error', error);
    }
};

// Retrieves login user data from storage
export const getLoginUserStorage = async () => {
    const res = await AsyncStorage.getItem(LOGIN_USER_KEY);
    if (res) {
        const list = JSON.parse(res);
        if (list?.length > 0) {
            return [...list];
        }
    }
    return [];
};

// Sets a list of login users in storage
export const setLoginUserStorageList = async (users) => {
    try {
        AsyncStorage.setItem(LOGIN_USER_KEY, JSON.stringify(users));
    } catch (error) {
        // Handle error (if needed)
    }
};

// Sets a single login user in storage, updating if exists or adding if new
export const setLoginUserStorage = async(user)=>{
    let users  = await getLoginUserStorage();
    const userIndex = users?.findIndex((item)=>item?.id === user?.id);
    if(userIndex > -1){
        users[userIndex] = user;
    }else{
        users.push(user);
    }

    try {
        AsyncStorage.setItem(LOGIN_USER_KEY, JSON.stringify(users));
    } catch (error) {
        // Handle error (if needed)
    }
};



