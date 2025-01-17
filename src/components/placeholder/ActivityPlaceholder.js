import React from "react";
import {View} from 'react-native';
import { colors } from "../../constant/color";

const placeholderColor = colors.activityPlaceholder;

export const ActivityPlaceholder=({
    width = "100%",
    height = 20,
    borderRadius=1
})=>{
    return (
        <View
            style={{
                width,
                height,
                backgroundColor: placeholderColor,
                borderRadius
            }}
        />
    )
}