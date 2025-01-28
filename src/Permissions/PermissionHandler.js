/* eslint-disable no-unused-vars */
/**
 * This component handles various permission requests and checks for a React Native application.
 * It includes methods for requesting and checking permissions related to:
 * - Camera
 * - Storage
 *
 * The component provides functions to handle permissions on both Android and iOS,
 * and displays appropriate alerts and dialogs to guide the user in enabling required permissions.
 *
 * Dependencies:
 * - react-native-permissions
 * - react-native-android-location-enabler
 */



import React from 'react';
import { Platform, Alert } from 'react-native';
import {
    PERMISSIONS,
    request, openSettings, requestMultiple,
} from 'react-native-permissions';

// Button text constants
const btnText = {
    cancel_text: 'Cancel',
    openSettings: 'Open settings',
    ok_do_not_ask: "Ok, don't ask",
    ask_again: 'Ask again',
    ok: 'Ok',
    no: 'No',
    yes: 'Yes',
};

// Permission message constants
const permissionMessage = {
    camera: 'Allow camera permission to capture images',
    photos: "Photos permission is not enabled so can't able to fetch photos or videos, please enable it in setting to continue",
};

// Check and request camera permission
export const checkForCameraPermission = async(callback) => {
    if(Platform.OS === 'android'){
        if (Platform.OS === 'android') {
            const res = await requestMultiple([
                PERMISSIONS.ANDROID.CAMERA,
                PERMISSIONS.ANDROID.RECORD_AUDIO,
                PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            ]);
            if(res['android.permission.CAMERA'] === 'granted'){
                callback && callback(true);
                return;
            }
            showPermissionMessage({msg: 'Camera permission is required to continue record a video'});
            return;
        }
    }
    request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then((res) => {
        console.log('res', res);
        if (res === 'granted' || res === 'limited') {
            callback && callback(true);
            return;
        }
        showPermissionMessage({msg: 'Camera permission is required to continue record a video'});
    });
};

// Request storage permission for writing files
export const writeStoragePermission = (callback)=>{
    if(Platform.OS === 'android'){
        request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((res)=>{
            if(res === 'granted'){
                callback && callback(true);
                return;
            }
            callback && callback(false);
        }).catch(()=>{
            callback && callback(false);
        });
        return;
    }
    callback && callback(true);
};

// Check and request storage permissions
export const checkStoragePermission = (callback) => {
    if (Platform.OS === 'android') {
        requestMultiple(
            [
                PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
                PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
                PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            ]
        ).then((res) => {
            if (
                res['android.permission.READ_MEDIA_IMAGES'] === 'granted'
                ||
                res['android.permission.READ_EXTERNAL_STORAGE'] === 'granted'
                ||
                res['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
            ) {
                callback && callback(true);
                return;
            }
            callback && callback(false);
            showPermissionMessage({msg: permissionMessage.photos});
            return;
        }).catch((e) => {
            console.log('error', e);
        });
        return;
    }
    request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((res) => {
        if (res === 'granted') {
            callback && callback(true);
            return;
        }
        callback && callback(false);
        showPermissionMessage({msg: permissionMessage.photos});
        return;
    }).catch((e) => {
        console.log('error', e);
    });
};

// Check and request all permissions at once
export const checkAllPermissions = async () => {
    if (Platform.OS === 'android') {
        const res = await requestMultiple([
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ]);
        if (res['android.permission.CAMERA'] !== 'granted') {
            showPermissionMessage({ msg: permissionMessage.camera });
            return false;
        }

        return true;
    }
    const res = await requestMultiple([
        PERMISSIONS.IOS.CAMERA,
    ]);
    if (res['ios.permission.CAMERA'] !== 'granted') {
        showPermissionMessage({ msg: permissionMessage.camera });
        return false;
    }
    return true;
};

// Display an alert dialog for required permissions
const showPermissionMessage = ({
    msg,
}) => {
    Alert.alert(
        'Required',
        msg,
        [
            {
                text: 'Cancel',
                style: 'destructive',
            },
            {
                text: 'Open Settings',
                onPress: () => {
                    openSettings();
                },
            },
        ],
    );
};
