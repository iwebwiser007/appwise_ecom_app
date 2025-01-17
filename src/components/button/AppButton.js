import React from "react";
import { TouchableButton } from "../TouchableButton";
import { View, StyleSheet } from "react-native";
import { AppHeading } from "../AppHeading";
import { colors } from "../../constant/color";


export const AppButton=({
    title = "button",
    backgroundColor = colors.primary,
    textColor = colors.white,
    onPress
})=>{
    return (
        <TouchableButton onPress={onPress} style={[styles.container,{
            backgroundColor
        }]}>
            <AppHeading
                title={title}
                color={textColor}
                fontSize={16}
            />
        </TouchableButton>
    )
}

const styles = StyleSheet.create({
    container:{
        height: 45,
        borderRadius: 45,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    }
})