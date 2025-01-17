import React from "react";
import {View, SafeAreaView} from 'react-native';
import { useThemeColor } from "../theme/themeContext";


export const AppContainer=({
    children
})=>{
    const themeColor = useThemeColor();

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: themeColor.background}}>
            {children}
        </SafeAreaView>
    )
}