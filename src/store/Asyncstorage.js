import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'


const KEY = "Key_12121212";

const iState = {
    user: "",
    notification: ""
}



export const getStorage = async () => {
    const res = await AsyncStorage.getItem(KEY);
    if (res) {
        return JSON.parse(res);
    }
    return { ...iState };
}

export const setUserStorage = async ({ user }) => {
    try {
        let obj = await getStorage();
        obj['user'] = user;
        AsyncStorage.setItem(KEY, JSON.stringify(obj));
    } catch (error) {
        console.log("error", error)
    }
}





export const removeStorage = () => {
    try {
        AsyncStorage.removeItem(KEY);
    } catch (error) {
        console.log("error", error)
    }
}



