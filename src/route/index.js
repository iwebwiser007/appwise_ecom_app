import React from "react";
import { useSelector } from "react-redux";
import {NavigationContainer,createNavigationContainerRef} from '@react-navigation/native';
import { appStatusTypes } from "../constant/type";
import * as Screen from '../screen';
import {ThemeProvider} from '../theme/themeContext';
import { AuthNavigator, HomeNavigator } from "./app_navigator";


export const navigationRef = createNavigationContainerRef();


export const AppRoute=()=>{

    const appStatus = useSelector((state)=>state?.appStatus);

    const renderNavigator=()=>{
        if(appStatusTypes.splash === appStatus){
            return (
                <Screen.Splash/>
            )
        }
        if(appStatusTypes.auth === appStatus){
            return (
                <AuthNavigator/>
            )
        }
        return <HomeNavigator/>
    }

    return (
        <NavigationContainer ref={navigationRef}>
            <ThemeProvider>
            {renderNavigator()}
            </ThemeProvider>
        </NavigationContainer>
    )
}